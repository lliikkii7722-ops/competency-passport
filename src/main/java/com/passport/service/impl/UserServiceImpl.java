package com.passport.service.impl;

import com.passport.dto.request.LoginRequest;
import com.passport.dto.request.ProfileUpdateRequest;
import com.passport.dto.request.RegisterRequest;
import com.passport.dto.response.*;
import com.passport.model.*;
import com.passport.repository.*;
import com.passport.security.UserDetailsImpl;
import com.passport.security.jwt.JwtUtils;
import com.passport.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserPointsRepository userPointsRepository;

    @Autowired
    private UserBadgeRepository userBadgeRepository;

    @Autowired
    private CodingProfileRepository codingProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .publicSlug(UUID.randomUUID().toString().substring(0, 8))
                .isProfilePublic(true)
                .atsScoreOverall(0)
                .build();

        User savedUser = userRepository.save(user);

        UserPoints points = UserPoints.builder()
                .user(savedUser)
                .totalPoints(0)
                .codingPoints(0)
                .certPoints(0)
                .profilePoints(0)
                .level(1)
                .title("Novice")
                .build();
        userPointsRepository.save(points);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return new AuthResponse(jwt, "Bearer", savedUser.getId(), savedUser.getEmail(), savedUser.getFullName());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(jwt, "Bearer", user.getId(), user.getEmail(), user.getFullName());
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToUserProfileResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getHeadline() != null) user.setHeadline(request.getHeadline());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getSummary() != null) user.setSummary(request.getSummary());
        if (request.getGithubUsername() != null) user.setGithubUsername(request.getGithubUsername());
        if (request.getLeetcodeUsername() != null) user.setLeetcodeUsername(request.getLeetcodeUsername());
        if (request.getIsProfilePublic() != null) user.setIsProfilePublic(request.getIsProfilePublic());

        User updated = userRepository.save(user);
        return mapToUserProfileResponse(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public PublicProfileResponse getPublicProfile(String slug) {
        User user = userRepository.findByPublicSlug(slug)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (!user.getIsProfilePublic()) {
            throw new RuntimeException("This profile is private");
        }

        return mapToPublicProfileResponse(user);
    }

    private UserProfileResponse mapToUserProfileResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setHeadline(user.getHeadline());
        response.setPhone(user.getPhone());
        response.setLocation(user.getLocation());
        response.setSummary(user.getSummary());
        response.setProfileImageUrl(user.getProfileImageUrl());
        response.setPublicSlug(user.getPublicSlug());
        response.setIsProfilePublic(user.getIsProfilePublic());
        response.setAtsScoreOverall(user.getAtsScoreOverall());
        response.setGithubUsername(user.getGithubUsername());
        response.setLeetcodeUsername(user.getLeetcodeUsername());

        response.setEducations(user.getEducations().stream().map(this::mapEducation).collect(Collectors.toList()));
        response.setExperiences(user.getExperiences().stream().map(this::mapExperience).collect(Collectors.toList()));
        response.setSkills(user.getSkills().stream().map(this::mapSkill).collect(Collectors.toList()));
        response.setCertificates(user.getCertificates().stream().map(this::mapCertificate).collect(Collectors.toList()));
        response.setProjects(user.getProjects().stream().map(this::mapProject).collect(Collectors.toList()));

        if (user.getUserPoints() != null) {
            response.setUserPoints(mapUserPoints(user.getUserPoints()));
        }

        response.setBadges(user.getUserBadges().stream()
                .map(ub -> mapBadge(ub.getBadge(), ub))
                .collect(Collectors.toList()));

        return response;
    }

    private PublicProfileResponse mapToPublicProfileResponse(User user) {
        PublicProfileResponse response = new PublicProfileResponse();
        response.setFullName(user.getFullName());
        response.setHeadline(user.getHeadline());
        response.setLocation(user.getLocation());
        response.setSummary(user.getSummary());
        response.setProfileImageUrl(user.getProfileImageUrl());
        response.setAtsScoreOverall(user.getAtsScoreOverall());

        response.setEducations(user.getEducations().stream()
                .filter(Education::getIsVisible)
                .map(this::mapEducation)
                .collect(Collectors.toList()));

        response.setExperiences(user.getExperiences().stream()
                .filter(Experience::getIsVisible)
                .map(this::mapExperience)
                .collect(Collectors.toList()));

        response.setSkills(user.getSkills().stream().map(this::mapSkill).collect(Collectors.toList()));
        response.setProjects(user.getProjects().stream().map(this::mapProject).collect(Collectors.toList()));
        response.setCertificates(user.getCertificates().stream().map(this::mapCertificate).collect(Collectors.toList()));

        List<CodingStatsResponse> codingStats = user.getCodingProfiles().stream()
                .map(this::mapCodingStats)
                .collect(Collectors.toList());
        response.setCodingStats(codingStats);

        if (user.getUserPoints() != null) {
            response.setUserPoints(mapUserPoints(user.getUserPoints()));
        }

        response.setBadges(user.getUserBadges().stream()
                .map(ub -> mapBadge(ub.getBadge(), ub))
                .collect(Collectors.toList()));

        return response;
    }

    private EducationResponse mapEducation(Education e) {
        EducationResponse r = new EducationResponse();
        r.setId(e.getId());
        r.setInstitution(e.getInstitution());
        r.setDegree(e.getDegree());
        r.setFieldOfStudy(e.getFieldOfStudy());
        r.setStartDate(e.getStartDate());
        r.setEndDate(e.getEndDate());
        r.setGrade(e.getGrade());
        r.setIsVisible(e.getIsVisible());
        return r;
    }

    private ExperienceResponse mapExperience(Experience e) {
        ExperienceResponse r = new ExperienceResponse();
        r.setId(e.getId());
        r.setCompany(e.getCompany());
        r.setTitle(e.getTitle());
        r.setLocation(e.getLocation());
        r.setEmploymentType(e.getEmploymentType());
        r.setStartDate(e.getStartDate());
        r.setEndDate(e.getEndDate());
        r.setIsCurrent(e.getIsCurrent());
        r.setDescription(e.getDescription());
        r.setIsVisible(e.getIsVisible());
        return r;
    }

    private SkillResponse mapSkill(Skill s) {
        SkillResponse r = new SkillResponse();
        r.setId(s.getId());
        r.setSkillName(s.getSkillName());
        r.setCategory(s.getCategory());
        r.setProficiencyLevel(s.getProficiencyLevel());
        r.setSource(s.getSource());
        r.setIsVerified(s.getIsVerified());
        return r;
    }

    private CertificateResponse mapCertificate(Certificate c) {
        CertificateResponse r = new CertificateResponse();
        r.setId(c.getId());
        r.setTitle(c.getTitle());
        r.setIssuer(c.getIssuer());
        r.setIssueDate(c.getIssueDate());
        r.setExpiryDate(c.getExpiryDate());
        r.setCredentialId(c.getCredentialId());
        r.setCredentialUrl(c.getCredentialUrl());
        r.setFileUrl(c.getFileUrl());
        r.setVerificationHash(c.getVerificationHash());
        r.setVerificationStatus(c.getVerificationStatus().name());
        r.setExtractedSkills(c.getExtractedSkills());
        r.setSkillTags(c.getSkillTags());
        return r;
    }

    private ProjectResponse mapProject(Project p) {
        ProjectResponse r = new ProjectResponse();
        r.setId(p.getId());
        r.setTitle(p.getTitle());
        r.setDescription(p.getDescription());
        r.setTechnologies(p.getTechnologies());
        r.setGithubUrl(p.getGithubUrl());
        r.setDemoVideoUrl(p.getDemoVideoUrl());
        r.setLiveUrl(p.getLiveUrl());
        r.setStarsCount(p.getStarsCount());
        r.setForksCount(p.getForksCount());
        r.setLanguageBreakdown(p.getLanguageBreakdown());
        r.setReadmeSummary(p.getReadmeSummary());
        r.setIsFeatured(p.getIsFeatured());
        return r;
    }

    private CodingStatsResponse mapCodingStats(CodingProfile cp) {
        CodingStatsResponse r = new CodingStatsResponse();
        r.setPlatform(cp.getPlatform());
        r.setUsername(cp.getUsername());
        r.setTotalSolved(cp.getTotalSolved());
        r.setEasySolved(cp.getEasySolved());
        r.setMediumSolved(cp.getMediumSolved());
        r.setHardSolved(cp.getHardSolved());
        r.setRanking(cp.getRanking());
        r.setContestRating(cp.getContestRating());
        r.setAcceptanceRate(cp.getAcceptanceRate());
        return r;
    }

    private UserPointsResponse mapUserPoints(UserPoints up) {
        UserPointsResponse r = new UserPointsResponse();
        r.setTotalPoints(up.getTotalPoints());
        r.setCodingPoints(up.getCodingPoints());
        r.setCertPoints(up.getCertPoints());
        r.setProfilePoints(up.getProfilePoints());
        r.setLevel(up.getLevel());
        r.setTitle(up.getTitle());
        return r;
    }

    private BadgeResponse mapBadge(Badge b, UserBadge ub) {
        BadgeResponse r = new BadgeResponse();
        r.setId(b.getId());
        r.setName(b.getName());
        r.setDescription(b.getDescription());
        r.setIconUrl(b.getIconUrl());
        r.setCategory(b.getCategory());
        r.setRarity(b.getRarity().name());
        r.setPoints(b.getPoints());
        r.setEarnedAt(ub.getEarnedAt());
        return r;
    }
}
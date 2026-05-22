package com.passport.service.impl;

import com.passport.dto.request.ExperienceRequest;
import com.passport.dto.response.ExperienceResponse;
import com.passport.model.Experience;
import com.passport.model.User;
import com.passport.repository.ExperienceRepository;
import com.passport.repository.UserRepository;
import com.passport.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ExperienceResponse addExperience(Long userId, ExperienceRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Experience experience = new Experience();
        experience.setUser(user);
        experience.setCompany(request.getCompany());
        experience.setTitle(request.getTitle());
        experience.setLocation(request.getLocation());
        experience.setEmploymentType(request.getEmploymentType());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setIsCurrent(request.getIsCurrent() != null ? request.getIsCurrent() : false);
        experience.setDescription(request.getDescription());
        experience.setIsVisible(request.getIsVisible() != null ? request.getIsVisible() : true);

        Experience saved = experienceRepository.save(experience);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExperienceResponse> getUserExperiences(Long userId) {
        return experienceRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ExperienceResponse updateExperience(Long userId, Long experienceId, ExperienceRequest request) {
        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new RuntimeException("Experience not found"));

        if (!experience.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getCompany() != null) experience.setCompany(request.getCompany());
        if (request.getTitle() != null) experience.setTitle(request.getTitle());
        if (request.getLocation() != null) experience.setLocation(request.getLocation());
        if (request.getEmploymentType() != null) experience.setEmploymentType(request.getEmploymentType());
        if (request.getStartDate() != null) experience.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) experience.setEndDate(request.getEndDate());
        if (request.getIsCurrent() != null) experience.setIsCurrent(request.getIsCurrent());
        if (request.getDescription() != null) experience.setDescription(request.getDescription());
        if (request.getIsVisible() != null) experience.setIsVisible(request.getIsVisible());

        Experience updated = experienceRepository.save(experience);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteExperience(Long userId, Long experienceId) {
        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new RuntimeException("Experience not found"));

        if (!experience.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        experienceRepository.delete(experience);
    }

    private ExperienceResponse mapToResponse(Experience e) {
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
}
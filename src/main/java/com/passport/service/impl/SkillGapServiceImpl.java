package com.passport.service.impl;

import com.passport.dto.request.SkillGapAnalysisRequest;
import com.passport.dto.response.SkillGapAnalysisResponse;
import com.passport.model.Skill;
import com.passport.model.SkillGapAnalysis;
import com.passport.model.User;
import com.passport.repository.SkillGapAnalysisRepository;
import com.passport.repository.SkillRepository;
import com.passport.repository.UserRepository;
import com.passport.service.SkillGapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillGapServiceImpl implements SkillGapService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private SkillGapAnalysisRepository skillGapAnalysisRepository;

    @Override
    @Transactional
    public SkillGapAnalysisResponse analyzeSkillGap(Long userId, SkillGapAnalysisRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Skill> userSkills = skillRepository.findByUserId(userId);
        Set<String> userSkillNames = userSkills.stream()
                .map(s -> s.getSkillName().toLowerCase())
                .collect(Collectors.toSet());

        // Extract skills from job description
        String jd = request.getJobDescription().toLowerCase();
        String[] commonSkills = {
                "java", "python", "javascript", "react", "spring", "spring boot",
                "sql", "mysql", "postgresql", "mongodb", "docker", "kubernetes",
                "aws", "azure", "git", "ci/cd", "jenkins", "html", "css",
                "node.js", "express", "angular", "vue", "typescript", "redis",
                "kafka", "rabbitmq", "elasticsearch", "graphql", "rest api",
                "microservices", "system design", "data structures", "algorithms",
                "machine learning", "deep learning", "tensorflow", "pytorch",
                "linux", "bash", "nginx", "apache", "terraform", "ansible"
        };

        List<String> requiredSkills = new ArrayList<>();
        for (String skill : commonSkills) {
            if (jd.contains(skill)) {
                requiredSkills.add(skill);
            }
        }

        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String req : requiredSkills) {
            boolean hasSkill = userSkillNames.stream().anyMatch(s -> s.contains(req) || req.contains(s));
            if (hasSkill) {
                matched.add(req);
            } else {
                missing.add(req);
            }
        }

        double matchPercentage = requiredSkills.isEmpty() ? 0 :
                Math.round((double) matched.size() / requiredSkills.size() * 100);

        // Generate course suggestions from missing skills
        List<String> courseSuggestions = missing.stream()
                .map(skill -> skill + " Masterclass - Coursera/Udemy")
                .collect(Collectors.toList());

        // Build feedback message
        String overallFeedback = String.format(
                "You match %.0f%% of required skills for %s at %s. %s",
                matchPercentage,
                request.getTargetRole(),
                request.getTargetCompany(),
                matchPercentage >= 70 ? "Strong candidate!" :
                        matchPercentage >= 40 ? "Good foundation, upskill in missing areas." :
                                "Significant gaps found. Focus on core skills first."
        );

        // Save analysis to database (keep as strings for DB)
        String matchedStr = String.join(",", matched);
        String missingStr = String.join(",", missing);
        String coursesStr = String.join(",", courseSuggestions);

        SkillGapAnalysis analysis = new SkillGapAnalysis();
        analysis.setUser(user);
        analysis.setTargetRole(request.getTargetRole());
        analysis.setTargetCompany(request.getTargetCompany());
        analysis.setJobDescription(request.getJobDescription());
        analysis.setMatchPercentage(matchPercentage);
        analysis.setMatchedSkills(matchedStr);
        analysis.setMissingSkills(missingStr);
        analysis.setSuggestedCourses(coursesStr);
        analysis.setAnalysisDate(LocalDateTime.now());
        skillGapAnalysisRepository.save(analysis);

        // Build response with ARRAYS (not strings)
        SkillGapAnalysisResponse response = new SkillGapAnalysisResponse();
        response.setTargetRole(request.getTargetRole());
        response.setTargetCompany(request.getTargetCompany());
        response.setMatchPercentage(matchPercentage);
        response.setMatchedSkills(matched);              // ✅ List<String>
        response.setMissingSkills(missing);              // ✅ List<String>
        response.setSuggestedCourses(courseSuggestions); // ✅ List<String>
        response.setOverallFeedback(overallFeedback);

        return response;
    }
}
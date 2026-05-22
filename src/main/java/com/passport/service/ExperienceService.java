package com.passport.service;

import com.passport.dto.request.ExperienceRequest;
import com.passport.dto.response.ExperienceResponse;

import java.util.List;

public interface ExperienceService {
    ExperienceResponse addExperience(Long userId, ExperienceRequest request);
    List<ExperienceResponse> getUserExperiences(Long userId);
    ExperienceResponse updateExperience(Long userId, Long experienceId, ExperienceRequest request);
    void deleteExperience(Long userId, Long experienceId);
}
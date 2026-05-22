package com.passport.service;

import com.passport.dto.request.EducationRequest;
import com.passport.dto.response.EducationResponse;

import java.util.List;

public interface EducationService {
    EducationResponse addEducation(Long userId, EducationRequest request);
    List<EducationResponse> getUserEducations(Long userId);
    EducationResponse updateEducation(Long userId, Long educationId, EducationRequest request);
    void deleteEducation(Long userId, Long educationId);
}
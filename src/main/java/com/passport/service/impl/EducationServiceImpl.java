package com.passport.service.impl;

import com.passport.dto.request.EducationRequest;
import com.passport.dto.response.EducationResponse;
import com.passport.model.Education;
import com.passport.model.User;
import com.passport.repository.EducationRepository;
import com.passport.repository.UserRepository;
import com.passport.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public EducationResponse addEducation(Long userId, EducationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Education education = new Education();
        education.setUser(user);
        education.setInstitution(request.getInstitution());
        education.setDegree(request.getDegree());
        education.setFieldOfStudy(request.getFieldOfStudy());
        education.setStartDate(request.getStartDate());
        education.setEndDate(request.getEndDate());
        education.setGrade(request.getGrade());
        education.setIsVisible(request.getIsVisible() != null ? request.getIsVisible() : true);

        Education saved = educationRepository.save(education);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationResponse> getUserEducations(Long userId) {
        return educationRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EducationResponse updateEducation(Long userId, Long educationId, EducationRequest request) {
        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        if (!education.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getInstitution() != null) education.setInstitution(request.getInstitution());
        if (request.getDegree() != null) education.setDegree(request.getDegree());
        if (request.getFieldOfStudy() != null) education.setFieldOfStudy(request.getFieldOfStudy());
        if (request.getStartDate() != null) education.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) education.setEndDate(request.getEndDate());
        if (request.getGrade() != null) education.setGrade(request.getGrade());
        if (request.getIsVisible() != null) education.setIsVisible(request.getIsVisible());

        Education updated = educationRepository.save(education);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteEducation(Long userId, Long educationId) {
        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        if (!education.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        educationRepository.delete(education);
    }

    private EducationResponse mapToResponse(Education e) {
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
}
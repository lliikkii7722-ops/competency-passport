package com.passport.service;

import com.passport.dto.request.SkillRequest;
import com.passport.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {
    SkillResponse addSkill(Long userId, SkillRequest request);
    List<SkillResponse> getUserSkills(Long userId);
    SkillResponse updateSkill(Long userId, Long skillId, SkillRequest request);
    void deleteSkill(Long userId, Long skillId);
}
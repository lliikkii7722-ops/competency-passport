package com.passport.service;

import com.passport.dto.request.SkillGapAnalysisRequest;
import com.passport.dto.response.SkillGapAnalysisResponse;

public interface SkillGapService {
    SkillGapAnalysisResponse analyzeSkillGap(Long userId, SkillGapAnalysisRequest request);
}
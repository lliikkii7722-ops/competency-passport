package com.passport.dto.request;

import lombok.Data;

@Data
public class SkillGapAnalysisRequest {
    private String targetRole;
    private String targetCompany;
    private String jobDescription;
}
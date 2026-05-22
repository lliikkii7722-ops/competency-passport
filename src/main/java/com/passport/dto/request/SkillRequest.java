package com.passport.dto.request;

import lombok.Data;

@Data
public class SkillRequest {
    private String skillName;
    private String category;
    private Integer proficiencyLevel;
    private String source;
}
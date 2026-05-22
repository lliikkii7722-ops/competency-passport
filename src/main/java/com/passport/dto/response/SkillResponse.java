package com.passport.dto.response;

import lombok.Data;

@Data
public class SkillResponse {
    private Long id;
    private String skillName;
    private String category;
    private Integer proficiencyLevel;
    private String source;
    private Boolean isVerified;
}
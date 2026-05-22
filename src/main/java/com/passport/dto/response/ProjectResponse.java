package com.passport.dto.response;

import lombok.Data;

@Data
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String githubUrl;
    private String demoVideoUrl;
    private String liveUrl;
    private Integer starsCount;
    private Integer forksCount;
    private String languageBreakdown;
    private String readmeSummary;
    private Boolean isFeatured;
}
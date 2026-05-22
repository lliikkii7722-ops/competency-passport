package com.passport.dto.request;

import lombok.Data;

@Data
public class ProjectRequest {
    private String title;
    private String description;
    private String technologies;
    private String githubUrl;
    private String demoVideoUrl;
    private String liveUrl;
    private Boolean isFeatured;
}
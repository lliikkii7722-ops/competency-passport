package com.passport.dto.response;

import lombok.Data;

@Data
public class MockInterviewResponse {
    private Long id;
    private String interviewType;
    private String difficulty;
    private String questions;
    private Integer overallScore;
    private String aiFeedback;
    private String completedAt;
}
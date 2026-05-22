package com.passport.dto.request;

import lombok.Data;

@Data
public class MockInterviewRequest {
    private String interviewType;
    private String difficulty;
    private String[] answers;
}
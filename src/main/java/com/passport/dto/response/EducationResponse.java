package com.passport.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EducationResponse {
    private Long id;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private LocalDate startDate;
    private LocalDate endDate;
    private String grade;
    private Boolean isVisible;
}
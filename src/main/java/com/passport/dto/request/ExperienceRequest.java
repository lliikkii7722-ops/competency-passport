package com.passport.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ExperienceRequest {
    private String company;
    private String title;
    private String location;
    private String employmentType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isCurrent;
    private String description;
    private Boolean isVisible;
}
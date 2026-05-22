package com.passport.dto.request;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RecruiterShareRequest {
    private String recruiterEmail;
    private String companyName;
    private LocalDateTime expiryDate;
    private Boolean canDownloadPdf;
    private Boolean canScheduleInterview;
}
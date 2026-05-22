package com.passport.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RecruiterViewResponse {
    private String accessToken;
    private String recruiterEmail;
    private String companyName;
    private Integer viewCount;
    private LocalDateTime expiryDate;
    private Boolean canDownloadPdf;
    private Boolean canScheduleInterview;
    private String status;
}
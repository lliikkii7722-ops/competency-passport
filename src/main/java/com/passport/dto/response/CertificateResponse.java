package com.passport.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CertificateResponse {
    private Long id;
    private String title;
    private String issuer;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String credentialId;
    private String credentialUrl;
    private String fileUrl;
    private String verificationHash;
    private String verificationStatus;
    private String extractedSkills;
    private String skillTags;
}
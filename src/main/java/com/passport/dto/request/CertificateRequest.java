package com.passport.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CertificateRequest {
    private String title;
    private String issuer;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String credentialId;
    private String credentialUrl;
    private String fileUrl;
    private String fileType;
}
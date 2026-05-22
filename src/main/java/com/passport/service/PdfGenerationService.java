package com.passport.service;

public interface PdfGenerationService {
    byte[] generateResumePdf(Long userId);
}
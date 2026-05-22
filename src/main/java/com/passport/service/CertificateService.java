package com.passport.service;

import com.passport.dto.request.CertificateRequest;
import com.passport.dto.response.CertificateResponse;

import java.util.List;

public interface CertificateService {
    CertificateResponse addCertificate(Long userId, CertificateRequest request);
    List<CertificateResponse> getUserCertificates(Long userId);
    CertificateResponse updateCertificate(Long userId, Long certificateId, CertificateRequest request);
    void deleteCertificate(Long userId, Long certificateId);
}
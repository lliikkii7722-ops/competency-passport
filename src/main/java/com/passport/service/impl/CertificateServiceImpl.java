package com.passport.service.impl;

import com.passport.dto.request.CertificateRequest;
import com.passport.dto.response.CertificateResponse;
import com.passport.model.Certificate;
import com.passport.model.User;
import com.passport.repository.CertificateRepository;
import com.passport.repository.UserRepository;
import com.passport.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public CertificateResponse addCertificate(Long userId, CertificateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Certificate certificate = new Certificate();
        certificate.setUser(user);
        certificate.setTitle(request.getTitle());
        certificate.setIssuer(request.getIssuer());
        certificate.setIssueDate(request.getIssueDate());
        certificate.setExpiryDate(request.getExpiryDate());
        certificate.setCredentialId(request.getCredentialId());
        certificate.setCredentialUrl(request.getCredentialUrl());
        certificate.setFileUrl(request.getFileUrl());
        certificate.setFileType(request.getFileType());
        certificate.setVerificationHash(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        certificate.setVerificationStatus(Certificate.VerificationStatus.PENDING);

        Certificate saved = certificateRepository.save(certificate);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CertificateResponse> getUserCertificates(Long userId) {
        return certificateRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CertificateResponse updateCertificate(Long userId, Long certificateId, CertificateRequest request) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        if (!certificate.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getTitle() != null) certificate.setTitle(request.getTitle());
        if (request.getIssuer() != null) certificate.setIssuer(request.getIssuer());
        if (request.getIssueDate() != null) certificate.setIssueDate(request.getIssueDate());
        if (request.getExpiryDate() != null) certificate.setExpiryDate(request.getExpiryDate());
        if (request.getCredentialId() != null) certificate.setCredentialId(request.getCredentialId());
        if (request.getCredentialUrl() != null) certificate.setCredentialUrl(request.getCredentialUrl());
        if (request.getFileUrl() != null) certificate.setFileUrl(request.getFileUrl());
        if (request.getFileType() != null) certificate.setFileType(request.getFileType());

        Certificate updated = certificateRepository.save(certificate);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteCertificate(Long userId, Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        if (!certificate.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        certificateRepository.delete(certificate);
    }

    private CertificateResponse mapToResponse(Certificate c) {
        CertificateResponse r = new CertificateResponse();
        r.setId(c.getId());
        r.setTitle(c.getTitle());
        r.setIssuer(c.getIssuer());
        r.setIssueDate(c.getIssueDate());
        r.setExpiryDate(c.getExpiryDate());
        r.setCredentialId(c.getCredentialId());
        r.setCredentialUrl(c.getCredentialUrl());
        r.setFileUrl(c.getFileUrl());
        r.setVerificationHash(c.getVerificationHash());
        r.setVerificationStatus(c.getVerificationStatus().name());
        r.setExtractedSkills(c.getExtractedSkills());
        r.setSkillTags(c.getSkillTags());
        return r;
    }
}
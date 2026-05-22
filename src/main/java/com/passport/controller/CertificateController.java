package com.passport.controller;

import com.passport.dto.request.CertificateRequest;
import com.passport.dto.response.CertificateResponse;
import com.passport.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping
    public ResponseEntity<CertificateResponse> addCertificate(
            @RequestAttribute("userId") Long userId,
            @RequestBody CertificateRequest request) {
        return ResponseEntity.ok(certificateService.addCertificate(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<CertificateResponse>> getMyCertificates(
            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(certificateService.getUserCertificates(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateResponse> updateCertificate(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id,
            @RequestBody CertificateRequest request) {
        return ResponseEntity.ok(certificateService.updateCertificate(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id) {
        certificateService.deleteCertificate(userId, id);
        return ResponseEntity.ok().build();
    }
}
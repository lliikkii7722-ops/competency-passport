package com.passport.controller;

import com.passport.dto.request.EducationRequest;
import com.passport.dto.response.EducationResponse;
import com.passport.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/education")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @PostMapping
    public ResponseEntity<EducationResponse> addEducation(
            @RequestAttribute("userId") Long userId,
            @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.addEducation(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>> getMyEducations(
            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(educationService.getUserEducations(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationResponse> updateEducation(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id,
            @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.updateEducation(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id) {
        educationService.deleteEducation(userId, id);
        return ResponseEntity.ok().build();
    }
}
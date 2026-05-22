package com.passport.controller;

import com.passport.dto.request.ExperienceRequest;
import com.passport.dto.response.ExperienceResponse;
import com.passport.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experience")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @PostMapping
    public ResponseEntity<ExperienceResponse> addExperience(
            @RequestAttribute("userId") Long userId,
            @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(experienceService.addExperience(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> getMyExperiences(
            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(experienceService.getUserExperiences(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id,
            @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(experienceService.updateExperience(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id) {
        experienceService.deleteExperience(userId, id);
        return ResponseEntity.ok().build();
    }
}
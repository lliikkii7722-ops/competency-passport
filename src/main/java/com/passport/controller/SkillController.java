package com.passport.controller;

import com.passport.dto.request.SkillRequest;
import com.passport.dto.response.SkillResponse;
import com.passport.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillResponse> addSkill(
            @RequestAttribute("userId") Long userId,
            @RequestBody SkillRequest request) {
        return ResponseEntity.ok(skillService.addSkill(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getMySkills(
            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(skillService.getUserSkills(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> updateSkill(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id,
            @RequestBody SkillRequest request) {
        return ResponseEntity.ok(skillService.updateSkill(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id) {
        skillService.deleteSkill(userId, id);
        return ResponseEntity.ok().build();
    }
}
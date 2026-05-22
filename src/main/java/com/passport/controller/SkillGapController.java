package com.passport.controller;

import com.passport.dto.request.SkillGapAnalysisRequest;
import com.passport.dto.response.SkillGapAnalysisResponse;
import com.passport.service.SkillGapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class SkillGapController {

    @Autowired
    private SkillGapService skillGapService;

    @PostMapping("/skill-gap")
    public ResponseEntity<SkillGapAnalysisResponse> analyzeSkillGap(
            @RequestAttribute("userId") Long userId,
            @RequestBody SkillGapAnalysisRequest request) {
        return ResponseEntity.ok(skillGapService.analyzeSkillGap(userId, request));
    }
}
package com.passport.controller;

import com.passport.dto.response.PublicProfileResponse;
import com.passport.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")   // ← CHANGED from "/api/public"
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{slug}")
    public ResponseEntity<PublicProfileResponse> getPublicProfile(@PathVariable String slug) {
        return ResponseEntity.ok(userService.getPublicProfile(slug));
    }
}
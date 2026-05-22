package com.passport.controller;

import com.passport.dto.request.ProfileUpdateRequest;
import com.passport.model.User;
import com.passport.repository.UserRepository;
import com.passport.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtils.getUsernameFromJwtToken(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(toProfileResponse(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ProfileUpdateRequest request) {

        String token = authHeader.substring(7);
        String email = jwtUtils.getUsernameFromJwtToken(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getHeadline() != null) user.setHeadline(request.getHeadline());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getSummary() != null) user.setSummary(request.getSummary());
        if (request.getGithubUsername() != null) user.setGithubUsername(request.getGithubUsername());
        if (request.getLeetcodeUsername() != null) user.setLeetcodeUsername(request.getLeetcodeUsername());
        if (request.getLinkedinId() != null) user.setLinkedinId(request.getLinkedinId());
        if (request.getIsProfilePublic() != null) user.setIsProfilePublic(request.getIsProfilePublic());

        if (user.getPublicSlug() == null || user.getPublicSlug().isBlank()) {
            String name = user.getFullName() != null ? user.getFullName() : "user";

            String slug = name.toLowerCase()
                    .replaceAll("[^a-z0-9]+", "-")
                    .replaceAll("(^-|-$)", "");

            user.setPublicSlug(slug + "-" + user.getId());
        }

        User updated = userRepository.save(user);
        return ResponseEntity.ok(toProfileResponse(updated));
    }

    private Map<String, Object> toProfileResponse(User user) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("headline", user.getHeadline());
        response.put("phone", user.getPhone());
        response.put("location", user.getLocation());
        response.put("summary", user.getSummary());
        response.put("githubUsername", user.getGithubUsername());
        response.put("linkedinId", user.getLinkedinId());
        response.put("leetcodeUsername", user.getLeetcodeUsername());
        response.put("profileImageUrl", user.getProfileImageUrl());
        response.put("publicSlug", user.getPublicSlug());
        response.put("isProfilePublic", user.getIsProfilePublic());
        response.put("atsScoreOverall", user.getAtsScoreOverall());

        return response;
    }
}
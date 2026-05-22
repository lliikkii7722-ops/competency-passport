package com.passport.dto.request;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String fullName;
    private String headline;
    private String phone;
    private String location;
    private String summary;
    private String githubUsername;
    private String leetcodeUsername;
    private String linkedinId;  // ✅ ADDED
    private Boolean isProfilePublic;
}
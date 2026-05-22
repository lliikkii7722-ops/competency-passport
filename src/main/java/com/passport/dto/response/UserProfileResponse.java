package com.passport.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class UserProfileResponse {
    private Long id;
    private String email;
    private String fullName;
    private String headline;
    private String phone;
    private String location;
    private String summary;
    private String profileImageUrl;
    private String publicSlug;
    private Boolean isProfilePublic;
    private Integer atsScoreOverall;
    private String githubUsername;
    private String leetcodeUsername;

    private List<EducationResponse> educations;
    private List<ExperienceResponse> experiences;
    private List<SkillResponse> skills;
    private List<CertificateResponse> certificates;
    private List<ProjectResponse> projects;
    private UserPointsResponse userPoints;
    private List<BadgeResponse> badges;
}
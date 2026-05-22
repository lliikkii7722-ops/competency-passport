package com.passport.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class PublicProfileResponse {
    private String fullName;
    private String headline;
    private String location;
    private String summary;
    private String profileImageUrl;
    private Integer atsScoreOverall;

    private List<EducationResponse> educations;
    private List<ExperienceResponse> experiences;
    private List<SkillResponse> skills;
    private List<ProjectResponse> projects;
    private List<CertificateResponse> certificates;
    private List<CodingStatsResponse> codingStats;
    private UserPointsResponse userPoints;
    private List<BadgeResponse> badges;
}
package com.passport.dto.response;

import java.util.List;

public class SkillGapAnalysisResponse {
    private String targetRole;
    private String targetCompany;
    private Double matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> suggestedCourses;
    private String overallFeedback;

    // Getters and Setters
    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getTargetCompany() {
        return targetCompany;
    }

    public void setTargetCompany(String targetCompany) {
        this.targetCompany = targetCompany;
    }

    public Double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getSuggestedCourses() {
        return suggestedCourses;
    }

    public void setSuggestedCourses(List<String> suggestedCourses) {
        this.suggestedCourses = suggestedCourses;
    }

    public String getOverallFeedback() {
        return overallFeedback;
    }

    public void setOverallFeedback(String overallFeedback) {
        this.overallFeedback = overallFeedback;
    }
}
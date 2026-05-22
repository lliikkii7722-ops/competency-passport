package com.passport.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recruiter_views")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterView extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String recruiterEmail;
    private String companyName;

    @Column(unique = true)
    private String accessToken;

    private Integer viewCount = 0;
    private LocalDateTime lastViewed;
    private LocalDateTime expiryDate;

    private Boolean canDownloadPdf = true;
    private Boolean canScheduleInterview = false;

    @Column(length = 1000)
    private String notes;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, SHORTLISTED, REJECTED, HIRED
    }

    // Manual getters/setters
    public Long getId() {
        return super.getId();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRecruiterEmail() {
        return recruiterEmail;
    }

    public void setRecruiterEmail(String recruiterEmail) {
        this.recruiterEmail = recruiterEmail;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public LocalDateTime getLastViewed() {
        return lastViewed;
    }

    public void setLastViewed(LocalDateTime lastViewed) {
        this.lastViewed = lastViewed;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Boolean getCanDownloadPdf() {
        return canDownloadPdf;
    }

    public void setCanDownloadPdf(Boolean canDownloadPdf) {
        this.canDownloadPdf = canDownloadPdf;
    }

    public Boolean getCanScheduleInterview() {
        return canScheduleInterview;
    }

    public void setCanScheduleInterview(Boolean canScheduleInterview) {
        this.canScheduleInterview = canScheduleInterview;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
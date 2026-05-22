package com.passport.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPoints extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer totalPoints = 0;
    private Integer codingPoints = 0;
    private Integer certPoints = 0;
    private Integer profilePoints = 0;
    private Integer level = 1;
    private String title = "Novice";

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

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Integer getCodingPoints() {
        return codingPoints;
    }

    public void setCodingPoints(Integer codingPoints) {
        this.codingPoints = codingPoints;
    }

    public Integer getCertPoints() {
        return certPoints;
    }

    public void setCertPoints(Integer certPoints) {
        this.certPoints = certPoints;
    }

    public Integer getProfilePoints() {
        return profilePoints;
    }

    public void setProfilePoints(Integer profilePoints) {
        this.profilePoints = profilePoints;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
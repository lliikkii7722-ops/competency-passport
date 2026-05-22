package com.passport.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "peer_benchmarks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeerBenchmark extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer batchYear;
    private String department;
    private String college;

    private String skillPercentiles;

    private Integer overallPercentile;
    private Integer rankInBatch;
    private Integer totalPeers;

    private LocalDateTime lastCalculated;

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

    public Integer getBatchYear() {
        return batchYear;
    }

    public void setBatchYear(Integer batchYear) {
        this.batchYear = batchYear;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getSkillPercentiles() {
        return skillPercentiles;
    }

    public void setSkillPercentiles(String skillPercentiles) {
        this.skillPercentiles = skillPercentiles;
    }

    public Integer getOverallPercentile() {
        return overallPercentile;
    }

    public void setOverallPercentile(Integer overallPercentile) {
        this.overallPercentile = overallPercentile;
    }

    public Integer getRankInBatch() {
        return rankInBatch;
    }

    public void setRankInBatch(Integer rankInBatch) {
        this.rankInBatch = rankInBatch;
    }

    public Integer getTotalPeers() {
        return totalPeers;
    }

    public void setTotalPeers(Integer totalPeers) {
        this.totalPeers = totalPeers;
    }

    public LocalDateTime getLastCalculated() {
        return lastCalculated;
    }

    public void setLastCalculated(LocalDateTime lastCalculated) {
        this.lastCalculated = lastCalculated;
    }
}
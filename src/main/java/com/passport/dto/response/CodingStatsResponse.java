package com.passport.dto.response;

import lombok.Data;

@Data
public class CodingStatsResponse {
    private String platform;
    private String username;
    private Integer totalSolved;
    private Integer easySolved;
    private Integer mediumSolved;
    private Integer hardSolved;
    private Integer ranking;
    private Integer contestRating;
    private Double acceptanceRate;
}
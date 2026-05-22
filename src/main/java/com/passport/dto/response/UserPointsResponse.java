package com.passport.dto.response;

import lombok.Data;

@Data
public class UserPointsResponse {
    private Integer totalPoints;
    private Integer codingPoints;
    private Integer certPoints;
    private Integer profilePoints;
    private Integer level;
    private String title;
}
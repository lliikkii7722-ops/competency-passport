package com.passport.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BadgeResponse {
    private Long id;
    private String name;
    private String description;
    private String iconUrl;
    private String category;
    private String rarity;
    private Integer points;
    private LocalDateTime earnedAt;
}
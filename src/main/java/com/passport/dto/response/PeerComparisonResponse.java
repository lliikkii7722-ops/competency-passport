package com.passport.dto.response;

import lombok.Data;

@Data
public class PeerComparisonResponse {
    private Integer overallPercentile;
    private Integer rankInBatch;
    private Integer totalPeers;
    private String skillPercentiles;
    private String lastCalculated;
}
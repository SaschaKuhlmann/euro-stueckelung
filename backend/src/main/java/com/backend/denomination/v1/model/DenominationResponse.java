package com.backend.denomination.v1.model;

import java.util.List;
import java.util.Map;

public record DenominationResponse(long newValue, Map<Integer, Integer> breakdown,
        List<BreakdownRow> difference) {
}

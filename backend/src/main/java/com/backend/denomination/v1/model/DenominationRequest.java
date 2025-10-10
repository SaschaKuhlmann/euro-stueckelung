package com.backend.denomination.v1.model;

import java.util.Map;

public record DenominationRequest(long value, Map<Integer, Integer> oldBreakdown) {
}

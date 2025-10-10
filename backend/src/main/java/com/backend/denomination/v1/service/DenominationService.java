package com.backend.denomination.v1.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.backend.denomination.v1.model.BreakdownRow;
import com.backend.denomination.v1.model.DenominationRequest;
import com.backend.denomination.v1.model.DenominationResponse;

@Service
public class DenominationService {
    private static final int[] DENOMINATIONS =
            {20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1};

    public DenominationResponse calculate(DenominationRequest request) {
        Map<Integer, Integer> newBreakdown = calculateBreakdown(request.value());
        List<BreakdownRow> difference = calculateDifference(request.oldBreakdown(), newBreakdown);
        return new DenominationResponse(request.value(), newBreakdown, difference);
    }

    private Map<Integer, Integer> calculateBreakdown(long amountInCent) {
        long remaining = amountInCent;
        Map<Integer, Integer> breakdown = new LinkedHashMap<>();
        for (int denom : DENOMINATIONS) {
            int count = (int) (remaining / denom);
            breakdown.put(denom, count);
            remaining -= (long) count * denom;
        }
        return breakdown;
    }

    private List<BreakdownRow> calculateDifference(Map<Integer, Integer> oldBreakdown,
            Map<Integer, Integer> newBreakdown) {
        List<BreakdownRow> diff = new ArrayList<>();
        for (int denom : DENOMINATIONS) {
            int oldVal = oldBreakdown.getOrDefault(denom, 0);
            int newVal = newBreakdown.getOrDefault(denom, 0);
            if (oldVal == 0 && newVal == 0)
                continue;
            diff.add(new BreakdownRow(denom, newVal - oldVal));
        }
        return diff;
    }
}

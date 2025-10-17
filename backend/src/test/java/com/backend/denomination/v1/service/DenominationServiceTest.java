package com.backend.denomination.v1.service;

import com.backend.denomination.v1.model.BreakdownRow;
import com.backend.denomination.v1.model.DenominationRequest;
import com.backend.denomination.v1.model.DenominationResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DenominationServiceTest {
    private DenominationService denominationService;

    @BeforeEach
    void setUp() {
        denominationService = new DenominationService();
    }

    @Test
    void testCalculate_withSimpleValue() {

        Map<Integer, Integer> oldBreakdown = new LinkedHashMap<>();
        DenominationRequest request = new DenominationRequest(4532, oldBreakdown);

        DenominationResponse response = denominationService.calculate(request);

        assertThat(response.newValue()).isEqualTo(4532);

        assertThat(response.breakdown().get(20000)).isEqualTo(0);
        assertThat(response.breakdown().get(10000)).isEqualTo(0);
        assertThat(response.breakdown().get(5000)).isEqualTo(0);
        assertThat(response.breakdown().get(2000)).isEqualTo(2);
        assertThat(response.breakdown().get(1000)).isEqualTo(0);
        assertThat(response.breakdown().get(500)).isEqualTo(1);
        assertThat(response.breakdown().get(200)).isEqualTo(0);
        assertThat(response.breakdown().get(100)).isEqualTo(0);
        assertThat(response.breakdown().get(50)).isEqualTo(0);
        assertThat(response.breakdown().get(20)).isEqualTo(1);
        assertThat(response.breakdown().get(10)).isEqualTo(1);
        assertThat(response.breakdown().get(5)).isEqualTo(0);
        assertThat(response.breakdown().get(2)).isEqualTo(1);
        assertThat(response.breakdown().get(1)).isEqualTo(0);

        List<BreakdownRow> diff = response.difference();
        assertThat(diff).extracting(BreakdownRow::denomination, BreakdownRow::value)
                .containsExactly(tuple(2000, 2), tuple(500, 1), tuple(20, 1), tuple(10, 1),
                        tuple(2, 1));
    }

    @Test
    void testCalculate_withExistingBreakdown() {

        Map<Integer, Integer> oldBreakdown = new LinkedHashMap<>();
        oldBreakdown.put(20000, 0);
        oldBreakdown.put(10000, 0);
        oldBreakdown.put(5000, 0);
        oldBreakdown.put(2000, 2);
        oldBreakdown.put(1000, 0);
        oldBreakdown.put(500, 1);
        oldBreakdown.put(200, 0);
        oldBreakdown.put(100, 0);
        oldBreakdown.put(50, 0);
        oldBreakdown.put(20, 1);
        oldBreakdown.put(10, 1);
        oldBreakdown.put(5, 0);
        oldBreakdown.put(2, 1);
        oldBreakdown.put(1, 0);
        DenominationRequest request = new DenominationRequest(23423, oldBreakdown);

        DenominationResponse response = denominationService.calculate(request);

        assertThat(response.newValue()).isEqualTo(23423);

        assertThat(response.breakdown().get(20000)).isEqualTo(1);
        assertThat(response.breakdown().get(10000)).isEqualTo(0);
        assertThat(response.breakdown().get(5000)).isEqualTo(0);
        assertThat(response.breakdown().get(2000)).isEqualTo(1);
        assertThat(response.breakdown().get(1000)).isEqualTo(1);
        assertThat(response.breakdown().get(500)).isEqualTo(0);
        assertThat(response.breakdown().get(200)).isEqualTo(2);
        assertThat(response.breakdown().get(100)).isEqualTo(0);
        assertThat(response.breakdown().get(50)).isEqualTo(0);
        assertThat(response.breakdown().get(20)).isEqualTo(1);
        assertThat(response.breakdown().get(10)).isEqualTo(0);
        assertThat(response.breakdown().get(5)).isEqualTo(0);
        assertThat(response.breakdown().get(2)).isEqualTo(1);
        assertThat(response.breakdown().get(1)).isEqualTo(1);

        List<BreakdownRow> diff = response.difference();
        assertThat(diff).extracting(BreakdownRow::denomination, BreakdownRow::value)
                .containsExactly(tuple(20000, 1), tuple(2000, -1), tuple(1000, 1), tuple(500, -1),
                        tuple(200, 2), tuple(20, 0), tuple(10, -1), tuple(2, 0), tuple(1, 1));
    }

    @Test
    void testCalculate_withZeroValue() {
        Map<Integer, Integer> oldBreakdown = new LinkedHashMap<>();
        DenominationRequest request = new DenominationRequest(0, oldBreakdown);

        DenominationResponse response = denominationService.calculate(request);

        assertThat(response.newValue()).isZero();
        assertThat(response.breakdown().values()).allMatch(v -> v == 0);
        assertThat(response.difference()).isEmpty();
    }
}

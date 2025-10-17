package com.backend.denomination.v1.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Map;

import com.backend.denomination.v1.model.BreakdownRow;
import com.backend.denomination.v1.model.DenominationRequest;
import com.backend.denomination.v1.model.DenominationResponse;
import com.backend.denomination.v1.service.DenominationService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(DenominationController.class)
@Import(com.backend.config.SecurityConfig.class)
class DenominationControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockitoBean
        private DenominationService denominationService;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        @WithMockUser
        void testCalculateEndpoint() throws Exception {
                Map<Integer, Integer> breakdown = Map.of(2000, 2, 500, 1);
                List<BreakdownRow> difference =
                                List.of(new BreakdownRow(2000, 2), new BreakdownRow(500, 1));
                DenominationResponse mockResponse =
                                new DenominationResponse(4532L, breakdown, difference);

                given(denominationService.calculate(any(DenominationRequest.class)))
                                .willReturn(mockResponse);

                DenominationRequest request = new DenominationRequest(4532L, Map.of());
                String json = objectMapper.writeValueAsString(request);

                mockMvc.perform(post("/api/public/denomination/v1")
                                .contentType(MediaType.APPLICATION_JSON).content(json))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.newValue").value(4532))
                                .andExpect(jsonPath("$.breakdown['2000']").value(2))
                                .andExpect(jsonPath("$.difference[0].denomination").value(2000))
                                .andExpect(jsonPath("$.difference[0].value").value(2));
        }
}

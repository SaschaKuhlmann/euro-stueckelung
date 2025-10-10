package com.backend.denomination.v1.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.backend.denomination.v1.model.DenominationRequest;
import com.backend.denomination.v1.model.DenominationResponse;
import com.backend.denomination.v1.service.DenominationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/denomination/v1")
public class DenominationController {
    private final DenominationService denominationService;

    public DenominationController(DenominationService denominationService) {
        this.denominationService = denominationService;
    }

    @PostMapping()
    public DenominationResponse calculate(@RequestBody DenominationRequest request) {
        return denominationService.calculate(request);
    }
}

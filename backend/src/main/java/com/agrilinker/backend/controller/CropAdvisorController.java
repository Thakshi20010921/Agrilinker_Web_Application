package com.agrilinker.backend.controller;

import com.agrilinker.backend.dto.RecommendationRequest;
import com.agrilinker.backend.dto.RecommendationResponse;
import com.agrilinker.backend.service.CropAdvisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/advisor")
@CrossOrigin(origins = "http://localhost:3000") // Frontend port එක
public class CropAdvisorController {

    @Autowired
    private CropAdvisorService advisorService;

    @PostMapping("/analyze")
    public ResponseEntity<RecommendationResponse> getRecommendation(@RequestBody RecommendationRequest request) {
        return ResponseEntity.ok(advisorService.getAnalysis(request));
    }
}
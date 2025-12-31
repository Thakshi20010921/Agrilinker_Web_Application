package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.service.FertilizerService;
import com.agrilinker.backend.dto.FertilizerRecommendationRequest;
import com.agrilinker.backend.dto.FertilizerRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/fertilizers")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    // ✅ Create Fertilizer (with district)
    @PostMapping
    public ResponseEntity<Fertilizer> createFertilizer(@Valid @RequestBody FertilizerRequest request) {
        Fertilizer fertilizer = new Fertilizer(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getUnit(),
                null, // supplierId
                request.getType(),
                request.getCategory(),
                null, // fertilizerCode
                request.getImageUrl(),
                request.getStock(),
                request.getQuantityInside(),
                request.getDistrict() // ✅ new field
        );
        return ResponseEntity.ok(fertilizerService.createFertilizer(fertilizer));
    }

    // ✅ Update Fertilizer (with district)
    @PutMapping("/{id}")
    public ResponseEntity<Fertilizer> updateFertilizer(@PathVariable String id,
            @Valid @RequestBody FertilizerRequest request) {
        Fertilizer updatedFertilizer = new Fertilizer(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getUnit(),
                null,
                request.getType(),
                request.getCategory(),
                null,
                request.getImageUrl(),
                request.getStock(),
                request.getQuantityInside(),
                request.getDistrict() // ✅ new field
        );
        Fertilizer updated = fertilizerService.updateFertilizer(id, updatedFertilizer);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Fertilizer>> getAllFertilizers() {
        return ResponseEntity.ok(fertilizerService.getAllFertilizers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fertilizer> getFertilizerById(@PathVariable String id) {
        Fertilizer fertilizer = fertilizerService.getFertilizerById(id);
        return (fertilizer != null) ? ResponseEntity.ok(fertilizer) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFertilizer(@PathVariable String id) {
        fertilizerService.deleteFertilizer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/recommend")
    public ResponseEntity<String> recommendFertilizer(@Valid @RequestBody FertilizerRecommendationRequest request) {
        String recommendation = getRecommendation(request.getCropType(), request.getSoilType(), request.getGrowthStage());
        return ResponseEntity.ok(recommendation);
    }

    private String getRecommendation(String crop, String soil, String stage) {
        // Simple rule-based recommendations
        if (crop.equalsIgnoreCase("Rice") && soil.equalsIgnoreCase("Clay")) {
            return "Recommended Fertilizers: Urea + Potash";
        } else if (crop.equalsIgnoreCase("Tea") && soil.equalsIgnoreCase("Loamy")) {
            return "Recommended Fertilizers: Nitrogen + Magnesium";
        } else if (crop.equalsIgnoreCase("Coconut") && soil.equalsIgnoreCase("Sandy")) {
            return "Recommended Fertilizers: NPK + Boron";
        } else if (crop.equalsIgnoreCase("Vegetables") && soil.equalsIgnoreCase("Loamy")) {
            return "Recommended Fertilizers: Compost + Nitrogen";
        } else {
            return "No specific recommendation found. Consult agronomist.";
        }
    }
}

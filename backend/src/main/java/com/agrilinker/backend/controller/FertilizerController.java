package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.service.FertilizerService;
import com.agrilinker.backend.dto.FertilizerRecommendationRequest;
import com.agrilinker.backend.dto.FertilizerRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/fertilizers")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    // ======================================================
    // ✅ IMAGE UPLOAD ENDPOINT
    // ======================================================
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            // Accessible image URL
            String imageUrl = "http://localhost:8081/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl);

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Image upload failed: " + e.getMessage());
        }
    }

    // ======================================================
    // ✅ CREATE FERTILIZER (IMAGE URL COMES FROM upload-image)
    // ======================================================
    @PostMapping
    public ResponseEntity<Fertilizer> createFertilizer(
            @Valid @RequestBody FertilizerRequest request) {

        Fertilizer fertilizer = new Fertilizer(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getUnit(),
                null, // supplierId
                request.getType(),
                request.getCategory(),
                null, // fertilizerCode
                request.getImageUrl(), // ✅ saved image URL
                request.getStock(),
                request.getQuantityInside(),
                request.getDistrict()
        );

        return ResponseEntity.ok(
                fertilizerService.createFertilizer(fertilizer)
        );
    }

    // ======================================================
    // ✅ UPDATE FERTILIZER
    // ======================================================
    @PutMapping("/{id}")
    public ResponseEntity<Fertilizer> updateFertilizer(
            @PathVariable String id,
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
                request.getDistrict()
        );

        Fertilizer updated =
                fertilizerService.updateFertilizer(id, updatedFertilizer);

        return (updated != null)
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    // ======================================================
    // ✅ GET ALL FERTILIZERS
    // ======================================================
    @GetMapping
    public ResponseEntity<List<Fertilizer>> getAllFertilizers() {
        return ResponseEntity.ok(
                fertilizerService.getAllFertilizers()
        );
    }

    // ======================================================
    // ✅ GET FERTILIZER BY ID
    // ======================================================
    @GetMapping("/{id}")
    public ResponseEntity<Fertilizer> getFertilizerById(@PathVariable String id) {
        Fertilizer fertilizer =
                fertilizerService.getFertilizerById(id);

        return (fertilizer != null)
                ? ResponseEntity.ok(fertilizer)
                : ResponseEntity.notFound().build();
    }

    // ======================================================
    // ✅ DELETE FERTILIZER
    // ======================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFertilizer(@PathVariable String id) {
        fertilizerService.deleteFertilizer(id);
        return ResponseEntity.noContent().build();
    }

    // ======================================================
    // ✅ FERTILIZER RECOMMENDATION
    // ======================================================
    @PostMapping("/recommend")
    public ResponseEntity<String> recommendFertilizer(
            @Valid @RequestBody FertilizerRecommendationRequest request) {

        String recommendation =
                getRecommendation(
                        request.getCropType(),
                        request.getSoilType(),
                        request.getGrowthStage()
                );

        return ResponseEntity.ok(recommendation);
    }

    private String getRecommendation(String crop, String soil, String stage) {
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

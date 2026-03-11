package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.service.FertilizerService;
//import com.agrilinker.backend.dto.RecommendationRequest;
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
@CrossOrigin(origins = "http://localhost:3000") // connect to frontend
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    
    // ✅ IMAGE UPLOAD ENDPOINT
 
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {

            String projectDir = System.getProperty("user.dir");

            String uploadPath = projectDir.endsWith("backend")
                    ? Paths.get(projectDir, "uploads").toString()
                    : Paths.get(projectDir, "backend", "uploads").toString();

            Path uploadDir = Paths.get(uploadPath);
            Files.createDirectories(uploadDir);

            String extension = file.getOriginalFilename()
                    .substring(file.getOriginalFilename().lastIndexOf("."));

            String fileName = System.currentTimeMillis() + extension;

            Path filePath = uploadDir.resolve(fileName);

            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok("/uploads/" + fileName);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }

    // ✅ CREATE FERTILIZER (With Supplier Email)
 
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
                request.getImageUrl(),
                request.getStock(),
                request.getQuantityInside(),
                request.getDistrict(),
                request.getSupplierEmail() // ✅ Saved from frontend request
        );

        return ResponseEntity.ok(
                fertilizerService.createFertilizer(fertilizer));
    }

   
    // ✅ GET FERTILIZERS BY SUPPLIER EMAIL (For Dashboard)
    
    @GetMapping("/supplier/{email}")
    public ResponseEntity<List<Fertilizer>> getFertilizersBySupplier(@PathVariable String email) {
        List<Fertilizer> list = fertilizerService.getFertilizersBySupplier(email);
        return ResponseEntity.ok(list);
    }

   
    // ✅ UPDATE FERTILIZER
  
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
                request.getDistrict(),
                request.getSupplierEmail() // ✅ Keep the email during update
        );

        Fertilizer updated = fertilizerService.updateFertilizer(id, updatedFertilizer);

        return (updated != null)
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    // ✅ GET ALL FERTILIZERS (For Marketplace)

    @GetMapping
public ResponseEntity<List<Fertilizer>> getAllFertilizers(@RequestParam(required = false) String email) {
    
    return ResponseEntity.ok(fertilizerService.getAllFertilizersForUser(email));
}

    // ✅ GET FERTILIZER BY ID
  
    @GetMapping("/{id}")
    public ResponseEntity<Fertilizer> getFertilizerById(@PathVariable String id) {
        Fertilizer fertilizer = fertilizerService.getFertilizerById(id);

        return (fertilizer != null)
                ? ResponseEntity.ok(fertilizer)
                : ResponseEntity.notFound().build();
    }

   
    // ✅ DELETE FERTILIZER
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFertilizer(@PathVariable String id) {
        fertilizerService.deleteFertilizer(id);
        return ResponseEntity.noContent().build();
    }

    
  
}
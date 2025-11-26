package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fertilizers")
@CrossOrigin(origins = "*")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    @PostMapping
    public ResponseEntity<Fertilizer> createFertilizer(@RequestBody Fertilizer fertilizer) {
        return ResponseEntity.ok(fertilizerService.createFertilizer(fertilizer));
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

    @PutMapping("/{id}")
    public ResponseEntity<Fertilizer> updateFertilizer(@PathVariable String id, @RequestBody Fertilizer fertilizer) {
        Fertilizer updated = fertilizerService.updateFertilizer(id, fertilizer);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFertilizer(@PathVariable String id) {
        fertilizerService.deleteFertilizer(id);
        return ResponseEntity.noContent().build();
    }
}

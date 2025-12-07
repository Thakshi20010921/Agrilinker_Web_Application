package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;

@Service
public class FertilizerServiceImpl implements FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    // Generate Fertilizer Code like CHEM-2025-0001
    private String generateFertilizerCode(String type) {
        String prefix;
        switch (type.toLowerCase()) {
            case "chemical":  prefix = "CHEM"; break;
            case "organic":   prefix = "ORG"; break;
            case "liquid":    prefix = "LIQ"; break;
            case "granular":  prefix = "GRAN"; break;
            case "water-soluble": prefix="WS"; break;
            case "powder": prefix="POW"; break;
            case "slow-release": prefix="SR"; break;
            default: prefix = "FERT"; 
        }

        String year = String.valueOf(Year.now().getValue());
        long count = fertilizerRepository.countByFertilizerCodeStartingWith(prefix + "-" + year);
        String sequence = String.format("%04d", count + 1);

        return prefix + "-" + year + "-" + sequence;
    }

    @Override
    public Fertilizer createFertilizer(Fertilizer fertilizer) {
        if (fertilizer.getFertilizerCode() == null || fertilizer.getFertilizerCode().isEmpty()) {
            fertilizer.setFertilizerCode(generateFertilizerCode(fertilizer.getType()));
        }
        return fertilizerRepository.save(fertilizer);
    }

    @Override
    public List<Fertilizer> getAllFertilizers() {
        return fertilizerRepository.findAll();
    }

    @Override
    public Fertilizer getFertilizerById(String id) {
        return fertilizerRepository.findById(id).orElse(null);
    }

    @Override
    public Fertilizer updateFertilizer(String id, Fertilizer updatedFertilizer) {
        return fertilizerRepository.findById(id)
            .map(fertilizer -> {
                fertilizer.setName(updatedFertilizer.getName());
                fertilizer.setDescription(updatedFertilizer.getDescription());
                fertilizer.setPrice(updatedFertilizer.getPrice());
                fertilizer.setUnit(updatedFertilizer.getUnit());
                fertilizer.setSupplierId(updatedFertilizer.getSupplierId());
                fertilizer.setType(updatedFertilizer.getType());
                fertilizer.setCategory(updatedFertilizer.getCategory());
                fertilizer.setImageUrl(updatedFertilizer.getImageUrl());
                fertilizer.setStock(updatedFertilizer.getStock());
                fertilizer.setQuantityInside(updatedFertilizer.getQuantityInside());
                return fertilizerRepository.save(fertilizer);
            }).orElse(null);
    }

    @Override
    public void deleteFertilizer(String id) {
        fertilizerRepository.deleteById(id);
    }
}

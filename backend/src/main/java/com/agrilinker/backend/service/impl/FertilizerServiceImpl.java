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

    // Fertilizer Code එක Generate කරන ලොජික් එක
    private String generateFertilizerCode(String type) {
        String prefix;
        switch (type.toLowerCase()) {
            case "chemical":  prefix = "CHEM"; break;
            case "organic":   prefix = "ORG"; break;
            case "liquid":    prefix = "LIQ"; break;
            case "granular":  prefix = "GRAN"; break;
            case "powder":    prefix = "POW"; break;
            default: prefix = "FERT"; 
        }

        String year = String.valueOf(Year.now().getValue());
        long count = fertilizerRepository.countByFertilizerCodeStartingWith(prefix + "-" + year);
        return prefix + "-" + year + "-" + String.format("%04d", count + 1);
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

    // ✅ Dashboard එකට අලුතින් එකතු කරපු Method එක
    @Override
    public List<Fertilizer> getFertilizersBySupplier(String email) {
        return fertilizerRepository.findBySupplierEmail(email);
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
                fertilizer.setType(updatedFertilizer.getType());
                fertilizer.setCategory(updatedFertilizer.getCategory());
                fertilizer.setImageUrl(updatedFertilizer.getImageUrl());
                fertilizer.setStock(updatedFertilizer.getStock());
                fertilizer.setQuantityInside(updatedFertilizer.getQuantityInside());
                fertilizer.setDistrict(updatedFertilizer.getDistrict());
                // ✅ Update කරද්දී Email එක නැති වෙන්න දෙන්න එපා
                fertilizer.setSupplierEmail(updatedFertilizer.getSupplierEmail()); 
                return fertilizerRepository.save(fertilizer);
            }).orElse(null);
    }

    @Override
    public void deleteFertilizer(String id) {
        fertilizerRepository.deleteById(id);
    }
}
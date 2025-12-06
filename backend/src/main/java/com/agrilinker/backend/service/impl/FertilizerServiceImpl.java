package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FertilizerServiceImpl implements FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Override
    public Fertilizer createFertilizer(Fertilizer fertilizer) {
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
                    fertilizer.setCategory(updatedFertilizer.getCategory());
                    fertilizer.setImageUrl(updatedFertilizer.getImageUrl());
                    fertilizer.setStock(updatedFertilizer.getStock());
                    return fertilizerRepository.save(fertilizer);
                })
                .orElse(null);
    }

    @Override
    public void deleteFertilizer(String id) {
        fertilizerRepository.deleteById(id);
    }
}

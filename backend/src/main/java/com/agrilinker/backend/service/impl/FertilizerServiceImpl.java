package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.model.User; // User model omport
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.repository.UserRepository;
import com.agrilinker.backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional; // ✅ Optional error 
import java.util.stream.Collectors;

@Service
public class FertilizerServiceImpl implements FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

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
        fertilizer.setAddedValuePercentage(10.0);
        return fertilizerRepository.save(fertilizer);
    }

    // ✅ logic for discount
    @Override
    public List<Fertilizer> getAllFertilizersForUser(String email) {
        List<Fertilizer> fertilizers = fertilizerRepository.findAll();
        boolean isEligibleForDiscount = false;

        if (email != null && !email.isEmpty()) {
            // handle optional
            Optional<com.agrilinker.backend.model.User> userOptional = userRepository.findByEmail(email); 
            
            if (userOptional.isPresent()) {
                com.agrilinker.backend.model.User user = userOptional.get();
                
                if (user.getRoles() != null) {
                    // ✅ .toString() enum to string convert
                    boolean isFarmer = user.getRoles().stream()
                            .anyMatch(role -> role.toString().toLowerCase().contains("farmer"));
                    
                    // is sell something in marketplace
                    boolean hasSupplied = productRepository.existsByFarmerEmail(email);

                    isEligibleForDiscount = isFarmer && hasSupplied;
                }
            }
        }

        final boolean giveDiscount = isEligibleForDiscount;

        return fertilizers.stream().map(f -> {
            double basePrice = f.getPrice();
            // Discount  (Farmer + Active Seller) 0% markup, othervise 10% markup
            double percentage = giveDiscount ? 0.0 : 10.0;
            
            f.setDisplayPrice(basePrice + (basePrice * percentage / 100));
            return f;
        }).collect(Collectors.toList());
    }

    // ✅ Interface method
    @Override
    public List<Fertilizer> getAllFertilizers() {
        return getAllFertilizersForUser(null);
    }
    @Override
    public List<Fertilizer> getFertilizersBySupplier(String email) {
        return fertilizerRepository.findBySupplierEmail(email).stream().map(f -> {
            double basePrice = f.getPrice();
            double percentage = (f.getAddedValuePercentage() != null) ? f.getAddedValuePercentage() : 10.0;
            f.setDisplayPrice(basePrice + (basePrice * percentage / 100));
            return f;
        }).collect(Collectors.toList());
    }

    @Override
    public Fertilizer getFertilizerById(String id) {
        return fertilizerRepository.findById(id).map(f -> {
            double basePrice = f.getPrice();
            double percentage = (f.getAddedValuePercentage() != null) ? f.getAddedValuePercentage() : 10.0;
            f.setDisplayPrice(basePrice + (basePrice * percentage / 100));
            return f;
        }).orElse(null);
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
                fertilizer.setSupplierEmail(updatedFertilizer.getSupplierEmail()); 
                return fertilizerRepository.save(fertilizer);
            }).orElse(null);
    }

    @Override
    public void deleteFertilizer(String id) {
        fertilizerRepository.deleteById(id);
    }
}
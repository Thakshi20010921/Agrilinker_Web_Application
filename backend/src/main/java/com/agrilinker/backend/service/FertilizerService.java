package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Fertilizer;
import java.util.List;

public interface FertilizerService {
    Fertilizer createFertilizer(Fertilizer fertilizer);
    List<Fertilizer> getAllFertilizers();
    
    // ✅ Dashboard එකට Email එකෙන් Filter කරන්න මේක අලුතින් එකතු කරා
    List<Fertilizer> getFertilizersBySupplier(String email); 
    
    Fertilizer getFertilizerById(String id);
    Fertilizer updateFertilizer(String id, Fertilizer updatedFertilizer);
    void deleteFertilizer(String id);
}
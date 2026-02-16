package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Fertilizer;
import java.util.List;

public interface FertilizerService {
    Fertilizer createFertilizer(Fertilizer fertilizer);
    
    // ✅ පරණ method එකත් තියෙන්න ඕනේ Impl එකේ override එක වැඩ කරන්න
    List<Fertilizer> getAllFertilizers();

    // ✅ Marketplace එකට email එකත් එක්ක ගන්න method එක
    List<Fertilizer> getAllFertilizersForUser(String email);
    
    List<Fertilizer> getFertilizersBySupplier(String email); 
    Fertilizer getFertilizerById(String id);
    Fertilizer updateFertilizer(String id, Fertilizer updatedFertilizer);
    void deleteFertilizer(String id);
}
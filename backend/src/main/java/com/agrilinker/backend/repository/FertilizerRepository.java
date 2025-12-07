package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Fertilizer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FertilizerRepository extends MongoRepository<Fertilizer, String> {

    // ❌ REMOVE findByCategory (category no longer exists)

    // Find fertilizers by supplier
    java.util.List<Fertilizer> findBySupplierId(String supplierId);

    // ✅ Needed for generating codes like CHEM-2025-0001
    long countByFertilizerCodeStartingWith(String prefix);
}

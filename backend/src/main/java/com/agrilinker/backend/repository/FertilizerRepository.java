package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Fertilizer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FertilizerRepository extends MongoRepository<Fertilizer, String> {
    List<Fertilizer> findBySupplierEmail(String supplierEmail); // ✅ Added for Dashboard
    List<Fertilizer> findBySupplierId(String supplierId);
    long countByFertilizerCodeStartingWith(String prefix);
}
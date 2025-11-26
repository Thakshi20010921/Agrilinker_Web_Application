package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Fertilizer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FertilizerRepository extends MongoRepository<Fertilizer, String> {
    List<Fertilizer> findByCategory(String category);
    List<Fertilizer> findBySupplierId(String supplierId);
}

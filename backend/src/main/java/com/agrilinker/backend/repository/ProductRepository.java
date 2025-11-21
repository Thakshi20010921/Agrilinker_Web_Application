package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    // Example custom query (optional):
    // List<Product> findByCategory(String category);
}
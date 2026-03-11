package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

   
boolean existsByFarmerEmail(String farmerEmail);

    List<Product> findByFarmerEmail(String farmerEmail);

}
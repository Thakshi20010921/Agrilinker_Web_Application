package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.ProductInquiry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductInquiryRepository
        extends MongoRepository<ProductInquiry, String> {

    List<ProductInquiry> findByFarmerEmailOrderByCreatedAtDesc(String farmerEmail);

    List<ProductInquiry> findByBuyerEmailOrderByCreatedAtDesc(String buyerEmail);
}
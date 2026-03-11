package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.ProductInquiry;
import com.agrilinker.backend.repository.ProductInquiryRepository;
import com.agrilinker.backend.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InquiryServiceImpl implements InquiryService {

    @Autowired
    private ProductInquiryRepository repository;

    @Override
    public ProductInquiry createInquiry(ProductInquiry inquiry) {

        inquiry.setStatus("OPEN");
        inquiry.setCreatedAt(LocalDateTime.now());

        return repository.save(inquiry);
    }

    @Override
    public List<ProductInquiry> getInquiriesForFarmer(String farmerEmail) {
        return repository.findByFarmerEmailOrderByCreatedAtDesc(farmerEmail);
    }

    @Override
    public List<ProductInquiry> getInquiriesForBuyer(String buyerEmail) {
        return repository.findByBuyerEmailOrderByCreatedAtDesc(buyerEmail);
    }

    @Override
    public ProductInquiry replyToInquiry(String inquiryId, String reply) {

        ProductInquiry inquiry =
                repository.findById(inquiryId).orElseThrow();

        inquiry.setFarmerReply(reply);
        inquiry.setStatus("REPLIED");
        inquiry.setRepliedAt(LocalDateTime.now());

        return repository.save(inquiry);
    }
}
package com.agrilinker.backend.service;

import com.agrilinker.backend.model.ProductInquiry;

import java.util.List;

public interface InquiryService {

    ProductInquiry createInquiry(ProductInquiry inquiry);

    List<ProductInquiry> getInquiriesForFarmer(String farmerEmail);

    List<ProductInquiry> getInquiriesForBuyer(String buyerEmail);

    ProductInquiry replyToInquiry(String inquiryId, String reply);
}
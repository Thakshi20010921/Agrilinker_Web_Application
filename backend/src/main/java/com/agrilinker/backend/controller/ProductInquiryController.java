package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.ProductInquiry;
import com.agrilinker.backend.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin
public class ProductInquiryController {

    @Autowired
    private InquiryService service;

    // Buyer creates inquiry
    @PostMapping
    public ProductInquiry create(@RequestBody ProductInquiry inquiry) {
        return service.createInquiry(inquiry);
    }

    // Farmer views inquiries
    @GetMapping("/farmer/{farmerEmail}")
    public List<ProductInquiry> getForFarmer(
            @PathVariable String farmerEmail) {
        return service.getInquiriesForFarmer(farmerEmail);
    }

    // Buyer views own inquiries
    @GetMapping("/buyer/{buyerEmail}")
    public List<ProductInquiry> getForBuyer(
            @PathVariable String buyerEmail) {
        return service.getInquiriesForBuyer(buyerEmail);
    }

    // Farmer replies
    @PutMapping("/{id}/reply")
    public ProductInquiry reply(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        return service.replyToInquiry(id, body.get("reply"));
    }
}
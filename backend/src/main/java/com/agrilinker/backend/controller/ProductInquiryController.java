package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.ProductInquiry;
import com.agrilinker.backend.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.agrilinker.backend.security.JwtUtil;
import com.agrilinker.backend.security.JwtAuthenticationFilter;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin
public class ProductInquiryController {

    @Autowired
    private JwtUtil jwtUtil;

     @Autowired
    private InquiryService service;
    

    // Buyer creates inquiry
    @PostMapping
    public ProductInquiry create(@RequestBody ProductInquiry inquiry) {
        return service.createInquiry(inquiry);
    }

    @GetMapping("/farmer")
public ResponseEntity<?> getInquiriesForFarmer(
        @RequestHeader(value = "Authorization", required = false) String authHeader) {

    try {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        List<ProductInquiry> inquiries = service.getInquiriesForFarmer(email);

        return ResponseEntity.ok(inquiries);

    } catch (Exception e) {
        e.printStackTrace(); // VERY IMPORTANT - check console
        return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
}


    // Farmer views inquiries
    @GetMapping("/farmer/{farmerEmail}")
    public List<ProductInquiry> getForFarmer(@PathVariable String farmerEmail) {
        return service.getInquiriesForFarmer(farmerEmail);
    }

    // Buyer views own inquiries
    @GetMapping("/buyer/{buyerEmail}")
    public List<ProductInquiry> getForBuyer(
            @PathVariable String buyerEmail) {
        return service.getInquiriesForBuyer(buyerEmail);
    }

    // Farmer replies
    @PutMapping("/{id}/farmerReply")
    public ProductInquiry farmerReply(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        return service.replyToInquiry(id, body.get("farmerReply"));
    }
}
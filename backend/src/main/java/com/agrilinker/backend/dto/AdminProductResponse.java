package com.agrilinker.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminProductResponse {
    private String id;
    private String name;
    private String category;
    private double price;
    private int quantity;
    private String unit;
    private String status;
    private String farmerId;
    private String location;
    private LocalDateTime dateAdded;
}

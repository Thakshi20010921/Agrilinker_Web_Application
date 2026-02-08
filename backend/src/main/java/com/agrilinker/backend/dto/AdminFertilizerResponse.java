package com.agrilinker.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminFertilizerResponse {
    private String id;
    private String name;
    private String type;
    private String category;
    private double price;
    private String unit;
    private Integer stock;
    private String district;
}

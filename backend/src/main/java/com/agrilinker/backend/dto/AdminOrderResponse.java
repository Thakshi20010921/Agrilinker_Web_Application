package com.agrilinker.backend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminOrderResponse {
    private String id;
    private String customerName;
    private String customerEmail;
    private double totalAmount;
    private String paymentMethod;
    private int itemCount;
    private Date orderDate;
}

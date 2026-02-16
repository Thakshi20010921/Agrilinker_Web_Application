package com.agrilinker.backend.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor; // මේකත් දාගන්න එක හොඳයි (Jackson serialization වලට)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FarmerStatsDTO {
    private double totalSales;
    private long totalOrders;
    private double averageOrderValue;
    private int totalProductsSold;
    private double pendingPayments;
}
package com.agrilinker.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardResponse {
    private long totalUsers;
    private long totalFarmers;
    private long totalBuyers;
    private long totalSuppliers;
    private long totalAdmins;
    private long totalProducts;
    private long totalOrders;
    private long totalFertilizers;
}

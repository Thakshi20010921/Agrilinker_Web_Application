package com.agrilinker.backend.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardResponse {
    private long farmers;
    private long buyers;
    private long suppliers;
    private long products;
    private long orders;
}

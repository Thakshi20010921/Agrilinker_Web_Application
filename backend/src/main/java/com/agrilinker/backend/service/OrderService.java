
package com.agrilinker.backend.service;

import com.agrilinker.backend.model.FarmerStatsDTO;
import com.agrilinker.backend.model.Order;
import java.util.List;
import java.util.Map;

public interface OrderService {
    Order createOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getOrdersByUserEmail(String email); // ✅ ADD THIS

    Order getOrderById(String id);

    Order updateOrder(String id, Order order);

    void deleteOrder(String id);

    //farmer
    List<Order> getOrdersByFarmerEmail(String farmerEmail);
    FarmerStatsDTO getFarmerStats(String farmerEmail);
    //List<Map<String, Object>> getPaymentBreakdown(String farmerEmail);
    Map<String, Double> getPaymentBreakdown(String farmerEmail);

}

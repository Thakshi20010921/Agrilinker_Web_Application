
package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Order;
import java.util.List;

public interface OrderService {
    Order createOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getOrdersByUserEmail(String email); // ✅ ADD THIS

    Order getOrderById(String id);

    Order updateOrder(String id, Order order);

    void deleteOrder(String id);
}

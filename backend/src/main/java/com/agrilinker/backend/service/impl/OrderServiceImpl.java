package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Order;
import com.agrilinker.backend.repository.OrderRepository;
import com.agrilinker.backend.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.agrilinker.backend.util.OrderNumberGenerator;
import org.springframework.dao.DuplicateKeyException;

import java.util.List;
import java.util.Optional;
import com.agrilinker.backend.notifications.NotificationSseService;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final NotificationSseService sse;

    @Override
    public Order createOrder(Order order) {

        Order saved;

        if (order.getOrderNumber() == null || order.getOrderNumber().isBlank()) {
            while (true) {
                try {
                    order.setOrderNumber(OrderNumberGenerator.generate());
                    saved = orderRepository.save(order);
                    break;
                } catch (DuplicateKeyException e) {
                    // collision, retry
                }
            }
        } else {
            saved = orderRepository.save(order);
        }

        // ✅ SEND REAL-TIME NOTIFICATION HERE
        sse.sendToUser(saved.getCustomer().getEmail(), Map.of(
                "title", "Order Confirmed 🎉",
                "message", "Order " + saved.getOrderNumber() + " placed successfully."));

        return saved;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(String id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        return optionalOrder.orElse(null);
    }

    @Override
    public Order updateOrder(String id, Order order) {
        Order existingOrder = getOrderById(id);
        if (existingOrder != null) {
            existingOrder.setCustomer(order.getCustomer());
            existingOrder.setItems(order.getItems());
            existingOrder.setTotalAmount(order.getTotalAmount());
            existingOrder.setPaymentMethod(order.getPaymentMethod());
            existingOrder.setOrderDate(order.getOrderDate());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getOrdersByUserEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

}

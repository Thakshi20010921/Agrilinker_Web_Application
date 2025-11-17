package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Order;
import com.agrilinker.backend.repository.OrderRepository;
import com.agrilinker.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
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
            existingOrder.setBuyerId(order.getBuyerId());
            existingOrder.setProductId(order.getProductId());
            existingOrder.setQuantity(order.getQuantity());
            existingOrder.setTotalPrice(order.getTotalPrice());
            existingOrder.setInvoiceId(order.getInvoiceId());
            existingOrder.setOrderDate(order.getOrderDate());
            existingOrder.setPaymentMethod(order.getPaymentMethod());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}

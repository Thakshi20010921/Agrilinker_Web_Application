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
import java.util.Map;
import java.util.HashMap;

import com.agrilinker.backend.notifications.NotificationSseService;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.model.OrderItem;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final NotificationSseService sse;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Order createOrder(Order order) {

        // attach farmer emails to each order item
        for (OrderItem item : order.getItems()) {

            if (item.getProductId() != null && !item.getProductId().isBlank()) {

                Product product = productRepository.findById(item.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                // SAFE farmer email detection

                String farmerEmail = product.getfarmerEmail();

                if (farmerEmail == null || farmerEmail.isBlank()) {

                    // fallback: many systems store owner email differently
                    try {
                        farmerEmail = product.getfarmerEmail(); // if your Product has this
                    } catch (Exception ignored) {
                    }
                }

                System.out.println("Detected farmer email = " + farmerEmail);

                item.setfarmerEmail(farmerEmail);

            }
        }

        Order saved;

        // generate unique order number safely
        if (order.getOrderNumber() == null || order.getOrderNumber().isBlank()) {

            while (true) {
                try {
                    order.setOrderNumber(OrderNumberGenerator.generate());
                    saved = orderRepository.save(order);
                    break;
                } catch (DuplicateKeyException e) {
                    // retry automatically
                }
            }

        } else {
            saved = orderRepository.save(order);
        }

        /*
         * ======================================================
         * 🔔 SEND NOTIFICATION TO CUSTOMER (PRODUCTION FORMAT)
         * ======================================================
         */

        Map<String, Object> customerPayload = new HashMap<>();

        customerPayload.put("title", "Order Confirmed 🎉");
        customerPayload.put("message", "Order " + saved.getOrderNumber() + " placed successfully.");
        customerPayload.put("type", "ORDER");
        customerPayload.put("referenceId", saved.getId());
        customerPayload.put("createdAt", java.time.LocalDateTime.now());

        sse.sendToUser(saved.getCustomer().getEmail(), customerPayload);

        /*
         * ======================================================
         * 🔔 SEND NOTIFICATION TO ALL FARMERS IN THIS ORDER
         * ======================================================
         */

        for (OrderItem item : saved.getItems()) {

            if (item.getfarmerEmail() != null) {

                Map<String, Object> farmerPayload = new HashMap<>();

                farmerPayload.put("title", "New Order Received 🛒");
                farmerPayload.put("message", "You received order " + saved.getOrderNumber());
                farmerPayload.put("type", "ORDER");
                farmerPayload.put("referenceId", saved.getId());
                farmerPayload.put("createdAt", java.time.LocalDateTime.now());

                sse.sendToUser(item.getfarmerEmail(), farmerPayload);
            }
        }

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

    // farmer orders
    @Override
    public List<Order> getOrdersByFarmerEmail(String farmerEmail) {
        return orderRepository.findOrdersByFarmerEmail(farmerEmail);
    }
}

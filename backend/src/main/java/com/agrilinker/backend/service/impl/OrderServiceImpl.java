package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Order;
import com.agrilinker.backend.repository.NotificationRepository;
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
import com.agrilinker.backend.model.Notification;
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.model.Fertilizer;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final NotificationSseService sse;
    private final NotificationRepository notificationRepository;
    private final FertilizerRepository fertilizerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Order createOrder(Order order) {

        // attach farmer emails to each order item
        for (OrderItem item : order.getItems()) {

            if (item.getProductId() != null && !item.getProductId().isBlank()) {

                String farmerEmail = null;

                // Try product first
                Optional<Product> productOpt = productRepository.findById(item.getProductId());

                if (productOpt.isPresent()) {
                    farmerEmail = productOpt.get().getfarmerEmail();
                } else {

                    Optional<Fertilizer> fertOpt = fertilizerRepository.findById(item.getProductId());

                    if (fertOpt.isPresent()) {
                        farmerEmail = fertOpt.get().getSupplierEmail();
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

        Notification customerNotification = Notification.builder()
                .userEmail(saved.getCustomer().getEmail())
                .title("Order Placed ✅")
                .message("Your order #" + saved.getOrderNumber()
                        + " has been placed successfully. The farmer will prepare your items soon.")
                .type("ORDER")
                .referenceId(saved.getId())
                .read(false)
                .createdAt(java.time.LocalDateTime.now())
                .build();

        notificationRepository.save(customerNotification);

        // send realtime SSE
        sse.sendToUser(customerNotification.getUserEmail(), customerNotification);

        /*
         * ======================================================
         * 🔔 SEND NOTIFICATION TO ALL FARMERS IN THIS ORDER
         * ======================================================
         */

        for (OrderItem item : saved.getItems()) {

            if (item.getfarmerEmail() != null && !item.getfarmerEmail().isBlank()) {

                Notification farmerNotification = Notification.builder()
                        .userEmail(item.getfarmerEmail())
                        .title("New Order Alert 📦")
                        .message("A customer placed order #" + saved.getOrderNumber()
                                + ". Please review and prepare the items.")
                        .type("ORDER")
                        .referenceId(saved.getId())
                        .read(false)
                        .createdAt(java.time.LocalDateTime.now())
                        .build();

                notificationRepository.save(farmerNotification);

                // realtime SSE
                sse.sendToUser(farmerNotification.getUserEmail(), farmerNotification);
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

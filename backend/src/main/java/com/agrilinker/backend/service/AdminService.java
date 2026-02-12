package com.agrilinker.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.agrilinker.backend.dto.AdminDashboardResponse;
import com.agrilinker.backend.dto.AdminFertilizerResponse;
import com.agrilinker.backend.dto.AdminOrderResponse;
import com.agrilinker.backend.dto.AdminProductResponse;
import com.agrilinker.backend.dto.AdminUserResponse;
import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.model.Order;
import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.model.User;
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.repository.OrderRepository;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.repository.UserRepository;

@Service
public class AdminService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private OrderRepository orderRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private FertilizerRepository fertilizerRepository;

        // ================= Dashboard =================
        public AdminDashboardResponse getDashboard() {
                List<User> users = userRepository.findAll();

                long totalUsers = users.size();
                long totalFarmers = countRole(users, User.UserRole.FARMER);
                long totalBuyers = countRole(users, User.UserRole.BUYER);
                long totalSuppliers = countRole(users, User.UserRole.FERTILIZERSUPPLIER);
                long totalAdmins = countRole(users, User.UserRole.ADMIN);

                return new AdminDashboardResponse(
                                totalUsers,
                                totalFarmers,
                                totalBuyers,
                                totalSuppliers,
                                totalAdmins,
                                productRepository.count(),
                                orderRepository.count(),
                                fertilizerRepository.count());
        }

        // ================= Users (Latest Registered First) =================
        public List<AdminUserResponse> getUsers() {
                return userRepository
                                .findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                                .stream()
                                .map(user -> new AdminUserResponse(
                                                user.getId(),
                                                user.getFullName(),
                                                user.getEmail(),
                                                user.getRoles(),
                                                user.getTelephone(),
                                                user.getAddress(),
                                                user.getCreatedAt(),
                                                user.getUpdatedAt()))
                                .toList();
        }

        // ================= Orders (Most Recent First) =================
        public List<AdminOrderResponse> getOrders() {
                return orderRepository
                                .findAll(Sort.by(Sort.Direction.DESC, "orderDate"))
                                .stream()
                                .map(order -> new AdminOrderResponse(
                                                order.getId(),
                                                order.getCustomer() != null ? order.getCustomer().getName() : "Unknown",
                                                order.getCustomer() != null ? order.getCustomer().getEmail()
                                                                : "Unknown",
                                                order.getTotalAmount(),
                                                order.getPaymentMethod(),
                                                order.getItems() != null ? order.getItems().size() : 0,
                                                order.getOrderDate()))
                                .toList();
        }

        // ================= Products =================
        public List<AdminProductResponse> getProducts() {
                return productRepository.findAll().stream()
                                .map(this::mapProduct)
                                .toList();
        }

        // ================= Fertilizers =================
        public List<AdminFertilizerResponse> getFertilizers() {
                return fertilizerRepository.findAll().stream()
                                .map(this::mapFertilizer)
                                .toList();
        }

        // ================= Helper Methods =================
        private long countRole(List<User> users, User.UserRole role) {
                return users.stream()
                                .map(User::getRoles)
                                .filter(roles -> roles != null && roles.contains(role))
                                .count();
        }

        private AdminProductResponse mapProduct(Product product) {
                return new AdminProductResponse(
                                product.getid(), // make sure this matches your Product getter
                                product.getName(),
                                product.getCategory(),
                                product.getPrice(),
                                product.getQuantity(),
                                product.getUnit(),
                                product.getStatus(),
                                product.getfarmerEmail(),
                                product.getLocation(),
                                product.getDateAdded());
        }

        private AdminFertilizerResponse mapFertilizer(Fertilizer fertilizer) {
                return new AdminFertilizerResponse(
                                fertilizer.getId(),
                                fertilizer.getName(),
                                fertilizer.getType(),
                                fertilizer.getCategory(),
                                fertilizer.getPrice(),
                                fertilizer.getUnit(),
                                fertilizer.getStock(),
                                fertilizer.getDistrict());
        }
}

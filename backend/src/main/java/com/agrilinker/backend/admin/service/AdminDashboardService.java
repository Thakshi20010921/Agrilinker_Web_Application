package com.agrilinker.backend.admin.service;

import org.springframework.stereotype.Service;

import com.agrilinker.backend.admin.dto.AdminDashboardResponse;
import com.agrilinker.backend.repository.UserRepository;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminDashboardResponse getDashboardStats() {
        return new AdminDashboardResponse(
                userRepository.countByRole("ROLE_FARMER"),
                userRepository.countByRole("ROLE_BUYER"),
                userRepository.countByRole("ROLE_SUPPLIER"),
                productRepository.count(),
                orderRepository.count());
    }
}

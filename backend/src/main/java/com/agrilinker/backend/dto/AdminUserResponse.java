package com.agrilinker.backend.dto;

import java.time.LocalDateTime;
import java.util.Set;

import com.agrilinker.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminUserResponse {
    private String id;
    private String fullName;
    private String email;
    private Set<User.UserRole> roles;
    private String telephone;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

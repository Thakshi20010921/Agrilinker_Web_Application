package com.agrilinker.backend.dto;

import com.agrilinker.backend.model.User.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String fullName;
    private Set<UserRole> roles;
    private String message;

    public AuthResponse(String token, String email, String fullName, Set<UserRole> roles) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
}

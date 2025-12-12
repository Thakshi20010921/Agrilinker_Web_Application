package com.agrilinker.backend.dto;

import com.agrilinker.backend.model.User.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotNull(message = "At least one role is required")
    private Set<UserRole> roles;

    @NotBlank(message = "Telephone number is required")
    @Pattern(
            // Accepts 07XXXXXXXX (10 digits starting with 07) or +947XXXXXXXX (12 chars
            // starting with +94)
            regexp = "^(?:0|\\+94)7\\d{8}$", message = "Invalid Sri Lankan telephone number (use 07XXXXXXXX or +947XXXXXXXX)")
    private String telephone;

    @NotBlank(message = "Address is required")
    private String address;
}

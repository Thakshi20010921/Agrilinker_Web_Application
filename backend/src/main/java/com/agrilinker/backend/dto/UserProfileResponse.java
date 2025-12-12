package com.agrilinker.backend.dto;

import com.agrilinker.backend.model.User.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private String id;
    private String fullName;
    private String email;
    private Set<UserRole> roles;
    private String createdAt;
    private String telephone;
    private String address;
}

package com.agrilinker.backend.model;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = true)
    private String email;

    private String password;

    // MULTI-ROLE SUPPORT
    private Set<UserRole> roles;

    // NEW FIELDS
    private String telephone;
    private String address;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum UserRole {
        BUYER,
        FARMER,
        FERTILIZERSUPPLIER,
        ADMIN
    }
}

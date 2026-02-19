package com.agrilinker.backend.service;

import com.agrilinker.backend.model.User;
import com.agrilinker.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class UserProfileService {

    private final UserRepository userRepo;

    public UserProfileService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User getProfile(String userId) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // NEVER return password
        u.setPassword(null);
        return u;
    }

    public User updateProfile(String userId, User updates) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // ✅ allow only profile fields (safe)
        if (updates.getFullName() != null)
            u.setFullName(updates.getFullName());
        if (updates.getTelephone() != null)
            u.setTelephone(updates.getTelephone());
        if (updates.getAddress() != null)
            u.setAddress(updates.getAddress());

        // do NOT update email / password / roles here
        // email stays same
        // password stays same
        // roles should be admin-only

        u.setUpdatedAt(LocalDateTime.now());

        User saved = userRepo.save(u);
        saved.setPassword(null);
        return saved;
    }
}

package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.User;
import com.agrilinker.backend.service.UserProfileService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public User getProfile(@PathVariable String userId) {
        return profileService.getProfile(userId);
    }

    @PutMapping("/{userId}")
    public User updateProfile(@PathVariable String userId, @RequestBody UpdateProfileRequest req) {
        User updates = new User();
        updates.setFullName(req.fullName);
        updates.setTelephone(req.telephone);
        updates.setAddress(req.address);
        return profileService.updateProfile(userId, updates);
    }

    @Data
    static class UpdateProfileRequest {
        public String fullName;
        public String telephone;
        public String address;
    }
}

package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.User;
import com.agrilinker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users/by-email?email=user@example.com
    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
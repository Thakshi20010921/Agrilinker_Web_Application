package com.agrilinker.backend.service;

import com.agrilinker.backend.model.User;

public interface UserService {
    User findByEmail(String email);
}
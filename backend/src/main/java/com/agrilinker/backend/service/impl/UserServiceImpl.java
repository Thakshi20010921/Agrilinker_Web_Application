package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.User;
import com.agrilinker.backend.repository.UserRepository;
import com.agrilinker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email); // returns Optional<User>
        return userOpt.orElse(null); // return the user if present, else null
    }
}
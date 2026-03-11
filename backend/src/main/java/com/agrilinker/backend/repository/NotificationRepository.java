package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findByUserEmailOrderByCreatedAtDesc(String email);

}

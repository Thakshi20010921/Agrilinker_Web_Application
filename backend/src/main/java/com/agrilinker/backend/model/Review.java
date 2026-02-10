package com.agrilinker.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;

    private String productId; // STRING (matches Product _id)
    private String userId; // ObjectId stored as String
    private int rating; // 1–5
    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();
}

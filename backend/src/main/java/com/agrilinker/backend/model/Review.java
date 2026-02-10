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

    private String productId; // for marketplace
    private String fertilizerId; // ✅ for fertilizers

    private String userId;
    private int rating;
    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();
}

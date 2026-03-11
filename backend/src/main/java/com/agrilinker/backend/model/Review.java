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

    private String productId; // marketplace item id
    private String fertilizerId; // fertilizer item id

    private String userId;
    private int rating;
    private String comment;

    // ✅ AI fields (add these)
    private String sentimentLabel; // POSITIVE / NEGATIVE / NEUTRAL
    private Double sentimentScore; // 0.0 - 1.0

    private LocalDateTime createdAt = LocalDateTime.now();
}

package com.agrilinker.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String userEmail;

    private String title;
    private String message;

    private String type;
    private String referenceId;

    private boolean read;

    private LocalDateTime createdAt;
}
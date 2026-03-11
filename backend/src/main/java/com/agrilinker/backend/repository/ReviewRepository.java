package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByProductId(String productId);

    Optional<Review> findByProductIdAndUserId(String productId, String userId);

    List<Review> findByFertilizerId(String fertilizerId);

    Optional<Review> findByFertilizerIdAndUserId(String fertilizerId, String userId);

}

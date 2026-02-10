package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Fertilizer;
import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.model.Review;
import com.agrilinker.backend.repository.FertilizerRepository;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final ProductRepository productRepo;
    private final FertilizerRepository fertilizerRepo;

    public ReviewService(
            ReviewRepository reviewRepo,
            ProductRepository productRepo,
            FertilizerRepository fertilizerRepo) {
        this.reviewRepo = reviewRepo;
        this.productRepo = productRepo;
        this.fertilizerRepo = fertilizerRepo;
    }

    public Review addReview(Review review) {

        boolean hasProduct = review.getProductId() != null && !review.getProductId().isBlank();
        boolean hasFertilizer = review.getFertilizerId() != null && !review.getFertilizerId().isBlank();

        if (!hasProduct && !hasFertilizer) {
            throw new RuntimeException("Review must have productId or fertilizerId");
        }
        if (hasProduct && hasFertilizer) {
            throw new RuntimeException("Review cannot have both productId and fertilizerId");
        }

        // ✅ Prevent duplicate review
        if (hasProduct) {
            reviewRepo.findByProductIdAndUserId(review.getProductId(), review.getUserId())
                    .ifPresent(r -> {
                        throw new RuntimeException("User already reviewed this product");
                    });
        } else {
            reviewRepo.findByFertilizerIdAndUserId(review.getFertilizerId(), review.getUserId())
                    .ifPresent(r -> {
                        throw new RuntimeException("User already reviewed this fertilizer");
                    });
        }

        Review saved = reviewRepo.save(review);

        // ✅ Update rating summary on Product or Fertilizer
        if (hasProduct) {
            List<Review> reviews = reviewRepo.findByProductId(review.getProductId());

            double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);

            Product product = productRepo.findById(review.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            product.setRatingAvg(Math.round(avg * 10.0) / 10.0);
            product.setRatingCount(reviews.size());
            productRepo.save(product);

        } else {
            List<Review> reviews = reviewRepo.findByFertilizerId(review.getFertilizerId());

            double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);

            Fertilizer fertilizer = fertilizerRepo.findById(review.getFertilizerId())
                    .orElseThrow(() -> new RuntimeException("Fertilizer not found"));

            // ✅ Make sure Fertilizer model has ratingAvg + ratingCount fields + setters
            fertilizer.setRatingAvg(Math.round(avg * 10.0) / 10.0);
            fertilizer.setRatingCount(reviews.size());
            fertilizerRepo.save(fertilizer);
        }

        return saved;
    }

    public List<Review> getReviewsByProduct(String productId) {
        return reviewRepo.findByProductId(productId);
    }

    public List<Review> getReviewsByFertilizer(String fertilizerId) {
        return reviewRepo.findByFertilizerId(fertilizerId);
    }
}

package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.model.Review;
import com.agrilinker.backend.repository.ProductRepository;
import com.agrilinker.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final ProductRepository productRepo;

    public ReviewService(ReviewRepository reviewRepo, ProductRepository productRepo) {
        this.reviewRepo = reviewRepo;
        this.productRepo = productRepo;
    }

    public Review addReview(Review review) {

        // Prevent duplicate review
        reviewRepo.findByProductIdAndUserId(
                review.getProductId(),
                review.getUserId()).ifPresent(r -> {
                    throw new RuntimeException("User already reviewed this product");
                });

        Review saved = reviewRepo.save(review);

        // Update product rating
        List<Review> reviews = reviewRepo.findByProductId(review.getProductId());

        double avg = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        Product product = productRepo.findById(review.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setRatingAvg(Math.round(avg * 10.0) / 10.0);
        product.setRatingCount(reviews.size());

        productRepo.save(product);

        return saved;
    }

    public List<Review> getReviewsByProduct(String productId) {
        return reviewRepo.findByProductId(productId);
    }
}

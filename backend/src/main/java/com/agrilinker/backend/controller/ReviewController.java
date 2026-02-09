package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Review;
import com.agrilinker.backend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviews(@PathVariable String productId) {
        return reviewService.getReviewsByProduct(productId);
    }
}

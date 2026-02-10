package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.Review;
import com.agrilinker.backend.repository.ReviewRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewSummaryController {

    private final ReviewRepository repo;

    public ReviewSummaryController(ReviewRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/summary")
    public Map<String, Object> summary(
            @RequestParam(required = false) String productId,
            @RequestParam(required = false) String fertilizerId) {
        List<Review> reviews;

        if (productId != null && !productId.isBlank()) {
            reviews = repo.findByProductId(productId);
        } else if (fertilizerId != null && !fertilizerId.isBlank()) {
            reviews = repo.findByFertilizerId(fertilizerId);
        } else {
            return Map.of("error", "Pass productId or fertilizerId");
        }

        int total = reviews.size();
        long pos = reviews.stream().filter(r -> "POSITIVE".equals(r.getSentimentLabel())).count();
        long neg = reviews.stream().filter(r -> "NEGATIVE".equals(r.getSentimentLabel())).count();
        long neu = reviews.stream().filter(r -> "NEUTRAL".equals(r.getSentimentLabel())).count();

        int positivePercent = total == 0 ? 0 : (int) Math.round((pos * 100.0) / total);

        String topTheme = topTheme(reviews);
        String topComment = total == 0 ? "" : "Customers love " + topTheme;

        return Map.of(
                "totalReviews", total,
                "positivePercent", positivePercent,
                "breakdown", Map.of("positive", pos, "negative", neg, "neutral", neu),
                "topTheme", topTheme,
                "topComment", topComment);
    }

    private String topTheme(List<Review> reviews) {
        Map<String, List<String>> themes = Map.of(
                "freshness", List.of("fresh", "freshness", "tasty"),
                "delivery", List.of("delivery", "late", "fast"),
                "packaging", List.of("package", "packed", "box", "wrap"),
                "price", List.of("cheap", "expensive", "price", "value"));

        Map<String, Integer> counts = new HashMap<>();
        themes.keySet().forEach(k -> counts.put(k, 0));

        for (Review r : reviews) {
            if (!"POSITIVE".equals(r.getSentimentLabel()))
                continue;
            String text = (r.getComment() == null) ? "" : r.getComment().toLowerCase();

            for (var entry : themes.entrySet()) {
                for (String kw : entry.getValue()) {
                    if (text.contains(kw)) {
                        counts.put(entry.getKey(), counts.get(entry.getKey()) + 1);
                        break;
                    }
                }
            }
        }

        return counts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .filter(e -> e.getValue() > 0)
                .map(Map.Entry::getKey)
                .orElse("quality");
    }
}

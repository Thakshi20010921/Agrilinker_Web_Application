package com.agrilinker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class SentimentService {

    private final WebClient webClient;
    private final String token;
    private final String model;

    public SentimentService(
            WebClient.Builder builder,
            @Value("${huggingface.token:}") String token,
            @Value("${huggingface.model}") String model) {

        // HF router endpoint
        this.webClient = builder.baseUrl("https://router.huggingface.co").build();
        this.token = token;
        this.model = model;
    }

    public SentimentResult analyze(String text) {
        // ✅ NEVER block review creation
        if (text == null || text.isBlank())
            return new SentimentResult("NEUTRAL", 0.0);
        if (token == null || token.isBlank())
            return new SentimentResult("NEUTRAL", 0.0);

        try {
            Map<String, Object> body = Map.of("inputs", text);

            List<List<Map<String, Object>>> res = webClient.post()
                    .uri("/hf-inference/models/" + model)
                    .header("Authorization", "Bearer " + token)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<List<Map<String, Object>>>>() {
                    })
                    .block();

            if (res == null || res.isEmpty() || res.get(0).isEmpty()) {
                return new SentimentResult("NEUTRAL", 0.0);
            }

            Map<String, Object> best = res.get(0).stream()
                    .max(Comparator.comparingDouble(x -> ((Number) x.get("score")).doubleValue()))
                    .orElse(res.get(0).get(0));

            String label = (String) best.get("label");
            double score = ((Number) best.get("score")).doubleValue();

            if (score < 0.60)
                label = "NEUTRAL";
            return new SentimentResult(label, score);

        } catch (Exception e) {
            // ✅ fallback only
            return new SentimentResult("NEUTRAL", 0.0);
        }
    }

    public record SentimentResult(String label, double score) {
    }
}

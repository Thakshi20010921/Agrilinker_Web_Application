package com.agrilinker.backend.service;

import com.agrilinker.backend.dto.RecommendationRequest;
import com.agrilinker.backend.dto.RecommendationResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class CropAdvisorService {

    private final ChatClient chatClient;

    // inject ChatClient which used for chatbot
    public CropAdvisorService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public RecommendationResponse getAnalysis(RecommendationRequest request) {
    // prompt
    String message = String.format(
        "Act as a professional Sri Lankan agronomist. The user provided the crop as: '%s'. " +
        "Even if the spelling is slightly wrong or it's a common name like 'Bandakka', identify it correctly. " +
        "Provide specific fertilizer advice for this crop in %s soil at the %s stage. " +
        "You MUST return ONLY a JSON object with: \"idealFormula\", \"dosage\", \"aiNote\". " +
        "Keep the 'aiNote' helpful and in easy-to-understand English.",
        request.getCropType(), request.getSoilType(), request.getGrowthStage()
    );

    try {
        return chatClient.prompt()
                .user(message)
                .call()
                .entity(RecommendationResponse.class);
    } catch (Exception e) {
        return new RecommendationResponse(
            "Balanced NPK", 
            "Apply based on area", 
            "AI Advice currently unavailable: " + e.getMessage()
        );
    }
}
}
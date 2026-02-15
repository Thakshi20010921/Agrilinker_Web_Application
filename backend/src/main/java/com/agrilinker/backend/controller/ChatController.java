package com.agrilinker.backend.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // React port එකට allow කරන්න
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping("/ask")
    public Map<String, String> askAI(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");

        // මෙතන තමයි chatbot එකට ඔයාගේ project එක ගැන උගන්වන්නේ (System Prompt)
        String systemPrompt = "You are the Agri-Link Official AI Assistant. " +
                            "Help farmers and suppliers with fertilizer information, " +
                            "prices, and agricultural advice. Be professional and helpful.";

        String aiResponse = chatClient.prompt()
                .system(systemPrompt)
                .user(userMessage)
                .call()
                .content();

        return Map.of("reply", aiResponse);
    }
}

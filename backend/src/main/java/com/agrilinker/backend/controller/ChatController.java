package com.agrilinker.backend.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    String mode = payload.get("mode");

    String systemPrompt;
    if ("SYSTEM".equals(mode)) {
        // System Services Mode Prompt
        systemPrompt = "You are the official Agri-Link System Assistant. Your goal is to guide users about our platform: " +
                       "1. We bridge the gap between farmers and buyers for direct trade of fresh vegetables and fruits (No middlemen). " +
                       "2. Users can be Farmers, Buyers, or Fertilizer Suppliers (or all three). " +
                       "3. Special Feature: Registered farmers get EXCLUSIVE DISCOUNTS on fertilizers. " +
                       "4. Others can buy fertilizers at regular prices. " +
                       "5. If they need more help, tell them to use the 'Ask Questions' feature within the system. " +
                       "Keep answers brief and professional.";
    } else {
        // Agriculture Expert Mode Prompt
        systemPrompt = "You are an AI Agriculture Expert. Provide advanced solutions for farming, pest control, and fertilizer use. " +
                       "IMPORTANT: You must start or end your response by stating that this is an 'AI-generated answer' for informational purposes. " +
                       "Tell the user that for more specific expert advice, they can use the 'Ask Questions' option in the Agri-Link system to connect with real experts.";
    }

    // AI එකෙන් response එක ලබා ගැනීම
    String aiContent = chatClient.prompt()
            .system(systemPrompt)
            .user(userMessage)
            .call()
            .content();

    // Frontend එකට JSON එකක් ලෙස යැවීම
    Map<String, String> response = new HashMap<>();
    response.put("reply", aiContent);
    return response;
}
}

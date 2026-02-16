package com.agrilinker.backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiInquiryReplyService {

    private final ChatClient chatClient;

    public AiInquiryReplyService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateContactReply(String customerName, String subject, String customerMessage,
            String preferredMethod) {

        String name = (customerName == null || customerName.isBlank()) ? "there" : customerName.trim();
        String sub = (subject == null || subject.isBlank()) ? "your inquiry" : subject.trim();
        String msg = (customerMessage == null) ? "" : customerMessage.trim();
        String method = (preferredMethod == null || preferredMethod.isBlank()) ? "EMAIL"
                : preferredMethod.trim().toUpperCase();

        String prompt = """
                You are a professional customer support agent for AgriLinker (Sri Lanka agriculture marketplace).

                Write a helpful reply for a customer inquiry.

                Customer name: %s
                Subject: %s
                Preferred contact method: %s
                Customer message: %s

                Requirements:
                - Be polite, clear, and relevant to the message.
                - Ask for missing details only if needed (order ID, product name, payment reference, screenshots).
                - Do NOT promise refunds unless customer already asked and it is clearly appropriate.
                - Keep it short: 6-10 sentences.
                - End with:
                  "Best regards,
                   AgriLinker Support Team"
                """.formatted(name, sub, method, msg);

        String result = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        return result == null ? "" : result.trim();
    }
}

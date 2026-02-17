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
                String method = (preferredMethod == null || preferredMethod.isBlank())
                                ? "EMAIL"
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
                                """
                                .formatted(name, sub, method, msg);

                return callWithRetry(prompt);
        }

        // ✅ Retry once on transient network errors (Connection reset, I/O error, etc.)
        private String callWithRetry(String prompt) {
                int maxAttempts = 2;

                for (int attempt = 1; attempt <= maxAttempts; attempt++) {
                        try {
                                String result = chatClient.prompt()
                                                .user(prompt)
                                                .call()
                                                .content();

                                return result == null ? "" : result.trim();

                        } catch (Exception ex) {
                                if (!isRetryable(ex) || attempt == maxAttempts) {
                                        throw ex; // let controller handle it (500 + message)
                                }

                                // small backoff before retry
                                try {
                                        Thread.sleep(400);
                                } catch (InterruptedException ignored) {
                                        Thread.currentThread().interrupt();
                                }
                        }
                }

                return "";
        }

        private boolean isRetryable(Exception ex) {
                String msg = String.valueOf(ex.getMessage()).toLowerCase();

                return msg.contains("connection reset")
                                || msg.contains("i/o error")
                                || msg.contains("connection prematurely closed")
                                || msg.contains("read timed out")
                                || msg.contains("timeout");
        }
}

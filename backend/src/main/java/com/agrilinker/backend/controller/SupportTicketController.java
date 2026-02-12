// =======================
// 5) SupportTicketController.java
// =======================
package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.SupportTicket;
import com.agrilinker.backend.service.SupportTicketService;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support-tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    // ✅ Buyer creates ticket (buyerEmail is set from logged-in user)
    @PostMapping
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth != null ? auth.getName() : null;

        // If you don't have Spring Security/JWT yet, comment next line and set
        // buyerEmail from frontend
        ticket.setBuyerEmail(email);

        SupportTicket savedTicket = supportTicketService.createTicket(ticket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }

    // ✅ Admin can see all tickets
    @GetMapping
    public ResponseEntity<List<SupportTicket>> getAllTickets() {
        return ResponseEntity.ok(supportTicketService.getAllTickets());
    }

    // ✅ Buyer: view ONLY their tickets
    @GetMapping("/my")
    public ResponseEntity<List<SupportTicket>> getMyTickets() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth != null ? auth.getName() : null;

        if (email == null || email.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(supportTicketService.getTicketsByBuyerEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> getTicketById(@PathVariable String id) {
        SupportTicket ticket = supportTicketService.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SupportTicket> updateStatus(
            @PathVariable String id,
            @RequestBody SupportTicketStatusRequest request) {

        if (request == null || request.getStatus() == null) {
            return ResponseEntity.badRequest().build();
        }

        SupportTicket.Status status;
        try {
            status = SupportTicket.Status.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }

        SupportTicket updatedTicket = supportTicketService.updateStatus(id, status);
        return updatedTicket != null ? ResponseEntity.ok(updatedTicket) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<SupportTicket> addMessage(
            @PathVariable String id,
            @RequestBody SupportTicketMessageRequest request) {

        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        SupportTicket.SupportMessage message = new SupportTicket.SupportMessage(
                null,
                request.getSenderRole(),
                request.getRecipientRole(),
                request.getMessage(),
                LocalDateTime.now());

        SupportTicket updatedTicket = supportTicketService.addMessage(id, message);
        return updatedTicket != null ? ResponseEntity.ok(updatedTicket) : ResponseEntity.notFound().build();
    }

    public static class SupportTicketStatusRequest {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public static class SupportTicketMessageRequest {
        private String senderRole;
        private String recipientRole;
        private String message;

        public String getSenderRole() {
            return senderRole;
        }

        public void setSenderRole(String senderRole) {
            this.senderRole = senderRole;
        }

        public String getRecipientRole() {
            return recipientRole;
        }

        public void setRecipientRole(String recipientRole) {
            this.recipientRole = recipientRole;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}

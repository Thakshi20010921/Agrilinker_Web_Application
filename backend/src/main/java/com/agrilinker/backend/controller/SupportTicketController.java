package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.SupportTicket;
import com.agrilinker.backend.model.SupportTicketNotification;
import com.agrilinker.backend.service.SupportTicketNotificationService;
import com.agrilinker.backend.service.SupportTicketService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support-tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    @Autowired
    private SupportTicketNotificationService notificationService;

    @PostMapping
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        SupportTicket savedTicket = supportTicketService.createTicket(ticket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SupportTicket>> getAllTickets() {
        return ResponseEntity.ok(supportTicketService.getAllTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> getTicketById(@PathVariable String id) {
        SupportTicket ticket = supportTicketService.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<SupportTicket>> getTicketsByBuyer(@PathVariable String buyerId) {
        return ResponseEntity.ok(supportTicketService.getTicketsByBuyerId(buyerId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<SupportTicket>> getTicketsBySeller(@PathVariable String sellerId) {
        return ResponseEntity.ok(supportTicketService.getTicketsBySellerId(sellerId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SupportTicket> updateStatus(
            @PathVariable String id,
            @RequestBody SupportTicketStatusRequest request
    ) {
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
        return updatedTicket != null
                ? ResponseEntity.ok(updatedTicket)
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<SupportTicket> assignSeller(
            @PathVariable String id,
            @RequestBody SupportTicketAssignRequest request
    ) {
        if (request == null || request.getSellerId() == null || request.getSellerId().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SupportTicket updatedTicket = supportTicketService.assignSeller(
                id,
                request.getSellerId(),
                request.getSellerEmail()
        );
        return updatedTicket != null
                ? ResponseEntity.ok(updatedTicket)
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<SupportTicket> addMessage(
            @PathVariable String id,
            @RequestBody SupportTicketMessageRequest request
    ) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SupportTicket.SupportMessage message = new SupportTicket.SupportMessage(
                null,
                request.getSenderRole(),
                request.getRecipientRole(),
                request.getMessage(),
                null
        );
        SupportTicket updatedTicket = supportTicketService.addMessage(id, message);
        return updatedTicket != null
                ? ResponseEntity.ok(updatedTicket)
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/notifications")
    public ResponseEntity<List<SupportTicketNotification>> getNotifications(
            @PathVariable String id
    ) {
        return ResponseEntity.ok(notificationService.getNotificationsByTicketId(id));
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

    public static class SupportTicketAssignRequest {
        private String sellerId;
        private String sellerEmail;

        public String getSellerId() {
            return sellerId;
        }

        public void setSellerId(String sellerId) {
            this.sellerId = sellerId;
        }

        public String getSellerEmail() {
            return sellerEmail;
        }

        public void setSellerEmail(String sellerEmail) {
            this.sellerEmail = sellerEmail;
        }
    }
}

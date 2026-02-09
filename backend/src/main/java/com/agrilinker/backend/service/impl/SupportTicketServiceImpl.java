package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.SupportTicket;
import com.agrilinker.backend.model.SupportTicketNotification;
import com.agrilinker.backend.repository.SupportTicketRepository;
import com.agrilinker.backend.service.SupportTicketService;
import com.agrilinker.backend.service.SupportTicketNotificationService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportTicketServiceImpl implements SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private SupportTicketNotificationService notificationService;

    @Override
    public SupportTicket createTicket(SupportTicket ticket) {
        SupportTicket ticketToSave = ticket;
        if (ticketToSave.getStatus() == null) {
            ticketToSave.setStatus(SupportTicket.Status.OPEN);
        }
        ticketToSave.setCreatedAt(LocalDateTime.now());
        ticketToSave.setUpdatedAt(LocalDateTime.now());
        if (ticketToSave.getMessages() == null) {
            ticketToSave.setMessages(new java.util.ArrayList<>());
        }
        SupportTicket savedTicket = supportTicketRepository.save(ticketToSave);
        createNotification(
                savedTicket,
                "Support ticket received",
                "We have received your complaint and will review it shortly."
        );
        return savedTicket;
    }

    @Override
    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    @Override
    public SupportTicket getTicketById(String id) {
        Optional<SupportTicket> optionalTicket = supportTicketRepository.findById(id);
        return optionalTicket.orElse(null);
    }

    @Override
    public List<SupportTicket> getTicketsByBuyerId(String buyerId) {
        return supportTicketRepository.findByBuyerId(buyerId);
    }

    @Override
    public List<SupportTicket> getTicketsBySellerId(String sellerId) {
        return supportTicketRepository.findBySellerId(sellerId);
    }

    @Override
    public SupportTicket updateStatus(String id, SupportTicket.Status status) {
        SupportTicket existingTicket = getTicketById(id);
        if (existingTicket == null) {
            return null;
        }
        existingTicket.setStatus(status);
        existingTicket.setUpdatedAt(LocalDateTime.now());
        SupportTicket updatedTicket = supportTicketRepository.save(existingTicket);
        createNotification(
                updatedTicket,
                "Support ticket status updated",
                "Your ticket status is now " + status.name().replace("_", " ").toLowerCase() + "."
        );
        return updatedTicket;
    }

    @Override
    public SupportTicket assignSeller(String id, String sellerId, String sellerEmail) {
        SupportTicket existingTicket = getTicketById(id);
        if (existingTicket == null) {
            return null;
        }
        existingTicket.setSellerId(sellerId);
        existingTicket.setSellerEmail(sellerEmail);
        existingTicket.setUpdatedAt(LocalDateTime.now());
        return supportTicketRepository.save(existingTicket);
    }

    @Override
    public SupportTicket addMessage(String id, SupportTicket.SupportMessage message) {
        SupportTicket existingTicket = getTicketById(id);
        if (existingTicket == null) {
            return null;
        }
        SupportTicket.SupportMessage newMessage = message;
        newMessage.setId(UUID.randomUUID().toString());
        newMessage.setCreatedAt(LocalDateTime.now());
        existingTicket.getMessages().add(newMessage);
        existingTicket.setUpdatedAt(LocalDateTime.now());
        SupportTicket updatedTicket = supportTicketRepository.save(existingTicket);
        createNotification(
                updatedTicket,
                "New message on your ticket",
                "A new message was added to your support ticket."
        );
        return updatedTicket;
    }

    private void createNotification(SupportTicket ticket, String subject, String body) {
        if (ticket == null || ticket.getContactMethod() == null) {
            return;
        }
        String method = ticket.getContactMethod().toUpperCase();
        String recipient = ticket.getContactValue();
        if (recipient == null || recipient.isBlank()) {
            return;
        }
        SupportTicketNotification.NotificationType type = method.equals("PHONE")
                ? SupportTicketNotification.NotificationType.SMS
                : SupportTicketNotification.NotificationType.EMAIL;
        SupportTicketNotification notification = new SupportTicketNotification(
                null,
                ticket.getId(),
                type,
                recipient,
                subject,
                body,
                LocalDateTime.now(),
                SupportTicketNotification.NotificationStatus.QUEUED
        );
        notificationService.createNotification(notification);
    }
}

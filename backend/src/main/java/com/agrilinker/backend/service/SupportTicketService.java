package com.agrilinker.backend.service;

import com.agrilinker.backend.model.SupportTicket;
import java.util.List;

public interface SupportTicketService {
    SupportTicket createTicket(SupportTicket ticket);
    List<SupportTicket> getAllTickets();
    SupportTicket getTicketById(String id);
    List<SupportTicket> getTicketsByBuyerId(String buyerId);
    List<SupportTicket> getTicketsBySellerId(String sellerId);
    SupportTicket assignSeller(String id, String sellerId, String sellerEmail);
    SupportTicket updateStatus(String id, SupportTicket.Status status);
    SupportTicket addMessage(String id, SupportTicket.SupportMessage message);
}

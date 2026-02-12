// =======================
// 2) SupportTicketRepository.java
// =======================
package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.SupportTicket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends MongoRepository<SupportTicket, String> {

    // ✅ NEW: fetch tickets by buyer
    List<SupportTicket> findByBuyerEmail(String buyerEmail);
}

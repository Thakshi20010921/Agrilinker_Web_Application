package com.agrilinker.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrilinker.backend.model.ContactInquiry;
import com.agrilinker.backend.repository.ContactInquiryRepository;
import com.agrilinker.backend.service.AiInquiryReplyService;
import com.agrilinker.backend.service.ContactInquiryService;

@Service
public class ContactInquiryServiceImpl implements ContactInquiryService {

    @Autowired
    private ContactInquiryRepository contactInquiryRepository;

    @Autowired
    private AiInquiryReplyService aiInquiryReplyService;

    @Override
    public ContactInquiry createInquiry(ContactInquiry inquiry) {
        if (inquiry.getStatus() == null) {
            inquiry.setStatus(ContactInquiry.InquiryStatus.NEW);
        }
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiry.setUpdatedAt(LocalDateTime.now());
        return contactInquiryRepository.save(inquiry);
    }

    @Override
    public List<ContactInquiry> getInquiriesBySender(String senderEmail) {
        return contactInquiryRepository.findBySenderEmailOrderByCreatedAtDesc(senderEmail);
    }

    @Override
    public List<ContactInquiry> getAllInquiries() {
        return contactInquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public ContactInquiry replyToInquiry(String inquiryId, String adminEmail, String replyMessage, String method) {
        ContactInquiry inquiry = contactInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        inquiry.setReplyMessage(replyMessage);
        inquiry.setReplyMethod(method);
        inquiry.setRepliedBy(adminEmail);
        inquiry.setRepliedAt(LocalDateTime.now());
        inquiry.setUpdatedAt(LocalDateTime.now());

        if (inquiry.getStatus() == null || inquiry.getStatus() == ContactInquiry.InquiryStatus.NEW) {
            inquiry.setStatus(ContactInquiry.InquiryStatus.IN_PROGRESS);
        }

        return contactInquiryRepository.save(inquiry);
    }

    // ✅ AI generate only (no DB save)
    @Override
    public String generateAiReply(String inquiryId) {
        ContactInquiry inquiry = contactInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        String reply = aiInquiryReplyService.generateContactReply(
                inquiry.getFullName(),
                inquiry.getSubject(),
                inquiry.getMessage(),
                inquiry.getPreferredContactMethod());

        if (reply.isBlank()) {
            throw new RuntimeException("AI reply generation returned empty text.");
        }

        return reply;
    }
}

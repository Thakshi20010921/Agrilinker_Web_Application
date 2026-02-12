package com.agrilinker.backend.service;

import com.agrilinker.backend.model.Order;

public interface InvoiceService {
    byte[] generateInvoicePdf(Order order);
}

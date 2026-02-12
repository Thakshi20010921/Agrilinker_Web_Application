package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.Order;
import com.agrilinker.backend.model.Customer;
import com.agrilinker.backend.model.OrderItem;
import com.agrilinker.backend.model.Product;
import com.agrilinker.backend.service.InvoiceService;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Override
    public byte[] generateInvoicePdf(Order order) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, baos);
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Font normalFont = new Font(Font.HELVETICA, 11, Font.NORMAL);
            Font boldFont = new Font(Font.HELVETICA, 11, Font.BOLD);

            // Header
            Paragraph title = new Paragraph("AgriLinker - Receipt / Invoice", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            // Order info
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            document.add(new Paragraph("Order Number: " + safe(order.getOrderNumber()), boldFont));
            document.add(new Paragraph(
                    "Order Date: " + (order.getOrderDate() != null ? sdf.format(order.getOrderDate()) : "N/A"),
                    normalFont));
            document.add(new Paragraph("Payment Method: " + safe(order.getPaymentMethod()), normalFont));
            document.add(new Paragraph("Total Amount: Rs. " + String.format("%.2f", order.getTotalAmount()), boldFont));
            document.add(new Paragraph(" "));

            // Customer info (✅ matches your Customer.java)
            Customer c = order.getCustomer();
            if (c != null) {
                document.add(new Paragraph("Customer Details", boldFont));
                document.add(new Paragraph("Name: " + safe(c.getName()), normalFont));
                document.add(new Paragraph("Email: " + safe(c.getEmail()), normalFont));
                document.add(new Paragraph("Phone: " + safe(c.getPhone()), normalFont));
                document.add(new Paragraph("Address: " + safe(c.getAddress()), normalFont));
                document.add(new Paragraph(" "));
            }

            // Items table
            document.add(new Paragraph("Items", boldFont));
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[] { 4f, 1.5f, 2f, 2f });

            addHeaderCell(table, "Item");
            addHeaderCell(table, "Qty");
            addHeaderCell(table, "Unit Price (Rs.)");
            addHeaderCell(table, "Line Total (Rs.)");

            // ✅ Choose ONE of these loops (Option A or Option B)
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {

                    // -------- Option A: OrderItem has Product product --------
                    // Product p = item.getProduct();
                    // String name = (p != null) ? p.getName() : "Item";
                    // double price = (p != null) ? p.getPrice() : 0.0;
                    // int qty = item.getQuantity();
                    // double lineTotal = qty * price;

                    // -------- Option B: OrderItem stores fields directly -----
                    String name = safe(item.getName());
                    int qty = item.getQuantity();
                    double price = item.getPrice();
                    double lineTotal = qty * price;

                    addBodyCell(table, name);
                    addBodyCell(table, String.valueOf(qty));
                    addBodyCell(table, String.format("%.2f", price));
                    addBodyCell(table, String.format("%.2f", lineTotal));
                }
            }

            document.add(table);

            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("Thank you for your purchase!", normalFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate invoice PDF", e);
        }
    }

    private static void addHeaderCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, new Font(Font.HELVETICA, 11, Font.BOLD)));
        cell.setPadding(8);
        table.addCell(cell);
    }

    private static void addBodyCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, new Font(Font.HELVETICA, 11, Font.NORMAL)));
        cell.setPadding(8);
        table.addCell(cell);
    }

    private static String safe(String s) {
        return (s == null || s.isBlank()) ? "N/A" : s;
    }
}

package com.agrilinker.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.util.Date;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    @NotBlank(message = "Buyer ID cannot be empty")
    private String buyerId;

    @NotBlank(message = "Product ID cannot be empty")
    private String productId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @Positive(message = "Total price must be positive")
    private double totalPrice;

    private String invoiceId;

    @NotNull(message = "Order date is required")
    private Date orderDate;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    public Order() {}

    public Order(String buyerId, String productId, int quantity, double totalPrice,
                 String invoiceId, Date orderDate, String paymentMethod) {
        this.buyerId = buyerId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.invoiceId = invoiceId;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBuyerId() { return buyerId; }
    public void setBuyerId(String buyerId) { this.buyerId = buyerId; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public String getInvoiceId() { return invoiceId; }
    public void setInvoiceId(String invoiceId) { this.invoiceId = invoiceId; }

    public Date getOrderDate() { return orderDate; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}

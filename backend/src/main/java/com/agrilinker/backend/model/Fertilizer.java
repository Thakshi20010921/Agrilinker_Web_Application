package com.example.fertilizerapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

/**
 * Represents a fertilizer in the MongoDB 'fertilizers' collection.
 */

@Document(collection = "fertilizers")
public class Fertilizer {

    @Id
    private String id;               // Unique ID (MongoDB automatically generates this)
    private String name;             // Fertilizer name
    private String description;      // Short description of the fertilizer
    private double price;            // Price per unit
    private String unit;             // Unit of sale (e.g., "50kg bag", "1L bottle")
    private ObjectId supplierId;     // Reference to supplier (from users collection)
    private String category;         // Fertilizer type or category
    private String imageUrl;         // Image URL or file path
    private String stock;            // Availability status ("in stock" or "out of stock")

    // Default constructor
    public Fertilizer() {}

    // Parameterized constructor
    public Fertilizer(String name, String description, double price, String unit,
                      ObjectId supplierId, String category, String imageUrl, String stock) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.unit = unit;
        this.supplierId = supplierId;
        this.category = category;
        this.imageUrl = imageUrl;
        this.stock = stock;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public ObjectId getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(ObjectId supplierId) {
        this.supplierId = supplierId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Fertilizer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", unit='" + unit + '\'' +
                ", supplierId=" + supplierId +
                ", category='" + category + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", stock='" + stock + '\'' +
                '}';
    }
}


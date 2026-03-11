package com.agrilinker.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import org.bson.types.ObjectId;

@Document(collection = "products")
public class Product {

    @Id
    private String id; // auto-generated IDi

    private String name;
    private String category;
    private String description;
    private double price;
    private int quantity;
    private String unit;
    // private String farmerId;
    private String farmerEmail;

    private String location;
    private String Product_image;
    private String status;
    private LocalDateTime dateAdded;
    private double ratingAvg = 0;
    private int ratingCount = 0;

    public Product() {
    }

    public Product(String name, String category, String description, double price, int quantity,
            String unit, String farmerEmail, String location, String Product_image, String status) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
        this.farmerEmail = farmerEmail;

        this.location = location;
        this.Product_image = Product_image;
        this.status = status;
        this.dateAdded = LocalDateTime.now();
    }

    public String getid() {
        return id;
    }

    public void setProduct_id(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getfarmerEmail() {
        return farmerEmail;
    }

    public void setfarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProduct_image() {
        return Product_image;
    }

    public void setProduct_image(String Product_image) {
        this.Product_image = Product_image;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public double getRatingAvg() {
        return ratingAvg;
    }

    public void setRatingAvg(double ratingAvg) {
        this.ratingAvg = ratingAvg;
    }

    public int getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(int ratingCount) {
        this.ratingCount = ratingCount;
    }

}
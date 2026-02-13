package com.agrilinker.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Document(collection = "fertilizers")
public class Fertilizer {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String unit;
    private ObjectId supplierId;
    private String type;
    private String category;
    private String fertilizerCode;
    private String imageUrl;
    private Integer stock;
    private Double quantityInside;
    private double ratingAvg = 0;
    private int ratingCount = 0;
    private String district;
    private String supplierEmail;

    public Fertilizer() {}

    public Fertilizer(String name, String description, double price, String unit,
                      ObjectId supplierId, String type, String category,
                      String fertilizerCode, String imageUrl, Integer stock,
                      Double quantityInside, String district, String supplierEmail) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.unit = unit;
        this.supplierId = supplierId;
        this.type = type;
        this.category = category;
        this.fertilizerCode = fertilizerCode;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.quantityInside = quantityInside;
        this.district = district;
        this.supplierEmail = supplierEmail;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public ObjectId getSupplierId() { return supplierId; }
    public void setSupplierId(ObjectId supplierId) { this.supplierId = supplierId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getFertilizerCode() { return fertilizerCode; }
    public void setFertilizerCode(String fertilizerCode) { this.fertilizerCode = fertilizerCode; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Double getQuantityInside() { return quantityInside; }
    public void setQuantityInside(Double quantityInside) { this.quantityInside = quantityInside; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public double getRatingAvg() { return ratingAvg; }
    public void setRatingAvg(double ratingAvg) { this.ratingAvg = ratingAvg; }
    public int getRatingCount() { return ratingCount; }
    public void setRatingCount(int ratingCount) { this.ratingCount = ratingCount; }
    public String getSupplierEmail() { return supplierEmail; }
    public void setSupplierEmail(String supplierEmail) { this.supplierEmail = supplierEmail; }
}
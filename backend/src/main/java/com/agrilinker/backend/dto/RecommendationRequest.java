package com.agrilinker.backend.dto;

public class RecommendationRequest {
    private String cropType;
    private String soilType;
    private String growthStage;

    public RecommendationRequest() {}

    // Getters and Setters
    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }
    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
    public String getGrowthStage() { return growthStage; }
    public void setGrowthStage(String growthStage) { this.growthStage = growthStage; }
}
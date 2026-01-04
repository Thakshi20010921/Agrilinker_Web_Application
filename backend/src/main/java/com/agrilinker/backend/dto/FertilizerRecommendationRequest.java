package com.agrilinker.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class FertilizerRecommendationRequest {
    @NotBlank
    private String cropType;
    
    @NotBlank
    private String soilType;
    
    @NotBlank
    private String growthStage;

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getGrowthStage() { return growthStage; }
    public void setGrowthStage(String growthStage) { this.growthStage = growthStage; }
}

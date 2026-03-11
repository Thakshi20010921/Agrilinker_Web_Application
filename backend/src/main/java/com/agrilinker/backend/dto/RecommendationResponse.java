package com.agrilinker.backend.dto;

public class RecommendationResponse {
    private String idealFormula;
    private String dosage;
    private String aiNote;

    public RecommendationResponse(String idealFormula, String dosage, String aiNote) {
        this.idealFormula = idealFormula;
        this.dosage = dosage;
        this.aiNote = aiNote;
    }

    // Getters
    public String getIdealFormula() { return idealFormula; }
    public String getDosage() { return dosage; }
    public String getAiNote() { return aiNote; }
    // ✅ පරණ Constructor එකට යටින් මේකත් දාන්න
public RecommendationResponse() {}

// RecommendationResponse.java ඇතුළත Getters වලට පහළින් මේවා දාන්න:

public void setIdealFormula(String idealFormula) { this.idealFormula = idealFormula; }
public void setDosage(String dosage) { this.dosage = dosage; }
public void setAiNote(String aiNote) { this.aiNote = aiNote; }
}


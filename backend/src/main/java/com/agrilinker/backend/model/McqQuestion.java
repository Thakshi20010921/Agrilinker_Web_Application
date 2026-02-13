package com.agrilinker.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "mcq_questions")
public class McqQuestion {

    @Id
    private String id;
    private String questionText;
    private List<Option> options;
    private String status; // ACTIVE / CLOSED
    private String createdBy;
    private Date createdAt;
    private Map<String, Integer> totalVotes;
    private Map<String, Map<String, Integer>> provinceWise;

public String getId(){
    return id;
}
public void setId(String id){
    this.id = id;
}
 
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { this.options = options; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Map<String, Integer> getTotalVotes() { return totalVotes; }
    public void setTotalVotes(Map<String, Integer> totalVotes) { this.totalVotes = totalVotes; }

    public Map<String, Map<String, Integer>> getProvinceWise() { return provinceWise; }
    public void setProvinceWise(Map<String, Map<String, Integer>> provinceWise) { this.provinceWise = provinceWise; }

    public static class Option {
        private String key;  // A/B/C/D/E
        private String text;
        // getters and setters

        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}
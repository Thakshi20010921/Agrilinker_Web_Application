package com.agrilinker.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "mcq_answers")
public class McqAnswer {
    @Id
    private String id;
    private String questionId;
    private String userId;
    private String userEmail;
    private String optionSelected;
    private String province;
    private Date answeredAt;
    // getters and setters

public String getId(){
    return id;
}

public McqAnswer() {}

public void setId(String id){
    this.id = id;
}

public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getOptionSelected() { return optionSelected; }
    public void setOptionSelected(String optionSelected) { this.optionSelected = optionSelected; }

    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }

    public Date getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(Date answeredAt) { this.answeredAt = answeredAt; }

     public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}
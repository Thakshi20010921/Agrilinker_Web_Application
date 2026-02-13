package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.McqAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface McqAnswerRepository extends MongoRepository<McqAnswer, String> {
    List<McqAnswer> findByQuestionId(String questionId);
}
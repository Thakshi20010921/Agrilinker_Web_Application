package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.McqQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface McqQuestionRepository extends MongoRepository<McqQuestion, String> {
}
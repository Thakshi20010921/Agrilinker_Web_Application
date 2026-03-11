package com.agrilinker.backend.repository;

import com.agrilinker.backend.model.McqAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface McqAnswerRepository extends MongoRepository<McqAnswer, String> {
    List<McqAnswer> findByQuestionId(String questionId);
    // මේකෙන් බලනවා මේ ගොවියා (userId) දැනටමත් මේ ප්‍රශ්නයට (questionId) පිළිතුරු දීලාද කියලා
    //Optional<McqAnswer> findByQuestionIdAndUserId(String questionId, String userId);
    Optional<McqAnswer> findByQuestionIdAndUserEmail(String questionId, String userEmail);
}
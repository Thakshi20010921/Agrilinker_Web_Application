package com.agrilinker.backend.service;

import com.agrilinker.backend.model.McqQuestion;
import com.agrilinker.backend.model.McqAnswer;

import java.util.*;

public interface McqService {

    McqQuestion createQuestion(McqQuestion question);

    List<McqQuestion> getAllQuestions();

    McqQuestion getQuestionById(String questionId);

    McqAnswer submitAnswer(McqAnswer answer);

    // Optional: get analysis
    McqQuestion getQuestionAnalysis(String questionId);

    // methana comite neni
    Optional<McqAnswer> getAnswerByQuestionIdAndUserEmail(String questionId, String UserEmail);

} 
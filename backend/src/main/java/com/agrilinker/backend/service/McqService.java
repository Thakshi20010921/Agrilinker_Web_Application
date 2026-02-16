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

    Optional<McqAnswer> getAnswerByQuestionIdAndUserId(String questionId, String userId);

}
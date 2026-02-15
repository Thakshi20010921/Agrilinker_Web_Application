package com.agrilinker.backend.service.impl;

import com.agrilinker.backend.model.McqQuestion;
import com.agrilinker.backend.model.McqAnswer;
import com.agrilinker.backend.repository.McqQuestionRepository;
import com.agrilinker.backend.repository.McqAnswerRepository;
import com.agrilinker.backend.service.McqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class McqServiceImpl implements McqService {

    @Autowired
    private McqQuestionRepository questionRepo;

    @Autowired
    private McqAnswerRepository answerRepo;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public McqQuestion createQuestion(McqQuestion question) {
        question.setCreatedAt(new Date());
        question.setStatus("ACTIVE");
        // initialize votes to 0
        questionRepo.save(question);
        return question;
    }

    @Override
    public List<McqQuestion> getAllQuestions() {
        return questionRepo.findAll();
    }

    @Override
    public McqQuestion getQuestionById(String questionId) {
        return questionRepo.findById(questionId).orElse(null);
    }

    /*@Override
    public McqAnswer submitAnswer(McqAnswer answer) {
    answer.setAnsweredAt(new Date());
    answerRepo.save(answer);

        // Update analysis counts in mcq_questions
        Query query = new Query(Criteria.where("_id").is(answer.getQuestionId()));
        Update update = new Update()
                .inc("totalVotes." + answer.getOptionSelected(), 1)
                .inc("provinceWise." + answer.getProvince() + "." + answer.getOptionSelected(), 1);
        mongoTemplate.updateFirst(query, update, McqQuestion.class);

        return answer;
    }*/

    @Override
    public McqQuestion getQuestionAnalysis(String questionId) {
        return questionRepo.findById(questionId).orElse(null);
    }

        @Override
public McqAnswer submitAnswer(McqAnswer answer) {

    // Check if user already voted
   Optional<McqAnswer> existing =
        answerRepo.findByQuestionIdAndUserEmail(answer.getQuestionId(), answer.getUserEmail());

    if (existing.isPresent()) {
        throw new RuntimeException("You have already voted for this question");
    }

    answer.setAnsweredAt(new Date());
    answerRepo.save(answer);

    Query query = new Query(Criteria.where("_id").is(answer.getQuestionId()));

    Update update = new Update()
            .inc("totalVotes." + answer.getOptionSelected(), 1)
            .inc("provinceWise." + answer.getProvince() + "." + answer.getOptionSelected(), 1);

    mongoTemplate.updateFirst(query, update, McqQuestion.class);

    return answer;
}




    @Override
public Optional<McqAnswer> getAnswerByQuestionIdAndUserEmail(String questionId, String userEmail) {
    return answerRepo.findByQuestionIdAndUserEmail(questionId, userEmail);
}


}
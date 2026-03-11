package com.agrilinker.backend.controller;

import com.agrilinker.backend.model.McqQuestion;
import com.agrilinker.backend.model.McqAnswer;
import com.agrilinker.backend.service.McqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mcq")
//@CrossOrigin("*")
public class McqController {

    @Autowired
    private McqService mcqService;

    @PostMapping("/questions")
    public McqQuestion createQuestion(@RequestBody McqQuestion question) {
        return mcqService.createQuestion(question);
    }

    @GetMapping("/questions")
    public List<McqQuestion> getAllQuestions() {
        return mcqService.getAllQuestions();
    }

    @GetMapping("/questions/{id}")
    public McqQuestion getQuestion(@PathVariable String id) {
        return mcqService.getQuestionById(id);
    }

    @PostMapping("/answers")
    public McqAnswer submitAnswer(@RequestBody McqAnswer answer) {
        return mcqService.submitAnswer(answer);
    }

    /*  @PostMapping("/answers")
public ResponseEntity<?> submitAnswer(@RequestBody McqAnswer answer) {
    Optional<McqAnswer> existing = AnswerRepository.findByQuestionIdAndUserId(
        answer.getQuestionId(),
        answer.getUserId()
    );

    if(existing.isPresent()) {
        return ResponseEntity
                 .badRequest()
                 .body("User has already voted for this question");
    }

    answerRepository.save(answer);
    return ResponseEntity.ok("Vote submitted successfully");
}*/
   
}
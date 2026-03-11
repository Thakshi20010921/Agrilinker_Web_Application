package com.agrilinker.backend.notifications;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationSseService sse;

    public NotificationController(NotificationSseService sse) {
        this.sse = sse;
    }

    @GetMapping("/stream")
    public SseEmitter stream(@RequestParam String userKey) {
        return sse.subscribe(userKey);
    }

}

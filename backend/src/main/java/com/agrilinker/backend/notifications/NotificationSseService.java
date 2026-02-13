package com.agrilinker.backend.notifications;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class NotificationSseService {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(String userKey) {
        SseEmitter emitter = new SseEmitter(0L); // no timeout
        emitters.put(userKey, emitter);

        emitter.onCompletion(() -> emitters.remove(userKey));
        emitter.onTimeout(() -> emitters.remove(userKey));
        emitter.onError((e) -> emitters.remove(userKey));

        try {
            emitter.send(SseEmitter.event().name("connected").data("ok"));
        } catch (IOException ignored) {
        }

        return emitter;
    }

    public void sendToUser(String userKey, Object payload) {
        SseEmitter emitter = emitters.get(userKey);
        if (emitter == null)
            return;

        try {
            emitter.send(SseEmitter.event().name("notify").data(payload));
        } catch (IOException e) {
            emitters.remove(userKey);
        }
    }
}

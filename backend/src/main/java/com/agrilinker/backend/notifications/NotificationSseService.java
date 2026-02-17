package com.agrilinker.backend.notifications;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

@Service
public class NotificationSseService {

    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(String userKey) {

        SseEmitter emitter = new SseEmitter(0L);

        emitters.computeIfAbsent(userKey, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> remove(userKey, emitter));
        emitter.onTimeout(() -> remove(userKey, emitter));
        emitter.onError((e) -> remove(userKey, emitter));

        return emitter;
    }

    private void remove(String key, SseEmitter e) {
        List<SseEmitter> list = emitters.get(key);
        if (list != null)
            list.remove(e);
    }

    public void sendToUser(String userKey, Object payload) {

        List<SseEmitter> list = emitters.get(userKey);

        if (list == null)
            return;

        list.removeIf(emitter -> {
            try {
                emitter.send(SseEmitter.event().name("notify").data(payload));
                return false;
            } catch (IOException e) {
                return true;
            }
        });
    }

}

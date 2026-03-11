import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useNotifications(userKey) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!userKey) return;

    const es = new EventSource(
      `http://localhost:8081/api/notifications/stream?userKey=${encodeURIComponent(
        userKey
      )}`
    );

    es.addEventListener("notify", (e) => {
      const data = JSON.parse(e.data);
      setItems((prev) => [data, ...prev]);
      toast.info(`${data.title}\n${data.message}`);
    });

    es.onerror = () => {
      // SSE auto-reconnects. optional: toast.warn("Reconnecting...");
    };

    return () => es.close();
  }, [userKey]);

  return { items, unreadCount: items.length };
}

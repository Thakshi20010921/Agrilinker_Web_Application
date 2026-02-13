import { useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";

export default function NotificationBell() {
  const { items, unreadCount } = useNotificationContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative text-white text-3xl hover:text-green-300 hover:scale-110 transition"
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-3 z-50">
          <div className="font-semibold mb-2">Notifications</div>

          {items.length === 0 ? (
            <div className="text-sm text-gray-500">No notifications</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-auto">
              {items.slice(0, 20).map((n, idx) => (
                <div key={idx} className="border rounded-lg p-2">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

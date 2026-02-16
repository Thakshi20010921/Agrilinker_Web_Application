import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const { user } = useContext(AuthContext);
  const [items,setItems] = useState([]);

  useEffect(()=>{

    if(!user?.email) return;

    const es = new EventSource(
      `http://localhost:8081/api/notifications/stream?userKey=${encodeURIComponent(user.email)}`
    );

    es.addEventListener("notify",(e)=>{

      const data = JSON.parse(e.data);

      toast.info(`${data.title} - ${data.message}`);

      // keep only latest 50 notifications
      setItems(prev=>[
        {...data,read:false},
        ...prev
      ].slice(0,50));

    });

    return ()=>es.close();

  },[user?.email]);

  return (
    <NotificationContext.Provider value={{
      items,
      unreadCount: items.filter(n=>!n.read).length,
      setItems
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext=()=>useContext(NotificationContext);

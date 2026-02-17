import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useNotifications from "../hooks/useNotifications";

export default function NotificationListener() {
  const { user } = useContext(AuthContext);

  
  useNotifications(user?.email);

  return null; 
}

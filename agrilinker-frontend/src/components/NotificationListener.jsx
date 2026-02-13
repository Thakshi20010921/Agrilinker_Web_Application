import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useNotifications from "../hooks/useNotifications";

export default function NotificationListener() {
  const { user } = useContext(AuthContext);

  // you said your system uses email as key
  useNotifications(user?.email);

  return null; // no UI, just listens
}

import { useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function NotificationBell(){

  const { items, unreadCount, setItems } = useNotificationContext();
  const [open,setOpen]=useState(false);

  return(
    <div className="relative">

      <button
        onClick={()=>{
          setOpen(v=>!v);

          // mark all read when opened
          setItems(prev=>prev.map(n=>({...n,read:true})));
        }}
        className="relative text-white text-3xl"
      >
        🔔

        {unreadCount>0 &&(
          <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}

      </button>

      {open &&(
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-3 z-50">

          <div className="font-semibold mb-2">Notifications</div>

          {items.length===0?(
            <div>No notifications</div>
          ):(
            <div className="space-y-2 max-h-64 overflow-auto">

              {items.map((n,idx)=>(
                <div
                  key={idx}
                  className={`border rounded-lg p-2 cursor-pointer ${!n.read?"bg-blue-50":""}`}
                  onClick={()=>{

                    if(n.type==="ORDER")
                      window.location.href=`/orders/${n.referenceId}`;

                    if(n.type==="PRODUCT")
                      window.location.href=`/product/${n.referenceId}`;

                  }}
                >
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.message}</div>

                  {n.createdAt &&(
                    <div className="text-xs text-gray-400">
                      {dayjs(n.createdAt).fromNow()}
                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

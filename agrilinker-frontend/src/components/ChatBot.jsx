import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiMessageSquare, FiX, FiCpu } from 'react-icons/fi';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // අලුත් මැසේජ් එකක් ආපු ගමන් පල්ලෙහාට scroll කරන්න
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleSend = async () => {
        if (!message.trim()) return;

        // User ගේ මැසේජ් එක UI එකට දානවා
        const userMsg = { role: 'user', text: message };
        setChat(prev => [...prev, userMsg]);
        setLoading(true);
        const currentMsg = message;
        setMessage("");

        try {
            // Spring Boot Backend එකට Call එකක් යවනවා
            const res = await axios.post("http://localhost:8081/api/chat/ask", { message: currentMsg });
            
            // AI එකේ Reply එක UI එකට දානවා
            setChat(prev => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (err) {
            setChat(prev => [...prev, { role: 'bot', text: "සමාවෙන්න, සර්වර් එකත් එක්ක සම්බන්ධ වෙන්න බැහැ." }]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat එක ඇරීමට සහ වැසීමට ඇති Button එක */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            >
                {isOpen ? <FiX size={28}/> : <FiMessageSquare size={28}/>}
            </button>

            {/* Chat Window එක */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px] transition-all animate-in fade-in slide-in-from-bottom-4">
                    
                    {/* Header */}
                    <div className="bg-green-700 p-4 text-white flex items-center gap-2 font-bold shadow-md">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <FiCpu className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-sm">Agri-Link AI</p>
                            <p className="text-[10px] font-light opacity-80">Online | Llama 3 Expert</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {chat.length === 0 && (
                            <div className="text-center mt-10">
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-green-700">
                                    <FiMessageSquare />
                                </div>
                                <p className="text-gray-400 text-sm italic">we are here to help you!</p>
                            </div>
                        )}
                        
                        {chat.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-green-600 text-white rounded-tr-none' 
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-500 p-3 rounded-2xl rounded-tl-none text-xs animate-pulse">
                                    AI thinking...
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
                        <input 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your msh here"
                            className="flex-grow p-3 bg-gray-100 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all"
                        />
                        <button 
                            onClick={handleSend} 
                            disabled={!message.trim()}
                            className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50"
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
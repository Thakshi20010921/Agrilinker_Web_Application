import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiMessageSquare, FiX, FiCpu, FiInfo, FiLayers } from 'react-icons/fi';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState(null); 
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = { role: 'user', text: message };
        setChat(prev => [...prev, userMsg]);
        setLoading(true);
        const currentMsg = message;
        setMessage("");

        try {
            const res = await axios.post("http://localhost:8081/api/chat/ask", { 
                message: currentMsg,
                mode: mode 
            });
            
            setChat(prev => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (err) {
            setChat(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the server." }]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Toggle Button - Green Theme */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#15803d] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white"
            >
                {isOpen ? <FiX size={28}/> : <FiMessageSquare size={28}/>}
            </button>

            {/* Main Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-85 md:w-96 bg-[#f0fdf4] rounded-3xl shadow-2xl border border-green-200 overflow-hidden flex flex-col h-[550px] transition-all animate-in fade-in slide-in-from-bottom-4">
                    
                    {/* Header - Using Solid Green */}
                    <div className="bg-[#15803d] p-4 text-white flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <FiCpu className="text-white animate-pulse" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Agri-Link AI</p>
                                <p className="text-[10px] text-green-100 opacity-80 uppercase tracking-wider font-semibold">
                                    {mode ? mode.replace('_', ' ') : 'Select Mode'}
                                </p>
                            </div>
                        </div>
                        {mode && (
                            <button onClick={() => {setMode(null); setChat([]);}} className="text-[10px] bg-white/20 text-white px-2 py-1 rounded hover:bg-white/30 transition-all">
                                RESET
                            </button>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-200">
                        {!mode ? (
                            /* --- OPTION CARDS --- */
                            <div className="flex flex-col gap-4 justify-center h-full animate-in fade-in zoom-in duration-300">
                                <p className="text-green-800 text-center text-sm mb-2 font-medium">Hello! How can I assist you today?</p>
                                
                                <button 
                                    onClick={() => setMode('SYSTEM')}
                                    className="p-5 bg-white border border-green-100 rounded-2xl hover:border-[#15803d] hover:shadow-md transition-all text-left group flex items-start gap-4"
                                >
                                    <div className="bg-green-50 p-3 rounded-xl group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                                        <FiInfo size={20} className="text-[#15803d] group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#15803d] font-bold text-sm">Our Services</h4>
                                        <p className="text-[11px] text-gray-500 mt-1">Learn about our app features, marketplace, and how it works.</p>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setMode('AGRICULTURE')}
                                    className="p-5 bg-white border border-green-100 rounded-2xl hover:border-[#15803d] hover:shadow-md transition-all text-left group flex items-start gap-4"
                                >
                                    <div className="bg-green-50 p-3 rounded-xl group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                                        <FiLayers size={20} className="text-[#15803d] group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#15803d] font-bold text-sm">Agriculture Expert</h4>
                                        <p className="text-[11px] text-gray-500 mt-1">Get AI-powered solutions for farming and fertilizer issues.</p>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            /* --- CHAT INTERFACE --- */
                            <>
                                {chat.length === 0 && (
                                    <p className="text-center text-green-600 text-[11px] mt-4 uppercase tracking-widest font-semibold">Chat Started in {mode} Mode</p>
                                )}
                                {chat.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                            msg.role === 'user' 
                                            ? 'bg-[#15803d] text-white rounded-tr-none font-medium' 
                                            : 'bg-white text-gray-800 border border-green-100 rounded-tl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-green-600 p-3 rounded-2xl rounded-tl-none text-[11px] animate-pulse border border-green-100">
                                            AI Expert is thinking...
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    {mode && (
                        <div className="p-4 bg-white border-t border-green-50 flex gap-2 items-center">
                            <input 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={`Ask about ${mode === 'SYSTEM' ? 'our services' : 'farming'}...`}
                                className="flex-grow p-3 bg-green-50/50 border border-green-100 rounded-xl outline-none focus:border-[#15803d] text-gray-800 text-sm transition-all"
                            />
                            <button 
                                onClick={handleSend} 
                                disabled={!message.trim()}
                                className="bg-[#15803d] text-white p-3 rounded-xl hover:bg-[#166534] transition-all disabled:opacity-30 shadow-md shadow-green-200"
                            >
                                <FiSend size={18} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatBot;
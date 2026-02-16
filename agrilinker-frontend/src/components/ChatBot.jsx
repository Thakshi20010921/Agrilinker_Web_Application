import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiMessageSquare, FiX, FiCpu, FiInfo, FiLayers, FiRefreshCw } from 'react-icons/fi';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState(null); 
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // ඔයා දුන්නු පින්තූරයේ තියෙන ඒ නියම Deep Green Gradient එක
    const radiantGreen = "bg-gradient-to-r from-[#11702d] via-[#148234] to-[#11702d]";
    const darkGreenBg = "bg-[#0a4d1f]"; // Background එකට තද කොළ පැහැයක්

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
            setChat(prev => [...prev, { role: 'bot', text: "සොරි මචං, පොඩි error එකක් ආවා. 🌱" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#11702d] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white/20"
            >
                {isOpen ? <FiX size={28}/> : <FiMessageSquare size={28}/>}
            </button>

            {isOpen && (
                <div className={`absolute bottom-20 right-0 w-85 md:w-96 ${darkGreenBg} rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[550px] animate-in fade-in slide-in-from-bottom-4`}>
                    
                    {/* Header - */}
                    <div className={`${radiantGreen} p-5 text-white shadow-xl relative z-10 border-b border-white/10`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xl bg-white/20 p-2 rounded-lg">🌱</span>
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest opacity-70 uppercase">Agri-Linker Assistant</p>
                                    <h3 className="text-sm font-bold">Smart Assistant</h3>
                                </div>
                            </div>
                            {mode && (
                                <button onClick={() => {setMode(null); setChat([]);}} className="bg-white/10 hover:bg-white/20 text-[10px] px-3 py-1.5 rounded-full border border-white/20 transition-all font-bold">
                                    <FiRefreshCw className="inline mr-1" /> RESET
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Chat Area - No more white background! */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                        {!mode ? (
                             <div className="flex flex-col gap-4 justify-center h-full">
                                <div className="text-center mb-6">
                                    <span className="text-4xl mb-2 block">🚜</span>
                                    <p className="text-white font-bold text-sm">How can we support you today?</p>
                                </div>
                                
                                <button onClick={() => setMode('SYSTEM')} className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-start gap-4 group text-left shadow-lg">
                                    <div className="bg-[#11702d] p-3 rounded-xl text-white">
                                        <FiInfo size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Services & Support</h4>
                                        <p className="text-[11px] text-white/50 mt-1">Platform guides and trading help.</p>
                                    </div>
                                </button>

                                <button onClick={() => setMode('AGRICULTURE')} className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-start gap-4 group text-left shadow-lg">
                                    <div className="bg-[#11702d] p-3 rounded-xl text-white">
                                        <span className="text-xl">📦</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Fertilizer & Farming</h4>
                                        <p className="text-[11px] text-white/50 mt-1">Expert AI advice for your crops.</p>
                                    </div>
                                </button>
                             </div>
                        ) : (
                            <div className="space-y-4">
                                {chat.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] shadow-xl border ${
                                            msg.role === 'user' 
                                            ? `bg-[#148234] text-white border-white/20 rounded-tr-none` 
                                            : 'bg-white/10 backdrop-blur-md text-white border-white/10 rounded-tl-none font-medium'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="bg-white/5 text-white/70 p-3 rounded-xl text-[11px] w-fit animate-pulse border border-white/10">
                                        Thinking... 🌱
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    {mode && (
                        <div className="p-4 bg-black/20 border-t border-white/10 flex gap-2 items-center">
                            <input 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Write your message..."
                                className="flex-grow p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#148234] text-sm text-white placeholder-white/30"
                            />
                            <button onClick={handleSend} disabled={!message.trim()} className="bg-[#11702d] text-white p-3 rounded-xl hover:bg-[#148234] transition-all disabled:opacity-30 shadow-lg">
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
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import SidebarDokter from "../components/sidebar/SidebarDokter";
import Navbar from "../components/navbar/Navbar";
import SidebarPasien from "../components/sidebar/SidebarPasien";
import { useAuth } from "../context/AuthContext";

const ChatKonsul = () => {
    const { id } = useParams(); // Mengambil ID konsultasi dari URL
    const chatContainerRef = useRef(null);
    const userInfo = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch messages and check access rights
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const messagesResponse = await axios.get(`https://techsign.store/api/messages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessages(messagesResponse.data || []);
        } catch (error) {
            setError("Gagal memuat data konsultasi.");
        }
    };

    // Initial Fetch Messages
    useEffect(() => {
        fetchMessages();
    }, [id, userInfo]);

    // Auto-refresh every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000); // Refresh every 5 seconds

        // Cleanup interval when component unmounts
        return () => clearInterval(interval);
    }, [id, userInfo, messages]); // Refresh if any of these change

    // Initialize WebSocket connection
    useEffect(() => {
        if (error) return; // Don't initialize if there's an error

        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'f2f249f9aa6053b29bbe',
            cluster: 'ap1',
            forceTLS: true,
            wsPort: 6001,
            disableStats: true,
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        });

        const channel = echo.channel(`konsulq-${id}`);

        channel.listen('message.sent', (event) => {
            setMessages((prevMessages) => [...prevMessages, event.message]);
            fetchMessages(); // Refresh after receiving a new message
        });

        return () => {
            echo.disconnect();
        };
    }, [id, error]);

    const handleSend = async () => {
        if (newMessage.trim() !== "") {
            try {
                const token = localStorage.getItem("token");
                const payload = {
                    consultation_id: id,
                    sender: userInfo.userInfo.role,
                    message: newMessage,
                };

                const response = await axios.post("https://techsign.store/api/messages", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages((prevMessages) => [...prevMessages, response.data]);
                setNewMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="flex h-screen">
            {userInfo.role === "doctor" ? <SidebarDokter /> : <SidebarPasien />}
            <div className="flex-1 ml-64 bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex flex-col flex-grow p-6 w-[100%] mx-auto">
                    <div className="p-4 bg-white shadow rounded-md">
                        <h2 className="text-lg font-semibold">Chat Konsultasi</h2>
                        <p className="text-sm text-gray-500">Dokter dan Pasien</p>
                    </div><div
                        className="mt-4 flex-grow overflow-y-auto bg-white p-4 shadow rounded-md"
                        style={{ height: "calc(80vh - 200px)" }}
                        ref={chatContainerRef}
                    >
                        {Array.isArray(messages) && messages.length > 0 ? (
                            messages.map((message) => {
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === userInfo.userInfo.role ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[100%] p-3 rounded-lg text-sm mb-5 ${message.sender === userInfo.userInfo.role
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800"}`}
                                            style={{ wordBreak: "break-word" }}
                                        >
                                            {/* Menampilkan nama pengirim */}
                                            <div className={`font-semibold ${message.sender === userInfo.userInfo.role ? "text-white" : "text-gray-800"}`}>
                                                {message.sender === 'doctor' && message.consultation && message.consultation.appointment && message.consultation.appointment.doctor
                                                    ? message.consultation.appointment.doctor.name
                                                    : message.sender === 'patient' && message.consultation && message.consultation.appointment && message.consultation.appointment.patient
                                                        ? message.consultation.appointment.patient.name
                                                        : 'Unknown'}
                                            </div>

                                            {/* Menampilkan pesan */}
                                            {message.message}

                                            <div className={`text-xs mt-1 text-right ${message.sender === userInfo.userInfo.role ? "text-white" : "text-gray-800"}`}>
                                                {new Date(message.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-gray-500">Tidak ada pesan.</div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center bg-white p-4 shadow rounded-md">
                        <input
                            type="text"
                            className="flex-grow border rounded-l-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Tulis pesan..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                        >
                            Kirim
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChatKonsul;

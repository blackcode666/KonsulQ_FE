import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await fetchData("messages");
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.sender}</td>
              <td>{message.receiver}</td>
              <td>{message.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;

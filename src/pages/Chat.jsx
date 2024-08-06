import React, { useState } from "react";

const initialState = {
  msg: "",
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [form, setForm] = useState(initialState);

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (form.msg.trim() === "") return; // Avoid sending empty messages
    setChatMessages((prevMessages) => [...prevMessages, form.msg]);
    setForm(initialState);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={sendChatMessage}>
        {/* Chat messages */}
        <ul>
          {chatMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="msg">Enter chat</label>
          <textarea
            id="msg"
            cols={30}
            rows={5}
            onChange={handleInput}
            value={form.msg}
            name="msg"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { devserver, getAccessToken, server } from "../constants";
import { getOrderById } from "../features/orderSlice";
import { getTicketData } from "../features/ticketSlice";
import { getChatByTicketId } from "../features/chatSlice";
import { getUser } from "../features/userSlice";

const initialState = {
  msg: "",
};

const Chat = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const accessToken = getAccessToken();

  const { ticketData } = useSelector((state) => state.ticket);
  const { singleOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { chatMessages } = useSelector((state) => state.chat);

  useEffect(() => {
    const socketConnection = io(server);
    setSocket(socketConnection);

    socketConnection.on("newMessage", (message) => {
      console.log("New message:", message);
      dispatch(getChatByTicketId(chatId));
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [devserver, dispatch, chatId]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit("joinChat", chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    document.title = "RH4OGS - LIVE CHAT";
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getOrderById(orderId));
      dispatch(getTicketData(orderId));
      dispatch(getUser());
    }
  }, [accessToken, orderId, dispatch]);

  useEffect(() => {
    if (ticketData) {
      setChatId(ticketData.ticket._id);
      dispatch(getChatByTicketId(chatId));
    }
  }, [ticketData, chatId]);

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (form.msg.trim() === "") return;

    const data = {
      msg: form.msg,
      chatId: chatId,
      username: user?.username,
    };

    if (socket) {
      socket.emit("sendMessage", data);
    }

    setForm(initialState);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage(e);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-sm bg-white shadow-lg rounded-t-lg lg:max-w-xs lg:right-4 lg:bottom-4 lg:w-80">
      <div className="bg-red-500 text-white p-4 rounded-t-lg font-semibold">
        Live Chat
      </div>
      <div className="p-4 h-80 overflow-y-auto">
        <ul className="space-y-3">
          {chatMessages?.messages?.map((msg) => (
            <li
              className={`flex flex-col p-3 rounded-lg text-sm ${
                msg.from === user?.username
                  ? "bg-blue-200 text-right"
                  : "bg-green-200 text-left"
              }`}
              key={msg._id}
            >
              <span className="text-xs text-gray-500">{msg.from}</span>
              <p>{msg.msg}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendChatMessage} className="p-4 border-t border-gray-200">
        <div className="mb-2">
          <label
            htmlFor="msg"
            className="block text-sm font-medium text-gray-700"
          >
            Enter message
          </label>
          <textarea
            id="msg"
            cols={30}
            rows={3}
            onChange={handleInput}
            value={form.msg}
            name="msg"
            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

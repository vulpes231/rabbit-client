import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { devserver, getAccessToken } from "../constants";
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

  // Initialize socket and event handlers
  useEffect(() => {
    const socketConnection = io(devserver);
    setSocket(socketConnection);

    socketConnection.on("newMessage", (message) => {
      // Update your chat UI with the new message
      console.log("New message:", message);
      dispatch(getChatByTicketId(chatId)); // Refresh chat messages if needed
    });

    return () => {
      socketConnection.disconnect(); // Clean up on component unmount
    };
  }, [devserver, dispatch, chatId]);

  // Join chat room when chatId is set
  useEffect(() => {
    if (socket && chatId) {
      socket.emit("joinChat", chatId);
    }
  }, [socket, chatId]);

  // Fetch initial data
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
    }
  }, [ticketData]);

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (form.msg.trim() === "") return; // Avoid sending empty messages

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

  return (
    <div className="p-6 mt-10 flex flex-col gap-6 lg:max-w-[900px] mx-auto w-full">
      <div>
        <h3>
          Ticket created for {singleOrder?.order?.item}{" "}
          {`($${singleOrder?.order?.price})`}
        </h3>
        <small>status: {ticketData?.ticket?.status}</small>
      </div>
      <ul className="bg-white p-6 flex flex-col gap-4 shadow-lg rounded-xl h-[300px] overflow-auto">
        {chatMessages?.messages?.map((msg) => (
          <li
            className={`flex flex-col text-xs font-medium bg-green-100 p-3 w-full lg:w-[300px] rounded-sm`}
            key={msg._id}
          >
            <small className="font-thin text-slate-500">{msg.from}</small>
            <p className="text-md">{msg.msg}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={sendChatMessage} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="msg">Enter message</label>
          <textarea
            id="msg"
            cols={30}
            rows={5}
            onChange={handleInput}
            value={form.msg}
            name="msg"
            className="focus:border-2 focus:border-red-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-red-400 w-[20%] text-white rounded-3xl py-2.5"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

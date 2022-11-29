import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const SocketTry = () => {
  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  return (
    <div className="SocketTry">
      <input placeholder="message" />
      <button onClick={sendMessage}>send message</button>
    </div>
  );
};

export default SocketTry;

import { useEffect } from "react";
import io from "socket.io-client";
// import { Chatbot } from "react-chatbot-kit";
// import config from "../ChatComponents/Chatbot/config";
// import ActionProvider from "../ChatComponents/Chatbot/ActionProvider";
// import MessageParser from "../ChatComponents/Chatbot/MessageParser";
// import 'react-chatbot-kit/build/main.css';

// const socket = io.connect("http://localhost:4000");

function TestPage() {
  function sendMessage() {
    console.log("Button clicked");
    socket.emit("send_message", { message: "Hello from client" });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
    </div>
  );
}

export default TestPage;
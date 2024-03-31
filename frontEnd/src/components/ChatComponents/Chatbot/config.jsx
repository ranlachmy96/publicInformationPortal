// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotComponents/BotAvatar";

const config = {
  initialMessages: [createChatBotMessage(`Welocome to the information chatbot! How can I help you today?`)],
  botName: "Information Bot",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#1976D2",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#1976D2",
    },
  }

}

export default config
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SidePanel from "../../Components/SidePanel";
import SideBar from "../../Components/SideBar/SideBar";
import ChatContent from "../../Components/ChatContent/ChatContent";
import ConversationBox from "../../Components/ConversationBox/ConversationBox";
import "./ChatPage.css";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <section className="chat-section">
      <div className="chat-container">

        {user && <SideBar />}
        {user && <ChatContent />}
      </div>
    </section>
  );
};

export default ChatPage;

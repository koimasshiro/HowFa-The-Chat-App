import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import SidePanel from '../../Components/SidePanel';
import SideBar from '../../Components/SideBar/SideBar';

const ChatPage = () => {
  const {user} = ChatState();

  return(
    <div>
      {/* {user && <SidePanel/>} */}
      <SideBar/>
    </div>
  )
}

export default ChatPage
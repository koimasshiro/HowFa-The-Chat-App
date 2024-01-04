import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ChatPage = () => {

  // const [chats, setChats] = useState([]);

  // //API call to render the chats from backend to frontend
  // const fetchChats = async()=>{
  //   const { data } = await axios.get('/api/chats');

  //   setChats(data);
    
  // };

  // useEffect(()=>{
  //   fetchChats();
  // }, []);


  return(
    <div>
      {/* {chats.map(chat => <div key={chat.id}>{chat.chatName}</div>)} */}
      Chat Page
    </div>
  )
}

export default ChatPage
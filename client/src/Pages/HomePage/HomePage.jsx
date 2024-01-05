import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  // const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
      // navigate.push('/chats');
    }
  }, []);

  return (
    <div>HomePage</div>
  )
}

export default HomePage
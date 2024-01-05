import React, {useEffect} from 'react';
import {RiChatSmile2Line, RiContactsLine} from 'react-icons/ri';
import { MdOutlineSettingsSuggest, MdGroups, MdCall, MdOutlineNotifications } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BsChatQuoteFill, BsSearch } from "react-icons/bs";
import {FaRegUser} from 'react-icons/fa'
import './SideBar.css';
import '../../Pages/Chat/ChatPage.css';
import '../tailwindcolorscss/tailwindColors.css'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from '../ProfileModal/ProfileModal';

const SideBar = () => {
    const {user} = ChatState();

    useEffect(() => {
        const profileToggleClickHandler = (e) => {
          e.preventDefault();
          e.currentTarget.parentElement.classList.toggle('active');
        };
    
        const documentClickHandler = (e) => {
          if (!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
            document.querySelector('.chat-sidebar-profile').classList.remove('active');
          }
        };
    
        // Attach event listener when the component mounts
        document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', profileToggleClickHandler);
        document.addEventListener('click', documentClickHandler);
    
        // Cleanup: remove event listeners when the component unmounts
        return () => {
          document.querySelector('.chat-sidebar-profile-toggle').removeEventListener('click', profileToggleClickHandler);
          document.removeEventListener('click', documentClickHandler);
        };
      }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount
    

  return (
    <div>
        <div className="chat-sidebar">
                <a href="#" className="chat-sidebar-logo">
                <BsChatQuoteFill />
                </a>
                <ul className="chat-sidebar-menu">
                    <li className="active"><a href="#" data-title="Chats"><RiChatSmile2Line /></a></li>
                    <li><a href="#" data-title="Search"><BsSearch /></a></li>
                    <li><a href="#" data-title="Notifications"><MdOutlineNotifications /></a></li>
                    <li><a href="#" data-title="Groups"><MdGroups /></a></li>
                    <li><a href="#" data-title="Audio"><MdCall /></a></li>
                    <li><a href="#" data-title="Video"><IoVideocam /></a></li>
                    <li><a href="#" data-title="Settings"><MdOutlineSettingsSuggest /></a></li>
                    <li className="chat-sidebar-profile">
                        <button type="button" className="chat-sidebar-profile-toggle">
                            <img src={user.image} alt=""/>
                        </button>
                        <ul className="chat-sidebar-profile-dropdown">
                            <ProfileModal user={user}><li><a href="#"><FaRegUser /> Profile</a></li></ProfileModal>
                            <li><a href="#"><i className="ri-logout-box-line"></i> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default SideBar
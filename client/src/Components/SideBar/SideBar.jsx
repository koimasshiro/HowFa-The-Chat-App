import React from 'react';
import {RiChatSmile2Line, RiContactsLine} from 'react-icons/ri';
import { MdOutlineSettingsSuggest, MdGroups, MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BsChatQuoteFill } from "react-icons/bs";
import './SideBar.css';
import '../../Pages/Chat/ChatPage.css';
import '../tailwindcolorscss/tailwindColors.css'

const SideBar = () => {
  return (
    <div>
        <div className="chat-sidebar">
                <a href="#" className="chat-sidebar-logo">
                <BsChatQuoteFill />
                </a>
                <ul className="chat-sidebar-menu">
                    <li className="active"><a href="#" data-title="Chats"><RiChatSmile2Line /></a></li>
                    <li><a href="#" data-title="Contacts"><RiContactsLine /></a></li>
                    <li><a href="#" data-title="Groups"><MdGroups /></a></li>
                    <li><a href="#" data-title="Audio Call"><MdCall /></a></li>
                    <li><a href="#" data-title="Settings"><IoVideocam /></a></li>
                    <li><a href="#" data-title="Settings"><MdOutlineSettingsSuggest /></a></li>
                    <li className="chat-sidebar-profile">
                        <button type="button" className="chat-sidebar-profile-toggle">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt=""/>
                        </button>
                        <ul className="chat-sidebar-profile-dropdown">
                            <li><a href="#"><i className="ri-user-line"></i> Profile</a></li>
                            <li><a href="#"><i className="ri-logout-box-line"></i> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default SideBar
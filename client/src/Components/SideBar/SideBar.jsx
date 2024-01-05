import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RiChatSmile2Line, RiContactsLine } from "react-icons/ri";
import {
  MdOutlineSettingsSuggest,
  MdGroups,
  MdCall,
  MdOutlineNotifications,
} from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BsChatQuoteFill, BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import "./SideBar.css";
import "../../Pages/Chat/ChatPage.css";
import "../tailwindcolorscss/tailwindColors.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { ChatState } from "../../Context/ChatProvider";

const SideBar = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth");
  };

  // State to manage the dropdown's open/closed state
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="chat-sidebar">
        <a href=" " className="chat-sidebar-logo">
          <BsChatQuoteFill />
        </a>
        <ul className="chat-sidebar-menu">
          <li className="active">
            <a href=" " data-title="Chats">
              <RiChatSmile2Line />
            </a>
          </li>
          <li>
            <a href=" " data-title="Search">
              <BsSearch />
            </a>
          </li>
          <li>
            <a href=" " data-title="Notifications">
              <MdOutlineNotifications />
            </a>
          </li>
          <li>
            <a href=" " data-title="Groups">
              <MdGroups />
            </a>
          </li>
          <li>
            <a href=" " data-title="Audio">
              <MdCall />
            </a>
          </li>
          <li>
            <a href=" " data-title="Video">
              <IoVideocam />
            </a>
          </li>
          <li>
            <a href=" " data-title="Settings">
              <MdOutlineSettingsSuggest />
            </a>
          </li>
          <ul className="chat-sidebar-profile">
            <button
              type="button"
              onClick={toggleDropdown}
              className="chat-sidebar-profile-toggle"
            >
              <img src={user.image} alt="" />
            </button>

            {isDropdownOpen && (
              <div className='chat-sidebar-profile-dropdown'>
                {/* Dropdown Content Goes Here */}
                <ProfileModal user={user}>
                <li>
                  <a href="">
                    <FaRegUser /> Profile
                  </a>
                </li>
                <li onClick={logOutHandler}><a href=""><i className="ri-logout-box-line"></i> Logout</a></li>

              </ProfileModal>
              </div>
            )}
            <ul className="chat-sidebar-profile-dropdown">
              
            </ul>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
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
import "../ChatContent/ChatContent.css";
import "../tailwindcolorscss/tailwindColors.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ChatLoading from "../ChatLoading/ChatLoading";
import UserListItem from "../UserListItem/UserListItem";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();

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


  const handleSearch = async () => {
    if(!search){
      toast({
        title: "Please enter a search item",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:'top-left',
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }
  }

  const accessChat = async(userId)=>{
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization:`Bearer ${user.token}`,
        },
      };      

      const data = await axios.post("api/chats", {userId}, config);

    setSelectedChat(data);
    setLoadingChat(false);
    onClose();  
    } catch (error) {
      toast({
        title: "Error fetching chats",
        description: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:'bottom-left',
      });
    }
  }
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
          <button onClick={onOpen}>
            <a data-title="Search">
              <BsSearch />
            </a>
          </button>
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
              <div className="chat-sidebar-profile-dropdown">
                {/* Dropdown Content Goes Here */}
                <ProfileModal user={user}>
                  <li>
                    <a href="">
                      <FaRegUser /> Profile
                    </a>
                  </li>
                  <li onClick={logOutHandler}>
                    <a href="">
                      <i className="ri-logout-box-line"></i> Logout
                    </a>
                  </li>
                </ProfileModal>
              </div>
            )}
            <ul className="chat-sidebar-profile-dropdown"></ul>
          </ul>
        </ul>
      </div>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              {/* <Box d="flex" pb={2}>
              <Input
                placeholder="search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              // onClick={handleSearch}
              >Search</Button>
            </Box> */}
              <form action="" className="content-sidebar-form">
                <input
                  type="search"
                  className="content-sidebar-input"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <div className="content-sidebar-submit">
                <Button onClick={handleSearch}>
                  <BsSearch />
                </Button>
                </div>
              </form>
              {loading ? (
                <ChatLoading/>
              )
              :
              (
                searchResult?.map(x => (
                  <UserListItem key={x._id} user={x} handleFunc={()=> accessChat(x._id)}/>
                ))
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default SideBar;

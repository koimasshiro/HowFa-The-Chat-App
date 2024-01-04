const asyncHandler = require("express-async-handler");
const Chat = require('../Models/ChatModel');
const User = require("../Models/userModel");


// access one on one chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log('userId param not sent with request');
        return res.sendStatus(400);
    }
    var isChatExist = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },

        ]
    }).populate("users", "-password").populate("recentMessage");

    isChatExist = await User.populate(isChatExist, {
        path: "recentMessage.sender",
        select: "name image email",
    });

    if (isChatExist.length > 0) {
        res.send(isChatExist[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }

        try {
            const createdChat = await Chat.create(chatData);

            //send created chat to user
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

// Fetch all chats for a user
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("recentMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "recentMessage.sender",
                    select: "name image email"
                });
                res.status(200).send(results);
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


//create group chat
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "please fill all fields" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("Group chat must have more that 2 members");
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


//Add to group chat
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const addedToGroup = await Chat.findByIdAndUpdate(chatId,
        {
            $push: { users: userId },
        },{
            new: true
        }).populate("users", "-password").populate("groupAdmin", "-password");

        if(!addToGroup){
            res.status(404);
            throw new Error("An Error occurred")
        }
        else{
            res.json(addedToGroup);
        }
})

// Rename a group chat

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedGroup = await Chat.findByIdAndUpdate(
        chatId, { chatName }, { new: true, }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedGroup) {
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else {
        res.json(updatedGroup);
    }
});


//remove user from group chat
const removeGroupUser = asyncHandler(async(req, res)=>{
    const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
})

module.exports = { accessChat, fetchChats, createGroupChat, addToGroup, renameGroup, removeGroupUser };
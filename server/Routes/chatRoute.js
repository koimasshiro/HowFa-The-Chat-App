const express = require('express');
const { protect } = require('../Middlewares/AuthMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeGroupUser } = require('../Controllers/chatControllers');


const router = express.Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);
router.post('/groupChat', protect, createGroupChat);
router.put('/renameGroup', protect, renameGroup);
router.put('/addToGroup', protect, addToGroup);
router.put('/removeGroupUser', protect, removeGroupUser);


module.exports = router;
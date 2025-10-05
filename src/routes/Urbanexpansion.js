const express = require('express');
const router = express.Router();
const Message = require('../models/Urbanexpansion');
const User = require('../models/User');

router.get('/', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    const users = await User.find({});
    const userMap = {};
    users.forEach(u => userMap[u.name] = u);

    const messagesWithLevel = messages.map(msg => {
        const user = userMap[msg.sender];
        const level = user ? user.chatStats.URB.level : 1;
        return { ...msg.toObject(), level };
    });

    res.json(messagesWithLevel);
});

router.post('/', async (req, res) => {
    try {
        const { sender, content } = req.body;
        if (!sender || !content) {
            return res.status(400).json({ error: 'Missing sender or content' });
        }

        let user = await User.findOne({ name: sender });
        if (!user) {
            user = new User({ name: sender });
        }
        user.chatStats.URB.messagesSent += 1;
        user.chatStats.URB.level = Math.floor(user.chatStats.URB.messagesSent / 10) + 1;
        await user.save();

        const message = new Message({ sender, content });
        await message.save();
        res.status(201).json({ ...message.toObject(), level: user.chatStats.URB.level });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
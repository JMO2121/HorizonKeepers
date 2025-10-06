require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('config/database.js'); 

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

app.use('/api/Hidrologymessage', require('./routes/Hidrologymessage'));
app.use('/api/Wastemessages', require('./routes/Wastemessages'));
app.use('/api/Pamessage', require('./routes/Pamessage'));
app.use('/api/Healthmessage', require('./routes/Healthmessage'));
app.use('/api/Electricity', require('./routes/Electricity'));
app.use('/api/Agriculture', require('./routes/Agriculture'));
app.use('/api/Urbanexpansion', require('./routes/Urbanexpansion'));

app.listen(port);
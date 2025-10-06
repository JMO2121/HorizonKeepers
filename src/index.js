require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

// Cambia los endpoints a minúsculas
app.use('/api/hidrologymessage', require('./routes/Hidrologymessage'));
app.use('/api/wastemessages', require('./routes/Wastemessages'));
app.use('/api/pamessage', require('./routes/Pamessage'));
app.use('/api/healthmessage', require('./routes/Healthmessage'));
app.use('/api/electricity', require('./routes/Electricity'));
app.use('/api/agriculture', require('./routes/Agriculture'));
app.use('/api/urbanexpansion', require('./routes/Urbanexpansion'));

app.listen(port);
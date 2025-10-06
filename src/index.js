require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/database'); 

const app = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api/hidrologymessage', require('./routes/Hidrologymessage'));
app.use('/api/wastemessages', require('./routes/Wastemessages'));
app.use('/api/pamessage', require('./routes/Pamessage'));
app.use('/api/healthmessage', require('./routes/Healthmessage'));
app.use('/api/electricity', require('./routes/Electricity'));
app.use('/api/agriculture', require('./routes/Agriculture'));
app.use('/api/urbanexpansion', require('./routes/Urbanexpansion'));

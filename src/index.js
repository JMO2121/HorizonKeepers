const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/HorizonKeepers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

const hidrossageRoutes = require('./routes/Hidrologymessage');
app.use('/api/Hidrologymessage', hidrossageRoutes);

const wastemessageRoutes = require('./routes/Wastemessages');
app.use('/api/wastemessages', wastemessageRoutes);

const PARoutes = require('./routes/Pamessage');
app.use('/api/Pamessage', PARoutes);

const HERoutes = require('./routes/Healthmessage');
app.use('/api/Healthmessage', HERoutes);

const ElectricityRoutes = require('./routes/Electricity');
app.use('/api/Electricity', ElectricityRoutes);

const AgricultureRoutes = require('./routes/Agriculture');
app.use('/api/Agriculture', AgricultureRoutes);

const UrbanexpansionRoutes = require('./routes/Urbanexpansion');
app.use('/api/Urbanexpansion', UrbanexpansionRoutes);

cron.schedule('0 0 * * *', () => {
  console.log('Restarting server...');
  process.exit();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
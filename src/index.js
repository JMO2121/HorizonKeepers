require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});


const hidrologyRoutes = require('./routes/Hidrologymessage');
const wasteRoutes = require('./routes/Wastemessages');
const paRoutes = require('./routes/Pamessage');
const healthRoutes = require('./routes/Healthmessage');
const electricityRoutes = require('./routes/Electricity');
const agricultureRoutes = require('./routes/Agriculture');
const urbanExpansionRoutes = require('./routes/Urbanexpansion');

app.use('/api/Hidrologymessage', hidrologyRoutes);
app.use('/api/Wastemessages', wasteRoutes);
app.use('/api/Pamessage', paRoutes);
app.use('/api/Healthmessage', healthRoutes);
app.use('/api/Electricity', electricityRoutes);
app.use('/api/Agriculture', agricultureRoutes);
app.use('/api/Urbanexpansion', urbanExpansionRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

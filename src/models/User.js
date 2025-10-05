const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  chatStats: {
    AGR: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    EL: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    HE: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    hidro: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    PA: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    URB: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } },
    waste: { messagesSent: { type: Number, default: 0 }, level: { type: Number, default: 1 } }
  }
});

module.exports = mongoose.model('User', userSchema);
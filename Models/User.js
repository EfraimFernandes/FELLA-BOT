const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        unique: true
    },
    balance: { type: Number, default: 0 },
    lastDaily: { type: Date, default: null },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

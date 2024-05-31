const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{type: String},
    balance: { type: Number, default: 0 },
    lastDaily: { type: Date, default: null },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

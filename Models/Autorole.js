const mongoose = require('mongoose');

const autoroleSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    roleId: { type: String, required: true },
});

module.exports = mongoose.models.Autorole || mongoose.model('Autorole', autoroleSchema);
//
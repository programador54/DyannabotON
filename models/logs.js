const mongoose = require('mongoose');

const LogsSchema = new mongoose.Schema({
    logs: {
        type: String
    },
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('logs', LogsSchema);

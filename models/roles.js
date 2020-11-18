const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
	roles: {
		type: String
	},
	GuildID: String
});

const MessageModel = (module.exports = mongoose.model('roles', RolesSchema));

const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
	username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true, },
	email: { type: String, required: true, max: 50, unique: true, },
	password: { type: String, required: true, minLength: 6, },
	profilePicture: { type: String, default: "" },
	coverPicture: { type: String, default: "" },
	followers: { type: Array, default: [] },
	followings: { type: Array, default: [] },
	isAdmin: { type: Boolean, default: false, },
	desc: { type: String, maxLength: 50, },
	city: { type: String, maxLength: 50, },
	from: { type: String, maxLength: 50, },
	relationship: { type: Number, enum: [1, 2, 3], maxLength: 50, },
},
	{ timestamps: true, }
)

module.exports = mongoose.model('User', UserSchema)


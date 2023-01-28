const { Schema, default: mongoose } = require("mongoose");

const PostSchema = new Schema({
	userId: { type: String, required: true, },
	desc: { type: String, maxLength: 500, },
	img: { type: String, },
	likes: { type: Array, default: [] },

},
	{ timestamps: true, },
)

module.exports = mongoose.model('Post', PostSchema)


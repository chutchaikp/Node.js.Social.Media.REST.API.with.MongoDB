const { Router } = require("express");
const Post = require('../models/Post')

const router = Router();

// create
router.post('/', async (req, res) => {
	try {
		// const { } = req.body;
		const post = new Post(req.body)
		const saved = await post.save();
		res.status(200).json(saved)
	} catch (error) {
		res.status(500).json(error)
	}
});

// update

// delete

/// like

// get a post

// get all


module.exports = router;
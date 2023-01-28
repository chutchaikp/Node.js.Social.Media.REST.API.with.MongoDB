const { Router } = require("express");
const Post = require('../models/Post');
const User = require("../models/User");

const router = Router();

// create
router.post('/', async (req, res) => {
	try {
		const post = new Post(req.body)
		const saved = await post.save();
		res.status(200).json(saved)
	} catch (error) {
		res.status(500).json(error)
	}
});

// update
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { userId, } = req.body;

		const post = await Post.findById(id)

		console.log(post)

		if (!post) {
			return res.status(403).json('Not found!')
		}

		if (post.userId === userId) {
			await post.updateOne({
				$set: req.body,
			})
			res.status(200).json('The post has been updated')
		} else {
			res.status(403).json('You can update only you post')
		}

	} catch (error) {
		res.status(500).json(error)
	}
})

// delete
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { userId, } = req.body;
		const post = await Post.findById(id);

		if (post.userId !== userId) {
			return res.status(403).json('You can remove only your post')
		}

		// await Post.findByIdAndDelete(id);
		await post.deleteOne()
		res.status(200).json(`Post ${id} has been deleted!`)
	} catch (error) {
		res.status(500).json(error)
	}
});

/// like

router.put('/:id/like', async (req, res) => {
	try {
		const { id } = req.params
		const { userId } = req.body
		const post = await Post.findById(id)
		if (post.likes.includes(userId)) {
			// res.status(403).json('You are not like again')
			await post.updateOne({ $pull: { likes: userId, } })
			res.status(200).json('You are dislike this post')
		} else {
			await post.updateOne({ $push: { likes: userId, } })
			res.status(200).json('ok')
		}
	} catch (error) {
		res.status(500).json(error)
	}
});

// get a post
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const post = await Post.findById(id);
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json(error)
	}
}
)

// get timeline post 
router.get('/timeline/all', async (req, res) => {
	try {
		debugger;
		const { userId } = req.body
		const currentUser = await User.findById(userId)
		const userPosts = await Post.find({ userId, })
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId, })
			})
		)
		res.status(200).json(userPosts.concat(...friendPosts))
	} catch (error) {
		res.status(500).json(error)
	}
})


module.exports = router;
const { Router } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/User");
const router = Router();

// router.get('/', (req, res) => {
// 	res.status(200).json({ data: 'test', })
// })

// UPDATE
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { password, } = req.body;

		// await User.findByIdAndUpdate(id, {
		// 	username, email, password: hashedPassword,
		// })

		// CHANGE REQUEST BODY 
		if (password) {
			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(password, salt);
			req.body.password = hashedPassword;
		}

		await User.findByIdAndUpdate(id, {
			$set: req.body,
		})
		const user = await User.findById(id);

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error)
	}

})

// DELETE
router.delete('/:id', async function (req, res) {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id)
		res.status(200).send('ok');
	} catch (error) {
		res.status(500).json(error)
	}
});

// GET A USER
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id)
		const { password, updatedAt, _id, profilePicture, coverPicture,
			followers, following, isAdmin, __v,
			...other } = user._doc;
		res.status(200).json(other)
		// res.status(200).json(user)
	} catch (error) {
		res.status(500).json(error)
	}
})

// FOLLOW A USER
router.put('/:id/follow', async (req, res) => {
	// res.json([{ id: 1, name: 'a product' }])
	debugger;

	try {
		const { id } = req.params;
		const { userId } = req.body;

		const user = await User.findById(id);
		const currentUser = await User.findById(userId)

		if (!user.followers.includes(userId)) {
			await user.updateOne({
				$push: { followers: userId, }
			})
			await currentUser.updateOne({
				$push: { followings: id, }
			})
			res.status(200).send('User has been followed.')
		} else {
			res.status(403).send('You already follow this user!')
		}

		// await User.findByIdAndUpdate(userId, {
		// 	$push: { following: id }
		// })
		// await User.findByIdAndUpdate(d, {
		// 	$push: { followers: userId }
		// })
	} catch (error) {
		res.status(500).json(error)
	}
}
)

// UNFOLLOW A USER
router.put('/:id/unfollow', async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;

		const user = await User.findById(id)
		const currentUser = await User.findById(userId)

		if (user.followers.includes(userId)) {
			await user.updateOne({ $pull: { followers: userId, } })
			await currentUser.updateOne({ $pull: { followings: id, } })

			res.status(200).json('Your are unfollow alreay')
		} else {
			res.status(403).json('You dont follow this user!')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router;


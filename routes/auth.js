const { Router } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/User");
const router = Router()

router.get('/', (req, res) => {
	res.send('GET request to the homepage')
})

router.post('/register', async (req, res) => {
	try {
		const { username, email, password, } = req.body;

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const user = new User({
			username,
			email,
			password: hashedPassword,
		})
		const result = await user.save();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error.message)
	}
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email })
		if (!user) {
			res.status(404).send('User not found!')
			return
		}

		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).send('Wrong password!');
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router;
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express()
const port = 5000

dotenv.config();

//CONNECT TO MONGODB
const mongoose = require('mongoose')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, }, () => {
	console.log('Connected to MongoDB.')
})

// MIDDLEWARE 
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// routes
// app.get('/', (req, res) => res.send('Hello World!!!!'))
// app.get('/user', (req, res) => res.send('Get user'))

// app.post('/update', function (req, res) {
// 	const { name, description } = req.body;
// 	res.send(`Name ${name}, desc ${description}`);
// });

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
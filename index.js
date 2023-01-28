const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

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

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
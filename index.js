const express = require('express')
const app = express()
//configure dotenv to manage environment variables
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT
const mongodbCloud = "mongodb+srv://Lamji:Lamji492@cluster0.0rdew.mongodb.net/travel_tracker?retryWrites=true&w=majority"


// const corsOptions = {
// 	origin: ['http://localhost:3000'],
// 	optionsSuccessStatus: 200
// }

mongoose.connection.once('open', () => console.log('Now connected to MongoDB cloud.'))
mongoose.connect(mongodbCloud, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
})


//server setup
const app = express();
const port = process.env.PORT || 3000;
//bodyparser middleware
// app.use(express.json()) //only looks at request where the Content-Type header is JSON
// app.use(express.urlencoded({extended: true})) //allows POST requests to include nested objects

//configure cors
const corsOptions = {
	origin: 'https://lamji.gitlab.io',
	optionsSuccessStatus: 200
}

app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/user')

//use cors as a middleware passing in options
app.use('/api/users', cors(corsOptions), userRoutes)

app.listen(port, () => {
    console.log(`API is now online on port ${ port }`)
})
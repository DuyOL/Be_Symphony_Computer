const express = require('express');
const dotenv = require('dotenv');
const  mongoose  = require('mongoose');
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('Hello World');
})
console.log('process.env.USER_MOGODB', process.env.USER_MOGODB)
console.log('process.env.MONGO_DB', process.env.MONGO_DB)

mongoose.connect(`mongodb+srv://James:FyQNgrJvMhkMR3A1@cluster0.iwyvqx3.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connected to MongoDB success');
})
.catch((err) => {
   console.log(err);   
})
app.listen(dotenv.PORT ,() => {
    console.log(`Server running on port `, + dotenv.PORT);
})
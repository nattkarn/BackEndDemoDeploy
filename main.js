const express = require('express')
const mongoose = require('mongoose')
const nosqlRouter = require('./nosql')
const sqlRouter = require('./sql')

const app = express()


// console.log('MONGODB_URI:',process.env.MONGODB_URI)
// console.log('POSTGRES_URI:',process.env.POSTGRES_URI)
const url = 'mongodb+srv://nattkarn:QT2SvoNO0p3GuJwT@clustermongo.kbhh4ny.mongodb.net/mydb'
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


app.use(express.json())

app.use('/nosql', nosqlRouter)
app.use('/sql', sqlRouter)

app.listen(3000)
const connectToMongo = require("./db");
const express = require('express')
connectToMongo();


const app = express()
const port = 3000

app.use(express.json())


//Available routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/user', require('./routes/user'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Ajit!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const connectToMongo = require("./db");
const express = require('express')
connectToMongo();


const app = express()
const port = 5000

app.use(express.json())


//Available routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/user', require('./routes/user'))
app.use('/api/note', require('./routes/note'))

app.get('/', (req, res) => {
  res.send('Hello Ajit!')
})

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})


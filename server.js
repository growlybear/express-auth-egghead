const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000

// middlewares
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleString()
  res.status(200).send(`Server time is ${localTime}`)
})

app.post('/login', (req, res) => {
  const user = req.body.username
  res.status(200).send(`User ${user} attempting to login`)
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

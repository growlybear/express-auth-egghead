const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 4000

// users 'db' ☠️
const users = [
  { id: 1, username: "admin", password: "admin" },
  { id: 2, username: "guest", password: "guest" },
]

// middlewares
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleString()
  res.status(200).send(`Server time is ${localTime}`)
})

app.post('/login', (req, res) => {
  const user = req.body.username
  const pass = req.body.password
  const found = users.find(u => u.username === user && u.password === pass)
  if (!user || !pass) {
    res.status(400).end(`Username and password required`)
  }
  if (!found) {
    res.status(401).end(`User not found`)
  }
  const token = jwt.sign({
    sub: found.id,
    username: found.username
  }, 'mysupersecretkeythingy', {
    expiresIn: '3 hours'
  })
  res.status(200).send({ access_token: token })
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

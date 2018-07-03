const express = require('express')

const app = express()
const PORT = process.env.PORT || 4000

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleString()
  res.status(200).send(`Server time is ${localTime}`)
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

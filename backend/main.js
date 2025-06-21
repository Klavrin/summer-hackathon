const express = require('express')
const app = express()
const PORT = 3000

const helloController = require('./controllers/hello-controller')

// middleware
app.use(express.json())

app.get('/', helloController)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

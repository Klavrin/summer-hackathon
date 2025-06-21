import express from 'express'
import helloController from './controllers/hello-controller.js'
import getTranscriptController from './controllers/get-transcript.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', helloController)
app.post('/get-transcript', getTranscriptController)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

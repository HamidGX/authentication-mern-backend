import express from 'express'

const app = express()

app.use(express.json()) // for parsing application/json

app.get('/', (_req, res) => {
	res.send('Hello World')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log('Server is running on port 3000')
})
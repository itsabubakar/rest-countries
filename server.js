require('dotenv').config()
const cors = require('cors')

const express = require('express')
const path = require('path')
const app = express()

app.use(cors())


// Routes
app.use('/', require('./routes/All'))
app.use('/countries', require('./routes/countries'))
app.use('/continent', require('./routes/continent'))

//* Serve static assets in production, must be at this location of this file

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
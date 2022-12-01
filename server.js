require('dotenv').config()
const cors = require('cors')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())


// Routes
app.get('/', require('./routes/All'))
app.use('/countries', require('./routes/countries'))
app.use('/continent', require('./routes/continent'))


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
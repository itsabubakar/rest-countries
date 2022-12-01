const express = require('express')
const router = express.Router()

router.route('/').get((req, res) => {
    res.send('Continents route!')
})

module.exports = router
const express = require('express')
const router = express.Router()
const axios = require("axios")

let getAll = async () => {
    let response = axios("https://restcountries.com/v3.1/all")
    return response
}

router.route('/').get(async (req, res) => {
    let { data } = await getAll()

    const page = parseInt(req.query.page)
    const limit = 8

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit
        }
    }


    results.resultInfo = await data.slice(startIndex, endIndex)
    console.log('request hit')
    res.send(results)
})

module.exports = router
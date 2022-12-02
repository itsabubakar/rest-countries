const express = require('express')
const router = express.Router()
const axios = require("axios")

let getAll = async () => {
    let resp = axios.get("https://restcountries.com/v3.1/all")
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error.code)
            return error.code
        })

    return resp
}


router.route('/').get(async (req, res) => {


    const page = parseInt(req.query.page)
    const limit = 8

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
        let data = await getAll()
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
    } catch (error) {
        res.send(error)
    }


})

module.exports = router
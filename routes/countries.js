const express = require('express')
const router = express.Router()
const axios = require("axios")

let getCountry = async (name) => {
    let response = axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    return response
}

router.route('/').get(async (req, res) => {
    try {
        let name = req.query.name
        let { data } = await getCountry(name)


        console.log('request hit')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router
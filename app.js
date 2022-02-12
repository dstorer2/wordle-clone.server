const express = require('express');
const app = express();
const port = 1234;
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

app.use(cors());

const searchDictionary = async word => {
    let validWord = false;
    await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`)
        .then(res => {
            res.data[0].meta !== undefined ? validWord = true : null
        })
        .catch(err => console.log(err))
    return validWord;
}

app.get('/api/:word', async (req, res) => {
    const result = await searchDictionary(req.params.word)
    res.send({
        valid: result
    })
})



app.listen(port, () => {
    console.log(`wordle-clone server listening on port ${port}`)
})
const express = require('express')
const settings = require('./settings')
const { Configuration, OpenAIApi } = require('openai')
const app = express()
const port = 3030

const configuration = new Configuration({
    organization: "org-3SRdJ2nJnnolqEoHq8z6jqHN",
    apiKey: settings.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {

    const response = await openai.listModels();
    res.json(response.data)
})

app.listen(port, () => {
    console.log(`APP HAS STARTED`)
})
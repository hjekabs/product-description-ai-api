const express = require('express')
const settings = require('./settings')
const { Configuration, OpenAIApi } = require('openai')
const app = express()
const port = 8000

app.use(express.json());

const configuration = new Configuration({
    organization: "org-3SRdJ2nJnnolqEoHq8z6jqHN",
    apiKey: settings.OPENAI_API_KEY,
});


function generatePrompt(title, keywords, description) {
    return `Generate product descriptions for:
    
    Product Title: ${title}
    Product Keywords: ${keywords.join()}
    Product Description: ${description}
    `
}

const openai = new OpenAIApi(configuration);

app.get('/health', async (req, res) => {
    res.send("OK")
})


app.post('/descriptions', async (req, res) => {

    console.log(req.body)

    const { title, keywords, description } = req.body

    const prompt = generatePrompt(title, keywords, description)

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0.6
    })


    res.json({ text: completion.data })
})

app.listen(port, () => {
    console.log(`APP HAS STARTED`)
})
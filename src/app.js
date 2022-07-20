const express = require('express')
const cors = require('cors')
const settings = require('./settings')
const { Configuration, OpenAIApi } = require('openai')
const { Shopify } = require('@shopify/shopify-api')
const app = express()
const port = 8000

app.use(express.json());
app.use(cors())

const configuration = new Configuration({
    organization: "org-3SRdJ2nJnnolqEoHq8z6jqHN",
    apiKey: settings.OPENAI_API_KEY,
});


const shopify = Shopify.Context.initialize({
    API_KEY: settings.SHOPIFY_API_KEY,
    API_SECRET_KEY: settings.SHOPIFY_API_SECRET_KEY,
    SCOPES: [settings.SHOPIFY_SCOPES],
    HOST_NAME: settings.SHOPIFY_HOST.replace(/https?:\/\//, ""),
    HOST_SCHEME: settings.SHOPIFY_HOST_SCHEME,
    // IS_EMBEDDED_APP: { boolean },
    // API_VERSION: Shopify.ApiVersion.{ version }
});


const ACTIVE_SHOPIFY_SHOPS = {}

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

    const { title, keywords, description } = req.body

    const prompt = generatePrompt(title, keywords, description)

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0.6,
        n: 1,
        max_tokens: 80,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })

    const { choices } = completion.data

    res.json({ choices })
})


app.get("/shopify/login", async (req, res) => {
    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        settings.SHOPIFY_SHOP,
        "http://localhost:3000/callback",
        false
    )
    return res.send(authRoute)
})


app.get("/shopify/auth/callback", async (req, res) => {
    try {
        const session = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query
        )
        ACTIVE_SHOPIFY_SHOPS[SHOP] = session.scope
        console.log(session.accessToken);
    } catch (error) {
        console.log(error)
    }

    console.log(req.query.shop)
    console.log(req.query.host)

    res.send("Auth?")

})


app.listen(port, () => {
    console.log(`APP HAS STARTED`)
})
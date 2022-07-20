require('dotenv').config()

module.exports = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SHOPIFY_SHOP: process.env.SHOPIFY_SHOP,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    SHOPIFY_SCOPES: process.env.SHOPIFY_SCOPES,
    SHOPIFY_HOST: process.env.SHOPIFY_HOST,
    SHOPIFY_HOST_SCHEME: process.env.SHOPIFY_HOST_SCHEME
}
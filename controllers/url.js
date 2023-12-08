const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res){
    const body = req.body
    if(!body.url) return res.status(400).json({error: 'URL is required'})
    const shortID = shortid()

    const result = await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    }) 

    return res.json({ shortId : shortID})
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId
    const result = await URL.findOne({
        shortId: shortId,
    })
    return res.json({ 
        totalClicks : result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
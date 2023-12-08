const express = require('express')
const {connectToMongoDB} = require('./connection')
const URL = require('./models/url')

const urlRoute = require('./routes/url')

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log('MongoDB is connected'))

const app = express()
const port = 8000

app.use(express.json())

app.use('/url', urlRoute)

app.get('/:shortId', async(req, res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push : {
        visitHistory:{ 
            timestamp: Date.now(),
        },
    }})

    res.redirect(entry.redirectURL);
} )



app.listen(port, ()=> console.log(`Server is running on port ${port}`))
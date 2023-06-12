const express = require('express')
const path = require('path')
const url = require('url')
const axios = require('axios')
const { json } = require('body-parser')

const app = express()
const port = 4000

app.listen(port, () => {
    console.log(`App listening at - http://localhost:${port}`)
})

app.get('/', (req, res) =>{
    // res.contentType('html')
    res.sendFile(path.join(__dirname, 'index.html'))
    // console.log(__dirname + '\\index.html')
    // console.log(path.join(__dirname, 'index.html'))
    // res.end()
})

app.get('/data', (req, res) =>{
    const newsApiUri = 'https://newsapi.org/v2/everything'
    const apiKey = 'f470b9130ae94c28b1e50b615112934f'
    
    // console.log(url.parse(req.url, true).query)
    const searchParams = url.parse(req.url, true).search
    // console.log(url.parse(req.url, true).search)
    // console.log(req.url.search)
    //  Remove pageSize
    const searchUri = newsApiUri + searchParams + '&pageSize=5' + '&apiKey=' + apiKey
    // console.log(newsApiUri + searchParams + '&pageSize=5' + '&apiKey=' + apiKey)

    axios.get(searchUri)
         .then((response) => {
                // console.log('\n\n ', response)
                // console.log(typeof(response))
                console.log(typeof(response.data))
                res.json(response.data)
                // res.send(response.data)
            })
        .catch((err) => {res.send(err) });
    // console.log('\n\n', newsApiJson)
    // res.send(JSON.stringify(newsApiJson))
    // console.log(((newsApiJson)))
    // res.json({'search' : searchParams})
})
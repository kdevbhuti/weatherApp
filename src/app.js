const geocode = require('../reqHttp/geocode')
const forcast = require('../reqHttp/forcast')
const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.send('halo world')
})


app.get('/weather', (req, res) => {
    if(!req.query.addresh){
        return res.send({
            error: 'Enter a location'
        })
    }

    geocode(req.query.addresh, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({ error })
            }

            return res.send({ 
                forcast: forcastData,
                location 
            })

        })
    })

})



app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running at 4000 port')
})

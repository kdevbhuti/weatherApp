const request = require('request')

forcast = (latitude, longitude, callback) => {
    url = "https://api.darksky.net/forecast/0f8ef8366a5452ddf947db5e93628241/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
   
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather servise!', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is " + response.body.currently.precipProbability + "% chances for rain")
        }
    })
}



module.exports = forcast
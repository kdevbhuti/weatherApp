const request = require('request')


const geocode = (addresh, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(addresh) +".json?access_token=pk.eyJ1IjoiZGV2Ymh1dGkiLCJhIjoiY2swcGRmYzRyMDA1aTNkcDlkM2VvNHB5aCJ9.pgCWnFOhyh27nEC_NtEuHA&limit=1"
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location servise!', undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
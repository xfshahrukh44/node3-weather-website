const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a9297c5d452083ef045ab3ba6069637d/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            const string = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            callback(undefined, string)
        }
    }) 
}

module.exports = forecast
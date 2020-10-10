const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a3aed860043cd05b967d0e7ab76466b3&query=${lattitude},${longitude}&units=m`

    request({ url, json: true }, (error, {body} = {}) => {

        if (error) {
            callback("unable to connect to location services!", undefined)
        }
        else if (body.error) {
            callback("unable to find the location", undefined)
        }
        else {
            let current = body.current
            callback(undefined, `${current.weather_descriptions}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity}.`)
        }
    })
}

module.exports = forecast

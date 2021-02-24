const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=13ea2302f86a2bade550d982032959b2&query=' + latitude + ',' + longitude + ' &units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the weather service!', undefined)

        } else if (response.body.error) {
            callback('unable to find location', undefined)

        } else(
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + '  degrees')

        )

    })

}







module.exports = forecast
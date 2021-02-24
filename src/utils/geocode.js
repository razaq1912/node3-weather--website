const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmF6YXExOTEyIiwiYSI6ImNrbGRnc285YTBtMGQyem1naW5mZzdkeHUifQ.GXj5c8-RmfTyq-lPR0y2Ew'

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location. Try another search!', undefined)
        } else(
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        )

    })
}


geocode('New York', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})


module.exports = geocode
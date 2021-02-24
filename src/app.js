const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define path for Express config and views location
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Razaq'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'about me',
        name: 'Razaq'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'It is always good to help one another',
        title: 'Help',
        name: 'Razaq'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' Please provide an address'
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })

        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })

            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'

        })

    }


    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Razaq',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {

    res.send('my 404 page')


})
app.listen(3000, () => {
    console.log('server is up on port 3000')
});
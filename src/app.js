const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pradeep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pradeep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Pradeep'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address, (geocodeError, {lattitude, longitude, location} = {}) => {
        if(geocodeError){
            console.log(geocodeError);
            
            return res.send({
                error: geocodeError
            })
        }
        forecast(lattitude, longitude, (forecastError, data) => {
            if(forecastError){
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Pradeep',
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Pradeep',
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
})


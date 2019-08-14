const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//app.set() allows us to set a value for a specific express setting

//tell express which template engine weve installed (in this case handlebars), set 'views' directory AND register partials directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//declare directory thatll be available to public by the server 'app'
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Shahrukh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shahrukh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Press F11 to enter/exit fullscreen',
        title: 'Help',
        name: 'Shahrukh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
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
    if(!req.query.search){
        return res.send({
            error: 'you must provide a seach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR: 404',
        errorMessage: 'Help article not found',
        name: 'Shahrukh'
    })
})

//setting up 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR: 404',
        errorMessage: 'Page not found',
        name: 'Shahrukh'
    })
})


//below code starts the server on port 3000
app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})
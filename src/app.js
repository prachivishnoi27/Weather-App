const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express');

const app = express();

// configuring path
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialDirectoryPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

// static files 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Made by Prachi with love'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Made by Prachi with love'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page',
        name: 'Made by Prachi with love'
    });
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide address in query string'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
      
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
      })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found !!',
        name: 'Made by Prachi with love'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        message: 'Page Not Found',
        name: 'Made by Prachi with love'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})
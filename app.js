// api key e03aa54374d66fb013e1dd3a4c3bbc56

// 1 => Select Elements

const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationEelemnt = document.querySelector('.notification')

// 2=> 
const weather = {}

weather.temperature = {
    unit: 'celcius'
}

const KELVIN = 273

const key = 'e03aa54374d66fb013e1dd3a4c3bbc56'

// check if user's browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else {
    notificationEelemnt.getCurrentPosition.display = 'block'
    notificationEelemnt.innerHTML = "<p> Browser doesn't support geolocation</p>" 
}

// set users position
function setPosition (position) {

    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    getWeather(latitude, longitude)
}

function showError(error) {
    notificationEelemnt.style.display = 'block'
    notificationEelemnt.innerHTML = `<p> Browser ${error.message}</p>` 
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
    .then(res => {
        let data = res.json()
        return data
    })
    .then(data => {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description =data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
    })
    // display weather
    .then(() => {
        displayWeather()
    })
}

// display Weather
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value}&deg;<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

// convert celcius to fahrenite
function celciusToFahrenheit(temperature){
    return (temperature * 9/5) + 32 
}

// 11=> when the user clicks on the temperature element
tempElement.addEventListener('click', () => {
    if(weather.temperature.value === undefined) return

    if(weather.temperature.unit == "celcius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)

        tempElement.innerHTML = `${fahrenheit}&deg;<span>F</span>`
        weather.temperature.unit = "fahrenheit"
    }else{
        tempElement.innerHTML = `${weather.temperature.value}&deg;<span>C</span>`
        weather.temperature.unit = 'celcius'
    }
})
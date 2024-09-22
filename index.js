let submitBtn = document.querySelector('button')
let inputEle = document.querySelector('.search-input') 

inputEle.onchange = (event) => {
  inputEle.value = event.target.value ;
}

submitBtn.onclick = (event) => {
   event.preventDefault()

   const myAPIKey = '93ee102f07afdd5de9f4a7d2134223cd' ;
   const city = inputEle.value

   if (!city) {
     alert('Please Enter the city name')
     return ;
   }

   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}` ;
   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myAPIKey}` ;
                        
   fetch(currentWeatherUrl)
   .then(response => response.json())
   .then(data => {
    displayWeather(data)
   })
   .catch(error => {
    console.log(`Error fetching current weather data: `, error)
    alert(`Error fetching hourly forecast data. Please try Again.`)
   })
   
   fetch(forecastUrl)
   .then(response => response.json())
   .then(data => {
    displayHourlyForecast(data.list)
   })
   .catch(error => {
    console.log(`Error fetching forecast weather data:`, error)
    alert(`Error fetching forecast weather data. Please try Again.`)
   })

}

function displayWeather(data) {
    console.log(data)
    const temp = document.getElementById('temperature') 
    const icon = document.getElementById('weather-icon') 
    const weatherInfo = document.getElementById('weather-info') 
    const forecastInfo = document.getElementById('hourly-forecast')
    
    weatherInfo.innerHTML = ''
    temp.innerHTML = ''
    forecastInfo.innerHTML = ''

    if(data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`
    }else {
        const cityName = data.name 
        const cityTemperature = Math.round(data.main.temp -273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon 
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        
        const cityTemp = `<p id='hourly-heading'>${cityTemperature}°C</p>`

        const weatherHtml = `
        <p id='hourly-heading'>${cityName}</p>
        <p id='hourly-heading'>${description}</p>
        ` 
        temp.innerHTML = cityTemp
        weatherInfo.innerHTML = weatherHtml
        icon.src = iconUrl
        icon.alt= description 
        inputEle.value = ''
        showImage() ;
    }
}

function displayHourlyForecast(hourlyData) {
    console.log(hourlyData)
    const hourlyForecastDiv = document.getElementById('hourly-forecast')
    const next24Hours = hourlyData.slice(0, 40)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000)
        const hour = dateTime.getHours()
        const temperature = Math.round(item.main.temp -273.15)
        const iconCode = item.weather[0].icon 
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        
        const hourlyItemHtml = `
         <div class='hourly-item'>
         <span>${hour}:00</span>
         <img src=${iconUrl} alt='Hourly Img'/>
         <span>${temperature}°C</span>
         </div>
         `
         
         hourlyForecastDiv.innerHTML += hourlyItemHtml
    })

}


function showImage() {
    const weatherIcon = document.getElementById('weather-icon')
    weatherIcon.style.display = 'block' ;
}

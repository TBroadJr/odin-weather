
async function getWeather(location) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b47d3733a07d46bab51152725230511&q=${location}`, {
    mode: 'cors'
  });

  const jsonData = await response.json();

  const region = jsonData.location.name;
  const condition = jsonData.current.condition.text;
  const tempC = jsonData.current.temp_c;
  const tempF = jsonData.current.temp_f;

  const weatherObject = new WeatherInfo(region, condition, tempC, tempF);

  updateDisplay(weatherObject);
}

function WeatherInfo(location, condition, tempC, tempF) {
  return {
    location: location,
    condition: condition,
    tempC: tempC,
    tempF: tempF 
  }
}

function updateDisplay(weatherObject) {

  const locationOutput = document.querySelector("div#Location");

  const conditionOutput = document.querySelector('div#Condition');

  const TempCOutput = document.querySelector('div#TempC');

  const TempFOutput = document.querySelector('div#TempF');

  locationOutput.textContent = 'Location: ' + weatherObject.location;

  conditionOutput.textContent = 'Condition: ' + weatherObject.condition;

  TempCOutput.textContent = 'Temp C: ' + weatherObject.tempC;

  TempFOutput.textContent = 'Temp F: ' + weatherObject.tempF;
}

const searchInput = document.querySelector('input');


const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
  getWeather(searchInput.value)
  .catch((errorMessage) => {
    console.log('Get Weather Error: ' + errorMessage);
  })
})

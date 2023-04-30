//блок з погодою отримуємо доступ
const weatherBlock = document.querySelector('#weather');

//основна ф-ція підвантаження данних
async function loadWeather(e) {
  weatherBlock.innerHTML = `
    <div class="weather__loading">
    <img src="img/loading.gif" alt="Loading..."></div>`;

  //будуємо підвантаження даних
  const server =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=d412d04b2b2237c703d8325e8d66f44b';
  const response = await fetch(server, {
    method: 'GET',
  });

  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  //обробляємо та виводимо дані
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  //HTML шаблон
  const template = `<div class="weather__header">
          <div class="weather__main">
          <div class="weather__city">${location}</div>
          <div class="weather__status">${weatherStatus}</div>
          </div>
        <div class="weather__icon">
          <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
      </div>
      <div class="weather__temp">${feelsLike}</div>
      <div class="weather__feels-like">Feels like: ${temp}</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}

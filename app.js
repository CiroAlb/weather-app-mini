const cities = [
    "Buenos Aires, Argentina",
    "New York, USA",
    "Tokyo, Japan",
    "London, UK",
    "Paris, France",
    "Sydney, Australia",
    "Berlin, Germany",
    "Moscow, Russia",
    "Toronto, Canada",
    "Mexico City, Mexico",
    "Beijing, China",
    "São Paulo, Brazil",
    "Mumbai, India",
    "Cairo, Egypt",
    "Istanbul, Turkey",
    "Seoul, South Korea"
];



async function getWeatherData(city) {
    const apiKey = '6AJP6P87WH3LAGNF4A55QYPFH';
    let selectedCity = city;
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(selectedCity)}?key=${apiKey}`;

    const response = await fetch(URL, {mode: 'cors'});
    const Data = await response.json();
    console.log(Data);

    const tempC = Math.trunc((Data.currentConditions.temp-32)*5/9);
    const tempRender = document.getElementById("temp");
    tempRender.textContent = tempC;

    const hoursEarly = Math.trunc((Data.days[0].hours[6].temp -32)*5/9);
    const earlyIcon = `./icon/${Data.days[0].hours[6].icon}.svg`;
    const hoursMidDay = Math.trunc((Data.days[0].hours[12].temp -32)*5/9);
    const midDayIcon = `./icon/${Data.days[0].hours[12].icon}.svg`;
    const hoursAfternoon = Math.trunc((Data.days[0].hours[15].temp -32)*5/9);
    const afternoonIcon = `./icon/${Data.days[0].hours[15].icon}.svg`;
    const hoursNight = Math.trunc((Data.days[0].hours[21].temp -32)*5/9);
    const nightIcon = `./icon/${Data.days[0].hours[21].icon}.svg`;
    
    const hoursEarlyRender = document.getElementById("morning-text");
    hoursEarlyRender.textContent = hoursEarly + "°";
    document.getElementById("morning-icon").src = earlyIcon;

    const hoursMidDayRender = document.getElementById("mid-day-text");
    hoursMidDayRender.textContent = hoursMidDay + "°";
    document.getElementById("mid-day-icon").src = midDayIcon;

    const hoursAfternoonRender = document.getElementById("afternoon-text");
    hoursAfternoonRender.textContent = hoursAfternoon + "°";
    document.getElementById("afternoon-icon").src = afternoonIcon;

    const hoursNightRender = document.getElementById("night-text");
    hoursNightRender.textContent = hoursNight + "°";
    document.getElementById("night-icon").src = nightIcon;

    const address = Data.address;
    const addressRender = document.getElementById("address-text");
    addressRender.textContent = address;

    const currentDay = Data.days[0].datetime;
    const currentDayRender = document.getElementById("day-text");
    currentDayRender.textContent = currentDay;

    const description = Data.description;
    const descriptionRender = document.getElementById("description-text");
    descriptionRender.textContent = description;

    const temMax = Math.trunc((Data.days[0].tempmax - 32)*5/9);
    const tempMaxRender = document.getElementById("max-temp");
    tempMaxRender.textContent = temMax;

    const temMin = Math.trunc((Data.days[0].tempmin - 32)*5/9);
    const tempMinRender = document.getElementById("min-temp");

    const date = new Date(currentDay);
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfWeekRender = document.getElementById("week-day-render");
    dayOfWeekRender.textContent = dayOfWeek;

    const icon = document.getElementById("icon");
    icon.src= `./icon/${Data.currentConditions.icon}.svg`;


// Obtener los elementos del DOM
const searchButton = document.getElementById('search-button');
const citySelector = document.getElementById('city-selector');
const cityList = document.getElementById('city-list');
const addressText = document.getElementById('address-text');

// Mostrar el selector de ciudades al hacer clic en el botón
searchButton.addEventListener('click', () => {
  citySelector.classList.toggle('hidden'); // Mostrar/ocultar el div
});

// Crear la lista de ciudades en el div flotante
cities.forEach(city => {
  const listItem = document.createElement('li');
  listItem.textContent = city;
  listItem.addEventListener('click', () => {
    selectedCity = city; // Actualizar la ciudad seleccionada
    addressText.textContent = city; // Actualizar el texto del botón
    citySelector.classList.add('hidden'); // Ocultar el div después de la selección
    console.log(`Ciudad seleccionada: ${selectedCity}`);
    getWeatherData(selectedCity);
  });
  cityList.appendChild(listItem);
});
}

getWeatherData("Buenos Aires, Argentina");

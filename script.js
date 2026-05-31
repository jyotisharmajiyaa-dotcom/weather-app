
async function getWeather() {

    const city = document.getElementById("city").value;

    if (!city) {
        alert("City enter karo");
        return;
    }

    // Show loading
    document.getElementById("loading").style.display = "block";

    // Step 1: city -> lat/lon
    const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geo.json();

    if (!geoData.results) {
        alert("City not found");
        document.getElementById("loading").style.display = "none";
        return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // Step 2: weather API
    const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await weather.json();

    const code = data.current_weather.weathercode;

    // Condition + Icon
    let condition = "";
    let icon = "";

    if (code === 0) { condition = "Clear Sky"; icon = "☀️"; }
    else if (code <= 3) { condition = "Cloudy"; icon = "⛅"; }
    else if (code <= 48) { condition = "Fog"; icon = "🌫️"; }
    else if (code <= 67) { condition = "Rain"; icon = "🌧️"; }
    else if (code <= 77) { condition = "Snow"; icon = "❄️"; }
    else { condition = "Unknown"; icon = "🌈"; }

    // Background change
    if (code === 0) document.body.className = "sunny";
    else if (code <= 3) document.body.className = "cloudy";
    else document.body.className = "rainy";

    // Show data
    document.getElementById("weatherIcon").innerText = icon;

    document.getElementById("cityName").innerText =
        geoData.results[0].name;

    document.getElementById("temperature").innerText =
        "Temperature: " + data.current_weather.temperature + "°C";

    document.getElementById("windspeed").innerText =
        "Wind Speed: " + data.current_weather.windspeed + " km/h";

    document.getElementById("humidity").innerText =
        "Humidity: ~60%";

    document.getElementById("condition").innerText =
        "Condition: " + condition;

    // Hide loading
    document.getElementById("loading").style.display = "none";
}
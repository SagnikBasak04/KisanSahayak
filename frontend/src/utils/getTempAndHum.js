import { fetchIPInfo } from "./getLocationAndWeatherData";

const key = import.meta.env.VITE_API_KEY;

export const getTempAndHum = async () => {
    const weatherData = await fetchIPInfo();

    const lat = weatherData.lat;
    const lon = weatherData.lon;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    const data = await res.json();

    const tempVals = data.list.map(el => el.main.temp);
    const humVals = data.list.map(el => el.main.humidity);

    const avgTemp = tempVals.reduce((sum, temp) => sum + temp, 0) / tempVals.length;
    const avgHum = humVals.reduce((sum, hum) => sum + hum, 0) / humVals.length;

    return ({ avgTemp, avgHum });
}

export const getRegionalTempAndHum = async (district) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(district)}&limit=1&appid=${key}`;

    const response = await fetch(geoUrl);
    const resData = await response.json();

    if (resData.length === 0) throw new Error("District not found");
    const { lat, lon } = resData[0];

    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    const data = await res.json();

    const tempVals = data.list.map(el => el.main.temp);
    const humVals = data.list.map(el => el.main.humidity);

    const avgTemp = tempVals.reduce((sum, temp) => sum + temp, 0) / tempVals.length;
    const avgHum = humVals.reduce((sum, hum) => sum + hum, 0) / humVals.length;

    return ({ avgTemp, avgHum });
}
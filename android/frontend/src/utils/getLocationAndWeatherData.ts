import { env_data } from "../data/Rainfall_Soil.json";

interface WeatherDataProps {
    District: string;
    ACTUAL: number;
    NORMAL: number;
    DEP: number;
    N: number;
    P: number;
    K: number;
    pH: number;
}

const getLocationAndWeather = async () => {
    try {
        const res = await fetch('https://api.ipify.org');
        const data = res.text();

        return data;
    } catch (error) {
        console.log("Failed to fetch ip");
    }
}

export const fetchIPInfo = async () => {
    try {
        const ip = await getLocationAndWeather();
        if (!ip) {
            throw new Error("IP address could not be fetched.");
        }

        const res = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Failed to fetch location");
    }
}

export const fetchWeatherInfo = async (): Promise<WeatherDataProps | null> => {
    try {
        const district = await fetchIPInfo();

        if (district.city) {
            const matchedDistrict = env_data.find(
                (data) => data.District.toUpperCase() === district.city.toUpperCase()
            );

            if (matchedDistrict) {
                return matchedDistrict;
            } else {
                console.log(`No data found for the district: ${district.city}`)
                return null;
            }
        } else {
            console.log("Could not retrieve district name");
            return null;
        }
    } catch (error) {
        console.log("Failed to fetch weather info");
        return null;
    }
}

export const getRegionalWeather = (district: string) => {
    const matchedDistrict = env_data.find(
        (data) => data.District.toUpperCase() === district.toUpperCase()
    );

    if (matchedDistrict) {
        return matchedDistrict;
    } else {
        console.log(`No data found for the district: ${district}`);
    }
}

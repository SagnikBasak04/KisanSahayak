import toast from "react-hot-toast";
import { env_data } from "../data/Rainfall_Soil.json";

const getLocationAndWeather = async () => {
    try {
        const res = await fetch('https://api.ipify.org');
        const data = res.text();

        return data;
    } catch (error) {
        toast.error(error.message);
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
        toast.error(error.message);
        console.log("Failed to fetch location");
    }
}

export const fetchWeatherInfo = async () => {
    try {
        const district = await fetchIPInfo();
        console.log(district)

        if (district.city) {
            const matchedDistrict = env_data.find(
                (data) => data.District.toUpperCase().trim().normalize() ===
                    district.city.toUpperCase().trim().normalize()
            );

            console.log(matchedDistrict)

            if (matchedDistrict) {
                return matchedDistrict;
            } else {
                toast.error(`No data found for the district: ${district.city}`);
            }
        } else {
            toast.error("Could not retrieve district name");
        }
    } catch (error) {
        toast.error(error.message);
        console.log("Failed to fetch weather info");
    }
}

export const getRegionalWeather = (district) => {
    const matchedDistrict = env_data.find(
        (data) => data.District.toUpperCase() === district.toUpperCase()
    );

    if (matchedDistrict) {
        return matchedDistrict;
    } else {
        toast.error(`No data found for the district: ${district}`);
    }
}
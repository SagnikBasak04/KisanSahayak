import { useState } from "react"
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { getTempAndHum } from "../utils/getTempAndHum";
import { EXPO_API_URL } from "@env";
import { useAuthContext } from "../context/AuthContext";
import cleanUpToken from "../utils/cleanUpToken";

const useGetAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;
    const { authUser } = useAuthContext();

    const analysis = async () => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const weatherData = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();

            const fetchData = {
                rain: weatherData?.NORMAL,
                soil_N: weatherData?.N,
                soil_K: weatherData?.K,
                soil_P: weatherData?.P,
                soil_pH: weatherData?.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const data = await fetch(`${apiUrl}/dashboard/analysis/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fetchData)
            });
            const res = await data.json();
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, analysis }
}

export default useGetAnalysis;
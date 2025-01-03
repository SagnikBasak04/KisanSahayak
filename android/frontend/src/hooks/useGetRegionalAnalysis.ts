import { useState } from "react"
import { getRegionalWeather } from "../utils/getLocationAndWeatherData";
import { getRegionalTempAndHum } from "../utils/getTempAndHum";
import { EXPO_API_URL } from "@env";
import cleanUpToken from "../utils/cleanUpToken";

const useGetRegionalAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const regionalAnalysis = async (district: string) => {
        const token = await cleanUpToken()
        setLoading(true);
        try {
            const weatherData = getRegionalWeather(district);
            const tempAndHum = await getRegionalTempAndHum(district);

            const fetchData = {
                rain: weatherData!.NORMAL,
                soil_N: weatherData!.N,
                soil_K: weatherData!.K,
                soil_P: weatherData!.P,
                soil_pH: weatherData!.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const data = await fetch(`${apiUrl}/dashboard/regional-analysis`, {
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
    return { loading, regionalAnalysis }
}

export default useGetRegionalAnalysis;
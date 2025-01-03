import { useState } from "react"
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { getTempAndHum } from "../utils/getTempAndHum";
import { useAuthContext } from "../context/AuthContext";

const useGetAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authUser } = useAuthContext();

    const analysis = async () => {
        setLoading(true);
        try {
            const weatherData = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();

            const fetchData = {
                rain: weatherData.NORMAL,
                soil_N: weatherData.N,
                soil_K: weatherData.K,
                soil_P: weatherData.P,
                soil_pH: weatherData.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const data = await fetch(`${apiUrl}/dashboard/analysis/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify(fetchData)
            });
            const res = await data.json();
            return res;
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, analysis }
}

export default useGetAnalysis;
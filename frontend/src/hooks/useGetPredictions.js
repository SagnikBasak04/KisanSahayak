import { useState } from "react"
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { useAuthContext } from "../context/AuthContext";
import { getTempAndHum } from "../utils/getTempAndHum";

const useGetPredictions = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authUser } = useAuthContext();

    const getPredictions = async (url) => {
        setLoading(true);
        try {
            const data = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();
            const fetchData = {
                userId: authUser._id,
                url: url,
                location: data.District,
                rainAct: data.ACTUAL,
                rainNorm: data.NORMAL,
                rainDep: data.DEP,
                soil_N: data.N,
                soil_K: data.K,
                soil_P: data.P,
                soil_pH: data.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const predictions = await fetch(`${apiUrl}/predictions/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                },
                body: JSON.stringify(fetchData)
            });
            const predictedData = await predictions.json();

            return predictedData;
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getPredictions };
}

export default useGetPredictions;
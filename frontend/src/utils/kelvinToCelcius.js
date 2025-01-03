const kelvinToCelsius = (kelvin) => {
    const celsius = parseFloat((kelvin - 273.15).toFixed(2));
    return `${celsius}°C`
};

export default kelvinToCelsius;
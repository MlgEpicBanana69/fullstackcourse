import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherForecast = ({forecast}) => {
    console.log('forecast :>> ', forecast);

    if (forecast === null) {
        return <div>{null}</div>
    }

    let relevantForecast = {
        "temp": `${forecast.current.temperature_2m}${forecast.current_units.temperature_2m}`,
        "weatherCode": forecast.current.weather_code
    }
    let interp = weatherService.weatherInterpertation[relevantForecast.weatherCode]["day"]
    console.log('relevantForecast :>> ', relevantForecast);
    return (
        <>
            {relevantForecast.temp}
            <br/>
            <img src={interp.image} alt={interp.description}/>
        </>
    )
}

const ViewCountry = ({country}) => {
    const [forecast, setForecast] = useState(null)

    useEffect(() => {
        console.log("ViewCountry effect");
        weatherService
            .getTodayAt(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then((data) => setForecast(data))
    }, [country])

    console.log('ViewCountry :>> ', country);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <h3>{country.capital} <WeatherForecast forecast={forecast} /></h3>
            <h3>{country.area}</h3>
            <h2>languages</h2>
            <ul>
                {
                    Object.keys(country.languages).map(languageKey =>
                        <li key={languageKey}>{country.languages[languageKey]}</li>
                    )
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>

    )
}

export default ViewCountry
import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const WeatherReport = ({forecast}) => {
    console.log('forecast :>> ', forecast);

    if (forecast === null) {
        return <div>{null}</div>
    }

    const temperature = `${forecast.current.temperature_2m}${forecast.current_units.temperature_2m}`
    const winds = `${forecast.current.wind_speed_10m}${forecast.current_units.wind_speed_10m}`
    const is_day = forecast.current.is_day ? "day" : "night"
    let interp = weatherService.weatherInterpertation[forecast.current.weather_code][is_day]

    return (
        <>
            <h3>temperature {temperature}</h3>
            <img src={interp.image} alt={interp.description}/>
            <h3>wind {winds}</h3>
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
            <h3>{country.capital}</h3>
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
            <h2>Weather in {country.capital}</h2>
            <WeatherReport forecast={forecast} />
        </div>

    )
}

export default ViewCountry
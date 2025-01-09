import ViewCountry from "./viewCountry"

const ListCountries = ({allCountries, query, setQuery}) => {
    if (query.length === 0) {
        return (
            <div>
                {null}
            </div>
        )
    }

    let matchingCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
        ||
        country.name.official.toLowerCase().includes(query.toLowerCase())
    )
    let identicalCountry = matchingCountries.find(country =>
        country.name.common.toLowerCase() === query.toLowerCase()
        ||
        country.name.official.toLowerCase() === query.toLowerCase()
    )

    console.log('matchingCountries :>> ', matchingCountries);
    console.log('matchingCountries.length :>> ', matchingCountries.length);
    console.log('identicalCountry :>> ', identicalCountry);

    if (identicalCountry || matchingCountries.length === 1) {
        console.log("One match");
        return <ViewCountry country={identicalCountry ? identicalCountry : matchingCountries[0]} />
    }

    if (matchingCountries.length > 10) {
        console.log("too many matches");
        return (
            <h2>Too many matches, specify another filter</h2>
        )
    }

    console.log("Listing matches found");
    return (
        <ul>
            {
                matchingCountries.map(country =>
                    <li key={country.name.common}>{country.name.common} <button onClick={() => setQuery(country.name.common)}>Show</button></li>
                )
            }
        </ul>
    )
}

export default ListCountries


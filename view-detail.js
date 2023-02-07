import { renderCountryDetails } from "./domutils.js";

export const renderDetail = () => {

    console.log(window.location.search) //wyloguje search parameter czyli "?country=KODKRAJU" który jest na koncu URL
    const searchParams = new URLSearchParams(window.location.search);
    const countryCode = searchParams.get('country') //zostawia wszystko oprócz stringa country
    console.log(countryCode)

    if (!countryCode) {
        window.location.href='./'
    }


    const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`

    fetch(API_URL_DETAIL)
    .then(res=>res.json())
    .then(([detail]) => {
        
        detail = {
            capital: detail.capital && detail.capital[0],
            population: detail.population.toLocaleString(),
            name: detail.name.common,
            nativeName: Object.values(detail.name.nativeName)[0].official,
            code: detail.cioc,
            region: detail.region,
            subregion: detail.subregion,
            flagUrl: detail.flags.png,
            currencies: Object.values(detail.currencies)
                .map((currency) => currency.name)
                .join(", "),
            languages: Object.values(detail.languages).join(", "),
            tld: detail.tld[0],
            borders: detail.borders,
        }
        renderCountryDetails(detail)
    })





} // główny zamykacz
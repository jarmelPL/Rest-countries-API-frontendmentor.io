import { renderCountriesList } from "./domutils.js";

export const renderDashboard = () => {
const API_URL_ALL = "https://restcountries.com/v3.1/all"

const inputQuery = document.querySelector('#query');
const selectRegion = document.querySelector('#region')

let countries;

fetch(API_URL_ALL)
    .then(res => res.json())
    .then(countriesRaw => {
        countries = countriesRaw.map(country => {
            return {
                capital: country.capital && country.capital[0],
                population: country.population.toLocaleString(), //toLocaleString oddziela cyfry odstępami typu 100 000 zamiast 100000
                name: country.name.common,
                code: country.cioc,
                region: country.region,
                flagUrl: country.flags.png
            }
        })
        console.log(countriesRaw)
        console.log(countries)
        renderCountriesList(countries)
    });

const inputSearch = () => {
    const countryNames = document.querySelectorAll('.country-name')
    countryNames.forEach(item => {
        if (item.textContent.toLowerCase().indexOf(inputQuery.value.toLowerCase())==-1) {
            item.parentElement.parentElement.parentElement.style.display='none'
        } else {
            item.parentElement.parentElement.parentElement.style.display="list-item";
        }
    })
}


inputQuery.addEventListener('keyup', inputSearch)

    // lub za pomocą filtrowania, analogicznie funkcja z selectem

    // inputQuery.addEventListener("keyup", (e) => {
    //     const inputValue = e.target.value.toLowerCase()
    //     const filteredCountries = countries.filter((item) => 
    //         item.name.toLowerCase().includes(inputValue)
    //     )
    //     renderCountriesList(filteredCountries)
    // })

selectRegion.addEventListener('change', () => {
    inputSearch()

    const countryRegions = document.querySelectorAll('.country-region')

    if (selectRegion.selectedIndex!=0) {
        countryRegions.forEach(item => {
            if (item.parentElement.parentElement.parentElement.style.display=="list-item") {
                if (selectRegion.options[selectRegion.selectedIndex].innerText!=item.innerText) {
                    item.parentElement.parentElement.parentElement.style.display='none'
                }
                else {
                    item.parentElement.parentElement.parentElement.style.display="list-item";
                }
            }
        })
    }
})
}
import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

const mainButton = document.querySelector('h1')
const inputQuery = document.querySelector('#query');
const selectRegion = document.querySelector('#region')
const themeButton = document.querySelector('.theme')
const root = document.querySelector(':root')



if (window.location.search.includes("?country=")) {
    renderDetail()
} else {
    document.querySelector('.filters').classList.add('active')
    renderDashboard()
} 

const returnToDashboard = () => {
    const countryList = document.querySelectorAll('li')
    countryList.forEach(item => {
        item.style.display="list-item"
    })
    inputQuery.value=''
    selectRegion.selectedIndex=0
    window.location.href='./'
}

mainButton.addEventListener('click', returnToDashboard)

themeButton.addEventListener('click', () => {
    if (themeButton.innerText==='Dark theme') {
        themeButton.innerText='Bright theme'
        root.style.setProperty('--color-light-mode-background', 'hsl(207, 26%, 17%)')
    } else if (themeButton.innerText==='Bright theme') {
        themeButton.innerText='Dark theme'
        root.style.setProperty('--color-light-mode-background', 'hsl(0, 0%, 98%)')
    }

})

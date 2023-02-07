const createInfoElement = (labelName, value) => { //4. funkcja tworzy diva i jego zawartosc wg parametrów funkcji
    const infoElement = document.createElement("div")

    const labelElement = document.createElement("strong")
    labelElement.innerText=labelName
    const valueElement = document.createElement("span")
    valueElement.innerText=value

    infoElement.append(labelElement, valueElement)

    return infoElement
}

const createRegionElement = item => {   // 4. to samo co wyzej, ale potrzebowalem dodac klasę do tego elementu, zeby pozniej moc go pobrac i wg niego zrobic wyszukiwanie
    const regionElement = document.createElement("div")

    const regionLabelElement = document.createElement("strong")
    regionLabelElement.innerText='Region: '
    const regionValueElement = document.createElement("span")
    regionValueElement.innerText=` item.region`
    regionValueElement.classList.add('country-region')

    regionElement.append(regionLabelElement, regionValueElement)

    return regionElement;
}

const createFlagImgElement = item => { // 4 funkcja tworzy img opakowany w container div (zeby sie lepiej stylowało)

    const imgContainerElement = document.createElement("div");
    const imgElement = document.createElement("img")
    imgElement.src = item.flagUrl;
    imgElement.alt = `${item.name} flag`;

    imgContainerElement.appendChild(imgElement)

    return imgContainerElement
}


const createCountryItemElement = (item) => { //3. funckja tworzy li i dodaje do niego diva z zawartoscia: country name oraz img, population, region i capital jako wynik funkcji 4
    const countryElement = document.createElement("li");

    const anchorElement = document.createElement("a")
    anchorElement.href=`?country=${item.code}`

    const infoContainerElement = document.createElement("div")
    infoContainerElement.classList.add('info-container')

    const countryNameElement = document.createElement("span")
    countryNameElement.innerText=item.name;
    countryNameElement.classList.add('country-name')

    

    infoContainerElement.append(countryNameElement, createInfoElement("Population: ",item.population), createRegionElement(item), createInfoElement("Capital: ",item.capital))
    
    anchorElement.append(createFlagImgElement(item), infoContainerElement)

    countryElement.appendChild(anchorElement)

    return countryElement
}

const createListElement = countries => { // 2. funckja tworzy ul i dodaje do niej li każdego elementu tablicy countries
    const listElement = document.createElement("ul");
    countries.forEach((item) => {
        listElement.appendChild(createCountryItemElement(item))
    });

    return listElement
}


export const renderCountriesList = countries => { //1. funkcja dodaje UL do maina
    const rootElement = document.querySelector('#root')

    rootElement.innerHTML=""

    rootElement.appendChild(createListElement(countries)) //następna funkcja zwraca listElement, dlatego on będzie tu użyty do appendChild


    console.log(countries)
    //render country items into main element
}









// DETAIL

const createDetailElement = detail => { //2
    const detailContainerElement = document.createElement("div")
    detailContainerElement.classList.add("detail-container")

    const flagImgElement = createFlagImgElement(detail)

    const detailContentElement = document.createElement("div")
    detailContentElement.classList.add("detail-content")

    const detailNameElement = document.createElement('strong')
    detailNameElement.innerText=detail.name;
    detailNameElement.classList.add('detail-name')



    detailContainerElement.appendChild(flagImgElement)
    detailContentElement.appendChild(detailNameElement)

    const leftColumnElement = document.createElement('div');

    leftColumnElement.append(
        createInfoElement("Native name:", detail.nativeName),
        createInfoElement("Population:", detail.population),
        createInfoElement("Region:", detail.region),
        createInfoElement("Sub region:", detail.subregion),
        createInfoElement("Capital:", detail.capital))

    const rightColumnElement = document.createElement('div');

    rightColumnElement.append(
        createInfoElement("Top level domain:", detail.tld),
        createInfoElement("Currencies:", detail.currencies),
        createInfoElement("Languages:", detail.languages))


    detailContentElement.append(leftColumnElement,rightColumnElement)
    
    detailContentElement.appendChild(createBorderCountriesContainer(detail))

    
    detailContainerElement.appendChild(detailContentElement)

    return detailContainerElement
}

const createDetailButton = (text, link) => { // 1 + 2 (tworzenie buttonow zarowno dla kroku 1 jak i 2)
    const anchor = document.createElement("a")
    anchor.innerText=text
    anchor.classList.add('detail-button')
    anchor.href=link;

    return anchor
}

const createBorderCountriesContainer = detail => { //2
    if (!detail.borders || detail.borders.length === 0) { //zabezpieczenie gdyby panstwo dane nie miało granic zeby sie nic nie wykrzaczyło
        return;
    }
    const borderCountriesContainerElement = document.createElement("div")
    borderCountriesContainerElement.classList.add('border-countries-container')

    const labelElement = document.createElement('strong')
    labelElement.innerText="Border Countries"

    borderCountriesContainerElement.appendChild(labelElement)

    detail.borders.forEach(border => {
        borderCountriesContainerElement.appendChild(createDetailButton(border,`./?country=${border}`))
    })

    return borderCountriesContainerElement;
}


export const renderCountryDetails = detail => { // 1
    const rootElement = document.querySelector('#root')

    rootElement.innerHTML=""

    rootElement.appendChild(createDetailButton('Back',"./"))
    rootElement.appendChild(createDetailElement(detail))
}
const search = document.querySelector(".search");

async function searchInvite(event) {
    event.preventDefault();
    
    const input = document.querySelector("input").value;
    
    if (input !== '') {
        clearInfo()
        showWarning("Carregando...")

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=19f7325e41a203c0b149b50460eb2bf1&units=metric&lang=pt_br`

        const results = await fetch(url)
        const resultsJson = await results.json()

        if (resultsJson.cod === 200) {
            showInfo({
                name: resultsJson.name,
                temperature: resultsJson.main.temp,
                country: resultsJson.sys.country,
                weatherIcon: resultsJson.weather[0].icon,
                windSpeed: resultsJson.wind.speed,
                windAngle: resultsJson.wind.deg 
            })
        } else {
            clearInfo()
            showWarning("Localização não encontrada...")
        }
    }
}

function clearInfo() {
    showWarning('')
    document.querySelector(".content").style.display = "none"
}

function showInfo(json) {
    showWarning("")
    
    document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`
    document.querySelector(".degrees").innerHTML = `${json.temperature} <sup>°C</sup>`
    document.querySelector(".km").innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector(".image-climate").setAttribute("src", `http://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`) 
    document.querySelector(".wind-rotate").style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector(".content").style.display = "block"
}

function showWarning(message) {
    const warning = document.querySelector(".aviso");
    warning.innerHTML = message;
}

search.addEventListener("submit", searchInvite);
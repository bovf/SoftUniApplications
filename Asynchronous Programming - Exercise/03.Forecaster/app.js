function attachEvents() {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener("click", solve);
    function solve() {
        const locationInput = document.getElementById('location').value;
        const locationURL = `http://localhost:3030/jsonstore/forecaster/locations`;
        const forecastDiv = document.getElementById('forecast');
        getLocation(locationURL);
        
        async function getLocation(url) {
            try{
                const response = await fetch(url);
                if (response.ok === false | locationInput === '') {
                    throw new Error ('Kur Greshka');
                }
                handleResponse(response);
            } catch (error) {
                handleError(error);
            }

        }
        
        async function handleResponse(response) {
            const data =  await response.json();
            try {
                const locationObj = data.find(el => el.name == locationInput);
                // console.log(locationObj);
                const locationCode = locationObj.code;
                getCurrent(locationCode);
                getThreeDayForecast(locationCode);
                forecastDiv.style.display = "block";
                
            } catch (error) {
                console.log(error);
            }

        }
        function handleError(error) {
            forecastDiv.style.display = "none";
            console.log(error.message);

        }
        async function getCurrent(code) {
            const response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            const data = await response.json();
            const currentDiv = document.getElementById('current');
            const divForecasts = document.createElement('div');
            const spanSymbol = document.createElement('span');
            const spanCondition = document.createElement('span');
            const forecastData1 = document.createElement('span');
            const forecastData2 = document.createElement('span');
            const forecastData3 = document.createElement('span');
            const condtion = data.forecast.condition;
            const high = data.forecast.high;
            const low = data.forecast.low;
            const name = data.name;

            // console.log(data);
            
            // alert(getSymbol(condtion));
            
            divForecasts.classList.add('forecasts');
            spanSymbol.classList.add('symbol');
            spanCondition.classList.add('condition');
            forecastData1.classList.add('forecast-data');
            forecastData2.classList.add('forecast-data');

            
            spanSymbol.textContent = getSymbol(condtion);
            forecastData1.textContent = name;
            forecastData2.textContent = `${low}°/${high}°`;
            forecastData3.textContent = condtion;

            spanCondition.appendChild(forecastData1);
            spanCondition.appendChild(forecastData2);
            spanCondition.appendChild(forecastData3);
            divForecasts.appendChild(spanSymbol);
            divForecasts.appendChild(spanCondition);
            currentDiv.appendChild(divForecasts);



        }
        async function getThreeDayForecast(code) {
            const response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            const data = await response.json();
            console.log(data);

        }

        function getSymbol(weather) {
            // •	Sunny			&#x2600; // ☀
            // •	Partly sunny	&#x26C5; // ⛅
            // •	Overcast		&#x2601; // ☁
            // •	Rain			&#x2614; // ☂
            // •	Degrees		&#176;   // °

            let result = '';
            if (weather === "Sunny") {
                result = "☀";
            } else if (weather === "Partly sunny") {
                result = "⛅";
            } else if (weather === "Overcast") {
                result = "☁";
            } else if (weather === "Rain") {
                result = "☂";
            }
            return result; 
        }

    }

}

attachEvents();
const submitBtn = document.getElementById('submitBtn');
const key = '785543dbdd8d40149f9130836240401';
// {
//     "location": {
//         "name": "Dhaka",
//         "region": "",
//         "country": "Bangladesh",
//         "lat": 23.72,
//         "lon": 90.41,
//         "tz_id": "Asia/Dhaka",
//         "localtime_epoch": 1705675059,
//         "localtime": "2024-01-19 20:37"
//     },
//     "current": {
//         "temp_c": 20.1,
//         "is_day": 0,
//         "condition": {
//             "text": "Clear",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
//             "code": 1000
//         }
//     }
// }

submitBtn.onclick = getData;

function getData() {
    const locationText = document.getElementById('locationInput').value;
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${locationText}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // handle the retrieved data
            updateUI(data);
            console.log('Weather Data:', data);
        })
        .catch(error => {
            // handle errors
            console.error('Error fetching weather data:', error);
        });
}

function updateUI(data) {
    const locationOutput = document.getElementById('location');
    const dateOutput = document.getElementById('dateMonth');
    const tempOutput = document.getElementById('tempCelsius');
    const weather = document.getElementById('weatherDescription');

    // let dateArr = [location.localtime]

    tempOutput.innerHTML = `${data.current.temp_c}&deg;`;
    dateOutput.innerHTML = `${data.location.localtime}`;
    locationOutput.innerHTML = `${data.location.name},${data.location.country}`;
    weather.innerHTML = `${data.current.condition.text}`
}

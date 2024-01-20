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
    const icon = document.getElementById('icon');

    let dateArr = data.location.localtime;
    console.log(dateArr);
    let date = parseInt(dateArr.split("").splice(8, 2).join(""), 10);
    let month = parseInt(dateArr.split("").splice(5, 2).join(""), 10);
    let year = dateArr.split("").splice(0,4).join("");
    const monthArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    console.log(date,monthArr[month-1])
    tempOutput.innerHTML = `${data.current.temp_c}&deg;`;
    dateOutput.innerHTML = `${date} ${monthArr[month-1]} ${year}`;
    locationOutput.innerHTML = `${data.location.name} <br> ${data.location.country}`;
    weather.innerHTML = `${data.current.condition.text}`
    icon.src = `${data.current.condition.icon}`;
}

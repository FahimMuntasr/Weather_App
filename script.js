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
const codeMap = [1000,1003,1006,1009,1030,1063,1066,1069,1072,1087,1114,1117,1135,1147,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1204,1207,1210,1213,1216,1219,1222,1225,1237,1240,1243,1246,1249,1252,1255,1258,1261,1264,1273,1279,1276,1282]
const iconMap = [113,116,119,122,143,176,179,182,185,200,227,230,248,260,263,266,281,284,293,296,299,302,305,308,311,314,317,320,323,326,329,332,335,338,350,353,356,359,362,365,368,371,374,377,386,389,392,395]
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
    let timeStatus;
    if(data.current.is_day == 1){
        timeStatus = 'day';
    } else {
        timeStatus = 'night';
    }
    console.log(date,monthArr[month-1])
    tempOutput.innerHTML = `${data.current.temp_c}&deg;`;
    dateOutput.innerHTML = `${date} ${monthArr[month-1]} ${year}`;
    locationOutput.innerHTML = `${data.location.name} <br> ${data.location.country}`;
    weather.innerHTML = `${data.current.condition.text}`
    icon.src = `64x64/${timeStatus}/${iconMap[codeMap.indexOf(data.current.condition.code)]}.png`;
}

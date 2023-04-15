const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// function for showing data
function showdata(data) {
    lat = data[0].lat;
    lon = data[0].lon;
    var weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=378d535bfca5d57fc5c0409174e9ac7a&units=metric`;
    fetch(weather).then(res => res.json()).then(data => {
        document.getElementById("temp").innerText = data.main.temp + "°C";
        document.getElementById("feels").innerText = data.main.feels_like + "°C";
        document.getElementById("weather-temp").innerText = data.main.temp + "°C";
        document.getElementById("cloudy").innerText = data.clouds.all + "%";
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";
        if(data.rain!=undefined)
        document.getElementById("rain").innerText = data.rain['1h'] + "mm";
        else document.getElementById("rain").innerText = "0 mm";
        if(data.weather[0].main=="Haze"){
            document.getElementById("main").innerHTML=`<img src="sun.png" width="40px">
            <p class="text-xl">Haze</p>`;
        }
        else if(data.weather[0].main=="Rain"){
            document.getElementById("main").innerHTML=`<img src="light-rain.png" width="40px">
            <p class="text-xl">Rainy</p>`;
        }
        else{
            document.getElementById("main").innerHTML=`<img src="cloud.png" width="40px">
            <p class="text-xl">Cloudy</p>`;
        }
    });

    let day = new Date().getDay();
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=378d535bfca5d57fc5c0409174e9ac7a&units=metric`;
    fetch(url).then(res => res.json()).then(data => {
        var tbody = document.getElementById("forecast");
        for (i = 0; i < 5; i++) {
            day = parseInt(day) + 1;
            var tr = document.createElement("tr");
            tr.innerHTML = `<td class="py-2 px-4 text-left">${weekday[day % 7]}</td>
                            <td class="py-2 px-4 text-center">${data.list[i].main.temp.toFixed(2)}°C</td>
                            <td class="py-2 px-4 text-right">${data.list[i].weather[0].main}</td>`;
            tbody.appendChild(tr);
        }
    });
}
// search for location 
function submit() {
    document.getElementById("forecast").innerHTML = "";
    document.getElementById("main").innerHTML="";
    var loc = document.getElementById("location").value;
    loc = loc[0].toUpperCase() + loc.slice(1);
    document.getElementById("place").innerText = loc;


    city = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=378d535bfca5d57fc5c0409174e9ac7a`;
    fetch(city).then(response => response.json()).then(data => showdata(data));
}
function selected(loc){
    document.getElementById("forecast").innerHTML = "";
    document.getElementById("main").innerHTML="";
    document.getElementById("place").innerText = loc;
    city = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=378d535bfca5d57fc5c0409174e9ac7a`;
    fetch(city).then(response => response.json()).then(data => showdata(data));
}

// onload 
date = new Date();
document.getElementById("date").innerText = weekday[date.getDay()];
city = "http://api.openweathermap.org/geo/1.0/direct?q=Dhaka&appid=378d535bfca5d57fc5c0409174e9ac7a";

fetch(city).then(response => response.json()).then(data => showdata(data));

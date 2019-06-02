function initPage(){
	var url = "https://ipapi.co/json/";
	
	fetch(url).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
	).then(res => {
	    document.getElementById("country").innerHTML = res.data.country;
	    document.getElementById("country_name").innerHTML = res.data.country_name;
	    document.getElementById("region").innerHTML = res.data.region;
	    document.getElementById("city").innerHTML = res.data.city;
	    document.getElementById("postal").innerHTML = res.data.postal;
	    document.getElementById("latitude").innerHTML = res.data.latitude;
	    document.getElementById("longitude").innerHTML = res.data.longitude;
	    document.getElementById("ip").innerHTML = res.data.ip;
	    
	    document.getElementById("my_weather").addEventListener("click", function(event) {
			showWeather(res.data.latitude, res.data.longitude, res.data.city);
	    });
	    
	    showWeather(res.data.latitude, res.data.longitude, res.data.city);
	    loadCountries();
	}));
}

function showWeather(latitude, longitude, city){
	document.getElementById("weather_location").innerHTML = "Het weer in " + city;
	var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric' + '&APPID=918a35dff94ed57b5086e9899e1d1629';
	var http = new XMLHttpRequest();
	
	var past = new Date().getTime();
	var tenMin = 1000 * 60 * 10; 
	var isPast = (new Date().getTime() - past < tenMin)?false:true;
	if (isPast == false){
		fetch(url).then(response => 
		response.json().then(data => ({
		data: data,
		status: response.status
		    })
		).then(res => {
		  
		    document.getElementById("temperatuur").innerHTML = res.data.main.temp;
		    document.getElementById("luchtvochtigheid").innerHTML = res.data.main.humidity;
		    document.getElementById("windsnelheid").innerHTML = res.data.wind.speed;
		    document.getElementById("windrichting").innerHTML = degToCard(res.data.wind.deg);
		    document.getElementById("zonsopgang").innerHTML = msToTime(res.data.sys.sunrise);
		    document.getElementById("zonsondergang").innerHTML = msToTime(res.data.sys.sunset);
		    var weather = {"temp": res.data.main.temp, "humidity": res.data.main.humidity, "speed": res.data.wind.speed,
		    		"deg": degToCard(res.data.wind.deg), "sunrise": msToTime(res.data.sys.sunrise), "sunset": msToTime(res.data.sys.sunset)}
			window.sessionStorage.setItem("weather", JSON.stringify(weather));
			var weather1 = JSON.parse(window.sessionStorage.getItem("weather"));
			}));
	} else {
	    document.getElementById("temperatuur").innerHTML = weather1.temp;
	    document.getElementById("luchtvochtigheid").innerHTML = weather1.humidity;
	    document.getElementById("windsnelheid").innerHTML = weather1.speed;
	    document.getElementById("windrichting").innerHTML = weather1.deg;
	    document.getElementById("zonsopgang").innerHTML = weather1.sunrise;
	    document.getElementById("zonsondergang").innerHTML = weather1.sunset;
	}
}

function msToTime(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = hour + ':' + min + ':' + sec ;
	  return time;
	}

var degToCard = function(deg){
	  if (deg>11.25 && deg<33.75){
	    return "NNE";
  } else if (deg>33.75 && deg<56.25){
    return "ENE";
  }else if (deg>56.25 && deg<78.75){
    return "E";
  }else if (deg>78.75 && deg<101.25){
    return "ESE";
  }else if (deg>101.25 && deg<123.75){
    return "ESE";
  }else if (deg>123.75 && deg<146.25){
    return "SE";
  }else if (deg>146.25 && deg<168.75){
    return "SSE";
  }else if (deg>168.75 && deg<191.25){
    return "S";
  }else if (deg>191.25 && deg<213.75){
    return "SSW";
  }else if (deg>213.75 && deg<236.25){
    return "SW";
  }else if (deg>236.25 && deg<258.75){
    return "WSW";
  }else if (deg>258.75 && deg<281.25){
    return "W";
  }else if (deg>281.25 && deg<303.75){
    return "WNW";
  }else if (deg>303.75 && deg<326.25){
    return "NW";
  }else if (deg>326.25 && deg<348.75){
    return "NNW";
  }else{
    return "N"; 
  }
};
	
	function loadCountries(){
		fetch("http://localhost:8080/firstapp/restservices/countries").then(response => 
	    response.json().then(data => ({
	        data: data,
	        status: response.status
	    })
	    ).then(res => { 
	    	var table = document.getElementById("countryTabel").getElementsByTagName("tbody")[0];
	    	console.log(res);
	    	res.data.forEach(function(element){
	    		console.log(element);
	    		var row = table.insertRow();
	    		var name = row.insertCell(0);
	    		var capital = row.insertCell(1);
	    		var region = row.insertCell(2);
	    		var surface = row.insertCell(3);
	    		var population = row.insertCell(4);
	    		name.innerHTML = element.countries;
	    		capital.innerHTML = element.capital;
	    		region.innerHTML = element.regio;
	    		surface.innerHTML = element.surface;
	    		population.innerHTML = element.populatie;
	    		row.addEventListener("click", function(event) {
	    			showWeather(element.latitude, element.longitude, element.capital);
				});
	    		
	    	});
	    }));
	}
	
	initPage();
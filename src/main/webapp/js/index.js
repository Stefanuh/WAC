function showWeather(latitude, longitude, city) {
	var title = "Het weer in "+city+"<span class='flag flag_nl'></span>";
	document.getElementById("weatherTitle").innerHTML = title;
	
	fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&appid=cb4f5dedbdc0d60f2f5dce33389e3f83&units=metric").then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
	).then(res => {    
		document.getElementById("temp").innerHTML = res.data.main.temp;
		document.getElementById("humidity").innerHTML = res.data.main.humidity;
		document.getElementById("wind_speed").innerHTML = res.data.wind.speed;
		document.getElementById("wind_deg").innerHTML = getCardinal(res.data.wind.deg);
		document.getElementById("sunrise").innerHTML = timeConverter(res.data.sys.sunrise);
		document.getElementById("sunset").innerHTML = timeConverter(res.data.sys.sunset);
		
	}));
	
}

function initPage(){
	fetch("https://ipapi.co/json/").then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
    ).then(res => {    	    
    	
    	var city = document.getElementById("city");
	    document.getElementById("country").innerHTML = res.data.country;
	    document.getElementById("country_name").innerHTML = res.data.country_name;
	    document.getElementById("region").innerHTML = res.data.region;
	    city.innerHTML = res.data.city;
	    document.getElementById("postal").innerHTML = res.data.postal;
	    document.getElementById("latitude").innerHTML = res.data.latitude;
	    document.getElementById("longitude").innerHTML = res.data.longitude;
	    document.getElementById("ip").innerHTML = res.data.ip;	
	    
	    city.addEventListener("click", function(event){
			showWeather(res.data.latitude, res.data.longitude, res.data.city);
		});
	    
	    showWeather(res.data.latitude, res.data.longitude, res.data.city);
	 
	}));
	
	loadCountries();
}

function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = hour + ':' + min + ':' + sec ;
	  return time;
}

function getCardinal(angle) {
    //easy to customize by changing the number of directions you have 
    var directions = 8;
    
    var degree = 360 / directions;
    angle = angle + degree/2;
    
    if (angle >= 0 * degree && angle < 1 * degree)
        return "Noord";
    if (angle >= 1 * degree && angle < 2 * degree)
        return "Noordoost";
    if (angle >= 2 * degree && angle < 3 * degree)
        return "Oost";
    if (angle >= 3 * degree && angle < 4 * degree)
        return "Zuidoost";
    if (angle >= 4 * degree && angle < 5 * degree)
        return "Zuid";
    if (angle >= 5 * degree && angle < 6 * degree)
        return "Zuidwest";
    if (angle >= 6 * degree && angle < 7 * degree)
        return "West";
    if (angle >= 7 * degree && angle < 8 * degree)
        return "Noordwest";
    //Should never happen: 
    return "N";
}

function loadCountries(){
	fetch("http://localhost:8080/firstapp/restservices/countries").then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
    ).then(res => { 
    	var table = document.getElementById("countryTabel").getElementsByTagName('tbody')[0];
    	res.data.forEach(function(element){  	
    	
    		var row = table.insertRow();
    		var name = row.insertCell(0);
    		var capital = row.insertCell(1);
    		var region = row.insertCell(2);
    		var surface = row.insertCell(3);
    		var population = row.insertCell(4);
    		name.innerHTML = element.name;
    		capital.innerHTML = element.capital;
    		region.innerHTML = element.region;
    		surface.innerHTML = element.surface;
    		population.innerHTML = element.population;
    		row.addEventListener("click", function(event){
    			showWeather(element.latitude, element.longitude, element.capital);
    		});
    		
    	});
    }));
}

initPage();
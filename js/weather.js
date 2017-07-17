//used for testing without using API calls
var tempJSON = {"latitude":30.723526300000003,"longitude":-95.55077709999999,"timezone":"America/Chicago","offset":-5,"currently":{"time":1498718216,"summary":"Clear","icon":"sleet","nearestStormDistance":59,"nearestStormBearing":141,"precipIntensity":0,"precipProbability":0,"temperature":75.18,"apparentTemperature":76.51,"dewPoint":71.15,"humidity":0.87,"windSpeed":5.19,"windGust":12.33,"windBearing":117,"visibility":9.59,"cloudCover":0.06,"pressure":1011.14,"ozone":307.29,"uvIndex":0}};


//Object storing URL's for background images
var iconDict = {
  "clear-day":"https://static.pexels.com/photos/11434/Life-of-Pix-free-stock-photos-sunset-sea-light-mikewilson.jpeg",
  "clear-night":"https://static.pexels.com/photos/6546/sky-night-space-trees.jpeg",
  "rain":'https://static.pexels.com/photos/21492/pexels-photo.jpg',
  "sleet": "https://static.pexels.com/photos/57812/pexels-photo-57812.jpeg",
  "snow":"https://static.pexels.com/photos/25112/pexels-photo-25112.jpg",
  "fog": "https://static.pexels.com/photos/132806/pexels-photo-132806.jpeg",
  "cloudy" : "https://static.pexels.com/photos/196405/pexels-photo-196405.jpeg",
  "wind" : "https://static.pexels.com/photos/25800/pexels-photo-25800.jpg",
  "partly-cloudy-day": "https://static.pexels.com/photos/152536/pexels-photo-152536.jpeg",
  "partly-cloudy-night" : "https://static.pexels.com/photos/239107/pexels-photo-239107.jpeg",
  "hail": "https://www.pexels.com/photo/black-rock-28247/",
  "thunderstorm": "https://static.pexels.com/photos/99577/barn-lightning-bolt-storm-99577.jpeg",
  
};

//if Degree Indicator Clicked Switch from Fahrneheit to Celcius / vice versa
$("#degree").on("click", function(){
  if($("#degree").html() === 'F'){
    $("#degree").html('C');
    
    var temp = Number( $( "#tempNum" ).html( ) );
    temp = Math.round(5/9 * (temp - 32));
    $("#tempNum").html(temp);
  }
  else{
    
    $("#degree").html('F');
    var temp2 = Number($("#tempNum").html());
    temp2 = Math.round(temp2 * 9/5 + 32);
    $("#tempNum").html(temp2);
  }
});

//takes ina bearing in degrees and returns a cardinal direction
function bearingToCardinal(bearing){

  if (bearing >= 22.5 && bearing < 67.5) {
    return 'NE';
  }
  else if (bearing >= 67.5 && bearing < 112.5) {
    return 'E';
  }
  else if (bearing >= 112.5 && bearing < 157.5) {
    return 'SE';           
  }
  else if (bearing >= 157.5 && bearing < 202.5){
    return 'S';
  }
  else if (bearing >= 202.5 && bearing < 247.5){
    return 'SW';
  }  
  else if (bearing >= 247.5 && bearing < 292.5){
    return 'W';
  }
  else if (bearing >= 292.5 && bearing < 337.5){
    return 'NW';
  }
  else {
    return 'N';
  }
}



//write the API call to the Dark Sky API 
function writeWeatherAPICall(lat,long) {
  var req = ' https://crossorigin.me/https://api.darksky.net/forecast/15d42c6d53967eb1e6e6ef985f329a21/';
  req += lat + ',' + long;
  return req; 
}

//write the API call for location API
function writeLocationCall(lat,long) {
  
}


//takes in API Call. Makes API call. Calls function to write results
function displayWeather (call) {
  $.getJSON(call, writeWeather);
};
//takes in JSON file. Writes output - for more details see
//https://darksky.net/dev/docs/
function writeWeather(json) {
  
  
  //write current weather in display panel
  $("#location").html(json.latitude + '&deg; LAT,<br>' + json.longitude + '&deg; LON');
  $("#tempNum").html(Math.round(Number(json.currently['temperature'])));
  $("#condition").html(json.currently['summary'] + '<br>');
  $("#wind-speed").html('Wind:<br>' + json.currently['windSpeed'] + ' mph<br>');
  $("#wind-speed").append(bearingToCardinal(Number(json.currently['windBearing'])));
  
  //lookup lat and long and make it into location
  
  //place background
  var bg = json.currently['icon'];
  $(".container-fluid").css("background-image", 'url(' + iconDict[bg] + ')');
  
  
};

 //get position from browser...make API call and format result
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    var call = writeWeatherAPICall(position.coords.latitude,position.coords.longitude);
    displayWeather(call);
  });
};
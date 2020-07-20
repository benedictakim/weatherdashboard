var date = moment().format("MM[/]DD[/]YYYY");
console.log(date)

var lat = "latitude";
var lon = "longitude";
var citieslist = [];

$(document).ready(function(){
    $("#button-addon2").on("click", function(){
        var searchvalue = $("#city").val()
        $("#city").val("")
        console.log(searchvalue)
        if (searchvalue === "") {
            alert("Error: Unable to search when city is blank");
        }else{
            window.localStorage.setItem("city", searchvalue)
            citieslist.splice(citieslist.indexOf(city), 1);
            localStorage.setItem("weathercities", JSON.stringify(citieslist));
            searchweather (searchvalue)
            // searchuv (searchvalue)
            rendercities
            display5day (searchvalue)
        }
    })
    //list of searched cities - NEED TO DEBUG DISPLAY
    function rendercities () {
        $("#allcities").empty();
        for (var i = 0; i < citieslist.length; i++) {
            var li = $("<li>");
            listofcities = JSON.parse(window.localStorage.getItem("weathercities"));
            li.attr("allcities", citieslist[i])
            li.text(citieslist[i]);
            citieslist.prepend(li);
            console.log(listofcities[i])
        }
    }
    //search weather of city
    function searchweather (searchvalue) {
        $.ajax({
            type:"GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchvalue + "&appid=33dcb1cd7bc3a96b8d8f723aa3bda2c3&units=imperial",
            dataType: "json",
            success: function (data){
            console.log(data)
           //create history links for this search
            $("#today").empty();
            var imageURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
            var image = $("<img>").attr("src", imageURL)
            var name = $("<h2>").addClass("card-title").text(data.name + " ("+date+")")
            var card = $("<div>").addClass("card")
            var cardbody = $("<div>").addClass("card-body")
            var temperature = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp +"℉")
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity +"%")
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed +"MPH") 
            var lat = data.coord.lat
            var lon = data.coord.lon          
            var latlon = {
                lat: lat,
                lon: lon
            };
                window.localStorage.setItem("latlon", JSON.stringify(latlon))
                console.log(latlon)
                cardbody.append(name,image,temperature,humidity,wind)
                card.append(cardbody)
                $("#today").append(card)
            }       
        })
    }
    //search UV index of city
    // function searchuv (searchvalue) {
    //     lat = JSON.parse(window.localStorage.getItem('latlon', lat));
    //     console.log(lat)
    //     lon = JSON.parse(window.localStorage.getItem('latlon', lon));
    //     console.log(lon)
    //     $.ajax({
    //         type:"GET",
    //         url:"https://api.openweathermap.org/data/2.5/uvi?appid=33dcb1cd7bc3a96b8d8f723aa3bda2c3&lat=" + lat + "&lon=" + lon,
    //         dataType: "json",
    //         success: function (data){
    //         console.log(data.value);
    //             $("#today").prepend()
    //             var uv = $("<p>").addClass("card-text").text(data.value)
    //             console.log(data.value)
    //             if (data.value <= 2) {
    //                 uv.addClass("greenuv")
    //             }else if (data.value >= 3 && data.value <= 6) {
    //                 uv.addClass("yellouv")
    //             }else if (data.value === 6 || data.value === 7) {
    //                 uv.addClass("orangeuv")
    //             }else if (data.value >=8 && data.value <=10) {
    //                 uv.addClass("reduv")
    //             }else{
    //                 uv.addClass("purpleuv")
    //             }
    //             console.log(uv)
    //         }
    //     })
    // } 
    //search 5day forecast of city 
    function display5day (searchvalue) {
        $.ajax({
           type:"GET",
           url:"https://api.openweathermap.org/data/2.5/forecast?q=" + searchvalue + "&appid=33dcb1cd7bc3a96b8d8f723aa3bda2c3&units=imperial",
           dataType: "json",
           success: function (data){
           console.log(data)
           var h2 = $("<h2>").text("5-Day Forecast")
           $("#5dayh2").empty();
           $("#5dayh2").append(h2)
           $("#5day").empty();
           for (var i = 0; i < data.list.length; i++) {
               if (data.list[i].dt_txt.indexOf("15:00:00")!== -1){
                   var col = $("<div>").addClass("col-md-2")
                   var card = $("<div>").addClass("card bg-primary text-white")
                   var cardbody = $("<div>").addClass("card-body p-2")
                   var datedisplay = $("<h5>").addClass("card-title").text(date)
                   var imageURL = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                   var image = $("<img>").attr("src", imageURL)
                   var temperature = $("<p>").addClass("card-text").text("Temp: "+data.list[i].main.temp+"℉")
                   var humidity = $("<p>").addClass("card-text").text("Humidity: "+data.list[i].main.humidity+"%")
                   col.append(card.append(cardbody.append(datedisplay,image,temperature,humidity)))
                   $("#5day").append(col)
               }
           }

           }
        })
    }
});


//https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
//https://openweathermap.org/api/uvi
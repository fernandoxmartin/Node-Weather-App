$(document).ready(function() {

    getWeather();
    getForecast();
    getCurrentTime();

    $('#input').keyup( event => {
        if (event.keyCode == 13) {
            $('#button').click();
        }
    });
});

function findWeather() {
    const searchQuery = $('.search').val();
    getWeather(searchQuery);
}

function getWeather(searchQuery) {
    const url = `https://api.openweathermap.org/data/2.5/weather?`;
    const parameters = {
        q: searchQuery,
        units: 'imperial',
        APPID: apiKey
    };

    if (searchQuery) {
        parameters.q = searchQuery;
    } else {
        parameters.id = 5368361
    }

    $.ajax(url + $.param(parameters), {
        success: (data) => onSuccess(data),
        error: function(error) {
            $('.error').text('No Results Found, Try Again');
        }
    });
};

function onSuccess(data) {
    const temp = Math.floor(data.main.temp);
    const icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    $('.city').html(data.name);
    $('.country').html(data.sys.country);
    $('.description').html(data.weather[0].description);
    $('.temp').html(temp);
    $('.humidity').html('Humidity: ' + data.main.humidity + '%');
    $('.wind').html('Wind: ' + data.wind.speed + ' mph');
    $('.icon').attr('src', icon);
}

function findForecast() {
    const searchQuery = $('.search').val();
    getForecast(searchQuery);
}

function getForecast(searchQuery) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?`;
    const parameters = {
        q: searchQuery,
        units: 'imperial',
        APPID: apiKey
    };

    if (searchQuery) {
        parameters.q = searchQuery;
    } else {
        parameters.id = 5368361
    }

    $.ajax(url + $.param(parameters), {
        success: (data) => onSuccess(data),
        error: function(error) {
            $('.error').text('No Results Found, Try Again');
        }
    });

    function onSuccess(data) {

        const hour1t = data.list[0].dt_txt.replace('2019-', '');
        const hour2t = data.list[1].dt_txt.replace('2019-', '');
        const hour3t = data.list[2].dt_txt.replace('2019-', '');
        const hour4t = data.list[3].dt_txt.replace('2019-', '');
        const hour5t = data.list[4].dt_txt.replace('2019-', '');
        const hour6t = data.list[5].dt_txt.replace('2019-', '');

        $('.hour-one-time').html(hour1t);
        $('.hour-two-time').html(hour2t);
        $('.hour-three-time').html(hour3t);
        $('.hour-four-time').html(hour4t);
        $('.hour-five-time').html(hour5t);
        $('.hour-six-time').html(hour6t);

        $('.hour-one').html(Math.round(data.list[0].main.temp));
        $('.hour-two').html(Math.round(data.list[1].main.temp));
        $('.hour-three').html(Math.round(data.list[2].main.temp));
        $('.hour-four').html(Math.round(data.list[3].main.temp));
        $('.hour-five').html(Math.round(data.list[4].main.temp));
        $('.hour-six').html(Math.round(data.list[5].main.temp));
    }
};

function getCurrentTime() {
    let currentdate = new Date();
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let daynight;
  
    if ( hours > 12 ) {
      daynight = 'PM'
      hours -= 12;
    } else {
      daynight = 'AM';
    }
  
    if ( minutes < 10 ) {
      minutes = '0' + minutes;
    }
  
    let time = hours + ":" + minutes;
    $('.hour').text(time);
    $('.ampm').text(daynight);
  }
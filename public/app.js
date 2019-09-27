const icon = document.querySelector(".icon").getAttribute("alt");
const body = document.querySelector("body");

switch (icon) {
  case "01d":
  case "02d":
    body.style.background = "url('./img/clear.jpg')";
    break;
  case "01n":
  case "02n":
  case "03n":
  case "04n":
    body.style.background = "url('./img/night-sky.jpg')";
    break;
  case "03d":
  case "04d":
    body.style.background = "url('./img/clouds.jfif')";
    break;
  case "09d":
  case "09n":
  case "10d":
  case "10n":
    body.style.background = "url('./img/rain.jpg')";
    break;
  case "11d":
  case "11n":
    body.style.background = "url('./img/thunder.jpg')";
    break;
  case "13d":
  case "13n":
    body.style.background = "url('./img/snow.jpg')";
    break;
  case "50d":
  case "50n":
    body.style.background = "url('./img/fog.jpg')";
    break;
}

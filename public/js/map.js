import apiKey from "./GoogleAPI_BBY4.js";

window.initMap = function() {
    const mapOptions = {
        center: { lat: 49.248, lng: -123.0005},
        zoom: 15.5, // Zoom level
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function LoadGoogleMaps() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&loading=async&callback=initMap");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
LoadGoogleMaps();


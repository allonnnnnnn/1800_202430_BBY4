import apiKey from "./GoogleAPI_BBY4.js";
let map;

const washroomImg = document.createElement("img");
washroomImg.src = "/images/WashroomIcon.png";
washroomImg.style.height = "70px";

const waterFountainImg = document.createElement("img");
waterFountainImg.src = "/images/WaterFountainIcon.png";
waterFountainImg.style.height = "70px";

const microwaveImg = document.createElement("img");
microwaveImg.src = "/images/MicrowaveIcon.png";
microwaveImg.style.height = "70px";

async function placeMarkers(lat, lng) {
    let {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    const markers = new AdvancedMarkerElement({
        map: map,
        position: {lat: lat, lng: lng},
        content: microwaveImg.cloneNode()
    })
}

window.initMap = function() {
    const bounds = {
        north: 49.254794,
        east: -122.993394,
        south: 49.241543,
        west: -123.004505
    };

    const mapOptions = {
        center: { lat: 49.250019, lng: -123.002707},
        zoom: 20,
        mapId: "e1a7e8a6dbcb9005",
        restriction: {
            latLngBounds: bounds,
            strictBounds: true
        },
        gestureHandling: "greedy"
    };

    placeMarkers(49.250105, -123.00233);
    placeMarkers(49.251258, -123.001708);

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function LoadGoogleMaps() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&loading=async&callback=initMap");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
LoadGoogleMaps();


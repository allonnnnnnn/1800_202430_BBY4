import apiKey from "./GoogleAPI_BBY4.js";
let map;

async function placeMarkers() {
    let {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    const markers = new AdvancedMarkerElement({
        map: map,
        position: {lat: 49.253300, lng: -123.001550},
        title: "Timmy's"
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
        center: { lat: 49.248, lng: -123.0005},
        zoom: 20, // Zoom level
        mapId: "e1a7e8a6dbcb9005",
        restriction: {
            latLngBounds: bounds,
            strictBounds: true
        },
        gestureHandling: "greedy"
    };

    placeMarkers();

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


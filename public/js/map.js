import apiKey from "./GoogleAPI_BBY4.js";
window.map;

const washroomImg = document.createElement("img");
washroomImg.src = "/images/WashroomIcon.png";
washroomImg.style.height = "70px";

const waterFountainImg = document.createElement("img");
waterFountainImg.src = "/images/WaterFountainIcon.png";
waterFountainImg.style.height = "70px";

const microwaveImg = document.createElement("img");
microwaveImg.src = "/images/MicrowaveIcon.png";
microwaveImg.style.height = "70px";

window.placeMarkers = async function (lat, lng) {
    let { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const markers = new AdvancedMarkerElement({
        map: window.map,
        position: { lat: lat, lng: lng },
        content: microwaveImg.cloneNode(),
    })
}

window.initMap = function () {
    const bounds = {
        north: 49.254794,
        east: -122.993394,
        south: 49.241543,
        west: -123.004505
    };

    const mapOptions = {
        center: { lat: 49.250019, lng: -123.002707 },
        zoom: 15,
        mapId: "e1a7e8a6dbcb9005",
        restriction: {
            latLngBounds: bounds,
            strictBounds: true
        },
        gestureHandling: "greedy",
        disableDefaultUI: true
    };

    window.map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function LoadGoogleMaps() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&loading=async&callback=initMap");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
LoadGoogleMaps();

window.onMarkerClicked = function (data, key) {
    window.map.zoom = 20;
    window.map.panTo({ lat: data[key].latitude, lng: data[key].longitude + 0.00015 });
    $("#infoCard-goes-here").load("/html/infoCard.html", function () {
        document.getElementById("infoCard").getElementsByClassName("card-title")[0].innerHTML = key;
    });
}


import apiKey from "./GoogleAPI_BBY4.js";
window.map;

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

window.onMarkerClicked = function (snap, key) {
    let previousPosition = window.map.getCenter();
    let previousZoom = window.map.getZoom();
    let snapData = snap.data();

    window.map.zoom = 20;
    window.map.panTo({ lat: snapData[key].latitude, lng: snapData[key].longitude + 0.00015 });
    $("#infoCard-goes-here").load("/html/infoCard.html", function () {
        let infoCard = document.getElementById("infoCard");

        infoCard.getElementsByClassName("card-title")[0].innerHTML = key;

        //Check if this user already favourited this place. If so, change the gui to "Favourited" which when
        //pressed will unfavourite it (remove it from the database)

        document.getElementById("favouriteButton").addEventListener("click", function() {
            db.collection("User").doc(firebase.auth().currentUser.uid).collection("Favourites").doc(snap.id).update({
                [key]: {lat: snapData[key].latitude, lng: snapData[key].longitude}
            });
        });
        document.getElementById("backButton").addEventListener("click", function(event) {
            goBack(previousPosition, previousZoom);
        });
        window.map.addListener("click", function(event) {
            goBack(previousPosition, previousZoom);
        })
    });
}

function goBack(previousPosition, previousZoom) {
    google.maps.event.clearListeners(window.map, "click");
    document.getElementById("infoCard-goes-here").innerHTML = "";

    window.map.panTo(previousPosition);
    window.map.setZoom(previousZoom);
}


import apiKey from "./GoogleAPI_BBY4.js";
window.map;
let userMarker;

const currentRoutePoints = {
    currentOrigin: null,
    currentDestination: null,
};

const bounds = {
    north: 49.254794,
    east: -122.993394,
    south: 49.241543,
    west: -123.004505
};

window.initMap = function () {
    const mapOptions = {
        center: {lat: 49.253300, lng: -123.001549},
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
    loadGeolocater();
}

/**
 * This will take the API key and load in the Map inside of main.html
 */
function LoadGoogleMaps() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&loading=async&callback=initMap");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
LoadGoogleMaps();

/**
 * Loads the geo geolocater to find where the user is
 */
function loadGeolocater() {
    let watchID = undefined;

    const userImg = document.createElement("img");
    userImg.src = "/images/userMarker.png";
    userImg.style.height = "45px";
    firebase.auth().onAuthStateChanged((user) => {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition((position) => {
                let userLatitude = position.coords.latitude;
                let userLongitude = position.coords.longitude;

                /*These two lines are for testing purposes
                let userLatitude = 49.251670;
                let userLongitude = -123.003738;*/

                user.currentPosition = {latitude: userLatitude, longitude: userLongitude};
                if (userLatitude > bounds.north || userLatitude < bounds.south || userLongitude < bounds.west || userLongitude > bounds.east) {
                    warnUserIsOffCampus()
                    navigator.geolocation.clearWatch(watchID);
                    return;
                }
                
                google.maps.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
                    userMarker = new AdvancedMarkerElement({
                        map: window.map,
                        position: { lat: userLatitude, lng: userLongitude },
                        content: userImg,
                        title: "User"
                    });

                    const pos = {
                        lat: userMarker.position.lat,
                        lng: userMarker.position.lng
                    };
                    
                    window.map.setZoom(18);
                    window.map.panTo({lat: userLatitude, lng: userLongitude});
                });    
            });
        } else {
            user.currentPosition = {latitude: 0, longitude: 0};
            warnUserIsOffCampus();
        }
    });
}

function warnUserIsOffCampus() {
    const myModal = new bootstrap.Modal(document.getElementById('warningModal'));
    myModal.show();

    document.getElementById('warningModal').querySelectorAll("Button")[0].addEventListener("click", function () {
        myModal.hide();
    })
}

/**
 * Gives functionality to markers like clickable building names. This also gives
 * @param {*} snap 
 * @param {*} key 
 */
window.onMarkerClicked = function (snap, key) {
    let snapData = snap.data();

    window.map.setZoom(20);
    window.map.panTo({ lat: snapData[key].latitude, lng: snapData[key].longitude + 0.00015 });
    $("#infoCard-goes-here").load("/html/infoCard.html", function () {
        let infoCard = document.getElementById("infoCard");
        let foundMarker = returnMarker(snapData[key].latitude, snapData[key].longitude);

        if (foundMarker == null) {
            console.log("Could not find the marker");
            return;
        }

        if (foundMarker.favourited) {
            document.getElementById("favouriteButtonText").innerText = "Unfavourite Place";
        } else {
            document.getElementById("favouriteButtonText").innerText = "Favourite Place";
        }

        infoCard.getElementsByClassName("card-title")[0].innerHTML = key;

        //Check if this user already favourited this place. If so, change the gui to "Favourited" which when
        //pressing it will unfavourite it (remove it from the database)

        //All this code below adds functionality to the buttons on the infocard
        document.getElementById("directionButton").addEventListener("click", () => {
            currentRoutePoints.currentOrigin = firebase.auth().currentUser.currentPosition;
            currentRoutePoints.currentDestination = { latitude: foundMarker.position.lat, longitude: foundMarker.position.lng };

            popUpDirectionsWindow(foundMarker);
        });
        document.getElementById("favouriteButton").addEventListener("click", function () {
            let updatingDocument = db.collection("User").doc(firebase.auth().currentUser.uid).collection("Favourites").doc(snap.id);

            //When the location is NOT favourited
            if (!foundMarker.favourited) {
                document.getElementById("favouriteButtonText").innerText = "Unfavourite Place";
                updatingDocument.update({
                    [key]: { lat: snapData[key].latitude, lng: snapData[key].longitude }
                }).then(() => {
                    displayFavouriteOnMap(snapData[key].latitude, snapData[key].longitude);
                });
                return;
            }

            //This happens when the location IS favourited (remove it from being favourited)
            document.getElementById("favouriteButtonText").innerText = "Favourite Place";
            updatingDocument.update({
                [key]: firebase.firestore.FieldValue.delete()
            }).then(() => {
                displayFavouriteOnMap(snapData[key].latitude, snapData[key].longitude);
            });
        });
        document.getElementById("backButton").addEventListener("click", function (event) {
            goBack();
        });
        window.map.addListener("click", function (event) {
            goBack();
        })
    });
}

function popUpDirectionsWindow(assumedDestinationMarker) {
    goBack();
    document.getElementById("searchBar").style = "display: none";
    document.getElementById("searchBarDirections").style = "display: block";

    document.getElementById("destinationInput").value = assumedDestinationMarker.title;

    document.getElementById("calculateRoute").addEventListener("click", function () {
        calculateRoute();
    });

    document.getElementById("exitDirections").addEventListener("click", function () {
        document.getElementById("searchBar").style = "display: block";
        document.getElementById("searchBarDirections").style = "display: none";
    });
}

function calculateRoute() {

}

function goBack() {
    google.maps.event.clearListeners(window.map, "click");
    document.getElementById("infoCard-goes-here").innerHTML = "";
}

document.getElementsByTagName("input")[0].addEventListener("click", function (event) {
    document.getElementsByTagName("input")[0].value = "";
});

window.onSearchBarFocus = function (inputElement) {
    inputElement.addEventListener("input", function (event) {
        if (inputElement.id == "searchBarInput") {
            displaySearchResult(inputElement, document.getElementById("search-results-go-here"), (marker) => {
                window.map.setZoom(20);
                window.map.panTo({ lat: marker.position.lat, lng: marker.position.lng + 0.00015 });

                db.collection("Features").doc("Buildings").get()
                    .then(function (buildingDoc) {
                        window.onMarkerClicked(buildingDoc, marker.title);
                    });
            });
        } else if (inputElement.id == "originInput") {
            displaySearchResult(inputElement, document.getElementById("origin-results-go-here"), (marker) => {
                currentRoutePoints.currentOrigin = { latitude: marker.position.lat, longitude: marker.position.lng };
            });
        } else if (inputElement.id == "destinationInput") {
            displaySearchResult(inputElement, document.getElementById("destination-results-go-here"), (marker) => {
                currentRoutePoints.currentDestination = { latitude: marker.position.lat, longitude: marker.position.lng };
            });
        }
    });
}

window.onSearchBarOutOfFocus = function (inputElement) {
    inputElement.removeEventListener("input", () => { });
    let searchList = document.getElementById("search-results-go-here");
    searchList.innerHTML = "";
}

function displaySearchResult(inputElement, outputElement, callback) {
    let searchList = outputElement;
    searchList.innerHTML = "";

    let input = inputElement.value.toLowerCase().trim();

    if (input.length == 0) return;

    //Will sort the markers if 
    const filteredMarkers = window.markers.filter((marker) => {
        return marker.title.toLowerCase().includes(input);
    });
    filteredMarkers.sort((marker1, marker2) => {
        if (marker1.title.toLowerCase() > marker2.title.toLowerCase()) return 1;
        if (marker1.title.toLowerCase() < marker2.title.toLowerCase()) return -1;
        return 0;
    });

    filteredMarkers.forEach(marker => {
        if (marker.title == "" || marker.featureType == "Washrooms" || marker.featureType == "Microwaves" || marker.featureType == "WaterFountains") return;

        let templateClone = document.getElementById("listTemplate").content.cloneNode(true);
        templateClone.querySelector("p").innerHTML = marker.title;
        searchList.appendChild(templateClone);

        let appendedClone = outputElement.lastElementChild;
        appendedClone.addEventListener("click", function () {
            searchList.innerHTML = "";
            inputElement.value = marker.title;

            callback(marker);
        });
    });
}

window.onDropDownButtonsClicked = function (feature) {
    db.collection("Features").doc(feature).get().then((doc) => {
        console.log("doing features thingy");
        let currentUserPosition = firebase.auth().currentUser.currentPosition;
        if (currentUserPosition.latitude > bounds.north || currentUserPosition.latitude < bounds.south || currentUserPosition.longitude < bounds.west || currentUserPosition.longitude > bounds.east) {
            warnUserIsOffCampus();
            return;
        }

        let closestMarker;
        let closestDistance = 100000000000;

        for (const key in doc.data()) {
            const latDelta = doc.data()[key].latitude - currentUserPosition.latitude;
            const lngDelta = doc.data()[key].longitude - currentUserPosition.longitude;
            const distance = calculateDistance(latDelta, lngDelta, currentUserPosition);

            if (closestMarker == null) {
                closestMarker = returnMarker(doc.data()[key].latitude, doc.data()[key].longitude);
                closestDistance = distance;
                continue;
            }

            if (distance < closestDistance) {
                closestDistance = distance;
                closestMarker = returnMarker(doc.data()[key].latitude, doc.data()[key].longitude);
            }
        }
        window.onMarkerClicked(doc, closestMarker.title);
    })
};

function calculateDistance(latDelta, lngDelta, currentUserPosition) {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = currentUserPosition.latitude * Math.PI / 180; // Convert latitude to radians
    const lat2 = (currentUserPosition.latitude + latDelta) * Math.PI / 180; // Convert latitude to radians
    const lon1 = currentUserPosition.longitude * Math.PI / 180; // Convert longitude to radians
    const lon2 = (currentUserPosition.longitude + lngDelta) * Math.PI / 180; // Convert longitude to radians

    const dlat = lat2 - lat1; // Difference in latitudes
    const dlng = lon2 - lon1; // Difference in longitudes

    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dlng / 2) * Math.sin(dlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}


import apiKey from "./GoogleAPI_BBY4.js";
window.map;

var bounds = {
    north: 49.254794,
    east: -122.993394,
    south: 49.241543,
    west: -123.004505
};

window.initMap = function () {
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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position.coords.latitude > bounds.north || position.coords.latitude < bounds.south || position.coords.longitude < bounds.west || position.coords.longitude > bounds.east) {
                const myModal = new bootstrap.Modal(document.getElementById('warningModal'));
                myModal.show();

                document.getElementById('warningModal').querySelectorAll("Button")[0].addEventListener("click", function () {
                    myModal.hide();
                })
                return;
            }

            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            window.map.setCenter(pos);
        });
    }
}

/**
 * Gives functionality to markers like clickable building names. This also gives
 * @param {*} snap 
 * @param {*} key 
 */
window.onMarkerClicked = function (snap, key) {
    let snapData = snap.data();

    window.map.zoom = 20;
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
        document.getElementById("directionButton").addEventListener("click", function () {

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

function goBack() {
    google.maps.event.clearListeners(window.map, "click");
    document.getElementById("infoCard-goes-here").innerHTML = "";
}

document.getElementsByTagName("input")[0].addEventListener("click", function (event) {
    document.getElementsByTagName("input")[0].value = "";
});

document.getElementsByTagName("input")[0].addEventListener("input", function (event) {
    let searchList = document.getElementById("search-results-go-here");
    searchList.innerHTML = "";

    let input = document.getElementsByTagName("input")[0].value.toLowerCase().trim();

    if (input.length == 0) return;

    const filteredMarkers = window.markers.filter((marker) => {
        return marker.title.toLowerCase().includes(input);
    });
    filteredMarkers.sort((marker1, marker2) => {
        if (marker1.title.toLowerCase() > marker2.title.toLowerCase()) return 1;
        if (marker1.title.toLowerCase() < marker2.title.toLowerCase()) return -1;
        return 0;
    });

    filteredMarkers.forEach(marker => {
        if (marker.title == "") return;

        let templateClone = document.getElementById("listTemplate").content.cloneNode(true);
        templateClone.querySelector("p").innerHTML = marker.title;
        searchList.appendChild(templateClone);

        let appendedClone = document.getElementById("search-results-go-here").lastElementChild;
        appendedClone.addEventListener("click", function () {
            window.map.zoom = 20;
            window.map.panTo({ lat: marker.position.lat, lng: marker.position.lng + 0.00015 });

            searchList.innerHTML = "";
            document.getElementsByTagName("input")[0].value = marker.title;
            db.collection("Features").doc("Buildings").get()
                .then(function (buildingDoc) {
                    window.onMarkerClicked(buildingDoc, marker.title);
                });
        })
    });
});



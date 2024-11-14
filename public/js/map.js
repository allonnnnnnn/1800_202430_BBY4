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
        let foundMarker = returnMarker(snapData[key].latitude,snapData[key].longitude);
        console.log(foundMarker.favourited);
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
        document.getElementById("directionButton").addEventListener("click", function() {
            
        });
        document.getElementById("favouriteButton").addEventListener("click", function() {
            let updatingDocument = db.collection("User").doc(firebase.auth().currentUser.uid).collection("Favourites").doc(snap.id);
            
            
            //When the location is NOT favourited
            if (!foundMarker.favourited) {
                document.getElementById("favouriteButtonText").innerText = "Unfavourite Place";
                updatingDocument.update({
                    [key]: {lat: snapData[key].latitude, lng: snapData[key].longitude}
                }).then( () => {
                    displayFavouriteOnMap(snapData[key].latitude,snapData[key].longitude);
                });
                return;
            }

            //This happens when the location IS favourited (remove it from being favourited)
            document.getElementById("favouriteButtonText").innerText = "Favourite Place";
            updatingDocument.update({
                [key]: firebase.firestore.FieldValue.delete()
            }).then( () => {
                displayFavouriteOnMap(snapData[key].latitude,snapData[key].longitude);
            });
        });
        document.getElementById("backButton").addEventListener("click", function(event) {
            goBack();
        });
        window.map.addListener("click", function(event) {
            goBack();
        })
    });
}

function goBack() {
    google.maps.event.clearListeners(window.map, "click");
    document.getElementById("infoCard-goes-here").innerHTML = "";
}


window.markers = [];

let labelElement = document.createElement("div");
labelElement.innerText = "Building Name";
labelElement.style = "font-size: 18pt";

const waterFountainImg = document.createElement("img");
waterFountainImg.src = "/images/WaterFountainIcon.png";
waterFountainImg.style.height = "40px";

const microwaveImg = document.createElement("img");
waterFountainImg.src = "/images/MicrowaveIcon.png";
waterFountainImg.style.height = "40px";

const washroomImg = document.createElement("img");
waterFountainImg.src = "/images/WashroomIcon.png";
waterFountainImg.style.height = "40px";

const markerOptions = {
    "Buildings": {
        content: labelElement,
        zoom: 17
    },
    "WaterFountains": {
        content: waterFountainImg,
        zoom: 19
    },
    "Microwaves": {
        content: microwaveImg,
        zoom: 19
    },
    "Washrooms": {
        content: washroomImg,
        zoom: 19
    }
}

function readAll() {
    let buildingRef = db.collection("Features").get().then((collection) => {
        collection.forEach(featureDoc => {
            for (const key in featureDoc.data()) {
                google.maps.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
                    let markerCustomizations = markerOptions[featureDoc.id];
                    let newMarker = new AdvancedMarkerElement({
                        map: window.map,
                        position: { lat: featureDoc.data()[key].latitude, lng: featureDoc.data()[key].longitude },
                        content: markerCustomizations.content.cloneNode(true),
                        gmpClickable: true,
                        title: key
                    });
                    newMarker.featureType = featureDoc.id;
                    newMarker.favourited = false;
                    markers.push(newMarker);
                    newMarker.content.innerText = key;

                    newMarker.map = map.getZoom() >= markerCustomizations.zoom ? map : null;
                    window.map.addListener("zoom_changed", () => {
                        let currentZoom = window.map.getZoom();
                        newMarker.map = currentZoom >= markerCustomizations.zoom ? map : null;
                    });

                    newMarker.addListener("click", function () {
                        window.onMarkerClicked(featureDoc, key);
                    });
                });
            }
        });
        readFavourites();
    });
}
readAll()

/**
 * This will read the user's favourites and change those markers to a different colour
 */
function readFavourites() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("User").doc(user.uid).collection("Favourites").get().then(function (snap) {
            snap.forEach(document => {
                for (const key in document.data()) {
                    displayFavouriteOnMap(document.data()[key].lat, document.data()[key].lng);
                }
            });
        });
    });
}

function displayFavouriteOnMap(locationLat, locationLng) {
    let foundMarker = returnMarker(locationLat, locationLng);
    if (foundMarker == null) {
        console.log("Couldn't find marker");
        return;
    }

    if (!foundMarker.favourited) {
        foundMarker.favourited = true;
        foundMarker.content.style.color = "rgb(218,165,32)";
    } else {
        foundMarker.favourited = false;
        foundMarker.content.style.color = "rgb(0,0,0)";
    }
}

function returnMarker(locationLat, locationLng) {
    for (let i = 0; i < markers.length; i++) {
        let foundMarker = markers[i];
        if (locationLat == foundMarker.position.lat && locationLng == foundMarker.position.lng) {
            return foundMarker;
        }
    }
    return null;
}


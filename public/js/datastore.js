window.markers = [];

let labelElement = document.createElement("div");
labelElement.innerText = "Building Name";
labelElement.style = "font-size: 18pt";

const favouriteHolder = document.createElement("div");
favouriteHolder.style = "display: flex; margin-right: 55px; color: rgb(242,64,53)";
const favouritedPlaceName = document.createElement("p");
favouritedPlaceName.style = "margin: auto; font-size: 18pt";
const favouriteImg = document.createElement("img");
favouriteImg.src = "/Images/FavouriteIcon.png";
favouriteImg.style.height = "40px";


favouriteHolder.appendChild(favouritedPlaceName);
favouriteHolder.appendChild(favouriteImg);

const waterFountainImg = document.createElement("img");
waterFountainImg.src = "/images/WaterFountainIcon.png";
waterFountainImg.style.height = "60px";

const microwaveImg = document.createElement("img");
microwaveImg.src = "/images/MicrowaveIcon.png";
microwaveImg.style.height = "60px";

const washroomImg = document.createElement("img");
washroomImg.src = "/images/WashroomIcon.png";
washroomImg.style.height = "60px";

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
    },
    "Favourited": {
        content: favouriteHolder,
    }
}

function readAll() {
    db.collection("Features").get().then((collection) => {
        collection.forEach(featureDoc => {
            for (const key in featureDoc.data()) {
                google.maps.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
                    let markerData = featureDoc.data()[key];
                    console.log(markerData.latitude || markerData.position.latitude);
                    let markerCustomizations = markerOptions[featureDoc.id];
                    let newMarker = new AdvancedMarkerElement({
                        map: window.map,
                        position: { lat: markerData.latitude, lng: markerData.longitude },
                        content: markerCustomizations.content.cloneNode(true),
                        gmpClickable: true,
                        title: key
                    });
                    newMarker.Clickable = true;
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
                        if (!newMarker.Clickable) return;
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
        foundMarker.content = markerOptions["Favourited"].content.cloneNode(true);
        foundMarker.favourited = true;
        foundMarker.content.querySelector("p").innerHTML += foundMarker.title;
    } else {
        foundMarker.content = markerOptions["Buildings"].content.cloneNode(true);
        foundMarker.content.innerText = foundMarker.title;
        foundMarker.favourited = false;
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


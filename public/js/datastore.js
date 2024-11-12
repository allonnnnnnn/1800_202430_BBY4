let markers = [];

async function readAllBuilding() {
    let buildingRef = db.collection("Features").doc("Buildings");
    let buildingSnap = await buildingRef.get();

    for (const key in buildingSnap.data()) {
        let labelElement = document.createElement("div");
        labelElement.innerText = key;
        labelElement.style = "font-size: 25pt";

        let { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        let buildingMarker = new AdvancedMarkerElement({
            map: window.map,
            position: { lat: buildingSnap.data()[key].latitude, lng: buildingSnap.data()[key].longitude },
            content: labelElement,
            gmpClickable: true
        });
        markers.push(buildingMarker);

        window.map.addListener("zoom_changed", () => {
            let currentZoom = window.map.getZoom();
            buildingMarker.map = currentZoom >= 17 ? map : null;
        });
        
        buildingMarker.addListener("click", function() {
            window.onMarkerClicked(buildingSnap, key);
        });
    }
    readFavourites();
}
readAllBuilding()

function writeBuildings(buildingName, lat, lng) {
    let geopoint = new firebase.firestore.GeoPoint(lat, lng);
    let doc = db.collection("Features").doc("WaterFountains").set({
        [buildingName]: geopoint
    });

}
writeBuildings("SW05", 49, 33);

function writeWaterFountains(fountainName, lat, lng) {
    let geopoint = new firebase.firestore.GeoPoint(lat, lng);
    let doc = db.collection("Features").doc("WaterFountains").set({
        [fountainName]: geopoint
    });

}
writeWaterFountains("SW03_1", 49.250034, -123.002498);

async function readAllWaterFountains() {
    let fountainsRef = db.collection("Features").doc("WaterFountains");
    let fountainsSnap = await fountainsRef.get();

    for (const key in fountainsSnap.data()) {
        const waterFountainImg = document.createElement("img");
        waterFountainImg.src = "/images/WaterFountainIcon.png";
        waterFountainImg.style.height = "40px";

        let { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        let newMarker = new AdvancedMarkerElement({
            map: window.map,
            position: {lat: fountainsSnap.data()[key].latitude, lng: fountainsSnap.data()[key].longitude},
            content: waterFountainImg
        })
        markers.push(newMarker);

        window.map.addListener("zoom_changed", () => {
            newMarker.map = map.getZoom() > 18 ? map : null;
        });
    }
    readFavourites();
}
readAllWaterFountains();

function readFavourites() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("User").doc(user.uid).collection("Favourites").get()
        .then(function(snap) {
            snap.forEach(document => {
                for (const key in document.data()) {
                    for (let i = 0; i < markers.length; i++) {
                        let foundMarker = markers[i];
                        if (document.data()[key].lat == markers[i].position.lat && document.data()[key].lng == markers[i].position.lng) {
                            foundMarker.content.style.color = "rgb(218,165,32)";
                        }
                    }
                }
            });
        });
    });
}


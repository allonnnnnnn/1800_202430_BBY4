async function readAllBuilding() {
    let buildingRef = db.collection("Features").doc("Buildings");
    let buildingSnap = await buildingRef.get();

    for (const key in buildingSnap.data()) {
        let labelElement = document.createElement("div");
        labelElement.innerText = key;
        labelElement.style = "font-size: 25pt";
        
        let {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
        new AdvancedMarkerElement ({
            map: window.map,
            position: {lat: buildingSnap.data()[key].latitude, lng: buildingSnap.data()[key].longitude},
            content: labelElement
        })
    }
}
readAllBuilding();

function writeWaterFountains(waterFountainName, lat, lng) {
    let geopoint = new firebase.firestore.GeoPoint(lat, lng);
    let doc = db.collection("Features").doc("WaterFountains").set({
        [waterFountainName]: geopoint
    });
    
}
writeWaterFountains();

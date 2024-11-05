async function readAllBuilding() {
    let buildingRef = db.collection("Features").doc("Buildings");
    let buildingSnap = await buildingRef.get();

    for (const key in buildingSnap.data()) {
        console.log(key);
        window.placeMarkers(buildingSnap.data()[key].latitude,buildingSnap.data()[key].longitude)
    }
}
readAllBuilding()

function displayFav() {
    let user =db.collection("User").doc(userUID);
    

}
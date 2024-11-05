function displayFav() {
    let user = db.collection("User").doc(userUID);


}
displayFav();
function addFav() {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("Users").doc(userID).collection("favourites").dooc().add({
            Classroom: CRN,
            userID: userID,
            Building: BuildingName,
            Location: Geopoint,

        });
    } else {
        console.log("No user is signed in");
    }
}
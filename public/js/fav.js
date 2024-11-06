function displayFav() {
    let user = db.collection("User").doc(userUID);
    let ID = params.searchParams.get("docID");

    db.collection("User").doc(ID).collection("favourites")
        .get()
        .then(doc => {
            thisFav = doc.data();
            Classroom = doc.data().Classroom;
            Building = doc.data().Building;

            document.getElementById("Building").innerHTML = Building;
            document.getElementById("Classroom").innerHTML = Classroom;
            
        })

}
displayFav();
function addFav() {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("Users").doc(userID).collection("favourites").dooc().add({
            Classroom: Classroom,
            userID: userID,
            Building: BuildingName,
            Location: Geopoint,

        });
    } else {
        console.log("No user is signed in");
    }
}
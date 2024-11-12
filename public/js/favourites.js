function displayFavourites() {
    let listTemplate = document.getElementById("listTemplate");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("User").doc(user.uid).collection("Favourites").doc("Buildings").get()
                .then((doc) => {
                    for (const key in doc.data()) {

                        const newcard = listTemplate.content.cloneNode(true);
                        newcard.querySelector('.building').innerHTML = key;
                        document.getElementById("Buildings-go-here").appendChild(newcard);
                    }
                })
        } else {
            console.log("user is not login");
        }
    });
}
displayFavourites();

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


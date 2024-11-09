async function displayFav(collection) {

    let listTemplate = document.getElementById("listTemplate");

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            db.collection("User").doc(user).collection("Favourites").get()
                .then((allFav) => {
                    allFav.forEach(doc => {
                        const buliding = doc.data().Building;
                        const classroom = doc.data().Classroom

                        const newcard = listTemplate.content.cloneNode(true);
                        newcard.querySelector('.building').innerHTML = buliding;
                        newcard.querySelector('.classroom').innerHTML = classroom;
                        console.log(collection);
                        document.getElementById(collection + "-go-here").appendChild(newcard);
                    })
                })
        } else {
            console.log("user is not login");
    }
    });

}
displayFav("Favourites");

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


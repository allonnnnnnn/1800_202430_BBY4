function writeReview() {
    let user = firebase.auth().currentUser;

    let input = document.getElementById("description").value;
    db.collection("Requests").add({
        user: user.displayName,
        Request: input
    });
}

function readReview() {
    db.collection("Requests").get().then((querySnapshot) => {
        querySnapshot.forEach(requestDoc => {
            console.log(requestDoc.data().Request);
        });
    });
}
readReview();



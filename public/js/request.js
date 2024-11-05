async function writeReview() {
    let user = firebase.auth().currentUser;

    let input = document.getElementById("description").value;
    db.collection("Requests").add({
        user: user.displayName,
        Request: input
    });
}



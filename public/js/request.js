async function writeRequest() {
    let user = firebase.auth().currentUser;

    let input1 = document.getElementById("description").value;
    let input2 = document.getElementById("building").value;
    db.collection("Requests").add({
        user: user.displayName,
        Request: input1,
        building: input2
    });
}



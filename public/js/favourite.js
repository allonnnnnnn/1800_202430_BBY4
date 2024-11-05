function favs() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    db.collection("User")
        .doc(ID)
        .get()
        .then(doc => {
            user = doc.data();
            userCode = thisUser.code;
            userFav = thisUser.data;

            document.getElementById("userfav").innerHTML = userFav;
        });
}
favs();

db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
});

db.collection("Featrues").doc("Buliding").update({
    SW9: [49 , 123],
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    console.error("Error updating document: ", error);
});
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
                    const appendedCard = document.getElementById("Buildings-go-here").lastElementChild;
                    let removeButton = appendedCard.querySelector("#removeButton");
                    removeButton.addEventListener("click", () => {
                        db.collection("User").doc(user.uid).collection("Favourites").doc("Buildings").update({
                            [key]: firebase.firestore.FieldValue.delete()
                        });

                        appendedCard.remove();
                    });

                    let goToButton = appendedCard.querySelector("#GoToButton");
                    goToButton.addEventListener("click", () => {
                        localStorage.setItem("GoToPlace", key);
                        window.location.href = "/home";
                    });
                }
            })
        } else {
            console.log("user is not login");
        }
    });
}
displayFavourites();

function removeFavourite(event) {
    let element = event.target;
    console.log(element.innerHTML);
}


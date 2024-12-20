var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("User").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}
function saveUserInfo() {
    //enter code here

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"

    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
            alert("Your profile has been successfully updated!");  
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            alert("We can't update your profile. Please try again."); 
        });
    document.getElementById('personalInfoFields').disabled = true;

}


//call the function to run it 
populateUserInfo();


const savedZoomLevel = localStorage.getItem('zoomLevel');

if (savedZoomLevel) {
    document.body.style.fontSize = savedZoomLevel;  // Zoom in or out 
} else {
    document.body.style.fontSize = '16px';
}

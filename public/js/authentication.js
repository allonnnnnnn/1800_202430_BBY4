var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                let userRef = db.collection("User").doc(user.uid);
                let favouritesCollection = userRef.collection("Favourites");

                let buildingDoc = favouritesCollection.doc("Buildings");
                let classroomDoc = favouritesCollection.doc("Classroom");
                let washroomRoomDoc = favouritesCollection.doc("Washroom");
                let waterFountainDoc = favouritesCollection.doc("WaterFountain")
                let microwaveDoc = favouritesCollection.doc("Microwave");

                //This creates empty documents for data to be LATER stored in (when they favourite a place)
                buildingDoc.set({});
                classroomDoc.set({});
                washroomRoomDoc.set({});
                waterFountainDoc.set({});
                microwaveDoc.set({});

                userRef.set({
                    email: user.email,
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("/home");
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },

        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: "home",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',
};

ui.start('#firebaseui-auth-container', uiConfig);

/**
 * Logs out the user
 */
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

/**
 * Changes the UI if the user is logged in or not logged in
 */
function checkForUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("logged in");

            $('#sidebarPlaceholder').load('/html/loggedInNavbar.html', function () {

                let username = user.displayName;
                document.getElementById("name-goes-here").innerText = username;
            });
            $('#footerPlaceholder').load('/html/loggedInFooter.html');
        } else {
            $('#navbarPlaceholder').load('/html/loggedOutNavbar.html');
            $('#footerPlaceholder').load('/html/loggedOutFooter.html');

            console.log("No user is currently logged in")
        }
    })
}
checkForUser();




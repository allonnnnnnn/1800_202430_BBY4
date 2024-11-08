var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("User").doc(user.uid).set({
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
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',
};

ui.start('#firebaseui-auth-container', uiConfig);

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
    });
}

function checkForUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("logged in");

            $('#navbarPlaceholder').load('/html/loggedInNavbar.html', function () {

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



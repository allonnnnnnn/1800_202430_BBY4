const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/images", express.static("./public/images"));
app.use("/css", express.static("./public/css"));
app.use("/font", express.static("./public/font"));
app.use("/js", express.static("./public/js"));
app.use("/html", express.static("./app/html"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf-8");
    res.send(doc);
});

app.get("/login", function (req, res) {
    let doc = fs.readFileSync("./app/html/login.html", "utf-8");
    res.send(doc);
});

app.get("/home", function (req, res) {
    let doc = fs.readFileSync("./app/html/main.html", "utf-8");
    res.send(doc);
});

app.get("/home/favourites", function (req, res) {
    let doc = fs.readFileSync("./app/html/.html", "utf-8");
    res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

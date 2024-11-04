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
    //let doc = fs.readFileSync("./app/html/.html", "utf-8");
    //res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});

/*function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            console.log(user.uid); 
            console.log(user.displayName);  
            userName = user.displayName;

            document.getElementById("name-goes-here").innerText = userName;


        } else {
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); */

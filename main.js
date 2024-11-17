require('dotenv').config();
const express = require("express");
const fetch = import("node-fetch");
const app = express();
const fs = require("fs");
const googleAPIKey = process.env.GOOGLE_API_KEY;

app.use(express.json());
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
    let doc = fs.readFileSync("./app/html/favourites.html", "utf-8");
    res.send(doc);
});
app.get("/home/setting", function (req, res) {
    let doc = fs.readFileSync("./app/html/setting.html", "utf-8");
    res.send(doc);
});
app.get("/home/request", function (req, res) {
    let doc = fs.readFileSync("./app/html/request.html", "utf-8");
    res.send(doc);
});
app.post("/getRoute", function (req, res) {
    const { origins, destinations, waypoints } = req.body;

    const requestBody = {
        origins,
        destinations,
        waypoints,
        travelMode: "WALKING",
        key: apiKey,
    };

    fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    })
        .then((response) => {
            const data = response.json();
            res.json(data);
        });
});

let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});


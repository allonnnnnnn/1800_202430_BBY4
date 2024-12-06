const express = require("express");
const fetch = import("node-fetch");
const app = express();
const fs = require("fs");

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
app.get("/home/profile", function (req, res) {
    let doc = fs.readFileSync("./app/html/profile.html", "utf-8");
    res.send(doc);
})
app.get("/home/thanks", function (req, res) {
    let doc = fs.readFileSync("./app/html/thanks.html", "utf-8");
    res.send(doc);
})
app.get("/home/contact", function (req, res) {
    let doc = fs.readFileSync("./app/html/contact.html", "utf-8");
    res.send(doc);
})
app.get("/home/about", function (req, res) {
    let doc = fs.readFileSync("./app/html/aboutus.html", "utf-8");
    res.send(doc);
})
app.get("/home/success", function (req, res) {
    let doc = fs.readFileSync("./app/html/success.html", "utf-8");
    res.send(doc);
})
app.get("/home/navbar", function (req, res) {
    let doc = fs.readFileSync("./app/html/loggedinNavbar.html", "utf-8");
    res.send(doc);
})
let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});


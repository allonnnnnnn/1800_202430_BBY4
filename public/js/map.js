import apiKey from "./GoogleAPI_BBY4.js";
window.map;
let userMarker;

const routePoints = {
    point1: { lat: 49.250200, lng: -123.002176 },
    point2: { lat: 49.250371, lng: -123.002174 },
    point3: { lat: 49.250203, lng: -123.001838 },
    point4: { lat: 49.250122, lng: -123.001832 },
    point5: { lat: 49.250110, lng: -123.001603 },
    point6: { lat: 49.250157, lng: -123.001338 },
    point7: { lat: 49.24986871572198, lng: -123.00135360795792 },
    point8: { lat: 49.24959634530445, lng: -123.00135555326102 },
    point9: { lat: 49.24932186046673, lng: -123.00136770632439 },
    point10: { lat: 49.249348833046135, lng: -123.00181979852135 },
    point11: { lat: 49.24942923299425, lng: -123.00229544436637 },
    point12: { lat: 49.24962007239925, lng: -123.00183372912966 },
    point13: { lat: 49.24974571887469, lng: -123.00241766100653 },
    point14: { lat: 49.24988407097234, lng: -123.00264294620567 },
    point15: { lat: 49.25017867200696, lng: -123.00265584095614 },
    point16: { lat: 49.25061346297115, lng: -123.00265006245064 },
    point17: { lat: 49.250621822387195, lng: -123.00300967295497 },
    point18: { lat: 49.25153360155889, lng: -123.00260787457697 },
    point19: { lat: 49.251683989874984, lng: -123.00255880857331 },
    point20: { lat: 49.251718660615985, lng: -123.00186533966401 },
    point21: { lat: 49.25135932040231, lng: -123.00186039388356 },
    point22: { lat: 49.25136862418167, lng: -123.0015269983036 },
    point23: { lat: 49.25130455854149, lng: -123.0007978977562 },
    point24: { lat: 49.25069627184898, lng: -123.00076487576415 },
    point25: { lat: 49.25049787138157, lng: -123.0010799015124 },
    point26: { lat: 49.25105380378419, lng: -123.00107515227081 },
    point27: { lat: 49.251068270317575, lng: -123.00077437385475 },
    point28: { lat: 49.25016860072056, lng: -123.00112364736242 },
    point29: { lat: 49.2503970067337, lng: -123.0028817984109 },
    point30: { lat: 49.25046248773374, lng: -123.00183945660409 },
    point31: { lat: 49.25047989137696, lng: -123.00161475387377 },
    point32: { lat: 49.250509845881616, lng: -123.00177668514898 },
    point33: { lat: 49.250904591416464, lng: -123.00185432867761 },
    point34: { lat: 49.2510087667777, lng: -123.00294008557465 },
    point35: { lat: 49.25123088574348, lng: -123.00359148729284 },
    point36: { lat: 49.25156881528075, lng: -123.00351749833047 },
    point37: { lat: 49.25185897340776, lng: -123.00350431791641 },
    point38: { lat: 49.25144040642327, lng: -123.003168894595 },
    point39: { lat: 49.251344227150746, lng: -123.00108371517851 },
    point40: { lat: 49.251609205317415, lng: -123.000863970457771 },
    point41: { lat: 49.251785423612915, lng: -123.00063996106496 },
    point42: { lat: 49.25177886114808, lng: -122.99967870420227 },
    point43: { lat: 49.252083660192525, lng: -122.99855533987284 },
    point44: { lat: 49.2524505744205, lng: -122.99810820396745 },
    point45: { lat: 49.253572856271546, lng: -122.99813075657032 },
    point46: { lat: 49.254502332690535, lng: -122.9981681272521 },
    point47: { lat: 49.25045410304413, lng: -122.99880811526732 },
    point48: { lat: 49.25049886818958, lng: -122.99973402459845 },
    point49: { lat: 49.24919783846934, lng: -122.99976235489868 },
    point50: { lat: 49.24910596778026, lng: -123.000673053028791 },
    point51: { lat: 49.249718414265764, lng: -123.00162064073227 },
    point52: { lat: 49.251834665746394, lng: -123.00273745354298 },
    point53: { lat: 49.25039104666775, lng: -123.00248532624752 },
    point54: { lat: 49.250418697475425, lng: -123.00263973608885 },
    point55: { lat: 49.251871765411536, lng: -123.00412802458989 },
    point56: { lat: 49.25172860955013, lng: -123.00408703082726 },
    point57: { lat: 49.24956545707072, lng: -123.00233273121567 },
    point58: { lat: 49.25016186656624, lng: -122.99979214533244 },
    point59: { lat: 49.2507269024448, lng: -122.99975419305406 }
};

const routeGraph = {
    point1: { point2: 0, point3: 0, point15: 0 },
    point2: {},
    point3: { point1: 0, point30: 0 },
    point4: { point3: 0, point5: 0 },
    point5: { point4: 0, point6: 0, point51: 0 },
    point6: { point5: 0, point28: 0, point7: 0 },
    point7: { point8: 0 },
    point8: { point51: 0, },
    point9: { point8: 0, point10: 0 },
    point10: { point12: 0, point9: 0, point11: 0 },
    point11: {},
    point12: { point51: 0, point10: 0 },
    point13: { point14: 0, point57: 0 },
    point14: { point15: 0 },
    point15: { point54: 0 },
    point16: { point18: 0 },
    point17: { point34: 0, point16: 0 },
    point18: { point19: 0 },
    point19: { point20: 0, point52: 0 },
    point20: { point41: 0, point21: 0 },
    point21: { point22: 0, point33: 0 },
    point22: { point21: 0, point39: 0 },
    point23: { point27: 0 },
    point24: { point25: 0, },
    point25: { point28: 0, point48: 0 },
    point26: { point25: 0 },
    point27: { point26: 0, point24: 0 },
    point28: { point6: 0 },
    point29: { point17: 0, point15: 0 },
    point30: { point31: 0, point3: 0 },
    point31: { point30: 0, point32: 0 },
    point32: { point31: 0, point33: 0 },
    point33: { point32: 0, point21: 0 },
    point34: { point35: 0, point16: 0, point18: 0 },
    point35: { point36: 0 },
    point36: { point37: 0, point18: 0 },
    point37: {},
    point38: {},
    point39: { point22: 0, point40: 0, point23: 0 },
    point40: { point41: 0 },
    point41: { point42: 0 },
    point42: { point43: 0 },
    point43: { point47: 0, point44: 0 },
    point44: {},
    point45: { point44: 0 },
    point46: { point45: 0 },
    point47: { point48: 0 },
    point48: {},
    point49: { point50: 0 },
    point50: { point9: 0 },
    point51: {},
    point52: { point37: 0 },
    point53: { point2: 0, point54: 0, point15: 0 },
    point54: { point15: 0, point16: 0 },
    point55: { point37: 0 },
    point56: { point55: 0, point36: 0 },
    point57: { point11: 0, point12: 0 },
    point58: { point48: 0, point49: 0, point28: 0 },
    point59: { point48: 0, point42: 0, point24: 0 }
}

const currentRoutePoints = {
    currentOrigin: null,
    currentDestination: null,
};

/**
 * The fixed bounds of the map (BCIT boundaries)
 */
const bounds = {
    north: 49.254794,
    east: -122.993394,
    south: 49.241543,
    west: -123.004505
};

/**
 * Initalize the map with a custom style added to it 
 */
window.initMap = function () {
    const mapOptions = {
        center: { lat: 49.253300, lng: -123.001549 },
        zoom: 15,
        mapId: "e1a7e8a6dbcb9005",
        restriction: {
            latLngBounds: bounds,
            strictBounds: true
        },
        gestureHandling: "greedy",
        disableDefaultUI: true
    };

    window.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    /* These two functions to make it easier to add routes to the map
    for (const key in routeGraph) {
        for (const key2 in routeGraph[key]) {
            const polyline = new google.maps.Polyline({
                path: [
                    {lat: routePoints[key].lat, lng: routePoints[key].lng},
                    {lat: routePoints[key2].lat, lng: routePoints[key2].lng}
                ],
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              });
            polyline.setMap(map);
        }
        let labelElement = document.createElement("div");
        labelElement.innerText = "Building Name";
        labelElement.style = "font-size: 18pt";
        google.maps.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
            let newMarker = new AdvancedMarkerElement({
                map: window.map,
                position: { lat: routePoints[key].lat, lng: routePoints[key].lng },
                content: labelElement,
                title: key
            });
            labelElement.innerText = key;
        });
    }

    Click on the map to get the position of the click
    map.addListener("click", (event) => {
        const lat = event.latLng.lat(); // Latitude of click
        const lng = event.latLng.lng(); // Longitude of click
        alert(`lat: ${lat}, lng: ${lng}`);
    });
    */

    fillInUndirectedGraph();

    loadGeolocater();
}

function fillInUndirectedGraph() {
    for (const key in routeGraph) {
        for (const key2 in routeGraph[key]) {
            if (key == key2) continue;
            if (routeGraph[key2][key] != undefined) continue;

            routeGraph[key2][key] = 0;
        }
    }

    calculateGraphEdges();
}

function calculateGraphEdges() {
    for (const key in routeGraph) {
        for (const key2 in routeGraph[key]) {
            let point1 = { latitude: routePoints[key].lat, longitude: routePoints[key].lng };
            let point2 = { latitude: routePoints[key2].lat, longitude: routePoints[key2].lng };
            routeGraph[key][key2] = calculateLatLngDistance(point1, point2);
        }
    }
}

/**
 * This will take the API key and load in the Map inside of main.html
 */
function LoadGoogleMaps() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&loading=async&callback=initMap");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
LoadGoogleMaps();

/**
 * Loads the geo geolocater to find where the user is
 */
function loadGeolocater() {
    let watchID = undefined;
    let loadedIn = false;

    const userImg = document.createElement("img");
    userImg.src = "/images/userMarker.png";
    userImg.style.height = "45px";
    firebase.auth().onAuthStateChanged((user) => {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition((userPosition) => {
                /*let userLatitude = userPosition.coords.latitude;
                let userLongitude = userPosition.coords.longitude;*/

                let userLatitude = 49.251500;
                let userLongitude = -123.001273;
                user.currentPosition = { latitude: userLatitude, longitude: userLongitude };
                //If statement checks if user is within BCIT
                if (userLatitude > bounds.north || userLatitude < bounds.south || userLongitude < bounds.west || userLongitude > bounds.east) {
                    warnUserIsOffCampus()
                    navigator.geolocation.clearWatch(watchID);
                    return;
                }

                google.maps.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
                    userMarker = new AdvancedMarkerElement({
                        map: window.map,
                        position: { lat: userLatitude, lng: userLongitude },
                        content: userImg,
                        title: "User"
                    });
                    if (!loadedIn) {
                        window.map.setZoom(18);
                        window.map.panTo({ lat: userLatitude, lng: userLongitude });
                        loadedIn = true;
                    }
                });
            });
        } else {
            user.currentPosition = { latitude: 0, longitude: 0 };
            warnUserIsOffCampus();
        }
    });
}

function warnUserIsOffCampus() {
    const myModal = new bootstrap.Modal(document.getElementById('warningModal'));
    myModal.show();

    document.getElementById('warningModal').querySelectorAll("Button")[0].addEventListener("click", function () {
        myModal.hide();
    })
}

/**
 * Gives functionality to markers like clickable building names. This also gives
 * @param {*} snap 
 * @param {*} key 
 */
window.onMarkerClicked = function (snap, key) {
    let snapData = snap.data();

    window.map.setZoom(20);
    window.map.panTo({ lat: snapData[key].latitude, lng: snapData[key].longitude + 0.00015 });
    $("#infoCard-goes-here").load("/html/infoCard.html", function () {
        let infoCard = document.getElementById("infoCard");
        let foundMarker = returnMarker(snapData[key].latitude, snapData[key].longitude);

        if (foundMarker == null) {
            console.log("Could not find the marker");
            return;
        }

        if (foundMarker.favourited) {
            document.getElementById("favouriteButtonText").innerText = "Unfavourite Place";
        } else {
            document.getElementById("favouriteButtonText").innerText = "Favourite Place";
        }

        infoCard.getElementsByClassName("card-title")[0].innerHTML = key;

        //Check if this user already favourited this place. If so, change the gui to "Favourited" which when
        //pressing it will unfavourite it (remove it from the database)

        //All this code below adds functionality to the buttons on the infocard
        document.getElementById("directionButton").addEventListener("click", () => {
            let userPosition = firebase.auth().currentUser.currentPosition;
            currentRoutePoints.currentOrigin = { lat: userPosition.latitude, lng: userPosition.longitude };
            currentRoutePoints.currentDestination = { lat: foundMarker.position.lat, lng: foundMarker.position.lng };
            
            popUpDirectionsWindow(foundMarker);
        });
        document.getElementById("favouriteButton").addEventListener("click", function () {
            let updatingDocument = db.collection("User").doc(firebase.auth().currentUser.uid).collection("Favourites").doc(snap.id);

            //When the location is NOT favourited
            if (!foundMarker.favourited) {
                document.getElementById("favouriteButtonText").innerText = "Unfavourite Place";
                updatingDocument.update({
                    [key]: { lat: snapData[key].latitude, lng: snapData[key].longitude }
                }).then(() => {
                    displayFavouriteOnMap(snapData[key].latitude, snapData[key].longitude);
                });
                return;
            }

            //This happens when the location IS favourited (remove it from being favourited)
            document.getElementById("favouriteButtonText").innerText = "Favourite Place";
            updatingDocument.update({
                [key]: firebase.firestore.FieldValue.delete()
            }).then(() => {
                displayFavouriteOnMap(snapData[key].latitude, snapData[key].longitude);
            });
        });
        document.getElementById("backButton").addEventListener("click", function (event) {
            goBack();
        });
        window.map.addListener("click", function (event) {
            goBack();
        })
    });
}

function popUpDirectionsWindow(assumedDestinationMarker) {
    goBack();
    document.getElementById("searchBar").style = "display: none";
    document.getElementById("searchBarDirections").style = "display: block";

    document.getElementById("destinationInput").value = assumedDestinationMarker.title;

    document.getElementById("calculateRoute").addEventListener("click", function () {
        displayRoute();
    });

    document.getElementById("exitDirections").addEventListener("click", function () {
        document.getElementById("searchBar").style = "display: block";
        document.getElementById("searchBarDirections").style = "display: none";
    });
}

function displayRoute() {
    let route = calculateRoute();

    if (route == null) {
        return;
    }
    console.log(route);
    const polyline = new google.maps.Polyline({
        path: route,
        geodensic: true,
        strokeColor: "#00008B",
        strokeOpacity: 1.0,
        strokeWeight: 5,
    });
    polyline.setMap(map);
}

/**
 * This algorithm uses Dijkstra's algorithm to find the shortest route with our 
 * hand placed points.
 */
function calculateRoute() {
    //In a {lat: , lng: } map
    let origin = currentRoutePoints.currentOrigin;
    let destination = currentRoutePoints.currentDestination;
    
    if (origin == null || destination == null) {
        return null;
    }
    
    let shortestRoute = dijkstra(origin, destination);
    shortestRoute.push(origin);

    return shortestRoute;
}

/**
 * Gets the shortest route in routePoints
 * @param {*} startPoint startPoint is a latlng map
 * @param {*} endPoint endPoint is a latlng map
 * @returns an array of points
 */
function dijkstra(startPoint, endPoint) {
    const closestStartPoint = getClosestItem(startPoint, routePoints);
    const closestEndPoint = getClosestItem(endPoint, routePoints);

    const estimates = {};
    const previous = {};
    const visited = {};
    const route = [];
    route.push(endPoint);

    for (const key in routePoints) {
        estimates[key] = Infinity;
        visited[key] = false;
    }

    let currentKey = closestStartPoint.key;
    estimates[currentKey] = 0;
    visited[currentKey] = true;

    while (currentKey !== closestEndPoint.key) {
        visited[currentKey] = true;

        // Update estimates for neighbors of the current node
        for (const neighbor in routeGraph[currentKey]) {
            if (visited[neighbor]) continue;

            const newEstimate = estimates[currentKey] + routeGraph[currentKey][neighbor];
            if (newEstimate < estimates[neighbor]) {
                estimates[neighbor] = newEstimate;
                previous[neighbor] = currentKey;
            }
        }

        // Find the next node with the smallest estimate that hasn't been visited
        let smallestEstimate = Infinity;
        let nextKey = null;
        for (const key in estimates) {
            if (!visited[key] && estimates[key] < smallestEstimate) {
                smallestEstimate = estimates[key];
                nextKey = key;
            }
        }

        // If no valid next node is found, break (graph might be disconnected)
        if (nextKey === null) break;

        currentKey = nextKey;
    }

    currentKey = closestEndPoint.key;
    while (currentKey != closestStartPoint.key) {
        route.push(routePoints[currentKey]);
        currentKey = previous[currentKey];
    }

    return route;
}

function goBack() {
    google.maps.event.clearListeners(window.map, "click");
    document.getElementById("infoCard-goes-here").innerHTML = "";
}

document.getElementsByTagName("input")[0].addEventListener("click", function (event) {
    document.getElementsByTagName("input")[0].value = "";
});

window.onSearchBarFocus = function (inputElement) {
    inputElement.addEventListener("input", function (event) {
        if (inputElement.id == "searchBarInput") {
            displaySearchResult(inputElement, document.getElementById("search-results-go-here"), (marker) => {
                db.collection("Features").doc("Buildings").get()
                    .then(function (buildingDoc) {
                        window.onMarkerClicked(buildingDoc, marker.title);
                    });

                window.map.setZoom(20);
                window.map.panTo({ lat: marker.position.lat, lng: marker.position.lng + 0.00015 });
            });
        } else if (inputElement.id == "originInput") {
            displaySearchResult(inputElement, document.getElementById("origin-results-go-here"), (marker) => {
                currentRoutePoints.currentOrigin = marker.position;
            });
        } else if (inputElement.id == "destinationInput") {
            displaySearchResult(inputElement, document.getElementById("destination-results-go-here"), (marker) => {
                currentRoutePoints.currentDestination = marker.position;
            });
        }
    });
}

window.onSearchBarOutOfFocus = function (inputElement) {
    inputElement.removeEventListener("input", () => { });
    let searchList = document.getElementById("search-results-go-here");
    searchList.innerHTML = "";
}

function displaySearchResult(inputElement, outputElement, callback) {
    let searchList = outputElement;
    if (searchList == null) return;
    searchList.innerHTML = "";

    let input = inputElement.value.toLowerCase().trim();

    if (input.length == 0) return;

    //Will sort the markers if 
    const filteredMarkers = window.markers.filter((marker) => {
        return marker.title.toLowerCase().includes(input);
    });
    filteredMarkers.sort((marker1, marker2) => {
        if (marker1.title.toLowerCase() > marker2.title.toLowerCase()) return 1;
        if (marker1.title.toLowerCase() < marker2.title.toLowerCase()) return -1;
        return 0;
    });

    filteredMarkers.forEach(marker => {
        if (marker.title == "" || marker.featureType == "Washrooms" || marker.featureType == "Microwaves" || marker.featureType == "WaterFountains") return;

        let templateClone = document.getElementById("listTemplate").content.cloneNode(true);
        templateClone.querySelector("p").innerHTML = marker.title;
        searchList.appendChild(templateClone);

        let appendedClone = outputElement.lastElementChild;
        appendedClone.addEventListener("click", function () {
            searchList.innerHTML = "";
            inputElement.value = marker.title;

            callback(marker);
        });
    });
}

window.onDropDownButtonsClicked = function (feature) {
    db.collection("Features").doc(feature).get().then((doc) => {
        let currentUserPosition = firebase.auth().currentUser.currentPosition;
        if (currentUserPosition.latitude > bounds.north || currentUserPosition.latitude < bounds.south || currentUserPosition.longitude < bounds.west || currentUserPosition.longitude > bounds.east) {
            warnUserIsOffCampus();
            return;
        }

        let closestMarker = getClosestItem(currentUserPosition, doc.data());
        window.onMarkerClicked(doc, closestMarker.title);
    })
};

/**
 * Find the closest item (in an array) to the pivot point
 * @param {*} pivot pivot is the main pivot point (a lat/lng map) for all other items
 * @param {*} items the list of lat/lng items looped through to find the closest one
 */
function getClosestItem(pivot, items) {
    let closestKey;
    let closestObject;
    let closestDistance = 100000000000;

    for (const key in items) {
        const distance = calculateLatLngDistance(items[key], pivot);

        if (closestObject == null) {
            closestKey = key;
            closestObject = { lat: items[key].latitude || items[key].lat, lng: items[key].longitude || items[key].lng };
            closestDistance = distance;
            continue;
        }

        if (distance < closestDistance) {
            closestKey = key;
            closestDistance = distance;
            closestObject = { lat: items[key].latitude || items[key].lat, lng: items[key].longitude || items[key].lng };
        }
    }
    closestObject = returnMarker(closestObject.lat, closestObject.lng) || closestObject;
    closestObject.key = closestKey;
    return returnMarker(closestObject.lat, closestObject.lng) || closestObject;
}

/**
 * Converts latitude and longitude to metric and calculates the distance from two points
 * @param {*} firstPoint is a map with lat and lng
 * @param {*} secondPoint is a map with lat and lng
 * @returns 
 */
function calculateLatLngDistance(firstPoint, secondPoint) {
    // Radius of the Earth in kilometers
    const earthRadius = 6371;

    //Converts latitude to radians
    const lat1 = (firstPoint.latitude || firstPoint.lat) * Math.PI / 180;
    const lat2 = (secondPoint.latitude || secondPoint.lat) * Math.PI / 180;
    const lon1 = (firstPoint.longitude || firstPoint.lng) * Math.PI / 180;
    const lon2 = (secondPoint.longitude || secondPoint.lng) * Math.PI / 180;


    //The differences in both lat and lng
    const dlat = lat2 - lat1;
    const dlng = lon2 - lon1;

    //Haversine formula used to calculate the great-circle distance between two points 
    //on a sphere with their lat and lng given 
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dlng / 2) * Math.sin(dlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //Distance in kilometers
    const distance = earthRadius * c;
    return distance;
}


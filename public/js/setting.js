import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function darkMode() {
  let isDarkMode = false;
  const body = document.body;
  const userId = firebase.auth().currentUser;;

  isDarkMode = !isDarkMode;

  body.classList.toggle("dark-mode", isDarkMode);

  update(ref(database, `users/${userId}`), {
    darkmode: isDarkMode
  }).then(() => {
    console.log("Dark mode preference updated:", isDarkMode);
  });
}

const zoomSlider = document.getElementById('zoom-slider');
const zoomValue = document.getElementById('zoom-value');

function loadZoomLevel() {
  const savedZoomLevel = localStorage.getItem('zoomLevel');
  if (savedZoomLevel) {
    document.body.style.fontSize = savedZoomLevel;
    zoomSlider.value = parseInt(savedZoomLevel);
    zoomValue.textContent = savedZoomLevel;
  } else {
    // Default zoom level if none is set
    document.body.style.fontSize = '16px';
    zoomSlider.value = 16;
    zoomValue.textContent = '16px';
  }
}

zoomSlider.addEventListener('input', function () {
  const zoomLevel = zoomSlider.value + 'px';  // Get the zoom level in px
  document.body.style.fontSize = zoomLevel;  // Apply it to the body (zoom the page)

  // Update the displayed zoom value
  zoomValue.textContent = zoomLevel;

  localStorage.setItem('zoomLevel', zoomLevel);
});

loadZoomLevel();


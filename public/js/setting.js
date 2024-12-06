function darkMode() {
  let checkbox = document.getElementById("darkmode");
  let body = document.getElementById('body')
  var element = document.body;
  element.classList.toggle("dark-mode");

  // checkbox.addEventListener('change', function () {
  //     if (this.checked) {
  //         body.classList.add('dark')
  //     } else {
  //         body.classList.remove('dark')
  //     }
  // });
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
    // Default zoom level 
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


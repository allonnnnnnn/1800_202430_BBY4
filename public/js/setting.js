// This function toggles the dark mode on and off
function darkmode() {
  // Check the current state of dark mode (from localStorage)
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  
  // Save the new state in localStorage (flip the current state)
  localStorage.setItem('darkmode', !wasDarkmode);
  
  // Toggle the 'dark-mode' class on the body
  const element = document.body;
  element.classList.toggle('dark-mode', !wasDarkmode);
}

// This function is called on page load to apply dark mode if saved in localStorage
function onload() {
  // Check if dark mode was enabled previously and apply the class to the body
  const darkModeEnabled = localStorage.getItem('darkmode') === 'true';
  if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Run the onload function when the page loads
window.onload = onload;




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

zoomSlider.addEventListener('input', function() {
  const zoomLevel = zoomSlider.value + 'px';  // Get the zoom level in px
  document.body.style.fontSize = zoomLevel;  // Apply it to the body (zoom the page)

  // Update the displayed zoom value
  zoomValue.textContent = zoomLevel;

  localStorage.setItem('zoomLevel', zoomLevel);
});

loadZoomLevel();


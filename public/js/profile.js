const savedZoomLevel = localStorage.getItem('zoomLevel');
  
  if (savedZoomLevel) {
    document.body.style.fontSize = savedZoomLevel;  // Zoom in or out based on the stored value
  } else {
    document.body.style.fontSize = '16px';
  }

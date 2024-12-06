function w3_toggle() {
    const sidebar = document.getElementById("mySidebar");

    // Toggle the "open" class to open and close the sidebar
    sidebar.classList.toggle("open");

    // Prevent horizontal scroll when sidebar is open
    document.body.classList.toggle("sidebar-open");
}


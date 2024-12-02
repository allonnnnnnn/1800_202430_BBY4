function w3_toggle() {
    const sidebar = document.getElementById("mySidebar");
    const mainContent = document.getElementById("main-content");

    // Toggle the "open" class to open and close the sidebar
    sidebar.classList.toggle("open");
    mainContent.classList.toggle("shifted");

    // Prevent horizontal scroll when sidebar is open
    document.body.classList.toggle("sidebar-open");
}
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

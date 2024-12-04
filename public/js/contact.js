function writeContact(event) {
  event.preventDefault();
  console.log(event);
  let formData = {}
  formData.name = document.getElementById("name").value;
  formData.email = document.getElementById("email").value;
  formData.subject = document.getElementById("subject").value;
  formData.message = document.getElementById("message").value;
  savetofirestore(formData);
}
async function savetofirestore(formData) {
  let user = firebase.auth().currentUser;
  console.log(user);
  try {
    await db.collection("contact").add({
        user: user.displayName,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
    });
    console.log('Contact Form submitted successfully');
    window.location.href = '/home/success'; 
} catch (error) {
    console.error('Error submitting request: ', error);
}

}

const savedZoomLevel = localStorage.getItem('zoomLevel');
  
if (savedZoomLevel) {
  document.body.style.fontSize = savedZoomLevel;  // Zoom in or out based on the stored value
} else {
  document.body.style.fontSize = '16px';
}
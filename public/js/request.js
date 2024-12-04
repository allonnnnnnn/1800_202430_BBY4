async function writeRequest() {
    let user = firebase.auth().currentUser;

    if (!confirm('Are you sure you want to submit this request?')) {
        e.preventDefault();
    } else {
        let input1 = document.getElementById("description").value;
        let input2 = document.getElementById("building").value;
        
        try {
            await db.collection("Requests").add({
                user: user.displayName,
                Request: input1,
                building: input2
            });
            console.log('Request submitted successfully');

            window.location.href = '/home/thanks'; 
        } catch (error) {
            console.error('Error submitting request: ', error);
        }
    }

}

function readReview() {
    db.collection("Requests").get().then((querySnapshot) => {
        querySnapshot.forEach(requestDoc => {
            console.log(requestDoc.data().Request);
        });
    });
}
readReview();


  const savedZoomLevel = localStorage.getItem('zoomLevel');
  
  if (savedZoomLevel) {
    document.body.style.fontSize = savedZoomLevel;  // Zoom in or out based on the stored value
  } else {
    document.body.style.fontSize = '16px';
  }


  
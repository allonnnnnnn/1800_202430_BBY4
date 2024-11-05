function readQuote(day) {
    db.collection("Features").doc("Building")                                                       
        .onSnapshot(dayDoc => {                                                             
            
        }, (error) => {
            console.log("Error calling onSnapshot", error);
        });
}
readQuote("");


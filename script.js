function submitForm(event) {
    
    if(event) {
        event.preventDefault(); 
    }

   
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    console.log("Datele introduse in formular sunt:");
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    console.warn("Goodbye World!");
}
function submitForm(event) {
    // Împiedicăm reîncărcarea automată a paginii pentru a putea citi consola
    if(event) {
        event.preventDefault(); 
    }

    // Salvarea celor 3 elemente de formular
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    // Printarea elementelor în consolă
    console.log("Datele introduse in formular sunt:");
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    // Printarea avertizării la final
    console.warn("Goodbye World!");
}
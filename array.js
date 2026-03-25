

const elementeLista = document.querySelectorAll('#education li');
        const educatieArray = Array.from(elementeLista).map(li => li.textContent.trim());
        
        console.log("1. Array-ul de educație complet:");
        console.log(educatieArray);
        console.log("-------------------------");


        const filtru2025 = educatieArray.filter(item => item.includes("2025"));
        console.log("2a. Filtru '2025':");
        console.log(filtru2025);

        
        const filtruLiceu = educatieArray.filter(item => item.toLowerCase().includes("liceul"));
        console.log("2b. Filtru 'Liceul':");
        console.log(filtruLiceu);
        console.log("-------------------------");


        
        const primeleCuvinte = educatieArray.map(item => item.split(' ')[0]);
        
        console.log("3. Array cu primele cuvinte:");
        console.log(primeleCuvinte);
        console.log("-------------------------");
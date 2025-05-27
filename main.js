// Når nettsida er ferdig lasta, skriv ei melding i konsollen
document.addEventListener('DOMContentLoaded', () => {
    console.log('Velkomen til Nordic Geek!');

    // Legg til ein funksjon for å handtere innsending av kontaktskjemaet
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        // Forhindre at sida lastar på nytt når skjemaet blir sendt inn
        event.preventDefault();

        // Hent verdiane frå skjemaet
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Skriv ei melding i konsollen for å bekrefte innsendinga
        console.log(`Skjema sendt inn av: ${name} (${email})`);
        console.log(`Melding: ${message}`);

        // Vis ei enkel melding til brukaren
        alert('Takk for meldingen! Vi vil kontakte deg snart.');
        
        // Nullstill skjemaet
        contactForm.reset();
    });

    // Legg til funksjon for nattmodus
    const darkModeToggle = document.getElementById('dark-mode-toggle'); // Hent knappen for nattmodus
    const body = document.body; // Hent body-elementet
    const logo = document.querySelector('.logo img'); // Hent logoen

    darkModeToggle.addEventListener('click', () => {
        // Bytt mellom klassen 'dark-mode' på body
        body.classList.toggle('dark-mode');

        // Oppdater logoen basert på nattmodus
        if (body.classList.contains('dark-mode')) {
            logo.src = 'Logoer/logo kvit.png'; // Bytt til kvit logo
            darkModeToggle.textContent = 'Lysmodus'; // Oppdater teksten på knappen
        } else {
            logo.src = 'Logoer/logo rød.png'; // Bytt tilbake til rød logo
            darkModeToggle.textContent = 'Nattmodus'; // Oppdater teksten på knappen
        }
    });
});
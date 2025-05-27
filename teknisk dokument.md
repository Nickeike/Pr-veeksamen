# Teknisk dokumentasjon - Nordic Geek Nettside

## 1. Introduksjon
Denne dokumentasjonen beskriver utviklinga av nettsida for **Nordic Geek AS**, som er laga for å selje fem ulike DnD-inspirerte t-skjorter. Nettsida er bygd med **HTML, CSS og JavaScript**, med ein responsiv design og implementert **mørk modus**.

---

## 2. Teknologiar
- **HTML** (HyperText Markup Language) – Brukast for å strukturere nettsida.
- **CSS** (Cascading Style Sheets) – Brukast for å stilsette og formatere nettsida.
- **JavaScript** – Brukast for dynamiske funksjonar som nattmodus og skjema-håndtering.

---

## 3. Struktur av nettsida

### Filstruktur
```
/PR-VEEKSAMEN
|-- index.html
|-- styles.css
|-- main.js
|-- /Logoer
|   |-- logo rød.png
|   |-- logo kvit.png
|   |-- logo tekst rød
|   |--logo tekst kvit
|-- /t-skjorter
|   |-- tsjorte kvit.png
|   |-- tskjorteblå.png
|   |-- tskjorteorange.png
|   |-- tskjortegul.png
|   |-- tskjortemørk.png
|-- oppsett TrueNAS.md
|-- README.md
|-- resurser.md
|-- teknisk dokument.md
```

### HTML-struktur
```html
<header> <!-- Inneheld logo, navigasjon og nattmodus-knapp --> </header>
<main> <!-- Hovudinnhald med seksjonar for introduksjon, produkter, om oss og kontakt --> </main>
<footer> <!-- Copyright-informasjon --> </footer>
```
---

## 4. CSS-styling

### Bruk av variablar
Nettsida nyttar **CSS-variablar** for enkel fargeadministrasjon:
```css
:root {
    --red: #E21F39; 
    --blue: #5CC9E3; 
    --black: #000000; 
    --gray: #e2e2e2; 
    --white: #ffffff; 
    --light-gray: #F5F5F5; 
}
```

### Responsiv design
- Nettsida brukar **CSS Grid** i produktseksjonen for dynamisk oppsett:
```css
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}
```
- **Flexbox** vert brukt i header for god plassering av element.

### Mørk modus
Mørk modus er implementert ved å **bytte bakgrunnsfarge og tekstfarge** ved hjelp av `.dark-mode` klassen:
```css
body.dark-mode {
    background-color: var(--black);
    color: var(--white);
}
```
JavaScript sørger for veksling mellom modus.

---

## 5. JavaScript-funksjonalitet

### Nattmodus
Nattmodus vert aktivert ved å bruke `classList.toggle()` på `<body>`:
```js
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
```

### Kontakt-skjema
- Forhindrar automatisk sideoppdatering ved innsending:
```js
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
```
- Viser ein melding ved innsending:
```js
alert('Takk for meldingen! Vi vil kontakte deg snart.');
```

---

# Oppsett av TrueNAS Server

For å installere TrueNAS Core så må du gå inn på denne lenka 
https://www.truenas.com/download-truenas-core/

Eg starta med å installere **ISO-filen til TrueNAS Core** på ein minnepenn ved hjelp av **Balena Etcher**. Deretter sette eg minnepennen i ein PC/laptop som skulle brukast som server.

Eg måtte då gå inn i **BIOS** på PC-en, sjekke at **Secure Boot** var **av**, flytte **USB-enheten** til første prioritet, lagre endringane og avslutte BIOS.

Deretter dukka **TrueNAS GUI** opp, og installasjonen kunne starte.

## Installering

**NB! Mus/plate kjem ikkje til å fungere under denne prosessen, så du må bruke tastaturet.**

### Viktige tastar du må bruke
- **Piltaster**: Brukast for å navigere opp, ned og til sides i GUI-menyen.
- **Enter**: Knappen for å gå vidare til neste steg.
- **Space**: Brukast for å velje alternativ i menyen, t.d. boot-disk/device.
- **Ethernet-kabel**: Det er lurt å ha ein kabel kopla til routeren eller ein port på PC-en (serveren) for å sikre nettverkstilkobling.

### Installasjonsprosess
1. Vel **Install/Upgrade**.
2. Vel **destination media** (helst den disken med minst lagringsplass – heile disken blir brukt).
3. Trykk **Yes** (**NB!** Dette vil slette alt data på lagringsenheten du har valt).
4. **Lag root-passord** (brukarnamnet er **root**).
5. Vel **boot mode** (TrueNAS kan bruke både **BIOS** eller **UEFI**. Vel **UEFI** dersom enheten er moderne, og **BIOS** dersom den er eldre).
6. Restart PC-en (serveren) og kopla ut installeringsenheten (USB med ISO-fil).

### Etter installasjon
Om du har ein **Ethernet-kabel** kopla til, skal systemet automatisk få ei **IP-adresse** og bli tilgjengeleg via ein nettlesar (**Google Chrome, Brave eller Edge**). **IP-adressa** står på skjermen til serveren din.

Når du opnar **TrueNAS GUI**, skriv du inn **brukarnamn** (**root**) og **passordet** du oppretta under installasjonen.

---

## Oppgradering av TrueNAS

Det kan vere lurt å oppgradere systemet til den nyaste versjonen (**Fangtooth**). 

**NB!** Du kan ikkje oppgradere direkte frå **Core** til **Fangtooth**, fordi Core og Scale har forskjellige operativsystem:
- **TrueNAS Core** er basert på **FreeBSD**.
- **TrueNAS Scale** er basert på **GNU/Linux**.

### Oppgraderingsprosess:
1. **Oppgrader til Cobia 23.10**.
2. **Deretter oppgrader til Fangtooth 25.04**.

Når dette er gjort, skal alt fungere som forventa.

---

## Lagringsoppsett og konfigurasjon

### **Konvertering av Gibibytes til Gigabytes**
| Gibibytes (GiB) | Gigabytes (GB) |
| -------------- | -------------- |
| **1 GiB** | 1.07 GB |
| **250 GiB** | 268.43 GB |
| **500 GiB** | 536.87 GB |
| **1000 GiB** | 1073.74 GB |

🔗 [Gibibytes til Gigabytes-kalkulator](https://www.gbmb.org/gib-to-gb)

Når du opnar **Datasets** for første gong, må du **lage ein Pool**. 

### **Lage ein Pool**
1. **Vel eit namn** for poolen (utan mellomrom).
2. **Vel lagringsmetode**:
   - **Mirroring (RAID 1)** – Beskyttar mot diskfeil, men dobler ikkje lagringskapasiteten.
   - **Stripe (RAID 0)** – Maksimerer lagring, men ingen redundans.
   - **RAID 4** – Dedikert paritetsdisk gir betre feiltoleranse enn RAID 0.
   - **RAID 5** – Spreier paritet over fleire diskar, balansert mellom lagring og feiltoleranse.
   - **RAID 6** – Spreier paritet over **to** diskar, slik at systemet kan tåle opptil **to feilande diskar**.
   - Der det står *optional*, treng du ikkje å legge det inn – det er berre for lagring av loggfiler til ulike formål. I framtida kan det likevel vere lurt å legge til fleire diskar som er dedikert til spesifike oppgåver, som lagring av systeminformasjon.

---

## **Lage eit Datasett**
1. Naviger til **Datasets**.
2. Klikk **Add Dataset**.
3. Viss du berre har ein Pool, vil den velje denne automatisk.
4. Gi datasettet ditt eit namn (utan mellomrom).
5. Vel **Generic**.
6. Klikk **Save**.

---

## **Testing av lagringsdiskar**
Når du trykker inn på **Data Protection**, ser du at **Scrub** er sett opp automatisk. Her kan du også koble til skytjenester (om du har betalt for det) eller sette opp testar for virtuelle maskiner. 

Dersom du berre treng **fildeling**, er det lurt å sette opp **S.M.A.R.T.-testar**:
1. Klikk på **Add** ved sida av der det står **Periodic S.M.A.R.T. Tasks**.

---

## **Scrub-task**
**Scrubbing** hjelper med å oppdage og rette feil i ZFS-filsystemet. Det fungerer som ein helsesjekk for lagringssystemet og kan automatisk reparere feil.

 **Anbefalte innstillingar**:
- **Scrub-kjøringar**: Aktivert.
- **Frekvens**: Månadleg.
- **Automatisk reparasjon**: På.
- **Varsling ved feil**: Aktivert.

---

## **S.M.A.R.T.-task**
**S.M.A.R.T.-testing** gir tidleg varsling om diskfeil og overvakar helsa til lagringsdiskane.

 **Anbefalte innstillingar**:
- **Frekvens**: Aktivert for alle lagringsdiskar.
- **Automatisk testing**: Kvar veke.
- **Kort test**: Kvar veke, kl. 00.00.
- **Lang test**: Kvar månad, kl. 03.00.
- **Varsling ved feil**: Aktivert.

---

## **Laging av brukarar**
1. Klikk inn på **Credentials**.
2. Vel **Users**.
3. Klikk **Add**.
4. Skriv inn brukarens fulle namn. *Login (username) blir automatisk generert etter namnet, men du kan tilpasse det*.
5. Opprett eit passord manuelt.
6. Dersom du skrur av passord, vil brukaren ikkje kunne bruke **SMB Share** for å koble seg til filserveren. *For meir info, klikk på spørsmålsteiknet i menyen*.

---

## **Shares (Deling av filer)**
1. Gå til **Windows (SMB) Shares** og klikk på **Add**.
2. Vel **Path**, og vel datasettet du vil dele (*Eksempel: `/mnt/lagrepool/<din-egenlagde-datasett>`*).
3. Gi delinga eit namn.
4. **Purpose** kan stå som standard.
5. Klikk **Save**.
6. Viss systemet ber deg om å **restarte SMB**, så gjer det for å oppdatere innstillingane.

---


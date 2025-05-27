# Oppsett av TrueNAS Server

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
Om du har ein **Ethernet-kabel** kopla til, skal systemet automatisk få ei **IP-adresse** og bli tilgjengeleg via ein nettlesar (**Google Chrome, Brave eller Edge**). **IP-Adressa** står på skjermen til serveren din

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

Når du opnar **Dataset** for første gong, må du **lage ein Pool**. 

### **Lage ein Pool:**
1. **Vel eit namn** for poolen (utan mellomrom).
2. **Vel lagringsmetode**:
   - **Mirroring (RAID 1)** – Beskyttar mot diskfeil, men dobler ikkje lagringskapasiteten.
   - **Stripe (RAID 0)** – Maksimerer lagring, men ingen redundans.
   - **RAID 4** – Dedikert paritetsdisk gir betre feiltoleranse enn RAID 0.
   - **RAID 5** – Spreier paritet over fleire diskar, balansert mellom lagring og feiltoleranse.
   - **RAID 6** – Spreier paritet over **to** diskar, slik at systemet kan tåle opptil **to feilande diskar**.

---

## Scrub-task

**Scrubbing** hjelper med å oppdage og rette feil i ZFS-filsystemet. 

 **Anbefalte innstillingar**:
- **Scrub-kjøringar**: Aktivert.
- **Frekvens**: Månadleg.
- **Automatisk reparasjon**: På.
- **Varsling ved feil**: Aktivert.

---

## S.M.A.R.T.-task

**S.M.A.R.T.-testing** gir tidleg varsling om diskfeil.

 **Anbefalte innstillingar**:
- **Frekvens**: Aktivert for alle lagringsdiskar.
- **Automatisk testing**: Kvar veke.
- **Kort test**: Kvar veke, kl. 00.00.
- **Lang test**: Kvar månad, kl. 03.00.
- **Varsling ved feil**: Aktivert.
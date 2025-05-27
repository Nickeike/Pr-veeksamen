# Oppsett av TrueNAS Server

Eg starta med å installere ein ISO-filen til **TrueNAS Core** på ein minnepenn ved hjelp av **Balena Etcher**. Deretter sette eg minnepennen i ein PC/laptop 
eg måtte då gå inn på bios på PC-en som skulle vere serveren, sjekke at secureboot var av, flytta usb enheten til første prioritet, lagre og avslutt.

deretter så dukka det opp **TrueNAS**. sin GUI opp og då kunne me installere


## Installering

**NB! Mus/plate kjem ikkje til å fungere under denne prosessen, så du må bruke tastaturet.**

### Viktige tastar du må bruke
- **Piltaster**: Brukast for å navigere opp, ned og til sides i GUI-menyen.
- **Enter**: Knappen for å gå vidare til neste steg.
- **Space**: Brukast for å velje alternativ i menyen, t.d. boot-disk/device.
 
- Det er lurt å ha ein ethernet kabel kobla til routeren eller port frå PC-en(serveren) din

### Installasjonsprosess
1. Vel **Install/Upgrade**.
2. Vel **destination media** (helst den disken med minst lagringsplass – heile disken blir brukt).
3. Trykk **Yes** (**NB!** Dette vil slette alt data på lagringsenheten du har vald).
4. **Lag root-passord** (brukernamnet er **root**).
5. Vel **boot mode** (TrueNAS kan bruke både **BIOS** eller **UEFI**. Vel **UEFI** dersom enheten er moderne, og **BIOS** dersom den er eldre).
6. Restart PC-en(serveren) og koble ut installeringsenheten (USB med ISO-fil).

### Etter installasjon
Om du har ein **Ethernet-kabel** tilkobla, skal systemet automatisk få ei IP-adresse og kunne bli tilgjengeleg via ein nettlesar (**Google Chrome, Brave eller Edge**).

Når du opnar TrueNAS GUI, skriv du inn **brukarnamn** (**root**) og **passordet** du oppretta under installasjonen.

## Oppgradering av TrueNAS
Det kan vere lurt å oppgradere systemet til den nyaste versjonen (**Fangtooth**). 

**NB!** Du kan ikkje oppgradere direkte frå **Core** til **Fangtooth**, fordi Core og Scale har forskjellige operativsystem:
- **TrueNAS Core** er basert på **FreeBSD**.
- **TrueNAS Scale** er basert på **GNU/Linux**.

### Oppgraderingsprosess:
1. **Oppgrader til Cobia 23.10**.
2. **Deretter oppgrader til Fangtooth 25.04**.

Når dette er gjort, skal alt fungere som forventa.

## Lagringsoppsett og konfigurasjon
Gibibytes til Gigabytes

**1 GiB = 1.073741824 GB** 

**250 GiB = 268.435456 GB**

**500 GiB = 536.870912 GB**

**1000 GiB = 1073.741824 GB**

https://www.gbmb.org/gib-to-gb

Når du trykker deg inn på **Dataset** for første gang så ser du at du må lage ein **Pool** det skal du gjer. først så må du lage eit navn for din **Pool** det kan heite kva som helst så lenge det ikkje er mellomrom der. deretter så skal du velge kva type lagringsmetode som skal bli brukt til den Pool-en visst du har to lagringsenheter(SSD, HDD, USB) på same størrelse så kan du sette dei opp til Mirroring. visst dei er på forskjellige størrelser eller du har berre ein. så må du sette dei på stripe eller bruke mindre av den største(500GiB kobinert med 250GiB då brukes berre 250GiB av den 500Gib disken.) 

### Mirroring (RAID 1)
- visst den eine disken forsvinner eller blir ødelagt, så kan du bruke den andre disken og sette inn ein ny ein uten at info/lagring blir ødelagt eller korrupt. dermed er den meir redudant.
- visst du har to 500GiB disker så blir det berre fortsat 500GiB. siden infoen blir kopiert på begge.

### Stripe (RAID 0)
- visst du setter diskene dine opp til stripe så brukes begge diskene dine som lagringsplass. visst du har to 500GiB lagringsdisker, så vil dette gi deg 1000GiB med lagring. du vil få meir lagringsplass, men konsenkvensene er at visst ein av dine lagringsenheter forsvinner eller blir ødelagde, så kommer ingenting til å fungere(meir plass, ingen redudans.)

### RAID 2-9 
  Ein annen metode for å bruke diskene meir effektivt på med å dele dataen i fleire lagringsdisker så visst ein feile og du erstatte den så hente den data fra dei andre diskene og får infoen. visst du har 8 lagringsenheter og du har RAID 4 løsning, så kan 4 disker feile og serveren virke fint 
 
### Scrub-task
For å sikre data-integritet i ZFS, har systemet ein **scrub-task** som skannar og verifiserer blokkene i lagringspoolen. Dette hjelper med å oppdage eventuelle bit-flipping feil og gjenopprette data frå speilde eller paritetsdiskar.

(anbefalte innstillinger)
- **Scrub-kjøringar**: Aktivert
- **Frekvens**: Månadleg
- **Automatisk reparasjon**: På
- **Varsling ved feil**: Aktivert

### S.M.A.R.T.-task
Systemet har **S.M.A.R.T.-testing** aktivert for å overvake diskhelse og oppdage potensielle feil før dei fører til kritiske problem.

- **Frekvens**: Aktivert for alle lagringsdiskar
- **Automatisk testing**: Kvar veke 
- **Kort og lang testing**: Konfigurert for ulike intervallar (Kort, kvar veke. Lang, kvar måned: På TrueNAS så kan ikkje du ta kort test og lang test på samme tid på dagen, så du må sette Lang testing på 03.00 og kort ca 00.00 )
- **Varsling ved feil**: Aktivert for proaktiv feilsøking
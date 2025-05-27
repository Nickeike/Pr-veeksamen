Oppsett av TrueNAS Server:
Eg starta med å installere ein ISO fil på minnepenn med Balena Etcher. 
deretter så tok eg minnepennen i ein pc/laptop og installerte TrueNAS Core.
så kom det opp ein GUI som navigerte oss gjennom oppsettet av boot enhet.

Installering:
1. velg install/upgrade
2. choose destination media (helst velg disken med minst lagringsplass, heile disken blir brukt)
3. trykk på "Yes" (NB! det vil slette alt data på lagringsenheten du har velgt)
4. Lag root passord. (brukernavnet er root.)
5. boot mode(TrueNAS kan bruke både BIOS metoden eller UEFI. Visst enheten er meir moderne så bruker du UEFI. visst den er eldre så bruker du BIOS.)
6. retart pcen og koble ut installeringsenheten(usb med ISO fil)

visst du har kobla til ein ethernet kabel så skal den få ip adresse med ein gang og koble seg opp til på ein nettsøker(Google, Brave og Edge)

visst ikkje så må du sette IP adresse på serveren din manuelt


då kommer du til ein GUI som heiter TrueNAS med liten skrift som det står core

der skriver du inn på brukernavn root. og passordet er det du skreiv på installeringsprosessen (se 4. på installeringsprossessen)


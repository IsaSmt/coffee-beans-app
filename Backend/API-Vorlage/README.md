# API - Nutzung

- open new terminal

- cd Backend

- cd API-Vorlage

- dotnet run


## Aufruf

Im Stammordner muss als erstes über das Terminal der
Befehl "dotnet run" ausgeführt werden.
Sollte ein "trusted certificate" fehlen, bitte auf die
Ausgaben achten.

Am simpelsten ist der Aufruf über Swagger:
    http://localhost:8080/swagger

## Aufbau

Diese API umfasst die folgenden vier Teilprozesse aus den SAP Arbeitsaufträgen:
(1) Keyword anlegen
(2) PLZ anlegen
(3) Rösterei anlegen
(4) Rezept anlegen
(5) Kaffee anlegen
(6) Kunde anlegen
(7) Bewertung anlegen
(8) Koppeltabellen
(9) Herkunft anlegen
(1) Bohnentyp anlegen

### (1) Keyword anlegen

    Das Keyword erstellt automatisch eine eigene ID.
    Was benötigt wird, ist die ausformulierte Definition
    (z.B. schokoladig, fruchtig, ...).

### (2) PLZ anlegen

    Hier muss neben der Postleitzahl 
    der dazugehörige Ort angegeben werden.
    
    Die ID wird automatisch vergeben.

### (3) Rösterei anlegen

    In der Rösterei sind beim Anlegen des Eintrages folgende
    Felder erforderlich:
        - Name
        - Beschreibung
        - Postleitzahl
    

    Check für plz verbindung !!!!
    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID der Postleitzahl in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Existiert die ID, wird eine Suche durch die Datenbank "PLZ" durchgeführt.

        Gibt man einen Wert ein, werden alle Röstereien ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID der Postleitzahl ein, der in fünf Röstereien 
            enthalten ist.
            -> Ausgabe: alle fünf Röstereien

### (4) Rezept anlegen

    In der Rezepteingabe benoetigt man beim Anlegen des Eintrages diese
    Felder:
        - Maschine
        - Zeit
        - Menge
        - Espressoanzahl
        - Tassengewicht

### (5) Kaffee

    Beim Kaffee sind beim Anlegen des Eintrages folgende
    Felder erforderlich:
        - Name
        - Beschreibung
        - Bohnenart
        - Herkunftsland
        - Rösterei
 
    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID der Rösterei in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Existiert die ID, wird eine Suche durch die Datenbank "Roasteries" durchgeführt.

        Gibt man einen Wert ein, werden alle Kaffees ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID der Rösterei ein, der in fünf Kaffees 
            enthalten ist.
            -> Ausgabe: alle fünf Kaffees

### (6) Kunde

    Hier muss neben der Benutzernamen 
    das Herkunftsland angegeben werden.
    
    Die ID wird automatisch vergeben.

### (7) Bewertung

    Hier kann neben der Bewertung 
    eine Begründung angegeben werden.

    Was benötigt wird sind:
        - Sternebewertung
        - Rösterei
        - Kaffee
        - Kunde

    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID der Rösterei in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Wenn mehr als eine ID eingetragen wird, kommt die Meldung, bitte nur eine ID einzugeben. 

        Die jeweilige ID wird gepfrüft, ob sie in der jew. Datenbank existiert (Kunde, Rösterei, Kaffee).

        Gibt man einen Wert ein, werden alle Kaffees ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID der Rösterei ein, die in fünf Bewertungen verbunden ist 
            enthalten ist.
            -> Ausgabe: alle fünf Bewertungen

### (8) Koppeltabellen

#### (8.1) Rezept - Kaffee - Pivot

    Wie die Zusammensetzung darauf hinweisen lässt,
    benötigt man hier genau zwei IDs:
    - RezeptID
    - KaffeeID

    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Wenn mehr als eine ID eingetragen wird, kommt die Meldung, bitte nur eine ID einzugeben. 

        Die jeweilige ID wird gepfrüft, ob sie in der jew. Datenbank existiert (Kunde, Rösterei, Kaffee).

        Gibt man einen Wert ein, werden alle Kombinationen ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID des Kaffees ein, der auf fünf Rezeptarten zubereitet werden kann. 
            -> Ausgabe: alle fünf Rzepte

#### (8.2) Schlagwort - Kaffee - Pivot

    Wie die Zusammensetzung darauf hinweisen lässt,
    benötigt man hier genau zwei IDs:
    - SchlagwortID
    - KaffeeID

    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Wenn mehr als eine ID eingetragen wird, kommt die Meldung, bitte nur eine ID einzugeben. 

        Die jeweilige ID wird gepfrüft, ob sie in der jew. Datenbank existiert (Kunde, Rösterei, Kaffee).

        Gibt man einen Wert ein, werden alle Kombinationen ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID des Schlagwortes ein, was auf fünf Kaffees zuzuordnen ist. 
            -> Ausgabe: alle fünf Kaffees

#### (8.3) Kunde - Kaffee - Pivot

    Wie die Zusammensetzung darauf hinweisen lässt,
    benötigt man hier genau zwei IDs:
    - KundenID
    - KaffeeID

    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID in der jew. Datenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Wenn mehr als eine ID eingetragen wird, kommt die Meldung, bitte nur eine ID einzugeben. 

        Die jeweilige ID wird gepfrüft, ob sie in der jew. Datenbank existiert (Kunde, Rösterei, Kaffee).

        Gibt man einen Wert ein, werden alle Kombinationen ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID des Kunden ein, um dessen fünf Kaffeewünsche auf der Merkliste zu sehen
            -> Ausgabe: alle fünf Kaffees

### (9) Herkunftsland anlegen

    Das Herkunftsland erstellt automatisch eine eigene ID.
    Was benötigt wird, ist das Land
    (z.B. Brazil, Mexico, ...).

### (10) Bohnentyp anlegen

    Der Bohnentyp erstellt automatisch eine eigene ID.
    Was benötigt wird, ist der Fachbegriff
    (z.B. Araibika, Robusta, ...), sowie eine 
    kurze Beschreibung

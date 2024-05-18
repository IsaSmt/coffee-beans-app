# API - Nutzung

## Aufruf

Am simpelsten ist der Aufruf über Swagger:
    https://localhost:5001/swagger

## Aufbau

Diese API umfasst die folgenden vier Teilprozesse aus den SAP Arbeitsaufträgen:
(1) Lieferanten anlegen
(2) Materialstammsatz anlegen
(3) Bestellanforderung anlegen
(4) Angebotsanfrage anlegen

### (1) Lieferanten anlegen

    Bei der Anlage eines Lieferanten ist als minimum nötig, 
    eine Anrede, ein Name sowie Suchbegriff einzutragen
    Alle weiteren Werte sind optional.
    Die ID wird automatisch vergeben.

### (2) Materialstammsatz anlegen

    Hier sind drei Attribute minimal nötig:
        - Materialname
        - Materialart
        - Werk
    Alle weiteren Werte sind optional.
    Die ID wird automatisch vergeben.

### (3) Bestellanforderung anlegen

    In der Bestellanforderung sind beim Anlegen des Eintrages vier
    Felder erforderlich:
        - Material (ID als int)
        - Bewertungspreis
        - Waehrung
        - Werk
    
    Bevor der Eintrag angelegt wird, muss eine Überprüfungen durchlaufen werden:
        Ist die ID des Materials in der Materialdatenbank eingetragen

    Wenn kein "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es müssen die in Swagger angegebenen Parameter ausgefüllt werden !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene ID in der Datenbank hinterlegt ist.

        Existiert die ID, wird eine Suche durch die Datenbank "Order" durchgeführt.

        Gibt man einen Wert ein, werden alle Orders ausgegeben, wo der jeweilige Wert enthalten ist.
        Bsp.
            Man gibt nur die ID des Materials ein, der in fünf Orders 
            enthalten ist.
            -> Ausgabe: alle fünf Orders

### (4) Angebotsanfrage anlegen

    In der Angebotsanfrage benoetigt man  beim Anlegen des Eintrages drei
    Felder:
        - Anfrageart
        - Anfragedatum
        - Werk
        - Bestellanforderung (ID als int)
        - Lieferant (ID als int)

    Bevor der Eintrag angelegt wird, müssen drei Überprüfungen durchlaufen werden:
        1. Ist die ID des Lieferanten in der Lieferantendatenbank eingetragen
        2. Ist die ID der Bestellanforderung in der Bestellanforderungsdatenbank eingetragen
        3. Ist bereits eine Angebotsanfrage eingetragen, wo die gleichen IDs genutzt werden.
            -> Doppelte Einträge verhindern.

    Wenn kein "Conflict" oder "404" ausgegeben wird, wird ein neuer Eintrag hinterlegt.

    Der Endpunkt "Relation Query" wird dazu genutzt, um Beziehungen für übergebene IDs zu überprüfen.
    ! Es muss mindestens eines der beiden Felder ausgefüllt sein !

        Bevor die Suche abläuft, überprüft man, ob die eingetragene/n ID/s in der Datenbank eingetragen sind.

        Existieren die IDs, wird eine Suche durch die Datenbank "Offer" durchgeführt.

        Je nach Eintragung wird die Suche anders durchgeführt:

            -Gibt man nur einen Wert ein, werden alle Offers ausgegeben, wo der jeweilige Wert enthalten ist.
            Bsp.
                Man gibt nur die ID des Lieferanten ein, der fünf Bestellanforderungen besitzt.
                -> Ausgabe: alle fünf Offers
            
            - Gibt man einen Lieferanten sowie eine Bestellanforderung ein, kommen alle Offers raus, wo genau diese IDs in den entsprechenden Zellen eingetragen wurden.
            Bsp.
                Man gibt einen Lieferanten und eine Bestellanforderung ein
                -> Ausgabe: Wenn sie eine Offer haben, wird sie ausgegeben, sonst kommt eine leere Menge.
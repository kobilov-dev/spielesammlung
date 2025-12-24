const dialogRef = document.getElementById("mytestDialog");

function öffnen() {
    dialogRef.showModal();
}

function schließen() {
    dialogRef.close();
}

// Wird aufgerufen, wenn man anfängt zu ziehen
function drag(event) {
    // Wir speichern die ID des Elements (z.B. "satz-r3")
    event.dataTransfer.setData("textId", event.target.id);
}

// Erlaubt das Fallenlassen (Standardverhalten des Browsers stoppen)
function allowDrop(event) {
    event.preventDefault();
}

// Wird aufgerufen, wenn man den Satz loslässt
function drop(event) {
    event.preventDefault();
    
    // Die gespeicherte ID abrufen
    const dataId = event.dataTransfer.getData("textId");
    const gezogenesElement = document.getElementById(dataId);
    
    // Das Element in die Zone verschieben, auf der wir gerade sind
    // event.target ist hier die <td> (zone-automat oder zone-reisende)
    if (event.target.tagName === "TD") {
        event.target.appendChild(gezogenesElement);
    }
}


function drop(event) {
    event.preventDefault();

    // ID des gezogenen Satzes holen
    const dataId = event.dataTransfer.getData("textId");
    const satzElement = document.getElementById(dataId);
    
    // Die Ziel-Zone finden (die Spalte)
    const zielZone = event.target.closest("td");

    if (zielZone && satzElement) {
        // WICHTIG: Hier vergleichen wir die data-Attribute aus dem HTML
        const satzRolle = satzElement.dataset.satz; // Erwartet "automat" oder "reisende"
        const zoneRolle = zielZone.dataset.zone;   // Erwartet "automat" oder "reisende"

        if (satzRolle === zoneRolle) {
            // RICHTIG
            zielZone.appendChild(satzElement);
            satzElement.style.backgroundColor = "#d4edda"; // Grün
            satzElement.style.color = "#155724";
            console.log("Richtig: " + satzRolle + " passt zu " + zoneRolle);
        } else {
             alert("Falsch! Dieser Satz gehört nicht zu: " + zoneRolle);
            satzElement.style.backgroundColor = "#f8d7da"; // Rot
            
            // Nach 1 Sekunde Farbe zurücksetzen
            setTimeout(() => {
                satzElement.style.backgroundColor = "white";
                satzElement.style.color = "black";
            }, 1000);
        }
    }
}


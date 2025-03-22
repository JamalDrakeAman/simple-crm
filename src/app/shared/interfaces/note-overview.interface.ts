import { Timestamp } from 'firebase/firestore';


export interface NoteOverview {
    id?: string; // Optional, da es erst nachträglich hinzugefügt wird
    timestamp: Date | Timestamp; // Timestamp oder Date
    title: string; // Beispiel für eine weitere Eigenschaft
    // Füge hier weitere Eigenschaften hinzu, die in deinen Todos vorhanden sind
}
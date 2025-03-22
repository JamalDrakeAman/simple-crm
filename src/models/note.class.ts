import { Timestamp } from 'firebase/firestore';

export class Note {
    id?: string;
    title: string;
    description: string;
    timestamp: Date | Timestamp;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.timestamp = obj ? obj.timestamp : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            timestamp: this.timestamp instanceof Date ? Timestamp.fromDate(this.timestamp) : this.timestamp,
        }
    }
}
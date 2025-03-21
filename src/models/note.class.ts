import { Timestamp } from 'firebase/firestore';

export class Todo {
    id?: string;
    title: string;
    description: string;
    timestamp: Date | Timestamp;
    completed: boolean;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.timestamp = obj ? obj.timestamp : '';
        this.completed = obj ? obj.completed : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            timestamp: this.timestamp instanceof Date ? Timestamp.fromDate(this.timestamp) : this.timestamp,
            completed: this.completed,
        }
    }
}
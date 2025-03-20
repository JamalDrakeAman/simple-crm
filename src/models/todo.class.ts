import { Timestamp } from 'firebase/firestore';

export class Todo {
    id?: string;
    title: string;
    description: string;
    priority: string;
    timestamp: Date | Timestamp;
    completed: boolean;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.priority = obj ? obj.priority : '';
        this.timestamp = obj ? obj.timestamp : '';
        this.completed = obj ? obj.completed : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            priority: this.priority,
            timestamp: this.timestamp instanceof Date ? Timestamp.fromDate(this.timestamp) : this.timestamp,
            completed: this.completed,
        }
    }
}
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Timestamp } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { ThemeService } from '../../shared/services/theme.service';
import { TodoOverview } from '../../shared/interfaces/todo-overview.interface';
import { RouterLink } from '@angular/router';
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-todos-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './todos-overview.component.html',
  styleUrl: './todos-overview.component.scss'
})
export class TodosOverviewComponent implements OnInit, OnDestroy {

  todosData = inject(FirestoreServiceService);
  theme = inject(ThemeService);

  todoTasks: any[] = []; // Alle Todos
  filteredTasks: any[] = []; // Gefilterte Todos für den heutigen Tag

  private unsubscribe!: () => void;

  ngOnInit(): void {
    // Abonniere die Todos aus Firestore
    this.unsubscribe = onSnapshot(this.todosData.todosCollection, (snapshot) => {
      this.todoTasks = snapshot.docs.map((doc) => {
        const data = doc.data() as TodoOverview;
        data.id = doc.id; // Füge die Dokument-ID hinzu

        // Konvertiere das Timestamp-Objekt in ein Date-Objekt
        if (data.timestamp instanceof Timestamp) {
          data.timestamp = data.timestamp.toDate();
        }

        return data;
      });

      // Filtere die Todos für den heutigen Tag
      this.filteredTasks = this.getTodosForToday();
      console.log('Gefilterte Tasks für heute:', this.filteredTasks); // Debugging
    });
  }

  // Todos für den heutigen Tag filtern
  getTodosForToday(): any[] {
    const today = new Date();
    return this.todoTasks.filter(task => {
      const taskDate = new Date(task.timestamp);
      return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
      );
    });
  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  toggleTaskCompletion(task: any, i:number) {
    task.completed = !task.completed;
    this.writeTaskData(i);
  }

  async writeTaskData(i:number) {
    const db = this.todosData.db
    await setDoc(doc(db, "todos/" + this.filteredTasks[i].id), {
      title: this.filteredTasks[i].title,
      description: this.filteredTasks[i].description,
      priority: this.filteredTasks[i].priority,
      timestamp: this.filteredTasks[i].timestamp,
      completed: this.filteredTasks[i].completed
    });
  }


}
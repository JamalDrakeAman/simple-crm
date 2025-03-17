import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'todos', component: TodosComponent },
    { path: 'notes', component: NotesComponent }  
];

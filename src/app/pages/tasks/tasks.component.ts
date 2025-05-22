import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

}

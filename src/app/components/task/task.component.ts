import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  taskService = inject(TaskService);
  status = signal<TaskStatus>(TaskStatus.TODO);
  statusOptions = Object.values(TaskStatus);

  ngOnInit() {
    if (this.task) {
      this.status.set(this.task.status);
    }
  }

  /**
   * Update the status of the task
   * @param event - The event object from the select element
   */
  updateTaskStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value as TaskStatus;
    this.taskService.updateTask(this.task.id, status);
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
  }
}

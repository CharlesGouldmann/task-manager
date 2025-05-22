import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { ModalService } from '../../services/modal.service';

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
  modalService = inject(ModalService);
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

  async deleteTask() {
    const confirmed = await this.modalService.confirm({
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task? This action cannot be undone.',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      showActions: true
    })

    console.log('confirmed', confirmed)
    if (confirmed) {
      this.taskService.deleteTask(this.task.id)
    }
  }
}

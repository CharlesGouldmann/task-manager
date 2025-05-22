import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  taskService = inject(TaskService);
  
  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  });

  addTask() {
    if (this.taskForm.valid) {
      const { name, description } = this.taskForm.value;
      this.taskService.addTask(name, description);
      this.taskForm.reset();
      this.taskAdded.emit();
    }
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { TaskService } from '../../services/task.service';

// Components
import { TaskComponent } from '../task/task.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ModalComponent } from '../modal/modal.component';

// Interfaces
import { TaskStatus } from '../../interfaces/task';


@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [TaskComponent, TaskFormComponent, FormsModule, ModalComponent],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.css'
})
export class TaskListComponent {
	taskService = inject(TaskService);
	statusOptions = Object.values(TaskStatus);

	isModalOpen = signal(false);
	searchTerm = signal('');

	allTasks = computed(() => this.taskService.tasks());
	tasks = computed(() => this.allTasks().filter(task => 
		task.name.toLowerCase().includes(this.searchTerm().toLowerCase())
	));


	// Methods
	getFilteredTasksByStatus(status: TaskStatus) {
		return this.tasks().filter(task => task.status === status)
	}

	getAllTasksByStatus(status: TaskStatus) {
		return this.allTasks().filter(task => task.status === status)
	}

	openModal() {
		this.isModalOpen.set(true);
	}

	closeModal() {
		this.isModalOpen.set(false);
	}
}

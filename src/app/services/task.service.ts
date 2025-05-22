import { Injectable, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { signal, effect } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../interfaces/task';
import { isPlatformBrowser } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastType } from '../interfaces/toast';

const TASKS_KEY = 'tasks';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private platformId = inject(PLATFORM_ID);
	private isBrowser = isPlatformBrowser(this.platformId);
	private toastService = inject(ToastService);
	tasks = signal<Task[]>([]);
	readyToSave = false;

	saveEffect = effect(() => {
		const tasks = this.tasks()
		
		if(this.isBrowser && this.readyToSave) {
			this.saveToStorage(tasks)
		}
	})



	constructor() { 

		// Load initial data from local storage only when the component is rendered
		afterNextRender(() => {
			const savedTasks = this.loadFromStorage();
			this.readyToSave = true;
			
			if (savedTasks.length) {
				this.tasks.set(savedTasks);
			}
		})
	}



	/**
	 * Add a new task
	 * @param name - The name of the task
	 * @param description - The description of the task
	 */
	addTask(name: string, description: string) {
		const newTask: Task = {
			id: uuidv4(),
			name,
			description,
			status: TaskStatus.TODO,
			createdAt: new Date()
		};

		this.tasks.update(tasks => [...tasks, newTask]);
		this.toastService.show('Task added successfully', ToastType.SUCCESS);
	}

	/**
	 * Update the status of a task
	 * @param id - The id of the task
	 * @param status - The new status of the task
	 */
	updateTask(id: string, status: TaskStatus) {
		this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, status } : task));
		this.toastService.show('Task updated successfully', ToastType.SUCCESS);
	}

	/**
	 * Delete a task
	 * @param id - The id of the task
	 */
	deleteTask(id: string) {
		this.tasks.update(tasks => tasks.filter(task => task.id !== id));
		this.toastService.show('Task deleted', ToastType.INFO);
	}

	/**
	 * Save tasks to browser storage
	 */
	private saveToStorage(tasks: Task[]) {
		if (!this.isBrowser) return;
		
		try {
			localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
		} catch (error) {
			console.error('Error saving tasks to storage', error);
		}
	}

	/**
	 * Load tasks from browser storage
	 */
	private loadFromStorage(): Task[] {
		if (!this.isBrowser) return [];
		
		try {
			const data = localStorage.getItem(TASKS_KEY);
			if (!data) return [];
			
			const parsed = JSON.parse(data);
			return parsed.map((task: Task) => ({
				...task,
				createdAt: new Date(task.createdAt)
			}));
		} catch (error) {
			console.error('Error loading tasks from storage', error);
			return [];
		}
	}
}

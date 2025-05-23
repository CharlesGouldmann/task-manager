import { Injectable, signal, computed } from '@angular/core';
import { Toast, ToastType } from '../interfaces/toast';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	private defaultDuration = 3000;
	private defaultAnimationDuration = 500;
	
	private toastsState = signal<Toast[]>([]);
	public toasts = computed(() => this.toastsState());


	
	/**
	 * Show a toast with a message and optional type and duration
	 * @param message - The message to display
	 * @param type - The type of toast
	 * @param duration - The duration of the toast
	 */
	show(message: string, type: ToastType = ToastType.INFO, duration: number = this.defaultDuration) {
		const toast: Toast = {
			id: uuidv4(),
			message, 
			type, 
			duration,
			activeAnimation: true
		};
		this.toastsState.update(toasts => [...toasts, toast]);

		setTimeout(() => {
			this.remove(toast);
		}, duration);

		// Remove the animation before the toast is removed so we can animate it out
		setTimeout(() => {
			this.toastsState.update(toasts => toasts.map(t => 
				t.id === toast.id ? { ...toast, activeAnimation: false } : t
			));
		}, duration - this.defaultAnimationDuration);
	}


	private remove(toast: Toast) {
		this.toastsState.update(toasts => toasts.filter(t => t.id !== toast.id));
	}
}

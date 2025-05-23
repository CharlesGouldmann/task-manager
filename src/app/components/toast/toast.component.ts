import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { ToastType } from '../../interfaces/toast';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [NgClass],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.css'
})
export class ToastComponent {
	private toastService = inject(ToastService);

	toasts = computed(() => this.toastService.toasts());
	toastTypes = ToastType;
}

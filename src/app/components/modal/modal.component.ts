import { AfterViewInit, Component, ElementRef, HostListener, input, model, output, viewChild } from '@angular/core';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit {
	title = input<string>('')
	message = input<string>('')
	isOpen = model<boolean>(false)
	showActions = input<boolean>(false)
	confirmLabel = input<string>('Confirm')
	cancelLabel = input<string>('Cancel')
	close = output<void>()
	confirm = output<void>()
	cancel = output<void>()
	modalDialog = viewChild<ElementRef<HTMLDialogElement>>('modalDialog')

	// Handle Escape key
	@HostListener('keydown.escape')
	onEscapePressed() {
		this.closeModal()
	}

	ngAfterViewInit() {
		// Add click event listener to close on backdrop click
		this.modalDialog()?.nativeElement.addEventListener('click', (event: MouseEvent) => {
			const dialog = this.modalDialog()?.nativeElement
			if (!dialog) return

			const dialogDimensions = dialog.getBoundingClientRect()
			if (
				event.clientX < dialogDimensions.left ||
				event.clientX > dialogDimensions.right ||
				event.clientY < dialogDimensions.top ||
				event.clientY > dialogDimensions.bottom
			) {
				this.closeModal()
			}
		})
	}

	openModal() {
		this.isOpen.set(true)
	}

	closeModal() {
		this.isOpen.set(false)
		this.close.emit()
	}

	onConfirm() {
		this.confirm.emit()
		this.closeModal()
	}

	onCancel() {
		this.cancel.emit()
		this.closeModal()
	}
} 
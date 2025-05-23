import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, SimpleChanges, input, output, viewChild } from '@angular/core';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges, AfterViewInit {
	title = input<string>('');
	message = input<string>('');
	isOpen = input<boolean>(false);
	showActions = input<boolean>(false);
	confirmLabel = input<string>('Confirm');
	cancelLabel = input<string>('Cancel');
	close = output<void>();
	confirm = output<void>();
	cancel = output<void>();
	modalDialog = viewChild<ElementRef<HTMLDialogElement>>('modalDialog');

	// Handle Escape key
	@HostListener('keydown.escape')
	onEscapePressed() {
		this.closeModal();
	}

	ngAfterViewInit() {
		// Handle initial state after view is initialized
		if (this.isOpen()) {
			this.openModal();
		}

		// Add click event listener to close on backdrop click
		this.modalDialog()?.nativeElement.addEventListener('click', (event: MouseEvent) => {
			const dialogDimensions = this.modalDialog()?.nativeElement.getBoundingClientRect();
			if (dialogDimensions) {
				if (
					event.clientX < dialogDimensions.left ||
					event.clientX > dialogDimensions.right ||
					event.clientY < dialogDimensions.top ||
					event.clientY > dialogDimensions.bottom
				) 
				{
					this.closeModal();
				}
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		// Since ViewChild might not be available immediately, handle it safely
		if (changes['isOpen'] && this.modalDialog() !== undefined) {
			if (this.isOpen()) {
				this.openModal();
			} else {
				this.closeModal();
			}
		}
	}

	openModal() {
		if (!this.modalDialog()?.nativeElement.open) {
			this.modalDialog()?.nativeElement.showModal();
		}
	}

	closeModal() {
		if (this.modalDialog()?.nativeElement.open) {
			this.modalDialog()?.nativeElement.close();
			this.close.emit();
		}
	}

	onConfirm() {
		this.confirm.emit();
		this.closeModal();
	}

	onCancel() {
		this.cancel.emit();
		this.closeModal();
	}
} 
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges, AfterViewInit {
	@Input() title: string = '';
	@Input() isOpen: boolean = false;
	@Output() close = new EventEmitter<void>();
	@ViewChild('modalDialog') modalDialog!: ElementRef<HTMLDialogElement>;

	// Handle Escape key
	@HostListener('keydown.escape')
	onEscapePressed() {
		this.closeModal();
	}

	ngAfterViewInit() {
		// Handle initial state after view is initialized
		if (this.isOpen) {
			this.openModal();
		}

		// Add click event listener to close on backdrop click
		this.modalDialog.nativeElement.addEventListener('click', (event) => {
			const dialogDimensions = this.modalDialog.nativeElement.getBoundingClientRect();
			if (
				event.clientX < dialogDimensions.left ||
				event.clientX > dialogDimensions.right ||
				event.clientY < dialogDimensions.top ||
				event.clientY > dialogDimensions.bottom
			) {
				this.closeModal();
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		// Since ViewChild might not be available immediately, handle it safely
		if (changes['isOpen'] && this.modalDialog) {
			if (this.isOpen) {
				this.openModal();
			} else {
				this.closeModal();
			}
		}
	}

	openModal() {
		if (this.modalDialog && !this.modalDialog.nativeElement.open) {
			this.modalDialog.nativeElement.showModal();
		}
	}

	closeModal() {
		if (this.modalDialog && this.modalDialog.nativeElement.open) {
			this.modalDialog.nativeElement.close();
			this.close.emit();
		}
	}
} 
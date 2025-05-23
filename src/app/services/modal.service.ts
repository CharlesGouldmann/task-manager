import { Injectable, inject, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core'
import { ModalComponent } from '../components/modal/modal.component'

export interface ModalOptions {
	title: string
	message: string
	confirmLabel?: string
	cancelLabel?: string
	showActions?: boolean
}

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private appRef = inject(ApplicationRef)
	private environmentInjector = inject(EnvironmentInjector)
	private modalRef: ComponentRef<ModalComponent> | null = null

	async confirm(options: ModalOptions): Promise<boolean> {
		return new Promise((resolve) => {
			
			// Create modal component
			const modalComponent = createComponent(ModalComponent, {
				environmentInjector: this.environmentInjector
			})

			// Set inputs of the modal component
			modalComponent.setInput('title', options.title)
			modalComponent.setInput('message', options.message)
			modalComponent.setInput('showActions', options.showActions ?? true)
			modalComponent.setInput('confirmLabel', options.confirmLabel || 'Confirm')
			modalComponent.setInput('cancelLabel', options.cancelLabel || 'Cancel')


			// Handle events
			modalComponent.instance.confirm.subscribe(() => {
				resolve(true)
				this.destroyModal()
			})

			modalComponent.instance.cancel.subscribe(() => {
				resolve(false)
				this.destroyModal()
			})

			modalComponent.instance.close.subscribe(() => {
				resolve(false)
				this.destroyModal()
			})

			// Add to DOM
			document.body.appendChild(modalComponent.location.nativeElement)
			this.appRef.attachView(modalComponent.hostView)
			this.modalRef = modalComponent

			modalComponent.setInput('isOpen', true)
		})
	}

	private destroyModal() {
		if (this.modalRef) {
			this.appRef.detachView(this.modalRef.hostView)
			this.modalRef.destroy()
			this.modalRef = null
		}
	}
}
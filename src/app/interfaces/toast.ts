export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration: number;
	activeAnimation: boolean;
}

export enum ToastType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info'
}

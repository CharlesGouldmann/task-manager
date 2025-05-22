export interface Task {
	id: string;
	name: string;
	description: string;
	status: TaskStatus;
	createdAt: Date;
}

export enum TaskStatus {
	TODO = 'Todo',
	IN_PROGRESS = 'In Progress',
	COMPLETED = 'Completed'
}

export enum RequestAttachmentState {
	Pending = 'Pendiente',
	Approved = 'Aprobado',
	Rejected = 'Rechazado',
}

export interface RequestAttachment {
	_id: string;
	applicant: string;
	eventDate: Date;
	description: string;
	urlPDF: string;
	state: 'Pendiente' | 'Aprobado' | 'Rechazado';
	createdAt: Date;
	updatedAt: Date;
}

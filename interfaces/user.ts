export interface User {
	id: string;
	name: string;
	password: string;
	role: 'ADMIN' | 'SUPER-USER' | 'USER';
	email: string;
	imageURL: string;
	state: string;
	createdAt: string;
	updatedAt: string;
}

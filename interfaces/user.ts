import { Role } from './role';

export interface User {
	_id: string;
	name: string;
	role: Role;
	email: string;
	imageURL: string;
	state: boolean;
}

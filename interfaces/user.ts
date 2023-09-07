export interface User {
	_id: string;
	name: string;
	password: string;
	role: { _id: string; name: string };
	email: string;
	imageURL: string;
	state: string;
	createdAt: string;
	updatedAt: string;
}

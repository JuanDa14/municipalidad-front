export enum RolesName {
	ADMIN = 'Administrador',
	SUPER_USER = 'Super Usuario',
	USER = 'Usuario',
}

export type RolesNameType = keyof typeof RolesName;

export interface Role {
	_id: string;
	name: string
	state?: boolean;
}

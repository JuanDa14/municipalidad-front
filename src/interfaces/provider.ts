type DocumentType = 'DNI' | 'RUC';
type Condition = 'HABIDO' | 'NO HABIDO';

export interface Provider {
	_id: string;
	name: string;
	dni_ruc: string;
	address: string;
	condition: Condition;
	state: boolean;
	document_type: DocumentType;
}

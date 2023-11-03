export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN',
	}).format(price);
};

export const formatNumberToMonth = (month: number) => {
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Setiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];
	return months[month - 1];
};

export type ServiceAndGoods = {
	name: string;
	quantity: number;
	um: string;
	tva: number;
	price: number;
};

export type Contact = {
	to: string;
	idno: string;
};

export type Subtotal = {
	tva: number;
	discount: number;
};

export type InvoiceResponse = {
	id: number;
	providerId: number;
	beneficiaryId: number;
	paymentId: number;
	dateId: number;
	userId: number;
	provider: {
		id: number;
		name: string;
		administrator: string;
		iban: string;
		idno: string;
		bic: string;
	};
	beneficiary: {
		id: number;
		name: string;
		administrator: string;
		iban: string;
		idno: string;
		bic: string;
	};
	service: {
		name: string;
		quantity: number;
		um: string;
		price: number;
		tva: number;
	};
	dates: { id: number; issueDate: null | string; dueDate: string | null };
	payments: {
		id: number;
		total: null | number;
		subtotal: number | null;
		tax: number | null;
		currency: string | null;
	};
};

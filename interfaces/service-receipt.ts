import { Client } from "./client";
import { Service } from "./service";

export interface ServiceReceipt {
	_id: string;
	client: Client;
	service: Service;
	months:number
	amount: number;
    fromDate:string;
    toDate:string;
}
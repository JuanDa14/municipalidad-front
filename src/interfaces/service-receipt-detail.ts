import { ServiceReceipt } from "./service-receipt";

export interface ServiceReceiptDetail{
    _id:string
    receipt: ServiceReceipt
    paymentDate:string
    amount:string
} 
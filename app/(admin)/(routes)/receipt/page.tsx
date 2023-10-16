
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { Metadata } from "next";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Client } from "@/interfaces/client";
export const metadata: Metadata = {
  title: "Recibos por mes",
  description: "Generación de recibos",
};
async function getServices(): Promise<ServiceReceipt[]> {  
  const resp = await fetch(`${process.env.API_URL}/service-receipt`, {
    cache: "no-cache",
  });
  const data = await resp.json();
  return data;
}

const MonthReceiptpage = async () => {
  const receipts = await getServices();

  return <DataTable columns={columns} data={receipts} />;
};

export default MonthReceiptpage;

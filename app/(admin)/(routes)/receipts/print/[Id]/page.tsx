import { ServiceReceipt } from "@/interfaces/service-receipt";
import dynamic from "next/dynamic";
const PrintComponent = dynamic(() => import("../../_components/print"),{ssr:false});
interface PrintIdProps {
  params: {
    Id: string;
  };
}

async function getReceipt(id:string): Promise<ServiceReceipt> {
  const resp = await fetch(`${process.env.API_URL}/service-receipt/print/${id}`, {
    cache: "no-cache",
  });
  const data = await resp.json();
  return data;
}

const pagePrint = async ({ params }: PrintIdProps) => {
  const data = await getReceipt(params.Id);
  return <PrintComponent receipt={data}/>;
};

export default pagePrint;

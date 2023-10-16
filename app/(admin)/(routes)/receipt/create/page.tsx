
import { Client } from "@/interfaces/client";
import { FormReceipt } from "../_components/form";
import { Service } from "@/interfaces/service";

async function getServices(): Promise<Service[]> {
	const resp = await fetch(`${process.env.API_URL}/service`, { cache: 'no-cache' });
	const data = await resp.json();
	return data;
}


const pageForm = async () => {
  const services = await getServices();
  return (
    <>
      <FormReceipt services={services} />
    </>
  );
};

export default pageForm;

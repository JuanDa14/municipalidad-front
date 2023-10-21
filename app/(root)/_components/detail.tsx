"use client";
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { ServiceReceiptDetail } from "@/interfaces/service-receipt-detail";
import format from "date-fns/format";
import es from "date-fns/locale/es";

interface responseDetail {
  receipt: ServiceReceipt;
  details: ServiceReceiptDetail[];
}
const Detail = ({ receipt, details }: responseDetail) => {
  console.log(receipt);

  return (
    <div className="max-w-[900px] mx-auto overflow-hidden pt-10">
      <div className="w-full text-center px-5 text-xl pb-10">
        MUNICIPALIDAD CENTRO POBLADO <br />
        <span className="text-black font-bold text-3xl">
          "Centro Poblado San Martín de Porres"
        </span>
      </div>
      <div className="px-5">
        <div className="flex flex-col gap-y-3">
          <p>
            {" "}
            <span className="font-extrabold">Ciudadano: </span>{" "}
            {receipt.client.name}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">DNI/RUC: </span>{" "}
            {receipt.client.dni_ruc}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">Dirección: </span>{" "}
            {receipt.client.address}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">Fecha de pago: </span>{" "}
            {receipt.paymentDate}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">Servicio: </span>{" "}
            {receipt.service.name}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">Tipo de Servicio: </span>{" "}
            {receipt.service.type.description}
          </p>
          <p>
            {" "}
            <span className="font-extrabold">Precio Total: </span> S/.
            {receipt.amount}
          </p>
          {Number(receipt.amount) !== 0 && (
            <p>
              {" "}
              <span className="font-extrabold">Meses pagados: </span>{" "}
              {receipt.months}
            </p>
          )}
        </div>
        <table className="w-full mt-10 border-collapse" border={2}>
          <thead>
            <tr className="text-left">
              <th className="border">Mes</th>
              <th className="border text-right">Año</th>
              <th className="border text-right">Precio Individual</th>
            </tr>
          </thead>
          <tbody className="text-r">
            {details.map((d) => {
              const date = new Date(d.paymentDate);
              const mes = format(date, "MMMM", { locale: es });
              const year = format(date, "yyyy");
              return (
                <tr>
                  <td className="border ">{mes}</td>
                  <td className="border text-right">{year}</td>
                  <td className="border text-right ">S/.{d.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="mt-10 text-xl font-extrabold text-center">
          Gracias por ser parte de nuestra comunidad!
        </p>
      </div>
    </div>
  );
};

export default Detail;

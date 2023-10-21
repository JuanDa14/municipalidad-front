"use client";

import { ServiceReceipt } from "@/interfaces/service-receipt";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ServiceReceiptDetail } from "@/interfaces/service-receipt-detail";
import { formatoWithZeros } from "@/lib/utils";

interface responseDetail {
  receipt: ServiceReceipt;
  detail: ServiceReceiptDetail[];
}

const PrintComponent = ({ receipt, detail }: responseDetail) => {
  console.log(detail);
  
  return (
    <div className="h-screen">
      <PDFViewer width={"100%"} height={"100%"}>
        <Document>
          <Page size={"A6"} orientation="landscape">
            <View style={{ padding: 20, fontSize: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* aca es el primer bloque */}
                <View
                  style={{
                    flexDirection: "column",
                    width: 200,
                    textAlign: "center",
                  }}
                >
                  <View>
                    <Text>MUNICIPALIDAD CENTRO POBLADO</Text>
                    <Text>"SAN MARTÍN DE PORRES"</Text>
                    <Text style={{ paddingVertical: -10 }}>
                      ______________________
                    </Text>
                  </View>
                  <View style={{ fontSize: 6, marginTop: -10 }}>
                    <Text>Calle: Puno S/N-Plaza de Armas</Text>
                    <Text>DISTRITO SAN JOSÉ - PROV. DE PACASMAYO</Text>
                    <Text>R.U.C. 20226960172</Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Total S/. {receipt.amount}</Text>
                    <Text>Nº {formatoWithZeros(receipt.autoIncrement)}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      padding: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text>RECIBO DE INGRESOS</Text>
                    <Text>{receipt.service.name.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{ paddingTop: 10, fontSize: 8, flexDirection: "row" }}
              >
                <View style={{ width: "70%", alignItems: "flex-start" }}>
                  <Text> Usuario: {receipt.client.name}</Text>
                  <Text>Dirección: {receipt.client.address}</Text>
                </View>
                <View style={{ width: "30%", alignItems: "flex-end" }}>
                  <Text>Fecha: {receipt.paymentDate}</Text>
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <View >
                  <View style={{ width: "70%" }}>
                    <Text>Servicio</Text>
                  </View>
                  <View style={{ width: "30%" }}>
                    <Text>Mes</Text>
                    <Text>Año</Text>
                    <Text>Total</Text>
                  </View>
                </View>
                {detail && detail.map((d, index) => {
                  const date = new Date(d.paymentDate);
                  const mes = date.getMonth();
                  const year = date.getFullYear();
                  return (
                    <View key={index}>
                      <View style={{ width: "70%" }}>
                        <Text>{receipt.service.name}</Text>
                      </View>
                      <View style={{ width: "30%" }}>
                        <Text>{d.paymentDate}</Text>
                        <Text>{year}</Text>
                        <Text>{d.amount}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default PrintComponent;

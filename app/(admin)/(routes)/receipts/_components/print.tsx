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
import format from "date-fns/format";
import es from "date-fns/locale/es";
import { NumerosALetras } from "@/lib/numbersToWordsEs";

interface responseDetail {
  receipt: ServiceReceipt;
  detail: ServiceReceiptDetail[];
}

const PrintComponent = ({ receipt, detail }: responseDetail) => {
  return (
    <div className="h-screen">
      <PDFViewer width={"100%"} height={"100%"}>
        <Document>
          <Page size={"A6"} orientation="landscape">
            <View
              style={{
                paddingVertical: 20,
                fontSize: 10,
                paddingHorizontal: 30,
              }}
            >
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
                    <Text>&ldquo;SAN MART&Iacute;N DE PORRES&ldquo;</Text>
                    <Text style={{ paddingVertical: -10 }}>
                      ______________________
                    </Text>
                  </View>
                  <View style={{ fontSize: 6, marginTop: -10 }}>
                    <Text>Calle: Puno S/N-Plaza de Armas</Text>
                    <Text>DISTRITO SAN JOS&Eacute; - PROV. DE PACASMAYO</Text>
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
                      borderRadius: 3,
                      marginTop: 5,
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
              <View
                style={{
                  marginTop: 10,
                  border: 1,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <View style={{ flexDirection: "row", paddingBottom: 5 }}>
                  <View style={{ width: "70%" }}>
                    <Text>Servicio</Text>
                  </View>
                  <View
                    style={{
                      width: "30%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ marginLeft: 30 }}>Mes</Text>
                    <Text style={{ marginLeft: 5 }}>Año</Text>
                    <Text>Total</Text>
                  </View>
                </View>
                <View style={{ fontSize: 9 }}>
                  {detail &&
                    detail.map((d, index) => {
                      const date = new Date(d.paymentDate);
                      const mes = format(date, "MMMM", { locale: es });
                      const year = format(date, "yyyy");
                      return (
                        <View
                          key={index}
                          style={{ flexDirection: "row", paddingBottom: 2 }}
                        >
                          <View style={{ width: "70%" }}>
                            <Text>{receipt.service.name}</Text>
                          </View>
                          <View
                            style={{
                              width: "30%",
                              flexDirection: "row",
                            }}
                          >
                            <View style={{ width: 60 }}>
                              <Text style={{ textAlign: "right" }}>{mes}</Text>
                            </View>
                            <View style={{ width: 45 }}>
                              <Text style={{ textAlign: "right" }}>{year}</Text>
                            </View>
                            <View style={{ width: 40 }}>
                              <Text style={{ textAlign: "right" }}>
                                {d.amount}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                </View>
              </View>
              {/* Esta es la parte de soles */}
              <View
                style={{
                  marginTop: 10,
                  border: 1,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text>Son: {NumerosALetras(Number(receipt.amount))}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 80,
                  }}
                >
                  <Text>________________</Text>{" "}
                  <Text style={{ textAlign: "center" }}>Hecho por</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 80,
                  }}
                >
                  <Text>________________</Text>{" "}
                  <Text style={{ textAlign: "center" }}>VºBº</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 90,
                  }}
                >
                  <Text>________________</Text>{" "}
                  <Text style={{ textAlign: "center" }}>Recibí Conforme</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default PrintComponent;

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

interface responseDetail {
  receipt: ServiceReceipt;
  detail: ServiceReceiptDetail[];
}

const PrintComponent = ({ receipt,detail }: responseDetail) => {
  return (
    <div className="h-screen">
      <PDFViewer width={"100%"} height={"100%"}>
        <Document>
          <Page size={"A6"} orientation="landscape">
            <View style={{ padding: 50, fontSize: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Municipalidad San Partíin de Porres</Text>
                </View>
                <View>
                  <Text>Total S/. {receipt.amount}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Text>Persona: {receipt.client.name}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default PrintComponent;

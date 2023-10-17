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

interface ReceiptData {
  receipt: ServiceReceipt;
}

const PrintComponent = ({ receipt }: ReceiptData) => {
  return (
    <div className="h-screen">
      <PDFViewer width={"100%"} height={"100%"}>
        <Document>
          <Page size={"A5"} orientation="landscape">
            <View style={{ padding: 50 }}>
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
			  <View style={{flexDirection:"row",paddingTop:10}}>
				<Text>
					Persona: {receipt.client.name}
				</Text>
			  </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default PrintComponent;

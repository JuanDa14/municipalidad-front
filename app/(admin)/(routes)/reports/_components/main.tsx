"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComboFilter from "./comboFilter";
import { useState,useEffect } from "react";
import { axios } from "@/lib/axios";
import { GraficBar } from "./graficBar";
import { GraficPie } from "./graficPie";
import { TableReport } from "./tableReport";
import { setYear } from "date-fns";
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { RequestAttachment } from "@/interfaces/request-attachment";


interface MainProp{
  years :number[]
  months:number[]
}
const Main = ({years,months}:MainProp) => {
  const [year, setyear] = useState('')
  const [monthR, setmonthR] = useState('');
  const [yearR, setyearR] = useState('');

  const [chartDataBar, setchartDataBar] = useState<any>([])
  const [chartDataPie, setchartDataPie] = useState<any>([]);

  const [serviceReport, setserviceReport] = useState<ServiceReceipt[]>([]);
  const [requestReport, setrequestReport] = useState<RequestAttachment[]>([]);


  useEffect(() => {    
    const getdataCharts =async () => {
      const paramyear ={
        "year":Number(year)
      }
      const charts = await axios.post(`/reports/monthsByYear`, paramyear);
      const data = charts.data
      console.log(data);
      setchartDataPie(data.charts.RequestChart);
      setchartDataBar(data.charts.ServiceReceiptChart);
      return
    }
    getdataCharts()
  }, [year])

  useEffect(() => {
    if ([monthR,setYear].includes('')) return
    const getReports = async () => {
      const params = {
        "year": Number(yearR),
        "month": Number(monthR)
      };
      const dataRaw = await axios.post(`/reports/report`, params);
      const data = dataRaw.data.data;
      console.log(data);
      
      setserviceReport(data.serviceReport);
      setrequestReport(data.requestReport);
      return
    }
    getReports()
  }, [monthR,yearR])
  
  
  return (
    <div>
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col justify-center"
      >
        <TabsList className="flex gap-x-5 text-lg">
          <TabsTrigger value="graphic">Graficos</TabsTrigger>
          <TabsTrigger value="report">Reporte</TabsTrigger>
        </TabsList>

        <TabsContent value="graphic">
          <div className="w-full flex justify-center items-center flex-col  gap-y-10 p-5 px-24">
            <ComboFilter years={years} setyear={setyear}></ComboFilter>
            <div className=" w-full flex flex-col md:flex-row gap-x-10">
              <GraficBar data={chartDataBar}></GraficBar>
              <GraficPie data={chartDataPie}></GraficPie>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report">
          <div className="w-full flex flex-col gap-16 justify-center items-center">
            <ComboFilter
              months={months}
              years={years}
              setyear={setyearR}
              setmonth={setmonthR}
              month
            ></ComboFilter>
            <Tabs className=" w-3/4">
              <TabsList className="flex gap-x-5 text-lg">
                <TabsTrigger value="service">Servicios</TabsTrigger>
                <TabsTrigger value="request">Solicitudes</TabsTrigger>
              </TabsList>
              <TabsContent value="service">
                <TableReport
                  dataservice={serviceReport}
                  option={1}
                ></TableReport>
              </TabsContent>
              <TabsContent value="request">
                <TableReport
                  datarequest={requestReport}
                  option={2}
                ></TableReport>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Main
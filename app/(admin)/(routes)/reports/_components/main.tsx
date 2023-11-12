"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Main = () => {
  return (
    <div>
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col justify-center"
      >
        <TabsList className="flex gap-x-5 text-lg">
          <TabsTrigger value="graphic">Desicion</TabsTrigger>
          <TabsTrigger value="report">Reporte</TabsTrigger>
        </TabsList>

        <TabsContent value="graphic">
          <div className="w-full flex justify-center items-center">
            graficos
          </div>
        </TabsContent>

        <TabsContent value="report">
          <div className="w-full flex justify-center items-center">
            reportes
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Main
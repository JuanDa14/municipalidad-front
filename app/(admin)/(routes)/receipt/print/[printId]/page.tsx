import dynamic from "next/dynamic";
const PrintComponent = dynamic(() => import("../../_components/print"),{ssr:false});
interface PrintIdProps {
  params: {
    printId: string;
  };
}
const pagePrint = () => {
  return <PrintComponent />;
}

export default pagePrint
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft } from "lucide-react";

export function AutoPage({ onBack }) {
  return (
    <div className="w-full h-full">
      <button
        className="flex items-center gap-1 px-4 pt-1 text-blue-400 text-base"
        onClick={onBack}
      >
        {" "}
        <ChevronLeft size={20} /> Voltar
      </button>
      <Separator className={"bg-gray-800"} />
      <div className="flex flex-col px-4 pt-3 ">
        <h1 className="text-2xl font-bold text-white">Operadoras</h1>
        <h1 className="text-xs font-semibold text-gray-400 mt-1 mx-2">
          SERVIDORES DISPONIVEIS
        </h1>
        <Card className={"container rounded-md w-full h-full  p-0  bg-red-500"}>
          <div className="flex items-center justify-between gap-1">
            <div className="h-6 w-6 bg-blue-500 rounded-md flex items-center justify-center m-2">
              <ChevronLeft size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-semibold flex-1 ">VIVO</h1>
            <Check className="mr-1" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AutoPage;

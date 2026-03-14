import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManualPage({ onBack }) {
  const configs = useMemo(() => {
    return [
      { id: 1, name: "VIVO", servers: 5 },
      { id: 2, name: "TIM", servers: 3 },
      { id: 3, name: "CLARO", servers: 4 },
    ];
  }, []);

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
        <h1 className="text-2xl font-bold text-white mb-3 flex justify-center">
          Operadoras
        </h1>
        <div className="flex items-center justify-between mt-1 mb-2 justify-center gap-2">
          <h1 className="text-xs font-semibold text-gray-400">
            SERVIDORES DISPONIVEIS
          </h1>
          {/* Ícone de servidor */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
        <div className="w-full h-full p-0 gap-2 bg-gray-700 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg">
          {configs.map((config) => (
            <div
              key={config.id}
              className="flex items-center justify-between gap-3 m-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-shadow shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.postimg.cc/v806WvQZ/1750564847166.png"
                  alt="logo"
                  className="h-10 w-10 rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">{config.name}</h2>
                  <p className="text-xs text-gray-400">Operadora</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-white font-medium mr-2">{config.servers} servidores</div>
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                  Online
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManualPage;

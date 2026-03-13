import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bolt,
  Brackets,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import ManualPage from "./manualPage";
import AutoPage from "./autoPage";
import ConfigGeralPage from "./configGeralPage";
import AjusteAppPage from "./ajusteAppPage";

export function ConfigConnection({ onBack }) {
  const [filter, setFilter] = useState("opcao");

  return (
    <div className="bg-black w-full h-full text-white flex flex-col">
      {filter === "opcao" ? (
        <div className="flex flex-col flex-1">
          {/* Botão Voltar */}
          <div className="flex flex-col">
            <button
              onClick={onBack}
              className="flex items-center gap-1 px-4 pt-1  text-blue-400 text-base"
            >
              <ChevronLeft size={20} /> Voltar
            </button>
            <Separator className="bg-gray-800" />
          </div>

          {/* Conteúdo principal */}
          <div className="flex flex-col flex-1 px-5 pt-5 pb-8">
            <h1 className="text-xl font-bold">Configurar Conexão</h1>

            {/* Seção: Configurações */}
            <div className="mt-5">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Configurações
              </h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {/* Item: Configurações gerais */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-800 transition"
                  onClick={() => setFilter("configGeral")}
                >
                  <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-gray-700 shrink-0">
                    <Settings size={16} className="text-gray-300" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <span className="text-base text-white">
                      Configurações gerais
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500">Todas</span>
                      <ChevronRight size={18} className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800 ml-15" />

                {/* Item: Ajuste do app */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-800 transition"
                  onClick={() => setFilter("ajusteApp")}
                >
                  <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-gray-700 shrink-0">
                    <Wrench size={16} className="text-gray-300" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <span className="text-base text-white">Ajuste do app</span>
                    <ChevronRight size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Método de conexão */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Método de conexão
              </h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {/* Item: Manual */}
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-800 transition">
                  <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shrink-0">
                    <Bolt size={16} className="text-white" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-col">
                      <span
                        className="font-medium text-base text-white"
                        onClick={() => setFilter("manual")}
                      >
                        {" "}
                        Manual
                      </span>
                      <span className="text-xs text-gray-400">
                        Escolha seu servidor
                      </span>
                    </div>
                    <Check size={20} className="text-blue-400" />
                  </div>
                </div>

                <Separator className="bg-gray-800 ml-15" />

                {/* Item: Automático */}
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-800 transition">
                  <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 shrink-0">
                    <Bolt size={16} className="text-white" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-col">
                      <span
                        className="font-medium text-base text-white"
                        onClick={() => setFilter("auto")}
                      >
                        Automático
                      </span>
                      <span className="text-xs text-gray-400">
                        Detecta automaticamente
                      </span>
                    </div>
                    <Check size={20} className="text-gray-600" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 px-1">
                O modo de conexão automática vai fazer testes de forma
                automática
              </p>
            </div>

            {/* Botão Continuar */}
            <div className="mt-auto pt-6">
              <Button className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
                Continuar
              </Button>
            </div>
          </div>
        </div>
      ) : filter === "manual" ? (
        <ManualPage onBack={() => setFilter("opcao")} />
      ) : filter === "auto" ? (
        <AutoPage onBack={() => setFilter("opcao")} />
      ) : filter === "configGeral" ? (
        <ConfigGeralPage onBack={() => setFilter("opcao")} />
      ) : filter === "ajusteApp" ? (
        <AjusteAppPage onBack={() => setFilter("opcao")} />
      ) : null}
    </div>
  );
}

export default ConfigConnection;

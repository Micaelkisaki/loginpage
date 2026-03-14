import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bolt,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import ManualPage from "./manualPage";
import AutoPage from "./autoPage";
import ConfigGeralPage from "./configGeralPage";
import AjusteAppPage from "./ajusteAppPage";

export function ConfigConnection({ onBack }) {
  const [filter, setFilter] = useState("opcao");
  const [connMode, setConnMode] = useState("manual");

  return (
    <div className="bg-black w-full h-full text-white flex flex-col">
      {filter === "opcao" ? (
        <div className="flex flex-col flex-1">
          {/* Voltar */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-4 pt-3 pb-2 text-blue-400 hover:text-blue-300 transition-colors text-base"
          >
            <ChevronLeft size={20} /> Voltar
          </button>

          <div className="flex flex-col flex-1 px-5 pb-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">Conexão</h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  Config
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Escolha o método e ajuste os parâmetros de conexão
              </p>
            </div>

            {/* Seção: Configurações */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Configurações
              </h2>
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
                <div
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-white/5 transition-colors"
                  onClick={() => setFilter("configGeral")}
                >
                  <div className="flex justify-center items-center h-9 w-9 rounded-xl bg-indigo-500/20 shrink-0">
                    <Settings size={17} className="text-indigo-400" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-white block">
                        Configurações gerais
                      </span>
                      <span className="text-xs text-gray-500">
                        Parâmetros globais
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-600">Todas</span>
                      <ChevronRight size={15} className="text-gray-600" />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800/60 ml-16" />

                <div
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-white/5 transition-colors"
                  onClick={() => setFilter("ajusteApp")}
                >
                  <div className="flex justify-center items-center h-9 w-9 rounded-xl bg-orange-500/20 shrink-0">
                    <Wrench size={17} className="text-orange-400" />
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-white block">
                        Ajuste do app
                      </span>
                      <span className="text-xs text-gray-500">
                        Personalizar interface
                      </span>
                    </div>
                    <ChevronRight size={15} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Método de conexão */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Método de conexão
              </h2>

              {/* Manual */}
              <div
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border cursor-pointer transition-all mb-2 ${
                  connMode === "manual"
                    ? "bg-blue-500/10 border-blue-500/40"
                    : "bg-gray-900/80 border-gray-800 active:bg-white/5"
                }`}
                onClick={() => {
                  setConnMode("manual");
                  setFilter("manual");
                }}
              >
                <div
                  className={`flex justify-center items-center h-10 w-10 rounded-xl shrink-0 transition-all ${
                    connMode === "manual"
                      ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/25"
                      : "bg-gray-800"
                  }`}
                >
                  <Bolt size={17} className="text-white" />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        Manual
                      </span>
                      {connMode === "manual" && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          ATIVO
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      Escolha seu servidor
                    </span>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center transition-all ${
                      connMode === "manual"
                        ? "bg-blue-500"
                        : "border border-gray-700"
                    }`}
                  >
                    {connMode === "manual" && (
                      <Check size={11} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>

              {/* Automático */}
              <div
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border cursor-pointer transition-all ${
                  connMode === "auto"
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-gray-900/80 border-gray-800 active:bg-white/5"
                }`}
                onClick={() => {
                  setConnMode("auto");
                  setFilter("auto");
                }}
              >
                <div
                  className={`flex justify-center items-center h-10 w-10 rounded-xl shrink-0 transition-all ${
                    connMode === "auto"
                      ? "bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/25"
                      : "bg-gray-800"
                  }`}
                >
                  <Zap size={17} className="text-white" />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        Automático
                      </span>
                      {connMode === "auto" && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          ATIVO
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      Detecta automaticamente
                    </span>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center transition-all ${
                      connMode === "auto"
                        ? "bg-green-500"
                        : "border border-gray-700"
                    }`}
                  >
                    {connMode === "auto" && (
                      <Check size={11} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-2.5 px-1 flex items-center gap-1">
                <Sparkles size={10} className="text-gray-600" />O modo
                automático realiza testes de rede em segundo plano
              </p>
            </div>

            {/* Botão Continuar */}
            <div className="mt-auto pt-2">
              <button className="w-full h-12 text-sm font-semibold rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-600/20">
                Continuar
              </button>
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

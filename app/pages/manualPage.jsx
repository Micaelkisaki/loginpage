import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVERS = [
  { id: "vivo", label: "VIVO", load: 5 },
  { id: "claro", label: "CLARO", load: 3 },
  { id: "tim", label: "TIM", load: 7 },
];

const PROTOCOLS = [
  { id: "Todos", label: "Todos" },
  { id: "v2ray", label: "V2Ray" },
  { id: "ssh", label: "SSH" },
];

export function ManualPage({ onBack }) {
  const [selected, setSelected] = useState("vivo");
  const [selectedProtocol, setSelectedProtocol] = useState("v2ray");

  const selectedServer = useMemo(
    () => SERVERS.find((server) => server.id === selected),
    [selected],
  );

  return (
    <div className="w-full h-full bg-black">
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          className="flex items-center gap-2 text-blue-400 text-base hover:text-blue-200"
          onClick={onBack}
        >
          <ChevronLeft size={20} /> Voltar
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Server size={18} />
          <span>Servidores detectados</span>
        </div>
      </div>

      <Separator className="bg-gray-800 mt-4" />

      <div className="mx-4 mt-4">
        <h1 className="text-2xl font-bold text-white">Operadoras</h1>
        <p className="mt-1 text-sm text-gray-400">
          Selecione o servidor que você deseja conectar.
        </p>

        <div className="mt-6 space-y-3">
          {SERVERS.map((server) => {
            const isSelected = server.id === selected;
            return (
              <button
                key={server.id}
                onClick={() => {
                  console.log(selected);
                  setSelected(server.id);
                }}
                className={
                  "flex items-center justify-between w-full rounded-xl border px-3 py-3 transition " +
                  (isSelected
                    ? "border-blue-500 bg-blue-500/10 shadow-sm"
                    : "border-gray-800 hover:border-gray-600 hover:bg-white/5")
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-lg " +
                      (isSelected ? "bg-blue-500" : "bg-gray-800 text-gray-400")
                    }
                  >
                    <Server size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-semibold text-white">
                      {server.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {server.load} usuários conectados
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {server.load}
                  </span>
                  {isSelected ? (
                    <Check size={20} className="text-blue-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-gray-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-center text-gray-400 uppercase tracking-wide mb-2">
            Protocolo
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {PROTOCOLS.map((protocol) => {
              const isSelectedProtocol = protocol.id === selectedProtocol;
              return (
                <button
                  key={protocol.id}
                  type="button"
                  onClick={() => setSelectedProtocol(protocol.id)}
                  className={
                    "flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition " +
                    (isSelectedProtocol
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-600 hover:bg-white/5")
                  }
                >
                  {protocol.label}
                </button>
              );
            })}
          </div>
        </div>

        <Card className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">Servidor selecionado</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  {selectedServer?.label}
                </p>
                <p className="text-xs text-gray-400">
                  Latência estimada:{" "}
                  <span className="text-white">
                    {Math.max(20, 100 - selectedServer?.load * 7)}ms
                  </span>
                </p>
              </div>
              <Button className="h-10 rounded-xl bg-blue-600 hover:bg-blue-700">
                Conectar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ManualPage;

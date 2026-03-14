import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  Check,
  ChevronRight,
  Rocket,
  X,
  RotateCcw,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Drawer } from "vaul";

const CONFIGS = [
  {
    id: 1,
    name: "VIVO PRE PAGO",
    description: "Saldo válido e ativo",
    connection: "V2Ray",
    servers: 5,
  },
  {
    id: 2,
    name: "VIVO CONTROLE",
    description: "Plano controle com bônus",
    connection: "SSH",
    servers: 4,
  },
  {
    id: 3,
    name: "VIVO CLOUDFLARE",
    description: "Tunelamento via Cloudflare",
    connection: "WS+TLS",
    servers: 3,
  },
  {
    id: 4,
    name: "VIVO PROMOÇÃO TURBO ATIVA",
    description: "Promoção turbo em andamento",
    connection: "V2Ray",
    servers: 3,
  },
  {
    id: 5,
    name: "TIM VALIDO / EXPIRADO AWS",
    description: "Válido ou expirado via AWS",
    connection: "WS+TLS",
    servers: 5,
  },
  {
    id: 6,
    name: "TIM SALDO VALIDO CloudFlare",
    description: "Saldo ativo com CF ativado",
    connection: "WS+TLS",
    servers: 1,
  },
  {
    id: 7,
    name: "TIM SLOW",
    description: "Velocidade reduzida",
    connection: "SSH",
    servers: 3,
  },
  {
    id: 8,
    name: "TIM UUID",
    description: "Autenticação por UUID",
    connection: "V2Ray",
    servers: 6,
  },
  {
    id: 9,
    name: "CLARO SLOW",
    description: "Velocidade reduzida",
    connection: "SSH",
    servers: 4,
  },
  {
    id: 10,
    name: "CLARO UUID",
    description: "Autenticação por UUID",
    connection: "V2Ray",
    servers: 4,
  },
  {
    id: 11,
    name: "CLARO PRE PAGO",
    description: "Saldo válido e ativo",
    connection: "SSH",
    servers: 2,
  },
  {
    id: 12,
    name: "CLARO CLOUDFLARE",
    description: "Tunelamento via Cloudflare",
    connection: "WS+TLS",
    servers: 3,
  },
  {
    id: 13,
    name: "OI FIBRA",
    description: "Conexão via fibra óptica",
    connection: "V2Ray",
    servers: 5,
  },
  {
    id: 14,
    name: "OI MOVEL",
    description: "Rede móvel 4G/LTE",
    connection: "SSH",
    servers: 2,
  },
  {
    id: 15,
    name: "NET COMBO",
    description: "Combo NET residencial",
    connection: "WS+TLS",
    servers: 4,
  },
];

const PREVIEW_LIMIT = 5;

function ConfigItem({ config, isLast, selected, onSelect }) {
  const [swiped, setSwiped] = useState(false);
  const [muted, setMuted] = useState(false);
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);
  const startX = useRef(null);

  const LOG_LINES = [
    "› Iniciando teste de conexão...",
    `› Resolvendo host ${config.connection}...`,
    "› Estabelecendo handshake SSL...",
    "› Enviando pacote de verificação...",
    "› Aguardando resposta do servidor...",
    "› Medindo latência de ida e volta...",
    "› Verificando rota de rede...",
    "› Checando disponibilidade de porta...",
    "✓ Conexão estabelecida com sucesso!",
  ];

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const delta = startX.current - e.clientX;
    if (delta > 50) setSwiped(true);
    if (delta < -20) setSwiped(false);
    startX.current = null;
  };

  const handleTest = () => {
    setSwiped(false);
    setTesting(true);
  };

  const handleIgnore = () => {
    setMuted(true);
    setSwiped(false);
  };

  useEffect(() => {
    if (!testing) {
      setLogs([]);
      return;
    }
    setLogs([]);
    LOG_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
      }, i * 320);
    });
    const t = setTimeout(
      () => setTesting(false),
      LOG_LINES.length * 320 + 1000,
    );
    return () => clearTimeout(t);
  }, [testing]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <>
      {/* Modal de teste */}
      {testing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="flex flex-col items-center gap-4 bg-gray-900 rounded-2xl px-8 py-7 shadow-xl w-72">
            <Rocket size={36} className="text-green-400 animate-bounce" />
            <div className="text-center">
              <p className="text-white font-bold text-base">Testando conexão</p>
              <p className="text-gray-400 text-xs mt-1">{config.name}</p>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>

            {/* Log container */}
            <div className="w-full bg-black/60 rounded-lg p-3 h-32 overflow-y-auto font-mono text-[10px] leading-relaxed">
              {logs.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("✓") ? "text-green-400" : "text-gray-400"
                  }
                >
                  {line}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            <button
              onClick={() => setTesting(false)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        {/* Botões revelados */}
        <div className="absolute right-0 top-0 bottom-0 flex">
          <button
            onClick={handleTest}
            className="w-[72px] bg-green-600 flex flex-col items-center justify-center gap-1 text-white"
          >
            <Rocket size={14} />
            <span className="text-xs font-semibold">Testar</span>
          </button>
          {muted ? (
            <button
              onDoubleClick={() => {
                setMuted(false);
                setSwiped(false);
              }}
              className="w-[72px] bg-yellow-600/80 flex flex-col items-center justify-center  text-white"
            >
              <RotateCcw size={14} />
              <span className="text-xs font-semibold leading-tight">
                Restaurar
              </span>
              <span className="text-[9px] opacity-70">2× clique</span>
            </button>
          ) : (
            <button
              onClick={handleIgnore}
              className="w-[72px] bg-red-600/80 flex flex-col items-center justify-center gap-1 text-white"
            >
              <X size={14} />
              <span className="text-xs font-semibold">Ignorar</span>
            </button>
          )}
        </div>

        {/* Conteúdo deslizável */}
        <div
          className={`relative flex items-center gap-3 px-4 py-3.5 bg-gray-900 transition-all duration-200 select-none ${swiped ? "-translate-x-[144px]" : "translate-x-0"} ${muted ? "opacity-40" : "opacity-100"}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <button
            onClick={() => {
              if (!swiped) onSelect(config.id);
              else setSwiped(false);
            }}
            className="flex items-center gap-3 flex-1 min-w-0 text-left"
            disabled={muted}
          >
            <img
              src="https://i.postimg.cc/v806WvQZ/1750564847166.png"
              alt="logo"
              className="h-9 w-9 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-white truncate">
                {config.name}
              </span>
              <span className="block text-xs truncate mt-0.5">
                {muted ? (
                  <span className="text-yellow-600/70">Conexão suspensa</span>
                ) : (
                  <>
                    <span className="text-gray-500">{config.description}</span>
                    <span className="mx-1.5 text-gray-700">·</span>
                    <span className="text-blue-400">{config.connection}</span>
                  </>
                )}
              </span>
            </div>
          </button>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="text-sm text-gray-500">{config.servers}</span>
            {selected === config.id && !muted && (
              <Check size={16} className="text-blue-400" />
            )}
          </div>
        </div>

        {!isLast && <Separator className="bg-gray-800 ml-16" />}
      </div>
    </>
  );
}

function ConfigItemGrid({ config, selected, onSelect }) {
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);
  const isSelected = selected === config.id;

  const LOG_LINES = [
    "› Iniciando teste de conexão...",
    `› Resolvendo host ${config.connection}...`,
    "› Estabelecendo handshake SSL...",
    "› Enviando pacote de verificação...",
    "› Aguardando resposta do servidor...",
    "› Medindo latência de ida e volta...",
    "› Verificando rota de rede...",
    "› Checando disponibilidade de porta...",
    "✓ Conexão estabelecida com sucesso!",
  ];

  useEffect(() => {
    if (!testing) { setLogs([]); return; }
    setLogs([]);
    LOG_LINES.forEach((line, i) => {
      setTimeout(() => setLogs((prev) => [...prev, line]), i * 320);
    });
    const t = setTimeout(() => setTesting(false), LOG_LINES.length * 320 + 1000);
    return () => clearTimeout(t);
  }, [testing]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <>
      {testing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="flex flex-col items-center gap-4 bg-gray-900 rounded-2xl px-8 py-7 shadow-xl w-72">
            <Rocket size={36} className="text-green-400 animate-bounce" />
            <div className="text-center">
              <p className="text-white font-bold text-base">Testando conexão</p>
              <p className="text-gray-400 text-xs mt-1">{config.name}</p>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
            <div className="w-full bg-black/60 rounded-lg p-3 h-32 overflow-y-auto font-mono text-[10px] leading-relaxed">
              {logs.map((line, i) => (
                <div key={i} className={line.startsWith("✓") ? "text-green-400" : "text-gray-400"}>{line}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
            <button onClick={() => setTesting(false)} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Fechar</button>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer select-none ${
          isSelected
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-800 bg-gray-900 hover:border-gray-700"
        }`}
        onClick={() => onSelect(config.id)}
      >
        {isSelected && (
          <div className="absolute top-2 right-2">
            <Check size={13} className="text-blue-400" />
          </div>
        )}
        <img
          src="https://i.postimg.cc/v806WvQZ/1750564847166.png"
          alt="logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2">
          {config.name}
        </span>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
          config.connection === "V2Ray"
            ? "bg-purple-500/20 text-purple-400"
            : config.connection === "SSH"
            ? "bg-green-500/20 text-green-400"
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {config.connection}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500">{config.servers} servidores</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setTesting(true); }}
          className="w-full flex items-center justify-center gap-1 py-1 rounded-lg bg-gray-800 hover:bg-green-600/30 text-gray-400 hover:text-green-400 transition-colors text-[10px] font-semibold"
        >
          <Rocket size={10} /> Testar
        </button>
      </div>
    </>
  );
}

export function ManualPage({ onBack }) {
  const [selected, setSelected] = useState(1);
  const [filterConn, setFilterConn] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const preview = CONFIGS.slice(0, PREVIEW_LIMIT);
  const remaining = CONFIGS.length - PREVIEW_LIMIT;

  const FILTERS = ["V2Ray", "SSH", "WS+TLS"];
  const filtered = CONFIGS.filter((c) => {
    const matchConn = !filterConn || c.connection === filterConn;
    const matchSearch =
      !search || c.name.toLowerCase().includes(search.toLowerCase());
    return matchConn && matchSearch;
  });

  return (
    <div className="w-full h-full flex flex-col bg-black">
      <button
        className="flex items-center gap-1 px-4 pt-3 pb-1 text-blue-400 hover:text-blue-300 transition-colors text-base"
        onClick={onBack}
      >
        <ChevronLeft size={20} /> Voltar
      </button>

      <div className="px-4 pt-3 pb-4">
        <h1 className="text-3xl font-bold text-white">Categorias</h1>
      </div>

      <div className="px-4 mb-2">
        <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
          Servidores disponíveis
        </span>
      </div>

      <div className="px-4">
        <Drawer.Root>
          <div className="rounded-xl bg-gray-900 overflow-hidden">
            {preview.map((config, index) => (
              <ConfigItem
                key={config.id}
                config={config}
                isLast={false}
                selected={selected}
                onSelect={setSelected}
              />
            ))}
            <Separator className="bg-gray-800 ml-16" />
            <Drawer.Trigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors">
                <span className="text-sm font-medium text-white">
                  Ver todos
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">
                    +{remaining} categorias
                  </span>
                  <ChevronRight size={15} className="text-gray-600" />
                </div>
              </button>
            </Drawer.Trigger>
          </div>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-gray-900 max-h-[85vh]">
              <div className="mx-auto mt-3 mb-2 h-1.5 w-12 rounded-full bg-gray-700 flex-shrink-0" />

              <div className="flex items-center justify-between px-4 pb-3">
                <Drawer.Title className="text-base font-bold text-white">
                  Todas as categorias
                </Drawer.Title>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-gray-600 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                      <List size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-gray-600 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                      <LayoutGrid size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {filtered.length} no total
                  </span>
                </div>
              </div>

              {/* Pesquisa */}
              <div className="px-4 mb-3">
                {searching ? (
                  <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                    <Search size={13} className="text-gray-500 flex-shrink-0" />
                    <input
                      autoFocus
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar categoria..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                    />
                    <button
                      onClick={() => {
                        setSearching(false);
                        setSearch("");
                      }}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearching(true)}
                    className="w-full flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <Search size={13} />
                    <span className="text-sm">Buscar categoria...</span>
                  </button>
                )}
              </div>

              {/* Filtros — segmented control */}
              <div className="flex mx-4 mb-3 p-1 bg-gray-800 rounded-lg gap-1">
                {[
                  { label: "Todos", value: null },
                  ...FILTERS.map((f) => ({ label: f, value: f })),
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => setFilterConn(value)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                      filterConn === value
                        ? "bg-gray-600 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <Separator className="bg-gray-800" />

              <div className="overflow-y-auto flex-1">
                {filtered.length === 0 ? (
                  <p className="text-center text-gray-600 text-sm py-8">
                    Nenhuma categoria encontrada
                  </p>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {filtered.map((config) => (
                      <ConfigItemGrid
                        key={config.id}
                        config={config}
                        selected={selected}
                        onSelect={setSelected}
                      />
                    ))}
                  </div>
                ) : (
                  filtered.map((config, index) => (
                    <ConfigItem
                      key={config.id}
                      config={config}
                      isLast={index === filtered.length - 1}
                      selected={selected}
                      onSelect={setSelected}
                    />
                  ))
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}

export default ManualPage;

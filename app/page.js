"use client";
import { useState, useEffect } from "react";
import {
  Mail, Lock, X, Wifi, Settings2, ArrowRight,
  ChevronRight, Radio, Bolt, Zap, Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ManualPage } from "./pages/manualPage";
import { ConnectedPage } from "./pages/connectedPage";

const CONN_LOGS = [
  "› Autenticando credenciais...",
  "› Resolvendo endpoint VPN...",
  "› Estabelecendo túnel seguro...",
  "› Configurando rota de rede...",
  "› Verificando criptografia...",
  "› Sincronizando perfil...",
  "✓ Conexão estabelecida!",
];

function ConnectingScreen({ onDone }) {
  const [logs, setLogs] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    CONN_LOGS.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (i === CONN_LOGS.length - 1) {
          setTimeout(() => setDone(true), 500);
          setTimeout(() => onDone(), 1400);
        }
      }, i * 320);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6 px-8">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      {/* Orb */}
      <svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="connOrb" cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor={done ? "#86efac" : "#93c5fd"} stopOpacity="0.95" />
            <stop offset="50%"  stopColor={done ? "#22c55e" : "#3b82f6"} />
            <stop offset="100%" stopColor={done ? "#14532d" : "#1e3a8a"} />
          </radialGradient>
          <filter id="connGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Spinning ring */}
        <g>
          <circle cx="70" cy="70" r="60" stroke={done ? "#4ade80" : "#2563eb"} strokeWidth="1" strokeDasharray="3 6" fill="none" opacity="0.5" />
          <circle cx="70" cy="10" r="3" fill={done ? "#4ade80" : "#60a5fa"} filter="url(#connGlow)" opacity="0.9" />
          <animateTransform attributeName="transform" type="rotate"
            from="0 70 70" to="360 70 70" dur={done ? "3s" : "1.2s"} repeatCount="indefinite" />
        </g>

        {/* Counter ring */}
        <g>
          <circle cx="70" cy="70" r="50" stroke={done ? "#22c55e" : "#3b82f6"} strokeWidth="1.5" strokeDasharray="4 8" fill="none" opacity="0.4" />
          <circle cx="70" cy="20" r="3.5" fill={done ? "#86efac" : "#93c5fd"} filter="url(#connGlow)" opacity="0.85" />
          <animateTransform attributeName="transform" type="rotate"
            from="0 70 70" to="-360 70 70" dur={done ? "2s" : "0.9s"} repeatCount="indefinite" />
        </g>

        {/* Main orb */}
        <circle cx="70" cy="70" r="38" fill="url(#connOrb)" filter="url(#connGlow)" />
        <ellipse cx="61" cy="57" rx="13" ry="8" fill="white" opacity="0.12" transform="rotate(-25 61 57)" />

        {/* Center icon */}
        {done ? (
          <g transform="translate(70,70)" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-10,0 L-3,8 L10,-8" />
          </g>
        ) : (
          <g transform="translate(70, 70)" fill="none" stroke="white" strokeLinecap="round">
            <path d="M-12,-10 A15,15 0 0,1 12,-10" strokeWidth="2" opacity="0.45" />
            <path d="M-8,-5  A10,10 0 0,1 8,-5"  strokeWidth="2" opacity="0.7"  />
            <path d="M-4,-1  A5,5   0 0,1 4,-1"  strokeWidth="2" opacity="0.95" />
            <circle cx="0" cy="4" r="2" fill="white" stroke="none" />
          </g>
        )}

        {/* Fast pulse rings */}
        <circle cx="70" cy="70" r="38" stroke={done ? "#4ade80" : "#60a5fa"} strokeWidth="1.5" fill="none">
          <animate attributeName="r"            from="38" to="62" dur={done ? "1.4s" : "0.8s"} repeatCount="indefinite" />
          <animate attributeName="opacity"      from="0.6" to="0" dur={done ? "1.4s" : "0.8s"} repeatCount="indefinite" />
          <animate attributeName="stroke-width" from="1.5" to="0" dur={done ? "1.4s" : "0.8s"} repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="70" r="38" stroke={done ? "#4ade80" : "#60a5fa"} strokeWidth="1.5" fill="none">
          <animate attributeName="r"            from="38" to="62" dur={done ? "1.4s" : "0.8s"} begin={done ? "0.7s" : "0.4s"} repeatCount="indefinite" />
          <animate attributeName="opacity"      from="0.6" to="0" dur={done ? "1.4s" : "0.8s"} begin={done ? "0.7s" : "0.4s"} repeatCount="indefinite" />
          <animate attributeName="stroke-width" from="1.5" to="0" dur={done ? "1.4s" : "0.8s"} begin={done ? "0.7s" : "0.4s"} repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Status text */}
      <div className="text-center -mt-2">
        {done ? (
          <p className="text-lg font-bold text-green-400 tracking-wide">Conectado!</p>
        ) : (
          <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase animate-pulse">
            Conectando...
          </p>
        )}
      </div>

      {/* Log terminal */}
      <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 font-mono text-[11px] leading-relaxed max-h-44 overflow-hidden">
        {logs.map((line, i) => (
          <div
            key={i}
            className={line.startsWith("✓") ? "text-green-400 font-bold" : "text-gray-500"}
          >
            {line}
          </div>
        ))}
        {!done && (
          <span className="inline-block h-3 w-1.5 bg-blue-400 animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter]       = useState("home");
  const [modal, setModal]         = useState(false);
  const [connModal, setConnModal] = useState(false);
  const [email, setEmail]         = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setModal(false);
    setConnecting(true);
  };

  const handleConnected = () => {
    setConnecting(false);
    setFilter("connected");
  };

  if (filter === "manual") {
    return <ManualPage onBack={() => setFilter("home")} />;
  }

  if (filter === "connected") {
    return (
      <ConnectedPage
        email={email || "usuario@vpn.com"}
        onDisconnect={() => { setFilter("home"); setEmail(""); }}
      />
    );
  }

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-between py-14 relative overflow-hidden select-none">
      {/* Connecting overlay */}
      {connecting && <ConnectingScreen onDone={handleConnected} />}

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Top label */}
      <div className="z-10">
        <span className="text-[10px] font-bold tracking-[0.35em] text-gray-600 uppercase">
          VPN Connect
        </span>
      </div>

      {/* Orb + titles */}
      <div className="z-10 flex flex-col items-center gap-4">
        <button
          onClick={() => setModal(true)}
          className="relative active:scale-95 transition-transform duration-150 focus:outline-none"
          aria-label="Entrar"
        >
          <svg width="230" height="230" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="orbGrad" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="110" cy="110" r="105" fill="url(#bgGlow)" />
            <g>
              <circle cx="110" cy="110" r="97" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3 9" fill="none" opacity="0.65" />
              <circle cx="110" cy="13" r="3.5" fill="#60a5fa" opacity="0.75" filter="url(#glow)" />
              <circle cx="110" cy="207" r="2" fill="#3b82f6" opacity="0.4" />
              <animateTransform attributeName="transform" type="rotate" from="0 110 110" to="360 110 110" dur="14s" repeatCount="indefinite" />
            </g>
            <g>
              <circle cx="110" cy="110" r="83" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 10 2 10" fill="none" opacity="0.55" />
              <circle cx="110" cy="27" r="5" fill="#60a5fa" opacity="0.9" filter="url(#glow)" />
              <circle cx="193" cy="110" r="2.5" fill="#93c5fd" opacity="0.5" />
              <circle cx="27"  cy="110" r="2.5" fill="#93c5fd" opacity="0.5" />
              <animateTransform attributeName="transform" type="rotate" from="0 110 110" to="-360 110 110" dur="9s" repeatCount="indefinite" />
            </g>
            <g>
              <circle cx="110" cy="110" r="69" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 7" fill="none" opacity="0.35" />
              <circle cx="110" cy="41" r="3.5" fill="#bfdbfe" opacity="0.85" filter="url(#glow)" />
              <animateTransform attributeName="transform" type="rotate" from="0 110 110" to="360 110 110" dur="5s" repeatCount="indefinite" />
            </g>
            <circle cx="110" cy="110" r="59" stroke="#3b82f6" strokeWidth="0.5" fill="none" opacity="0.2" />
            <circle cx="110" cy="110" r="54" fill="url(#orbGrad)" filter="url(#softGlow)" />
            <ellipse cx="97" cy="90" rx="20" ry="13" fill="white" opacity="0.13" transform="rotate(-25 97 90)" />
            <g transform="translate(110, 116)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
              <path d="M-20,-18 A26,26 0 0,1 20,-18" strokeWidth="2.5" opacity="0.4" />
              <path d="M-13,-11 A17,17 0 0,1 13,-11" strokeWidth="2.5" opacity="0.7" />
              <path d="M-7,-4 A9,9 0 0,1 7,-4"   strokeWidth="2.5" opacity="0.95" />
              <circle cx="0" cy="5" r="3" fill="white" stroke="none" />
            </g>
            <circle cx="110" cy="110" r="54" stroke="#60a5fa" strokeWidth="2" fill="none">
              <animate attributeName="r"            from="54" to="82" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity"      from="0.55" to="0" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" from="2" to="0"   dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="110" cy="110" r="54" stroke="#60a5fa" strokeWidth="2" fill="none">
              <animate attributeName="r"            from="54" to="82" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
              <animate attributeName="opacity"      from="0.55" to="0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" from="2" to="0"   dur="2.6s" begin="1.3s" repeatCount="indefinite" />
            </circle>
          </svg>

          <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.28em] text-blue-400/55 uppercase whitespace-nowrap">
            Toque para entrar
          </p>
        </button>

        <div className="flex flex-col items-center gap-2 mt-5">
          <h1 className="text-[2rem] font-bold text-white tracking-tight">Bem-vindo</h1>
          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
            <Wifi size={10} /> VIVO FRONT
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="z-10 flex flex-col items-center gap-3 w-full px-6">
        <button
          onClick={() => setConnModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] active:scale-[0.98] transition-all"
        >
          <div className="h-9 w-9 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
            <Settings2 size={16} className="text-gray-400" />
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-sm font-semibold text-white leading-tight">Configurar Conexão</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Radio size={9} className="text-green-400" />
              <span className="text-[10px] text-gray-500">Manual · VIVO FRONT</span>
            </div>
          </div>
          <ChevronRight size={15} className="text-gray-600 shrink-0" />
        </button>
        <p className="text-[10px] text-gray-700">© 2026 Seu App. Todos os direitos reservados.</p>
      </div>

      {/* ===== Login Modal ===== */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }}
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <div className="w-full bg-gray-950 border-t border-x border-gray-800/50 rounded-t-3xl px-6 pt-4 pb-10 flex flex-col gap-5">
            <div className="w-10 h-1 rounded-full bg-gray-700 mx-auto" />

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Entrar</h2>
                <p className="text-xs text-gray-500 mt-0.5">Digite suas credenciais para continuar</p>
              </div>
              <button
                onClick={() => setModal(false)}
                className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center px-4">
                <Mail size={16} className="text-gray-500 shrink-0" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-3 h-12 text-sm text-white placeholder:text-gray-600 bg-transparent border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Separator className="bg-gray-800 m-0" />
              <div className="flex items-center px-4">
                <Lock size={16} className="text-gray-500 shrink-0" />
                <Input
                  type="password"
                  placeholder="Senha"
                  className="px-3 py-3 h-12 text-sm text-white placeholder:text-gray-600 bg-transparent border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-colors"
            >
              Conectar <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ===== Conn Modal ===== */}
      {connModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }}
          onClick={(e) => e.target === e.currentTarget && setConnModal(false)}
        >
          <div className="w-full bg-gray-950 border-t border-x border-gray-800/50 rounded-t-3xl px-5 pt-4 pb-10 flex flex-col gap-4">
            <div className="w-10 h-1 rounded-full bg-gray-700 mx-auto" />

            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base font-bold text-white">Método de conexão</h2>
                <p className="text-xs text-gray-500 mt-0.5">Escolha como deseja se conectar</p>
              </div>
              <button
                onClick={() => setConnModal(false)}
                className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setConnModal(false); setFilter("manual"); }}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 active:scale-[0.98] transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
                  <Bolt size={18} className="text-white" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-white">Manual</span>
                  <span className="text-xs text-gray-500 mt-0.5">Escolha seu servidor</span>
                </div>
                <ChevronRight size={16} className="text-blue-400/60 shrink-0" />
              </button>

              <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] opacity-50">
                <div className="h-11 w-11 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-gray-500" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Automático</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-400 tracking-wide">EM BREVE</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-0.5">Detecta automaticamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  Wifi,
  Shield,
  User,
  LogOut,
  Palette,
  Activity,
  Clock,
} from "lucide-react";

const BG_PRESETS = [
  { id: "blue", blob: "#2563eb" },
  { id: "purple", blob: "#7c3aed" },
  { id: "green", blob: "#059669" },
  { id: "rose", blob: "#e11d48" },
  { id: "orange", blob: "#ea580c" },
];

const ORB_PRESETS = [
  {
    id: "blue",
    from: "#93c5fd",
    mid: "#3b82f6",
    to: "#1e3a8a",
    ring: "#60a5fa",
  },
  {
    id: "cyan",
    from: "#a5f3fc",
    mid: "#06b6d4",
    to: "#164e63",
    ring: "#22d3ee",
  },
  {
    id: "purple",
    from: "#d8b4fe",
    mid: "#8b5cf6",
    to: "#3b0764",
    ring: "#a78bfa",
  },
  {
    id: "green",
    from: "#86efac",
    mid: "#22c55e",
    to: "#14532d",
    ring: "#4ade80",
  },
  {
    id: "pink",
    from: "#fbcfe8",
    mid: "#ec4899",
    to: "#500724",
    ring: "#f472b6",
  },
];

export function ConnectedPage({ email, onDisconnect }) {
  const [download, setDownload] = useState(42.5);
  const [upload, setUpload] = useState(8.3);
  const [ping, setPing] = useState(23);
  const [dataUsed, setDataUsed] = useState(1.24);
  const [connTime, setConnTime] = useState(0);
  const [bgPreset, setBgPreset] = useState("blue");
  const [orbPreset, setOrbPreset] = useState("blue");

  const bg = BG_PRESETS.find((b) => b.id === bgPreset);
  const orb = ORB_PRESETS.find((o) => o.id === orbPreset);

  useEffect(() => {
    const iv = setInterval(() => {
      setDownload((p) =>
        Math.max(5, Math.min(200, p + (Math.random() - 0.45) * 14)),
      );
      setUpload((p) =>
        Math.max(1, Math.min(60, p + (Math.random() - 0.45) * 5)),
      );
      setPing((p) =>
        Math.max(8, Math.min(80, p + Math.round((Math.random() - 0.5) * 8))),
      );
      setDataUsed((p) => p + 0.001 * Math.random());
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setConnTime((t) => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const profileName = email.split("@")[0];

  return (
    <div className="bg-black w-full h-screen flex flex-col relative overflow-y-auto overflow-x-hidden select-none">
      {/* Dynamic ambient blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: `${bg.blob}28` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl pointer-events-none transition-all duration-700"
        style={{ background: `${orb.mid}18` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2 z-10">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-gray-600 uppercase">
            VPN Connect
          </p>
          <h1 className="text-xl font-bold text-white mt-0.5 capitalize">
            {profileName}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 text-green-400 text-[11px] font-bold px-3 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          ATIVO
        </div>
      </div>

      {/* Orb SVG */}
      <div className="flex justify-center z-10 mt-1">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cOrbGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor={orb.from} stopOpacity="0.95" />
              <stop offset="50%" stopColor={orb.mid} />
              <stop offset="100%" stopColor={orb.to} />
            </radialGradient>
            <radialGradient id="cBgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={orb.mid} stopOpacity="0.22" />
              <stop offset="100%" stopColor={orb.mid} stopOpacity="0" />
            </radialGradient>
            <filter id="cGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="92" fill="url(#cBgGlow)" />

          {/* Outer ring */}
          <g>
            <circle
              cx="100"
              cy="100"
              r="87"
              stroke={orb.ring}
              strokeWidth="1"
              strokeDasharray="3 7"
              fill="none"
              opacity="0.4"
            />
            <circle
              cx="100"
              cy="13"
              r="3"
              fill={orb.ring}
              filter="url(#cGlow)"
              opacity="0.8"
            />
            <circle cx="100" cy="187" r="2" fill={orb.mid} opacity="0.35" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="10s"
              repeatCount="indefinite"
            />
          </g>

          {/* Counter ring */}
          <g>
            <circle
              cx="100"
              cy="100"
              r="74"
              stroke={orb.mid}
              strokeWidth="1.5"
              strokeDasharray="5 9 2 9"
              fill="none"
              opacity="0.5"
            />
            <circle
              cx="100"
              cy="26"
              r="4"
              fill={orb.from}
              filter="url(#cGlow)"
              opacity="0.9"
            />
            <circle cx="174" cy="100" r="2.5" fill={orb.ring} opacity="0.5" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="-360 100 100"
              dur="7s"
              repeatCount="indefinite"
            />
          </g>

          {/* Main orb */}
          <circle
            cx="100"
            cy="100"
            r="55"
            fill="url(#cOrbGrad)"
            filter="url(#cSoftGlow)"
          />
          <ellipse
            cx="88"
            cy="82"
            rx="18"
            ry="11"
            fill="white"
            opacity="0.13"
            transform="rotate(-25 88 82)"
          />

          {/* Speed text */}
          <text
            x="100"
            y="96"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {download.toFixed(0)}
          </text>
          <text
            x="100"
            y="110"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.65"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            Mbps
          </text>

          {/* Pulse rings */}
          <circle
            cx="100"
            cy="100"
            r="55"
            stroke={orb.ring}
            strokeWidth="1.5"
            fill="none"
          >
            <animate
              attributeName="r"
              from="55"
              to="78"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.5"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              from="1.5"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="100"
            cy="100"
            r="55"
            stroke={orb.ring}
            strokeWidth="1.5"
            fill="none"
          >
            <animate
              attributeName="r"
              from="55"
              to="78"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.5"
              to="0"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              from="1.5"
              to="0"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Speed row */}
      <div className="flex items-center justify-center gap-8 z-10 -mt-1">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center">
            <ArrowDown size={13} className="text-green-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-white font-mono leading-none">
              {download.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-500">Mbps</span>
          </div>
        </div>
        <div className="h-6 w-px bg-gray-800" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
            <ArrowUp size={13} className="text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-white font-mono leading-none">
              {upload.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-500">Mbps</span>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-2 z-10">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-1.5">
          <Activity size={12} className="text-gray-500" />
          <span className="text-base font-bold text-white font-mono leading-none">
            {ping}
            <span className="text-xs font-normal text-gray-500">ms</span>
          </span>
          <span className="text-[10px] text-gray-600 uppercase tracking-wide">
            Ping
          </span>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-1.5">
          <Wifi size={12} className="text-gray-500" />
          <span className="text-base font-bold text-white font-mono leading-none">
            {dataUsed.toFixed(2)}
            <span className="text-xs font-normal text-gray-500">GB</span>
          </span>
          <span className="text-[10px] text-gray-600 uppercase tracking-wide">
            Consumo
          </span>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-1.5">
          <Clock size={12} className="text-gray-500" />
          <span className="text-[11px] font-bold text-white font-mono leading-none">
            {formatTime(connTime)}
          </span>
          <span className="text-[10px] text-gray-600 uppercase tracking-wide">
            Tempo
          </span>
        </div>
      </div>

      {/* Profile */}
      <div className="px-5 mt-3 z-10">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-3 flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${orb.from}, ${orb.to})`,
            }}
          >
            <User size={17} className="text-white" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-bold text-white capitalize truncate">
              {profileName}
            </span>
            <span className="text-xs text-gray-500 truncate">{email}</span>
          </div>
          <div className="flex items-center gap-1 bg-green-500/15 border border-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Shield size={9} /> PRO
          </div>
        </div>
      </div>

      {/* Customization */}
      <div className="px-5 mt-3 z-10">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-4">
          <div className="flex items-center gap-1.5 mb-4">
            <Palette size={13} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Personalizar
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* BG preset */}
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                Fundo
              </p>
              <div className="flex gap-2.5">
                {BG_PRESETS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBgPreset(b.id)}
                    className={`h-8 w-8 rounded-full transition-all duration-200 ${
                      bgPreset === b.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                        : "opacity-60 hover:opacity-90"
                    }`}
                    style={{ background: b.blob }}
                  />
                ))}
              </div>
            </div>

            {/* Orb preset */}
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                Bolinha
              </p>
              <div className="flex gap-2.5">
                {ORB_PRESETS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOrbPreset(o.id)}
                    className={`h-8 w-8 rounded-full transition-all duration-200 ${
                      orbPreset === o.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                        : "opacity-60 hover:opacity-90"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${o.from}, ${o.to})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disconnect */}
      <div className="px-5 mt-4 pb-12 z-10">
        <button
          onClick={onDisconnect}
          className="w-full h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 active:scale-[0.98] font-semibold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <LogOut size={15} /> Desconectar
        </button>
      </div>
    </div>
  );
}

export default ConnectedPage;

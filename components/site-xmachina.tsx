'use client';

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Orbitron, Space_Grotesk } from "next/font/google";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  LineChart,
  Mail,
  Shield,
  Waves,
  Zap,
} from "lucide-react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const basePath = process.env.NODE_ENV === "production" ? "/Xmachina2" : "";
const logoPath = `${basePath}/logo_nova-xmachina.png`;

const navItems = [
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Processo", href: "#processo" },
  { label: "Aplicações", href: "#aplicacoes" },
  { label: "Empresa", href: "#empresa" },
  { label: "Contato", href: "#contato" },
];

const heroStats = [
  { value: "99%", label: "de precisão em campo" },
  { value: "30x", label: "diagnósticos por segundo" },
  { value: "23", label: "variáveis monitoradas" },
];

const problemCards = [
  {
    title: "Perda de timing operacional",
    text: "Sem leitura contínua do processo, decisões importantes ainda dependem de atraso analítico e interpretação tardia.",
  },
  {
    title: "Desvios difíceis de ver",
    text: "Quando o problema aparece só no laboratório, o lote já pode ter sido comprometido, retrabalhado ou descartado.",
  },
  {
    title: "Baixa previsibilidade",
    text: "Sem inteligência em tempo real, a operação perde visão de tendência, consistência e rastreabilidade.",
  },
];

const techCards = [
  {
    icon: Waves,
    title: "TOR",
    subtitle: "Transdutor Óptico por Refração",
    text: "Sensor óptico em linha para leitura contínua do fluido diretamente no processo industrial.",
    bullets: [
      'Tubulação 1"',
      "CIP/SIP compatível",
      "Estrutura industrial robusta",
      "Leitura contínua em linha",
    ],
  },
  {
    icon: Cpu,
    title: "ARIN",
    subtitle: "Engine proprietária de IA",
    text: "Rede neural especializada que interpreta a assinatura óptica do fluido e transforma leitura em diagnóstico acionável.",
    bullets: [
      "Hardware dedicado ou nuvem",
      "Dashboard web e desktop",
      "Processamento em tempo real",
      "Diagnóstico operacional contínuo",
    ],
  },
];

const steps = [
  "A luz atravessa o fluido em processo.",
  "O TOR captura padrões ópticos de refração e difração.",
  "O ARIN interpreta a assinatura do processo com IA.",
  "O sistema entrega diagnóstico em tempo real para a operação.",
];

const applicationCards = [
  {
    icon: Factory,
    title: "Saneamento",
    text: "Monitoramento contínuo em ETA, distribuição e controle de qualidade hídrica.",
  },
  {
    icon: FlaskConical,
    title: "Química e petroquímica",
    text: "Leitura mais fina de fluidos e processos que exigem estabilidade e rastreabilidade.",
  },
  {
    icon: Gauge,
    title: "Combustíveis",
    text: "Mais agilidade no acompanhamento de gasolina, diesel, etanol e biodiesel.",
  },
  {
    icon: LineChart,
    title: "Bebidas e alimentos",
    text: "Mais consistência operacional em xaropes, cervejas, laticínios e formulações líquidas.",
  },
];

const benefitCards = [
  "Menos perdas e retrabalho",
  "Mais velocidade para decidir",
  "Maior consistência operacional",
  "Mais rastreabilidade do processo",
  "Base mais forte para P&D",
  "Melhor resposta em campo",
];

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className={`mb-4 text-xs uppercase tracking-[0.35em] text-[#f4e300] ${orbitron.className}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl leading-tight text-white md:text-5xl ${orbitron.className}`}>
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-zinc-300 md:text-lg">{text}</p>
    </div>
  );
}

function NeuralNetworkScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasEl: HTMLCanvasElement = canvas;
    const ctx2d: CanvasRenderingContext2D = ctx;

    type NodeColor = "white" | "yellow";

    type Node3D = {
      id: number;
      x: number;
      y: number;
      z: number;
      pulse: number;
      hue: NodeColor;
    };

    type ProjectedPoint = {
      x: number;
      y: number;
      scale: number;
      z: number;
    };

    type ProjectedNode = ProjectedPoint & {
      idx: number;
      hue: NodeColor;
    };

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetRotX = 0.28;
    let targetRotY = -0.38;
    let rotX = 0.28;
    let rotY = -0.38;

    const cubeSize = 320;
    const half = cubeSize / 2;
    const nodeCount = 180;

    const nodes: Node3D[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * cubeSize,
      y: (Math.random() - 0.5) * cubeSize,
      z: (Math.random() - 0.5) * cubeSize,
      pulse: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.14 ? "white" : "yellow",
    }));

    const edges: Array<[number, number]> = [];

    for (let i = 0; i < nodes.length; i++) {
      const sourceNode = nodes[i];
      if (!sourceNode) continue;

      const nearest = nodes
        .map((node, j): { j: number; d: number } | null => {
          if (i === j) return null;

          const dx = sourceNode.x - node.x;
          const dy = sourceNode.y - node.y;
          const dz = sourceNode.z - node.z;

          return { j, d: Math.sqrt(dx * dx + dy * dy + dz * dz) };
        })
        .filter((item): item is { j: number; d: number } => item !== null)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);

      nearest.forEach((item) => {
        const a = Math.min(i, item.j);
        const b = Math.max(i, item.j);

        if (!edges.some(([x, y]) => x === a && y === b)) {
          edges.push([a, b]);
        }
      });
    }

    const cubeCorners: Array<[number, number, number]> = [
      [-half, -half, -half],
      [half, -half, -half],
      [half, half, -half],
      [-half, half, -half],
      [-half, -half, half],
      [half, -half, half],
      [half, half, half],
      [-half, half, half],
    ];

    const cubeEdges: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);

      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(x: number, y: number, z: number): ProjectedPoint {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);

      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y1 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx + 650;
      const scale = 620 / z2;

      return {
        x: x1 * scale + width / 2,
        y: y1 * scale + height / 2,
        scale,
        z: z2,
      };
    }

    function drawGlow() {
      const glowA = ctx2d.createRadialGradient(
        width * 0.75,
        height * 0.72,
        0,
        width * 0.75,
        height * 0.72,
        width * 0.34
      );
      glowA.addColorStop(0, "rgba(0,255,255,0.16)");
      glowA.addColorStop(1, "rgba(0,0,0,0)");
      ctx2d.fillStyle = glowA;
      ctx2d.fillRect(0, 0, width, height);

      const glowB = ctx2d.createRadialGradient(
        width * 0.28,
        height * 0.20,
        0,
        width * 0.28,
        height * 0.20,
        width * 0.26
      );
      glowB.addColorStop(0, "rgba(244,227,0,0.12)");
      glowB.addColorStop(1, "rgba(0,0,0,0)");
      ctx2d.fillStyle = glowB;
      ctx2d.fillRect(0, 0, width, height);
    }

    function drawCube() {
      const projectedCorners = cubeCorners.map(([x, y, z]) => project(x, y, z));

      cubeEdges.forEach(([a, b], idx) => {
        const p1 = projectedCorners[a];
        const p2 = projectedCorners[b];
        if (!p1 || !p2) return;

        const pulse = (Math.sin(time * 1.4 + idx * 0.7) + 1) / 2;

        ctx2d.beginPath();
        ctx2d.moveTo(p1.x, p1.y);
        ctx2d.lineTo(p2.x, p2.y);
        ctx2d.lineWidth = 1.25;
        ctx2d.strokeStyle = `rgba(255,255,255,${0.18 + pulse * 0.12})`;
        ctx2d.stroke();
      });
    }

    function draw() {
      time += 0.01;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx2d.clearRect(0, 0, width, height);
      drawGlow();
      drawCube();

      const projectedNodes: ProjectedNode[] = nodes.map((node, idx) => {
        const wobble = Math.sin(time * 1.4 + node.pulse) * 4;

        return {
          idx,
          hue: node.hue,
          ...project(node.x, node.y + wobble, node.z),
        };
      });

      edges.forEach(([a, b], idx) => {
        const p1 = projectedNodes[a];
        const p2 = projectedNodes[b];
        if (!p1 || !p2) return;

        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const dist = Math.hypot(mx - pointerX, my - pointerY);
        const hover = Math.max(0, 1 - dist / 220);
        const pulse = (Math.sin(time * 2 + idx * 0.17) + 1) / 2;

        ctx2d.beginPath();
        ctx2d.moveTo(p1.x, p1.y);
        ctx2d.lineTo(p2.x, p2.y);
        ctx2d.lineWidth = 0.8 + hover * 1.3;
        ctx2d.strokeStyle = `rgba(244,227,0,${0.08 + pulse * 0.1 + hover * 0.24})`;
        ctx2d.stroke();
      });

      projectedNodes
        .slice()
        .sort((a, b) => b.scale - a.scale)
        .forEach((node, idx) => {
          const dist = Math.hypot(node.x - pointerX, node.y - pointerY);
          const hover = Math.max(0, 1 - dist / 170);
          const pulse = (Math.sin(time * 2.2 + idx * 0.12) + 1) / 2;
          const radius = 2 + node.scale * 7.5 + hover * 2.2;

          ctx2d.beginPath();
          ctx2d.arc(node.x, node.y, radius * 2.2, 0, Math.PI * 2);
          ctx2d.fillStyle =
            node.hue === "yellow"
              ? `rgba(244,227,0,${0.07 + hover * 0.08})`
              : `rgba(0,255,255,${0.035 + hover * 0.07})`;
          ctx2d.fill();

          ctx2d.beginPath();
          ctx2d.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx2d.fillStyle =
            node.hue === "yellow"
              ? `rgba(244,227,0,${0.82 + pulse * 0.12})`
              : `rgba(255,255,255,${0.62 + pulse * 0.18 + hover * 0.18})`;
          ctx2d.fill();
        });

      animationFrame = window.requestAnimationFrame(draw);
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;

      const nx = (pointerX / rect.width) * 2 - 1;
      const ny = (pointerY / rect.height) * 2 - 1;

      targetRotY = -0.38 + nx * 0.85;
      targetRotX = 0.28 + ny * 0.42;
    };

    const handlePointerLeave = () => {
      pointerX = width * 0.5;
      pointerY = height * 0.5;
      targetRotX = 0.28;
      targetRotY = -0.38;
    };

    resize();
    handlePointerLeave();
    draw();

    window.addEventListener("resize", resize);
    canvasEl.addEventListener("pointermove", handlePointerMove);
    canvasEl.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvasEl.removeEventListener("pointermove", handlePointerMove);
      canvasEl.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative h-[680px] w-full overflow-visible">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_74%,rgba(0,255,255,0.10),transparent_24%),radial-gradient(circle_at_28%_22%,rgba(244,227,0,0.10),transparent_26%)]" />
      <canvas ref={canvasRef} className="relative block h-full w-full" />
    </div>
  );
}

export default function XMachinaConceptPage() {
  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-[#06070a] text-white`}>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,227,0,0.12),transparent_20%),radial-gradient(circle_at_left,rgba(67,97,238,0.10),transparent_18%),linear-gradient(180deg,#06070a_0%,#090b12_55%,#05060a_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#f4e300]/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <Image src={logoPath} alt="Logo XMachina" fill className="object-contain p-1.5" />
            </div>
            <div>
              <p className={`text-sm tracking-[0.28em] text-white ${orbitron.className}`}>XMACHINA</p>
              <p className="text-xs text-zinc-400">Industrial sensing intelligence</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className={`rounded-full border border-[#f4e300]/30 bg-[#f4e300] px-5 py-2.5 text-sm text-black transition hover:scale-[1.02] hover:bg-[#fff27a] ${orbitron.className}`}
          >
            Solicitar demo
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f4e300]/20 bg-[#f4e300]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#f4e300]">
                <Zap className="h-4 w-4" />
                Solução TOR + ARIN
              </div>

              <div className="space-y-6">
                <h1 className={`max-w-5xl text-5xl leading-[0.92] text-white md:text-7xl ${orbitron.className}`}>
                  Inteligência óptica para processos industriais em <span className="text-[#f4e300]">tempo real</span>.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
                  Monitoramento óptico contínuo com inteligência artificial para processos industriais que exigem precisão, rastreabilidade e resposta rápida.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contato"
                  className={`inline-flex items-center justify-center rounded-full bg-[#f4e300] px-7 py-4 text-sm text-black transition hover:bg-[#fff27a] ${orbitron.className}`}
                >
                  Falar com especialista <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#tecnologia"
                  className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm text-white transition hover:bg-white/100 ${orbitron.className}`}
                >
                  Ver tecnologia
                </a>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                    <div className={`text-3xl text-white ${orbitron.className}`}>{item.value}</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-44 w-44 rounded-full bg-[#f4e300]/15 blur-3xl" />
              <div className="absolute -right-6 bottom-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
              <NeuralNetworkScene />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 lg:grid-cols-4 lg:px-8">
            {[
              "Monitoramento óptico contínuo",
              "Diagnóstico acionável em tempo real",
              "Integração com operação industrial",
              "Maior previsibilidade de processo",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-[#f4e300]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeader
            eyebrow="O problema"
            title="Hoje, o que a operação não vê em tempo real ainda custa caro."
            text="Em operações críticas, atraso de leitura significa mais risco, mais perda e menos previsibilidade."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problemCards.map((item, index) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
                <div className={`text-sm tracking-[0.3em] text-[#f4e300] ${orbitron.className}`}>0{index + 1}</div>
                <h3 className={`mt-4 text-2xl text-white ${orbitron.className}`}>{item.title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="tecnologia" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeader
            eyebrow="Tecnologia"
            title="Um sensor. Uma engine de IA. Um novo nível de visibilidade operacional."
            text="TOR e ARIN atuam em conjunto para captar o comportamento óptico do fluido e converter isso em leitura operacional contínua."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {techCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f4e300]/15 bg-[#f4e300]/10 text-[#f4e300]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className={`text-3xl text-white ${orbitron.className}`}>{item.title}</h3>
                      <p className="text-sm text-zinc-400">{item.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">{item.text}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-300">
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="processo" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionHeader
              eyebrow="Processo"
              title="Da assinatura óptica ao diagnóstico operacional."
              text="Da captação óptica à interpretação por inteligência artificial, o sistema acompanha variações do processo em tempo real."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-[1.75rem] border border-white/10 bg-[#0d1017] p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#f4e300] text-black ${orbitron.className}`}>
                    {index + 1}
                  </div>
                  <p className="mt-5 text-lg leading-7 text-zinc-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="aplicacoes" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeader
            eyebrow="Aplicações"
            title="Uma plataforma de monitoramento para diferentes ambientes industriais."
            text="A tecnologia atende operações que precisam de monitoramento contínuo, consistência de qualidade e maior rastreabilidade."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {applicationCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group rounded-[1.75rem] border border-white/10 bg-[#0d1017] p-7 transition hover:-translate-y-1 hover:border-[#f4e300]/30 hover:bg-[#111623]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e300]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className={`mt-6 text-2xl text-white ${orbitron.className}`}>{item.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeader
                eyebrow="Valor"
                title="Tecnologia que melhora resposta, reduz perda e fortalece decisão."
                text="Mais visibilidade do processo para reduzir perdas, acelerar resposta e sustentar decisões com mais confiança."
              />
            </div>

            <div className="grid gap-4">
              {benefitCards.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-[#f4e300]" />
                    <span className="text-base text-zinc-200">{item}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="empresa" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
            <div className="space-y-6">
              <p className={`text-xs uppercase tracking-[0.35em] text-[#f4e300] ${orbitron.className}`}>Empresa</p>
              <h2 className={`text-3xl leading-tight text-white md:text-5xl ${orbitron.className}`}>
                Tecnologia desenvolvida para tornar o processo mais visível, previsível e confiável.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                A XMachina desenvolve soluções de monitoramento industrial que unem sensor óptico e inteligência artificial para acompanhar fluidos em tempo real e apoiar decisões com mais velocidade e precisão.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="space-y-6 text-zinc-300">
                <div>
                  <p className={`text-sm tracking-[0.25em] text-zinc-500 ${orbitron.className}`}>Atuação</p>
                  <p className="mt-2 leading-7">Monitoramento de fluidos em ambientes industriais com necessidade de leitura contínua e resposta rápida.</p>
                </div>
                <div>
                  <p className={`text-sm tracking-[0.25em] text-zinc-500 ${orbitron.className}`}>Tecnologia</p>
                  <p className="mt-2 leading-7">Integração entre sensoriamento óptico, inteligência artificial e visualização operacional em tempo real.</p>
                </div>
                <div>
                  <p className={`text-sm tracking-[0.25em] text-zinc-500 ${orbitron.className}`}>Entrega</p>
                  <p className="mt-2 leading-7">Mais visibilidade do processo, maior consistência de qualidade e decisões operacionais com mais confiança.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-6">
              <p className={`text-xs uppercase tracking-[0.35em] text-[#f4e300] ${orbitron.className}`}>Contato</p>
              <h2 className={`text-3xl leading-tight text-white md:text-5xl ${orbitron.className}`}>
                Pronto para transformar monitoramento em vantagem operacional?
              </h2>
              <p className="max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
                Fale com a equipe para conhecer a tecnologia, discutir sua operação e avaliar possibilidades de demonstração ou piloto.
              </p>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4e300]/10 text-[#f4e300]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-sm tracking-[0.25em] text-zinc-500 ${orbitron.className}`}>Comercial</p>
                    <a href="mailto:sande@xmachina.com.br" className="mt-2 block text-xl text-white transition hover:text-[#f4e300]">
                      sande@xmachina.com.br
                    </a>
                    <p className="mt-2 text-zinc-400">Solicite demonstração, conversa técnica ou piloto.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8">
              <form className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    placeholder="Seu nome"
                    className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[#f4e300]/40"
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[#f4e300]/40"
                  />
                </div>
                <input
                  placeholder="Empresa"
                  className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[#f4e300]/40"
                />
                <textarea
                  placeholder="Conte brevemente sobre o processo que você quer monitorar"
                  className="min-h-[170px] rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[#f4e300]/40"
                />
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="max-w-md text-sm leading-6 text-zinc-500">
                    Compartilhe seu contexto operacional, o tipo de fluido monitorado e o principal desafio do processo.
                  </p>
                  <button
                    type="button"
                    className={`inline-flex items-center rounded-full bg-[#f4e300] px-7 py-4 text-sm text-black transition hover:bg-[#fff27a] ${orbitron.className}`}
                  >
                    Solicitar contato <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <Image src={logoPath} alt="Logo XMachina" fill className="object-contain p-1.5" />
            </div>
            <div>
              <p className={`text-sm text-zinc-200 ${orbitron.className}`}>XMACHINA</p>
              <p>Industrial sensing intelligence</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}




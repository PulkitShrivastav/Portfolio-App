import React, { useState } from "react";
import Header from "./head";

interface Project {
    id: string;
    index: string;
    title: string;
    category: string;
    summary: string;
    stack: string[];
    metrics: { label: string; value: string }[];
    liveUrl?: string;
    sourceUrl?: string;
}

const projects: Project[] = [
    {
        id: "mechelements",
        index: "01",
        title: "MechElements",
        category: "Design System / Primitives",
        summary:
            "A zero-overhead React component library engineered for high-precision tactile UI. Focuses on modular primitives, strict token inheritance, and predictable layout execution.",
        stack: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
        metrics: [
            { label: "Status", value: "Active v0.4" },
            { label: "Footprint", value: "< 4.2kb Core" },
        ],
        sourceUrl: "https://github.com/PulkitShrivastav/Mech-Elements",
    },
    {
        id: "techanime",
        index: "02",
        title: "Dev_Anime IDE",
        category: "Developer Tooling",
        summary:
            "Browser-integrated code editor supporting multi-tab Monaco instances for HTML, CSS, and JS execution. Includes local runtime persistence and live frame compilation.",
        stack: ["Angular", "Monaco Editor", "TypeScript", "RxJS", 'Express'],
        metrics: [
            { label: "Latency", value: "Sub-16ms Eval" },
            { label: "Runtime", value: "Client Isolated" },
        ],
        liveUrl: "https://railroad-offshore-organizer-suggestions.trycloudflare.com/login",
        sourceUrl: "https://github.com/PulkitShrivastav/dev_anime",
    },
    {
        id: "terminal-core",
        index: "03",
        title: "Web PTY Terminal (Ongoing...)",
        category: "System Utility",
        summary:
            "Full-duplex web terminal gateway linking browser clients to underlying containerized shells via WebSocket stream protocols and persistent process spawning.",
        stack: ["Node.js", "Express", "node-pty", "WebSocket"],
        metrics: [
            { label: "Architecture", value: "Dual Socket" },
            { label: "Concurrency", value: "Multi-Process" },
        ],
        sourceUrl: "https://github.com/PulkitShrivastav/faber_studio_frontend",
    },
];

export default function ProjectsSec() {
    const [activeProject, setActiveProject] = useState<Project>(projects[0]);

    return (
        <section
            id="projects"
            className="min-h-screen bg-[#F5F2EB] text-[#1A1A1A] py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden font-sans selection:bg-[#E27D60] selection:text-white"
        >
            {/* Background Dot Matrix */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <Header head={{
                    volume: "[ Volume 03 : Works ]",
                    headline: "Deployments & Tools",
                    index: "Index — 03"
                }} body={{
                    title: "Selected Works",
                    feature1: "Featured",
                    feature2: "Artifacts.",
                    headPara: "Production tools, interface systems, and runtime platforms engineered for developer workflows.",
                    bodyPara: "Select an entry from the ledger to review specifications, deployment endpoints, and technical documentation."
                }} />

                {/* Ledger + Spec Sheet Frame */}
                <div className="border border-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12 bg-[#F5F2EB]">

                    {/* Left: Project Ledger List */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]">
                        <div className="p-6 border-b border-[#1A1A1A]/15 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[#7A5C43]">
                            <span>Register // 03</span>
                            <span>Available [{projects.length}]</span>
                        </div>

                        <div className="divide-y divide-[#1A1A1A]/15">
                            {projects.map((project) => {
                                const isSelected = activeProject.id === project.id;
                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => setActiveProject(project)}
                                        className={`w-full text-left p-8 sm:p-10 transition-colors duration-200 flex flex-col justify-between group cursor-pointer ${isSelected ? "bg-[#EDE8DC]" : "hover:bg-[#EDE8DC]/50"
                                            }`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-baseline mb-4">
                                                <span className="font-mono text-xs text-[#E27D60] tracking-widest">
                                                    PROJECT // {project.index}
                                                </span>
                                                <span className="font-mono text-[11px] text-[#999] uppercase">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] group-hover:text-[#7A5C43] transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10 flex justify-between items-center font-mono text-xs text-[#666]">
                                            <span className="truncate max-w-[200px]">
                                                {project.stack.slice(0, 2).join(" · ")}
                                            </span>
                                            <span className={`transition-transform duration-200 ${isSelected ? "translate-x-1 text-[#1A1A1A]" : "text-[#999]"}`}>
                                                →
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Selected Project Dossier */}
                    <div className="lg:col-span-7 p-8 sm:p-12 relative flex flex-col justify-between bg-[#FAF8F5]">
                        <div>
                            {/* Dossier Header */}
                            <div className="flex justify-between items-start font-mono text-[10px] text-[#999] uppercase tracking-widest border-b border-[#1A1A1A]/10 pb-4 mb-8">
                                <span>SPEC SHEET : ID-{activeProject.index}</span>
                                <span className="text-[#E27D60]">STATUS: VERIFIED</span>
                            </div>

                            {/* Title & Category */}
                            <span className="font-mono text-xs text-[#7A5C43] uppercase tracking-widest block mb-2">
                                {activeProject.category}
                            </span>
                            <h3 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] mb-6">
                                {activeProject.title}
                            </h3>

                            {/* Summary Description */}
                            <p className="text-base sm:text-lg text-[#444] font-serif leading-relaxed mb-10 border-l-2 border-[#1A1A1A] pl-6">
                                {activeProject.summary}
                            </p>

                            {/* Tech Stack Chips */}
                            <div className="mb-10">
                                <span className="block font-mono text-xs uppercase tracking-widest text-[#7A5C43] mb-4">
                                    Technologies Deployed
                                </span>
                                <div className="flex flex-wrap gap-2 font-mono text-xs">
                                    {activeProject.stack.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1.5 border border-[#1A1A1A]/30 text-[#1A1A1A] bg-[#F5F2EB]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Metric Metadata */}
                            <div className="border-t border-[#1A1A1A]/10 pt-6 grid grid-cols-2 gap-6 font-mono text-xs">
                                {activeProject.metrics.map((metric) => (
                                    <div key={metric.label}>
                                        <span className="block text-[#999] uppercase text-[10px] mb-1">
                                            {metric.label}
                                        </span>
                                        <span className="text-base text-[#1A1A1A]">
                                            {metric.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Links */}
                        <div className="border-t border-[#1A1A1A]/15 pt-8 mt-12 flex flex-wrap items-center justify-between gap-4">
                            <div className="font-mono text-xs text-[#7A5C43]">
                                <span>TRANS-INDEX : //0{activeProject.index}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {activeProject.sourceUrl && (
                                    <a
                                        href={activeProject.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3.5 border border-[#1A1A1A] font-mono text-xs uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EDE8DC] transition-colors"
                                    >
                                        Source Code
                                    </a>
                                )}
                                {activeProject.liveUrl && (
                                    <a
                                        href={activeProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-[#F5F2EB] font-mono text-xs uppercase tracking-widest hover:bg-[#E27D60] transition-colors duration-300"
                                    >
                                        <span>Launch Tool</span>
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                                            ↗
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
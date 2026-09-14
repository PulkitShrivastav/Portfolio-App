import { useState } from "react"
import { Card, type CardData } from "./aboutMeCards"
import Header from "./head"

const CARDS_DATA: CardData[] = [
    {
        id: "sec-01",
        index: "SEC // 01",
        subHeading: "Architecture",
        heading: "Frameworks & Runtime",
        headline: "System platforms, execution environments, and dynamic runtime engines.",
        values: [
            { title: "Node.js", subtitle: "Runtime" },
            { title: "React", subtitle: "Engine" },
            { title: "Angular", subtitle: "SPA" },
            { title: "Express", subtitle: "HTTP" },
        ],
    },
    {
        id: "sec-02",
        index: "SEC // 02",
        subHeading: "Principles",
        heading: "Skills",
        headline: "Architectural patterns, mathematical rigor, and engineering methods.",
        values: [
            { title: "UI Engineering", subtitle: "Polished" },
            { title: "Full Stack Development", subtitle: "Autonomous" },
            { title: "API Design", subtitle: "Idiomatic" },
            { title: "System Design", subtitle: "Resilient" },
            { title: "Database Design", subtitle: "Normalized" },
            { title: "Deployment", subtitle: "Automated" },
        ],
    },
    {
        id: "sec-03",
        index: "SEC // 03",
        subHeading: "Utensils",
        heading: "Libraries & Tools",
        headline: "Motion libraries, compilation chains, and precision development toolkits.",
        values: [
            { title: "Tailwind CSS", subtitle: "Design System" },
            { title: "GSAP", subtitle: "Kinetic Motion" },
            { title: "Monaco Editor", subtitle: "Tooling" },
            { title: "Nivo Charts", subtitle: "Visualizations" },
            { title: "Prisma", subtitle: "Persistence" },
            { title: "Zod", subtitle: "Contracts" },
            { title: "Docker", subtitle: "Runtime" },
        ],
    },
]

const AboutMeSec = () => {
    const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null)

    const handleToggle = (id: string) => {
        const isMobile = () => window.innerWidth < 768
        if (isMobile()) setActiveMobileCard((prev) => (prev === id ? null : id))
    }

    return (
        <section
            id="about"
            className="min-h-screen bg-[#F5F2EB] text-[#1A1A1A] py-20 sm:py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden font-sans selection:bg-[#E27D60] selection:text-white"
        >
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                <Header head={{
                    volume: '[ Volume 01 : Portfolio ]',
                    headline: 'Discipline & Craft',
                    index: 'Index — 01'
                }} body={{
                    title: 'Origin & Narrative',
                    feature1: 'About',
                    feature2: 'Myself.',
                    headPara: 'Engineering gave me the rigor; software gave me the leverage to create at scale.',
                    bodyPara: 'I build out of a curiosity for the mechanics beneath the surface. From rough ideas to clean execution, I turn technical challenges and persistent “what ifs?” into purposeful, working tools.'
                }} />



                {/* Card Grid: Stacked border-collapsing on mobile, 3-column on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-collapse md:border-b border-[#1A1A1A]">
                    {CARDS_DATA.map((card) => (
                        <Card
                            key={card.id}
                            data={card}
                            isOpen={activeMobileCard === card.id}
                            onToggle={() => handleToggle(card.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutMeSec
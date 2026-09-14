import { useRef, useEffect } from "react"
import gsap from "gsap"

export type CardData = {
    id: string
    index: string
    subHeading: string
    headline: string
    heading: string
    values: Array<{ title: string; subtitle: string }>
}

type CardProps = {
    data: CardData
    isOpen: boolean
    onToggle: () => void
}

export const Card = ({ data, isOpen, onToggle }: CardProps) => {
    const cardShellRef = useRef<HTMLDivElement | null>(null)
    const innerContentRef = useRef<HTMLDivElement | null>(null)
    const drawerRef = useRef<HTMLDivElement | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null)
    const iconRef = useRef<HTMLSpanElement | null>(null)

    // Track viewport mode without layout thrashing
    const isMobile = () => window.innerWidth < 768

    // Desktop Hover Expand
    const handleMouseEnter = () => {
        if (isMobile()) return

        const listH = listRef.current?.offsetHeight ?? 0
        const mainH = innerContentRef.current?.offsetHeight ?? 0
        const travel = Math.floor((mainH + listH) / 6) // Smooth lift

        gsap.killTweensOf([innerContentRef.current, drawerRef.current])

        gsap.to(innerContentRef.current, {
            y: -travel,
            duration: 0.5,
            ease: "power3.out",
            boxShadow: "0 20px 30px -10px rgba(26, 26, 26, 0.08)",
        })

        gsap.to(drawerRef.current, {
            height: listH,
            duration: 0.5,
            ease: "power3.out",
        })

        if (listRef.current) {
            gsap.fromTo(
                listRef.current.children,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power2.out", delay: 0.1 }
            )
        }
    }

    // Desktop Hover Collapse
    const handleMouseLeave = () => {
        if (isMobile()) return

        gsap.killTweensOf([innerContentRef.current, drawerRef.current])

        gsap.to(innerContentRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.inOut",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
        })

        gsap.to(drawerRef.current, {
            height: 0,
            duration: 0.35,
            ease: "power2.inOut",
        })
    }

    // Mobile Accordion Controlled Animation
    useEffect(() => {
        if (!isMobile()) return

        const listH = listRef.current?.offsetHeight ?? 0

        if (isOpen) {
            gsap.to(drawerRef.current, {
                height: listH,
                duration: 0.4,
                ease: "power3.out",
            })

            gsap.to(iconRef.current, {
                rotation: 45,
                duration: 0.3,
                ease: "power2.out",
            })

            if (listRef.current) {
                gsap.fromTo(
                    listRef.current.children,
                    { opacity: 0, x: -6 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.03, ease: "power2.out", delay: 0.05 }
                )
            }
        } else {
            gsap.to(drawerRef.current, {
                height: 0,
                duration: 0.3,
                ease: "power2.inOut",
            })

            gsap.to(iconRef.current, {
                rotation: 0,
                duration: 0.3,
                ease: "power2.inOut",
            })
        }
    }, [isOpen])

    return (
        <div
            ref={cardShellRef}
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
            onClick={onToggle}
            className="relative cursor-pointer md:cursor-default border-b border-[#1A1A1A] md:border-b-0"
        >
            {/* Animated Inner Container */}
            <div
                ref={innerContentRef}
                className={`p-6 sm:p-8 md:p-10 flex flex-col transition-colors duration-300 ${isOpen ? "bg-[#EDE8DC]" : "bg-transparent md:hover:bg-[#EDE8DC]"
                    }`}
            >
                {/* Card Header & Metadata */}
                <div>
                    <div className="flex justify-between items-baseline mb-6 md:mb-8">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#E27D60] tracking-widest font-semibold">
                                {data.index}
                            </span>
                            {/* Mobile Indicator Toggle */}
                            <span
                                ref={iconRef}
                                className="inline-block md:hidden font-mono text-xs text-[#1A1A1A] font-bold origin-center"
                            >
                                +
                            </span>
                        </div>
                        <span className="text-[11px] md:text-xs font-mono text-[#999] uppercase tracking-wider">
                            {data.subHeading}
                        </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-3">
                        {data.heading}
                    </h2>

                    <p className="text-xs text-[#666] leading-relaxed mb-6 md:mb-10">
                        {data.headline}
                    </p>
                </div>

                {/* Dynamic Drawer Component */}
                <div ref={drawerRef} className="h-0 overflow-hidden">
                    <ul
                        ref={listRef}
                        className="space-y-2 border-t border-[#1A1A1A]/10 pt-5 md:pt-6 font-mono text-xs text-[#333]"
                    >
                        {data.values.map((v, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center py-1 border-b border-[#1A1A1A]/5 pb-1"
                            >
                                <span className="font-medium">{v.title}</span>
                                <span className="text-[#999] text-[11px]">{v.subtitle}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useRef } from "react"
import gsap from "gsap"

type ListElemProps = {
    label: string
    navLabels: string[]
    setActive: (value: string) => void
    activeSec: string
}
const ListElement = ({ ...props }: ListElemProps) => {

    const liRef = useRef<HTMLLIElement | null>(null)

    return (
        <li
            ref={liRef}
            onClick={() => props.setActive(props.label)}
            className={`group relative flex items-center justify-between w-full px-4 py-3 min-h-[44px] sm:min-h-0 
        font-mono text-xs uppercase tracking-widest cursor-pointer select-none transition-all duration-200 
        border-b border-[#1A1A1A]/10
        ${props.activeSec === props.label
                    ? "text-[#1A1A1A] bg-[#EDE8DC] font-medium"
                    : "text-[#666666] hover:text-[#1A1A1A] hover:bg-[#EDE8DC]/50"
                }`}
        >
            {/* Left accent marker (sharp terracotta block) */}
            <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#E27D60] transition-opacity duration-200 
                    ${props.activeSec === props.label ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Label */}
            <span className="pl-3 sm:pl-2 whitespace-nowrap">
                {props.label}
            </span>
        </li>
    )
}

export default ListElement
import { PSIcon } from "../icons"
import ListElement from "./listElem"

const NavElement = ({ setActive, activeSec, navLabels }: { setActive: (value: string) => void, activeSec: string, navLabels: string[] }) => {

    return (
        <header className="fixed top-0 left-0 z-50 w-full px-6 sm:px-12 lg:px-20 py-4 
        md:flex md:items-center md:justify-between bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#1A1A1A]/15">
            <div className="flex items-center gap-4 group cursor-pointer"
                onClick={() => setActive(navLabels[0])}>
                <div className="w-9 h-9 border border-[#1A1A1A] bg-[#FAF8F5] flex items-center justify-center p-1.5 shadow-[2px_2px_0px_#1A1A1A] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                    <PSIcon />
                </div>

                <div className="flex flex-col">
                    <h1 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] leading-tight">
                        Pulkit Shrivastav
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5 font-mono text-[9px] tracking-widest text-[#7A5C43]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E27D60]" />
                        <span>SYS.ARCH // PORTFOLIO</span>
                    </div>
                </div>
            </div>

            <nav className="relative mt-4 md:mt-0 w-full lg:w-[50vw]">
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {navLabels.map((li, indx) => (
                        <ListElement
                            key={indx}
                            activeSec={activeSec}
                            navLabels={navLabels}
                            label={li}
                            setActive={setActive}
                        />
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default NavElement
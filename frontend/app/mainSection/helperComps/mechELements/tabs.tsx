type Props = {

    setActiveComponent: React.Dispatch<React.SetStateAction<string>>
    logEvent: (value: string) => void
    activeComponent: string
}

const Tabs = ({ ...props }: Props) => {
    return (
        <div className="flex border-t border-l border-r border-[#1A1A1A] font-mono text-xs uppercase tracking-widest">
            <button
                onClick={() => {
                    props.setActiveComponent("button");
                    props.logEvent("STAGE -> SWITCH_MECH_BUTTON");
                }}
                className={`flex-1 py-4 px-6 text-left border-r border-[#1A1A1A] transition-colors cursor-pointer
                    ${props.activeComponent === "button" ? "bg-[#1A1A1A] text-[#F5F2EB]"
                        : "bg-transparent text-[#1A1A1A] hover:bg-[#EDE8DC]"
                    }`}
            >
                01 // MechButton Primitive
            </button>
            <button
                onClick={() => {
                    props.setActiveComponent("input");
                    props.logEvent("STAGE -> SWITCH_MECH_INPUT");
                }}
                className={`flex-1 py-4 px-6 text-left transition-colors cursor-pointer 
                    ${props.activeComponent === "input" ? "bg-[#1A1A1A] text-[#F5F2EB]"
                        : "bg-transparent text-[#1A1A1A] hover:bg-[#EDE8DC]"
                    }`}
            >
                02 // MechInput Primitive
            </button>
        </div>
    )
}


export default Tabs
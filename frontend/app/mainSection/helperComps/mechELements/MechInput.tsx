import { useMechElemCntx } from "./useMechContext"


const MechInput = () => {

    const CNTX = useMechElemCntx()

    return (
        <div className="space-y-6 font-mono text-xs">
            <div>
                <label className="block text-[#7A5C43] uppercase mb-2">Field Label</label>
                <input
                    type="text"
                    value={CNTX.inputLabel}
                    onChange={(e) => CNTX.setInputLabel(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/30 pb-1 text-[#1A1A1A] focus:outline-none focus:border-[#E27D60] rounded-none"
                />
            </div>
            <div>
                <label className="block text-[#7A5C43] uppercase mb-2">Placeholder</label>
                <input
                    type="text"
                    value={CNTX.inputPlaceholder}
                    onChange={(e) => CNTX.setInputPlaceholder(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/30 pb-1 text-[#1A1A1A] focus:outline-none focus:border-[#E27D60] rounded-none"
                />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/10">
                <span className="text-[#7A5C43] uppercase">Simulate Error</span>
                <button
                    onClick={() => CNTX.setInputError(!CNTX.inputError)}
                    className={`px-3 py-1 border border-[#1A1A1A] cursor-pointer 
                        ${CNTX.inputError ? "bg-[#E27D60] text-white border-[#E27D60]" : "bg-transparent text-[#1A1A1A]"
                        }`}
                >
                    {CNTX.inputError ? "ACTIVE" : "CLEARED"}
                </button>
            </div>
        </div>
    )
}

export default MechInput
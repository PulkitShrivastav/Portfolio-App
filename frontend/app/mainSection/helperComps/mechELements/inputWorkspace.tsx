import { useMechElemCntx } from "./useMechContext"


const InputWorkspace = () => {

    const CNTX = useMechElemCntx()

    return (
        <div className="w-full max-w-sm flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-widest text-[#7A5C43] flex justify-between">
                <span>{CNTX.inputLabel}</span>
                {CNTX.inputError && <span className="text-[#E27D60]">Invalid entry</span>}
            </label>
            <input
                type="text"
                value={CNTX.inputValue}
                placeholder={CNTX.inputPlaceholder}
                onChange={(e) => CNTX.setInputValue(e.target.value)}
                className={`bg-transparent border-b pb-2 text-base text-[#1A1A1A] placeholder-[#999] focus:outline-none transition-colors rounded-none font-mono 
                    ${CNTX.inputError
                        ? "border-[#E27D60] text-[#E27D60]"
                        : "border-[#1A1A1A]/30 focus:border-[#1A1A1A]"
                    }`}
            />
            <span className="font-mono text-[10px] text-[#999] tracking-widest uppercase mt-3 text-center">
                [ Value: &quot;{CNTX.inputValue}&quot; ]
            </span>
        </div>
    )
}

export default InputWorkspace
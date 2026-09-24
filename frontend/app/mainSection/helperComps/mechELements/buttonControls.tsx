import { AnimeSec, InputTolerances, LoadSec, StateInterlockSec } from "./buttonUtils";
import { useMechElemCntx } from "./useMechContext";
import { Dropdown, Slider, StyledButton, TextInput } from "./utils";



const ButtonControls = () => {
    const CNTX = useMechElemCntx()

    return (
        <>
            <div className="p-8">
                <div className="flex justify-between items-baseline mb-6">
                    <span className="font-mono text-xs text-[#E27D60] tracking-widest">
                        CALIBRATE // {CNTX.activeComponent === "button"
                            ? "BTN_01" : "INP_02"}
                    </span>
                    <span className="text-xs font-mono text-[#999] uppercase">
                        Parameters
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">
                    {CNTX.activeComponent === "button"
                        ? "Button Rig Controls" : "Input Spec Sheet"}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed mb-6">
                    Adjust tolerances, lifecycle hooks, and animation easing parameters.
                </p>
                <div className="space-y-5 font-mono text-xs max-h-[400px] scroll-container
         overflow-y-auto pr-1 ">

                    <TextInput label="Loading Message"
                        value={CNTX.loaderMessage} setValue={
                            (val) => CNTX.isLoading ? null : CNTX.setLoaderMessage(val)
                        } />

                    <LoadSec />

                    <AnimeSec />

                    <InputTolerances />

                    <StateInterlockSec />
                </div>
                <div className="mt-8 border-t border-[#1A1A1A]/10 pt-3 font-mono text-[10px] text-[#7A5C43]">
                    <span className="block uppercase text-[#999] mb-1">Bench Telemetry:</span>
                    <div className="bg-[#EDE8DC]/50 p-2 border border-[#1A1A1A]/10 text-[#1A1A1A] truncate font-mono">
                        {CNTX.telemetry}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtonControls
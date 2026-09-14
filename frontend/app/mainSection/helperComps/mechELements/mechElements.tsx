
import Tabs from "./tabs";
import { MechElemCntx, useMechElemCntx } from "./useMechContext";
import ButtonControls from "./buttonControls";
import MechInput from "./MechInput";
import ButtonWorkspace from "./buttonWorkspace";
import InputWorkspace from "./inputWorkspace";
import { StyledButton } from "./utils";
import Header from "../head";

const MechElements = () => {

    const CNTX = useMechElemCntx()

    return (
        <section
            id="mechelements"
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
                    volume: "[ Volume 02 : MechElements ]",
                    headline: "UI Library & Runtime Workbench",
                    index: "Index — 02",
                }} body={{
                    title: 'Design System Primitives',
                    feature1: 'Component',
                    feature2: 'Studio.',
                    headPara: 'Tactile testing bench for interactive primitives. Calibrate component props, trigger lifecycle states, and fine-tune animation physics in real time.',
                    bodyPara: 'Toggle between the component blueprints below. Mutate physical dimensions, animation timings, and telemetry parameters directly within the live stage.'
                }}
                />

                <Tabs setActiveComponent={CNTX.setActiveComponent}
                    activeComponent={CNTX.activeComponent}
                    logEvent={(value) => CNTX.logEvent(value)} />

                {/* Studio Workspace */}
                <div className="border border-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12 bg-[#F5F2EB]">
                    {/* Left: Calibration Instrumentation Panel */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] p-8 sm:p-10 flex flex-col justify-between">
                        <div>
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

                            {CNTX.activeComponent === "button" ? <ButtonControls /> : <MechInput />}
                        </div>

                        {/* Telemetry Readout */}
                        <div className="mt-8 border-t border-[#1A1A1A]/10 pt-3 font-mono text-[10px] text-[#7A5C43]">
                            <span className="block uppercase text-[#999] mb-1">Bench Telemetry:</span>
                            <div className="bg-[#EDE8DC]/50 p-2 border border-[#1A1A1A]/10 text-[#1A1A1A] truncate font-mono">
                                {CNTX.telemetry}
                            </div>
                        </div>
                    </div>

                    {/* Right: The Workbench Calibration Stage */}
                    <div className="lg:col-span-7 p-8 sm:p-12 relative flex flex-col justify-between bg-[#FAF8F5]">
                        <div className="flex justify-between items-center font-mono text-[10px] text-[#999] uppercase tracking-widest border-b border-[#1A1A1A]/10 pb-4">
                            <span>RIG // ACTIVE STAGE</span>
                            <span className="text-[#E27D60]">STATUS: CALIBRATED</span>
                        </div>

                        {/* Visual Stage Area */}
                        <div className="my-16 flex flex-col items-center justify-center min-h-[340px] w-full relative border border-dashed border-[#1A1A1A]/20 p-8">
                            <div className="absolute top-2 left-2 font-mono text-[9px] text-[#999]">
                                SCALE: 1.0 // {24 * 2}PX_SPAN
                            </div>

                            <div className="w-[150px] absolute top-3 right-3">
                                <StyledButton label="" parameter={!CNTX.buttonAlive}
                                    trueValue="RESTORE" falseValue="RESTORE"
                                    onClick={() => !CNTX.buttonAlive ? setTimeout(() => CNTX.setButtonAlive(true), 20) : null}
                                />
                            </div>

                            {CNTX.activeComponent === "button"
                                ? (CNTX.buttonAlive ? <ButtonWorkspace /> : null)
                                : <InputWorkspace />}
                        </div>

                        {/* Source Specification Footer */}
                        <div className="border-t border-[#1A1A1A]/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#7A5C43]">
                            <span className="truncate max-w-md text-[11px]">
                                {CNTX.activeComponent === "button"
                                    ? `<MechButton loaderType="${CNTX.loaderType}" loaderTimer="${CNTX.timerSeconds}" 
                                        animeClick="${CNTX.btnClickAnime}" 
                                        wobble={${CNTX.iconWobbleIntensity}} />`
                                    : `<MechInput label="${CNTX.inputLabel}" placeholder="${CNTX.inputPlaceholder}" error={${CNTX.inputError}} />`}
                            </span>
                            <span className="text-[#999] text-[10px] uppercase">Telemetry Synced</span>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}

const MechElementSec = () => {
    return (
        <MechElemCntx>
            <MechElements />
        </MechElemCntx>
    )
}

export default MechElementSec
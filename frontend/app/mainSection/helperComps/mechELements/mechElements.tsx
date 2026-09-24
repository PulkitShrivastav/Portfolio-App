
import Tabs from "./tabs";
import { MechElemCntx, useMechElemCntx } from "./useMechContext";
import ButtonControls from "./buttonControls";
import MechInput from "./MechInputControls";
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
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col justify-between">
                        <div>
                            {CNTX.activeComponent === "button" ? <ButtonControls /> : <MechInput />}
                        </div>
                    </div>

                    {CNTX.activeComponent === "button"
                        ? (CNTX.buttonAlive ? <ButtonWorkspace /> : null)
                        : <InputWorkspace />}
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
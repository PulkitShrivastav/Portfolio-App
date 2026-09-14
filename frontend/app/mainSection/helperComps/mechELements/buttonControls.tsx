import { AnimeSec, InputTolerances, LoadSec, StateInterlockSec } from "./buttonUtils";
import { useMechElemCntx } from "./useMechContext";
import { Dropdown, Slider, StyledButton, TextInput } from "./utils";



const ButtonControls = () => {
    const CNTX = useMechElemCntx()

    return (
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
    )
}

export default ButtonControls
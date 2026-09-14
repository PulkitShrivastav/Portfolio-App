import type { AnimeTypes } from "./MechButton/MainButton";
import MechButton, { type AllowedSpecialChar, type AllowedCharFormat, type AnimationTypes, type MechButtonStyles } from "./MechButton/MechButton";
import type { ButtonClickAnime, ButtonHoverAnime, CloseIconAnime, IconClickWobble, LoaderTypes, OnRemoveAnime, ToolTipAnime } from "./MechButton/myTypes";
import { useMechElemCntx } from "./useMechContext";


const ButtonWorkspace = () => {

    const CNTX = useMechElemCntx()

    const buttonCustomStyles: MechButtonStyles = {
        fontFamily: "ui-monospace, monospace",
        fontSize: "13px",
        fontWeight: 600,
        paddingX: `24px`,
        paddingY: `10px`,
        borderRadius: "0px",
        bgColor: "#1A1A1A",
        fontColor: "#F5F2EB",
        hoverBgColor: "#333333",
        hoverFontColor: '#E27D60', //"#F5F2EB",
        closeIconColor: "#999999",
        hoverCloseIconColor: "#E27D60",
        focusColor: "#E27D60",
        toolTipBgColor: "#1A1A1A",
        toolTipFontColor: "#F5F2EB",
        toolTipBorderColor: "#1A1A1A",
        toolTipBorderSize: 1,
        toolTipBorderRadius: "0px",
        toolTipFontSize: "10px",
        disableMssgBgColor: "#E27D60",
        disableMssgFontColor: "#FFFFFF",
        disableMssgBorderRadius: "0px",
        disableMssgFontSize: "10px",
    }

    const activeAnimations: AnimationTypes = {
        onButtonClick: CNTX.btnClickAnime as ButtonClickAnime,
        onButtonHover: CNTX.btnHoverAnime as ButtonHoverAnime,
        onIconHover: CNTX.iconHoverAnime as CloseIconAnime,
        onRemove: CNTX.iconRemoveAnime as OnRemoveAnime,
        onIconClick: `wobble-[${CNTX.iconWobbleIntensity}]` as IconClickWobble,
        toolTipAnime: CNTX.tltpAnime as ToolTipAnime
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <MechButton
                label="MechE/Techy ❤️"
                styles={buttonCustomStyles}
                enableEdit={CNTX.enableEdit}
                enableRemove={CNTX.enableRemove}
                disabled={CNTX.disabled}
                disabledMessage="Interlock engaged. Action locked."
                isLoading={CNTX.isLoading}
                loaderType={CNTX.loaderType as LoaderTypes}
                loaderTimer={`00:${CNTX.timerSeconds}`}
                loaderMessage={CNTX.loaderMessage}
                loaderTimerStopped={() => {
                    CNTX.setIsLoading(false);
                    CNTX.logEvent("LOADER_TIMER: Expired -> Set Idle");
                }}
                allowedChars={{
                    emoji: CNTX.allowEmoji,
                    space: CNTX.allowSpace,
                    format: CNTX.labelFormat as AllowedCharFormat,
                    specialChars: CNTX.specialChars as AllowedSpecialChar
                }}
                maxChars={CNTX.charCapacity}
                animations={activeAnimations as AnimeTypes}
                onClick={() => CNTX.logEvent("DISPATCH: onClick() fired")}
                onSubmit={(next, old) => CNTX.logEvent(`MUTATION: "${old}" -> "${next}"`)}
                onRemove={() => {
                    CNTX.logEvent("PURGE: onRemove() icon triggered")
                    setTimeout(() => CNTX.setButtonAlive(false), 20)
                }}
                clickedDisable={() => CNTX.logEvent("INTERLOCK: Action rejected")}
                showToolTip={CNTX.showTtlp}
                toolTipMssg={{
                    onLabel: "double click to rename",
                    onRemove: "purge button",
                }}
            />
            <span className="font-mono text-[10px] text-[#7A5C43] tracking-widest uppercase mt-4">
                {CNTX.enableEdit ? "[ DOUBLE-CLICK TO MUTATE LABEL ]" : "[ TACTILE TRIGGER MODE ]"}
            </span>
        </div>
    )
}

export default ButtonWorkspace
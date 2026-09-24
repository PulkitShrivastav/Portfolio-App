import type { AnimeTypes } from "./MechButton/MainButton";
import MechButton, { type AllowedSpecialChar, type AllowedCharFormat, type AnimationTypes, type MechButtonStyles } from "./MechButton/MechButton";
import type { ButtonClickAnime, ButtonHoverAnime, CloseIconAnime, IconClickWobble, LoaderTypes, OnRemoveAnime, ToolTipAnime } from "./MechButton/myTypes";
import { useMechElemCntx } from "./useMechContext";
import { StyledButton } from "./utils";


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
        floaterIconColor: "#d49f4f", // Matches your card/icon box surface
        floaterIconSize: "22px",
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
    )
}

export default ButtonWorkspace
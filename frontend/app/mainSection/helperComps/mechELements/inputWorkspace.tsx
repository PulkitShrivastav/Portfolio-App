import { useRef } from "react";
import { useMechElemCntx } from "./useMechContext"
import type { MechInputRef, MechInputStyles, MechLabelAnime } from "./MechInput/MechInput";
import MechInput from "./MechInput/MechInput";


const InputWorkspace = () => {

    const CNTX = useMechElemCntx()

    const mechInputStyles: MechInputStyles = {
        bgColor: "#FAF8F5",
        baseColor: "#1A1A1A",
        errorColor: "#e25933",
        warningColor: "#D97706",
        successColor: "#2D6A4F",
        borderSize: 2,
        borderRadius: "0.8rem",
        paddingX: "0.75rem",
        paddingY: "0.625rem",
        width: "100%",
        fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "15px",
        fontWeight: 500,
        mssgfontSize: "11px",
    };

    const labelAnimations: MechLabelAnime = {
        backTravel: 35,
    };

    const handleFieldChange = (name: keyof typeof CNTX.formData, value: string) => {
        CNTX.setFormData((prev) => ({ ...prev, [name]: value }));
        CNTX.setTelemetry(
            `INPUT_MUTATION // FIELD: ${name.toUpperCase()} (LEN: ${value.length})`
        );
    };

    return (
        <div className="lg:col-span-7 p-8 sm:p-12 relative flex flex-col justify-between bg-[#FAF8F5]">
            <div className="flex justify-between items-center font-mono text-[10px] text-[#999] uppercase tracking-widest border-b border-[#1A1A1A]/10 pb-4">
                <span>ACTIVE STAGE // REGISTRATION_MATRIX</span>
                <span className="text-[#E27D60]">STATUS: MOUNTED</span>
            </div>

            <div className="my-10 flex flex-col items-center justify-center w-full relative border border-dashed border-[#1A1A1A]/20 p-6 sm:p-10">
                <div className="absolute top-2 left-2 font-mono text-[9px] text-[#999]">
                    SCALE: 1.0 // 480PX_MAX
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md space-y-7 pt-4">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                        <span className="font-mono text-[10px] text-[#999] uppercase tracking-wider">
                            Payload Metadata
                        </span>
                        <h3 className="font-serif text-lg text-[#1A1A1A]">
                            Operator Identification
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-[3rem]">
                        {/* Alphabetic */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.alphabeticRef}
                                label="Alphabetic"
                                type="alphabetic"
                                maxChars={24}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("alphabetic", e.target.value)
                                }
                            />
                        </div>

                        {/* Numeric */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.numericRef}
                                label="Numeric"
                                type="numeric"
                                maxChars={24}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("numeric", e.target.value)
                                }
                            />
                        </div>

                        {/* Password with Strength */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.passStrengthRef}
                                label="Password"
                                type="password"
                                placeholder="STRENGTH: ONN"
                                minChars={8}
                                maxChars={32}
                                withStrength={true}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("passwordStrength", e.target.value)
                                }
                            />
                        </div>

                        {/* Password without Strength */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.passNoStrengthRef}
                                label="Password"
                                placeholder="STRENGTH: OFF"
                                type="password"
                                withStrength={false}
                                minChars={8}
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("passwordNoStrength", e.target.value)
                                }
                            />
                        </div>

                        {/* Alphanumeric */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.alphanumericRef}
                                label="Alphanumeric"
                                type="alphanumeric"
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("alphanumeric", e.target.value)
                                }
                            />
                        </div>

                        {/* Email or Username */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.emailUsernameRef}
                                label="Email/Username"
                                type="email or username"
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("emailOrUsername", e.target.value)
                                }
                            />
                        </div>

                        {/* Email */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.emailRef}
                                label="Email"
                                type="email"
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("email", e.target.value)
                                }
                            />
                        </div>

                        {/* Username */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.usernameRef}
                                label="Username"
                                type="username"
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("username", e.target.value)
                                }
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.confirmPassRef}
                                label="Confirm Password"
                                type="confirm password"
                                maxChars={32}
                                toggleHidden={false}
                                matchValue={CNTX.formData.passwordStrength}
                                styles={mechInputStyles}
                                labelAnimeFactors={{
                                    backTravel: 50,
                                    shrinkFactor: 0.9
                                }}
                                onChange={(e) =>
                                    handleFieldChange("confirmPassword", e.target.value)
                                }
                            />
                        </div>

                        {/* Custom */}
                        <div className="w-full">
                            <MechInput
                                ref={CNTX.customInputRef}
                                label="Custom"
                                type="custom"
                                maxChars={32}
                                styles={mechInputStyles}
                                labelAnimeFactors={labelAnimations}
                                onChange={(e) =>
                                    handleFieldChange("custom", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Imperative Testing Controls for Custom Element */}
                    <div className="w-full mt-6 pt-4 border-t border-[#1A1A1A]/10 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#999] uppercase tracking-wider mb-1">
                            <span>TARGET // CUSTOM_ELEMENT</span>
                            <span className="text-[#E27D60]">IMPERATIVE RIG</span>
                        </div>

                        {/* Row 1: Kinematic Oscillations */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    CNTX.customInputRef.current?.target?.focus()
                                    setTimeout(() => CNTX.customInputRef.current?.shake(
                                        "ERR // KINEMATIC_OSCILLATION_TRIGGERED",
                                        true
                                    ), 600)
                                    CNTX.setTelemetry("MANUAL_OVERRIDE // TRIGGER: SHAKE");
                                }}
                                className="font-mono text-xs uppercase tracking-wider py-2.5 px-3 border border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-[#E27D60] hover:border-[#E27D60] transition-colors relative shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                Shake
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    CNTX.customInputRef.current?.target?.focus()
                                    setTimeout(() => CNTX.customInputRef.current?.wrongValue(
                                        "ERR // INVALID_BIT_STREAM"
                                    ), 600)
                                    CNTX.setTelemetry(
                                        "MANUAL_OVERRIDE // TRIGGER: WRONG_VALUE"
                                    );
                                }}
                                className="font-mono text-xs uppercase tracking-wider py-2.5 px-3 border border-[#1A1A1A] bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#EDE8DC] hover:border-[#1A1A1A] transition-colors relative shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                Wrong Value
                            </button>
                        </div>

                        {/* Row 2: Discrete State Injections */}
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    CNTX.customInputRef.current?.target?.focus()
                                    setTimeout(() => CNTX.customInputRef.current?.setState("error", {
                                        hideMessage: false,
                                        message: "ERR // FAULT_VECTOR_0x01",
                                    }), 600)
                                    CNTX.setTelemetry("MANUAL_OVERRIDE // STATE: ERROR");
                                }}
                                className="font-mono text-xs uppercase tracking-wider py-2 px-2 border border-[#e25933]/50 bg-[#e25933]/10 text-[#e25933] hover:bg-[#e25933] hover:text-white transition-colors relative shadow-[1px_1px_0px_rgba(0,0,0,0.1)] active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                SetState(error)
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    CNTX.customInputRef.current?.target?.focus()
                                    setTimeout(() => CNTX.customInputRef.current?.setState("warning", {
                                        hideMessage: false,
                                        message: "WARN // VOLTAGE_DRIFT_0x02",
                                    }), 600)
                                    CNTX.setTelemetry("MANUAL_OVERRIDE // STATE: WARNING");
                                }}
                                className="font-mono text-xs uppercase tracking-wider py-2 px-2 border border-[#D97706]/50 bg-[#D97706]/10 text-[#D97706] hover:bg-[#D97706] hover:text-white transition-colors relative shadow-[1px_1px_0px_rgba(0,0,0,0.1)] active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                SetState(warning)
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    CNTX.customInputRef.current?.target?.focus()
                                    setTimeout(() => CNTX.customInputRef.current?.setState("success", {
                                        hideMessage: false,
                                        message: "✓ SYSTEM_NOMINAL_0x00",
                                    }), 600)
                                    CNTX.setTelemetry("MANUAL_OVERRIDE // STATE: SUCCESS");
                                }}
                                className="font-mono text-xs uppercase tracking-wider py-2 px-2 border border-[#2D6A4F]/50 bg-[#2D6A4F]/10 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-colors relative shadow-[1px_1px_0px_rgba(0,0,0,0.1)] active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                SetState(success)
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Stage Spec Footer */}
            <div className="border-t border-[#1A1A1A]/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#7A5C43]">
                <span className="truncate max-w-md text-[11px]">
                    {`<MechInput styles={{ width: "100%" }} labelAnimeFactors={{ backTravel: 35 }} />`}
                </span>
                <span className="text-[#999] text-[10px] uppercase">
                    Telemetry Synced
                </span>
            </div>
        </div>
    )
}

export default InputWorkspace
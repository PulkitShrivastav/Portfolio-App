import { useMechElemCntx } from "./useMechContext"


const MechInput = () => {

    const CNTX = useMechElemCntx()

    return (
        <div className="lg:col-span-5 p-8 flex flex-col justify-between">
            <div className="space-y-6">
                {/* Specification Header */}
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="font-mono text-xs text-[#E27D60] tracking-widest uppercase">
                            CALIBERATE // INP_02
                        </span>
                        <span className="text-[10px] font-mono text-[#1A1A1A] px-1.5 py-0.5 border border-[#1A1A1A]/30 bg-[#FAF8F5]">
                            ARRAY: 10 NODES
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-tight">
                        Input Calibration Bench
                    </h2>
                    <p className="text-xs font-mono text-[#666] leading-relaxed mt-1">
                        Dynamic typing matrix evaluating alphanumeric constraints, dual-channel regex verification, password entropy algorithms, and custom fallback handlers.
                    </p>
                </div>

                {/* Section 1: Active Type Calibration Profiles */}
                <div className="border-t border-[#1A1A1A]/15 pt-4">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#999] uppercase tracking-wider mb-3">
                        <span>TYPE SCHEMA DISPATCH</span>
                        <span>BEHAVIOR & TELEMETRY</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                        <div className="p-2.5 border border-[#1A1A1A]/20 bg-[#FAF8F5] flex items-start gap-3">
                            <span className="text-[#E27D60] text-[10px] pt-0.5 font-bold">
                                01
                            </span>
                            <div>
                                <div className="text-[#1A1A1A] font-semibold text-[11px] uppercase tracking-wide">
                                    Lexical & Numeric Locks
                                </div>
                                <div className="text-[10px] text-[#666] leading-tight mt-0.5">
                                    Strict character whitelists (<code className="text-[#1A1A1A]">alphabetic</code> / <code className="text-[#1A1A1A]">numeric</code>) with instant caret rollback and shake vibration on illegal input mutation.
                                </div>
                            </div>
                        </div>

                        <div className="p-2.5 border border-[#1A1A1A]/20 bg-[#FAF8F5] flex items-start gap-3">
                            <span className="text-[#7A5C43] text-[10px] pt-0.5 font-bold">
                                02
                            </span>
                            <div>
                                <div className="text-[#1A1A1A] font-semibold text-[11px] uppercase tracking-wide">
                                    Entropy & Differential Obfuscation
                                </div>
                                <div className="text-[10px] text-[#666] leading-tight mt-0.5">
                                    Side-by-side password testing with multi-tier entropy scoring vs raw bypassed visibility (<code className="text-[#1A1A1A]">withStrength: false</code> / <code className="text-[#1A1A1A]">toggleHidden</code>).
                                </div>
                            </div>
                        </div>

                        <div className="p-2.5 border border-[#1A1A1A]/20 bg-[#FAF8F5] flex items-start gap-3">
                            <span className="text-[#2D6A4F] text-[10px] pt-0.5 font-bold">
                                03
                            </span>
                            <div>
                                <div className="text-[#1A1A1A] font-semibold text-[11px] uppercase tracking-wide">
                                    Dual-Route & Identity Verification
                                </div>
                                <div className="text-[10px] text-[#666] leading-tight mt-0.5">
                                    Autonomous branch routing (<code className="text-[#1A1A1A]">email or username</code>), strict RFC regex parsing, match synchronizers, and open <code className="text-[#1A1A1A]">custom</code> registers.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Rig Operational Parameters */}
                <div className="border-t border-[#1A1A1A]/15 pt-4">
                    <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider mb-2">
                        Operational Tolerances
                    </span>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                        <div className="border border-[#1A1A1A]/15 p-2 bg-[#FAF8F5]">
                            <span className="block text-[9px] text-[#999] uppercase">
                                Primary Lex Max
                            </span>
                            <span className="font-semibold text-[#1A1A1A]">
                                24 BYTES (COLS 1-2)
                            </span>
                        </div>
                        <div className="border border-[#1A1A1A]/15 p-2 bg-[#FAF8F5]">
                            <span className="block text-[9px] text-[#999] uppercase">
                                Buffer Ceiling
                            </span>
                            <span className="font-semibold text-[#1A1A1A]">
                                32 BYTES (NODES 3-10)
                            </span>
                        </div>
                        <div className="border border-[#1A1A1A]/15 p-2 bg-[#FAF8F5]">
                            <span className="block text-[9px] text-[#999] uppercase">
                                Entropy Threshold
                            </span>
                            <span className="font-semibold text-[#1A1A1A]">
                                8 CHARS // MIN
                            </span>
                        </div>
                        <div className="border border-[#1A1A1A]/15 p-2 bg-[#FAF8F5]">
                            <span className="block text-[9px] text-[#999] uppercase">
                                Label Translation
                            </span>
                            <span className="font-semibold text-[#1A1A1A]">
                                backTravel: 35px
                            </span>
                        </div>
                    </div>
                </div>

                {/* Section 3: Input Type Evaluation Matrix */}
                <div className="border-t border-[#1A1A1A]/15 pt-4">
                    <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider mb-2">
                        Type Validation Vectors
                    </span>
                    <div className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-1">
                            <span className="text-[#666]">ALPHABETIC // NUMERIC</span>
                            <span className="text-[#E27D60] font-semibold">
                                [ CHAR_FILTER_ACTIVE ]
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-1">
                            <span className="text-[#666]">PASSWORD // WITH_STRENGTH</span>
                            <span className="text-[#D97706] font-semibold">
                                [ 5-STAGE_SCALER ]
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-1">
                            <span className="text-[#666]">EMAIL_OR_USERNAME // HYBRID</span>
                            <span className="text-[#2D6A4F] font-semibold">
                                [ AUTO_SWITCH_PARSER ]
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[#666]">CUSTOM // UNRESTRICTED</span>
                            <span className="text-[#7A5C43] font-semibold">
                                [ BYPASS_ACTIVE ]
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Readouts & Memory Flush */}
            <div className="mt-8 border-t border-[#1A1A1A]/20 pt-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#999] uppercase">BENCH STATUS:</span>
                    <span className="text-[#2D6A4F] font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                        10_NODES_LIVE
                    </span>
                </div>

                <div className="bg-[#FAF8F5] p-2.5 border border-[#1A1A1A]/20 font-mono text-[10px] text-[#1A1A1A] truncate">
                    {CNTX.telemetry}
                </div>

                <button
                    type="button"
                    onClick={() => CNTX.handleFlush()}
                    className="w-full text-xs font-mono tracking-wider uppercase py-2 border border-[#1A1A1A]/30 hover:border-[#1A1A1A] hover:bg-[#EDE8DC] transition-colors"
                >
                    Flush Form Registers
                </button>
            </div>
        </div>
    )
}

export default MechInput
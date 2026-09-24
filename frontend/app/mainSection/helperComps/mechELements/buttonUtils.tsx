import React, { useEffect, useRef, useState } from "react";
import { useMechElemCntx } from "./useMechContext";
import { Dropdown, Slider, StyledButton, TextInput } from "./utils";
import gsap from "gsap";

export const LoadSec = () => {
    const CNTX = useMechElemCntx()
    return (
        <div className="p-3 border border-[#1A1A1A]/20 bg-[#FAF8F5] space-y-3">
            <StyledButton onClick={() => {
                CNTX.setIsLoading(!CNTX.isLoading);
                CNTX.logEvent(`isLoading -> ${!CNTX.isLoading}`);
            }}
                label="[ Loading / Timer Pipeline ]"
                parameter={CNTX.isLoading}
                trueValue="ACTIVE"
                falseValue="START"
                accent={true}
            />

            <div className="grid grid-cols-2 gap-2">
                <Dropdown label="Loader Type" setValue={(val) => {
                    switch (val) {
                        case 'timer [countdown]': CNTX.setLoaderType('timer'); break
                        case 'spinner1 [ring]': CNTX.setLoaderType('spinner1'); break
                        case 'spinner2 [pulse]': CNTX.setLoaderType('spinner2'); break
                    }
                }}
                    options={['timer [countdown]', 'spinner1 [ring]', 'spinner2 [pulse]']}
                />

                <Slider value={CNTX.timerSeconds} accent={false}
                    min={5}
                    max={45}
                    setValue={(val) => CNTX.setTimerSeconds(Number(val))}
                    label="Timer Duration" formatedValue={`${CNTX.timerSeconds} SEC`} />
            </div>

        </div>
    )
}

export const AnimeSec = () => {
    const CNTX = useMechElemCntx()

    const closeHoverWiggleRef = useRef<HTMLDivElement | null>(null)
    const closeHoverPopRef = useRef<HTMLDivElement | null>(null)
    const forWiggleRef = useRef<HTMLDivElement | null>(null)
    const forPopRef = useRef<HTMLDivElement | null>(null)
    const [closeHoverDropdownValue, setCloseHoverDropdownValue] = useState('highlight')

    const [closeHoverWiggle, setCloseHoverWiggle] = useState(20)
    const [closeHoverPop, setCloseHoverPop] = useState(3)

    const [btnClickDropdownValue, setbtnClickDropdownValue] = useState('tap [recoil]')
    const [xScale, setXScale] = useState('3')
    const [yScale, setYScale] = useState('7')
    const [duration, setduration] = useState('0.8')

    const btnClickDropRef = useRef<HTMLDivElement | null>(null)
    const forBtnClickRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        if (closeHoverDropdownValue === 'wiggle [sway]') {
            gsap.timeline().to(closeHoverPopRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.in'
            }).to(closeHoverWiggleRef.current, {
                height: forWiggleRef.current?.offsetHeight,
                duration: 0.2,
                ease: 'power2.out'
            })
        } else if (closeHoverDropdownValue === 'pop [bloom]') {
            gsap.timeline().to(closeHoverWiggleRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.in'
            }).to(closeHoverPopRef.current, {
                height: forPopRef.current?.offsetHeight,
                duration: 0.2,
                ease: 'power2.out'
            })
        } else {
            gsap.timeline().to(closeHoverWiggleRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.in'
            }).to(closeHoverPopRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.in'
            })
        }
    }, [closeHoverDropdownValue])

    useEffect(() => {
        if (btnClickDropdownValue === 'squish [elastic]') {
            CNTX.setBtnClickAnime(`jiggle-[x:${xScale},y:${yScale},d:${duration}]`)
        }
    }, [xScale, yScale, duration])

    useEffect(() => {
        if (btnClickDropdownValue === 'squish [elastic]') {
            CNTX.setBtnClickAnime(`jiggle-[x:${xScale},y:${yScale},d:${duration}]`)
            gsap.to(btnClickDropRef.current, {
                height: forBtnClickRef.current?.offsetHeight,
                duration: 0.2,
                ease: 'power2.out'
            })
        } else {
            gsap.to(btnClickDropRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.in'
            })
        }
    }, [btnClickDropdownValue])

    return (
        <div className="p-3 border border-[#1A1A1A]/20 bg-[#FAF8F5] space-y-3 relative">
            <span className="text-[#7A5C43] font-bold uppercase text-[10px] block">
                [ Animation Easing Engine ]
            </span>

            <div className="grid grid-cols-2 gap-2">

                <Dropdown label="Button Click Interaction"
                    setValue={(val) => {
                        setbtnClickDropdownValue(val)
                        switch (val) {
                            case 'tap [recoil]': CNTX.setBtnClickAnime('tap'); break
                            case 'squish [elastic]':
                                CNTX.setBtnClickAnime(`jiggle-[x:${xScale},y:${yScale},d:${duration}]`);
                                break
                            case 'none [static]': CNTX.setBtnClickAnime('none'); break
                            case 'bounce [spring]': CNTX.setBtnClickAnime('bounce'); break
                        }
                    }}
                    options={['tap [recoil]', 'squish [elastic]',
                        'bounce [spring]', 'none [static]']}
                />

                <Dropdown label="Button Hover Interaction"
                    setValue={(val) => val === 'arise [lift]'
                        ? CNTX.setBtnHoverAnime('arise')
                        : CNTX.setBtnHoverAnime(val)}
                    options={['highlight', 'arise [lift]', 'none']} />

            </div>

            <div ref={btnClickDropRef} className="h-[0] overflow-hidden">
                <div ref={forBtnClickRef} className="grid grid-cols-3 p-2 gap-4">
                    <TextInput label="x-scale" value={xScale}
                        setValue={(val) => {
                            if (val.length > 1) {
                                setXScale(val.slice(0, 1))
                            } else if (/[0-9]/.test(val) || val === '') {
                                setXScale(val)
                            } else {
                                setXScale('1')
                            }
                        }} onBlur={(ev) => {
                            const value = ev.currentTarget.value
                            if (value === '') {
                                setXScale('3')
                            }
                        }} />
                    <TextInput label="y-scale" value={yScale}
                        setValue={(val) => {
                            if (val.length > 1) {
                                setYScale(val.slice(0, 1))
                            } else if (/[0-9]/.test(val) || val === '') {
                                setYScale(val)
                            } else {
                                setYScale('1')
                            }
                        }} onBlur={(ev) => {
                            const value = ev.currentTarget.value
                            if (value === '') {
                                setTimeout(() => {
                                    setYScale('7')
                                }, 100)
                            }
                        }} />
                    <TextInput label="duration" value={duration}
                        setValue={(val) => setduration(val)} onBlur={(ev) => {
                            const value = ev.currentTarget.value
                            if (value === '') {
                                setTimeout(() => {
                                    setduration('0.8')
                                }, 100)
                            }
                        }} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Dropdown label="Close Icon Hover Interaction"
                    setValue={(val) => {
                        setCloseHoverDropdownValue(val)
                        if (val === 'wiggle [sway]') {
                            CNTX.setIconHoverAnime(`wiggle-[${closeHoverWiggle}]`)
                        } else if (val === 'pop [bloom]') {
                            CNTX.setIconHoverAnime(`pop-[${closeHoverPop}]`)
                        } else {
                            CNTX.setIconHoverAnime(val)
                        }
                    }}
                    options={['wiggle [sway]', 'pop [bloom]', 'highlight', 'none']}
                    startValue={closeHoverDropdownValue} />

                <Dropdown label="Tooltip Trigger Transition"
                    setValue={(val) => {
                        if (val === 'appear [emerge]') {
                            CNTX.setTltpAnime('appear')
                        } else if (val === 'stretch [pull]') {
                            CNTX.setTltpAnime('stretch')
                        } else if (val === 'dash [glide]') {
                            CNTX.setTltpAnime('dash')
                        }

                    }}
                    options={['appear [emerge]', 'stretch [pull]', 'dash [glide]']}
                    startValue="stretch [pull]" />
            </div>
            <Slider label="Close Icon Click Wobble Easing" value={CNTX.iconWobbleIntensity}
                setValue={(val) => CNTX.setIconWobbleIntensity(Number(val))}
                accent={true}
                min={0}
                max={45}
                formatedValue={`${CNTX.iconWobbleIntensity}° Deg`} />

            <div ref={closeHoverWiggleRef} className="h-[0] overflow-hidden">
                <div ref={forWiggleRef}>
                    <Slider label="wiggle [sway]"
                        value={closeHoverWiggle}
                        setValue={(val) => {
                            setCloseHoverWiggle(Number(val))
                            CNTX.setIconHoverAnime(`wiggle-[${val}]`)
                        }}
                        min={0}
                        max={360}
                        formatedValue={`${closeHoverWiggle}° Deg`}
                    />
                </div>
            </div>

            <div ref={closeHoverPopRef} className="h-[0] overflow-hidden">
                <div ref={forPopRef}>
                    <Slider label="pop [bloom]"
                        value={closeHoverPop}
                        setValue={(val) => {
                            setCloseHoverPop(Number(val))
                            CNTX.setIconHoverAnime(`pop-[${val}]`)
                        }}
                        min={1}
                        max={9}
                        formatedValue={`1.${closeHoverPop} Scale`}
                    />
                </div>
            </div>

        </div>
    )
}

export const StateInterlockSec = () => {
    const CNTX = useMechElemCntx()
    return (
        <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/10">
            <div className="space-y-3 pt-2">
                <span className="text-[#7A5C43] font-bold uppercase text-[10px] block">
                    [ Tactile Tolerances ]
                </span>
            </div>
            <StyledButton
                onClick={() => CNTX.setEnableEdit(!CNTX.enableEdit)}
                label="enable Edit (Double Click)"
                parameter={CNTX.enableEdit}
            />

            <StyledButton
                onClick={() => CNTX.setEnableRemove(!CNTX.enableRemove)}
                label="enable Remove (Close Icon)"
                parameter={CNTX.enableRemove}
            />

            <StyledButton
                onClick={() => CNTX.setDisabled(!CNTX.disabled)}
                label="disabled Interlock"
                parameter={CNTX.disabled}
            />

            <StyledButton
                onClick={() => CNTX.setShowTtlp(!CNTX.showTtlp)}
                label="Display ToolTip"
                parameter={CNTX.showTtlp}
            />

        </div>
    )
}

export const InputTolerances = () => {
    const CNTX = useMechElemCntx()

    const [specialChars, setSpecialChars] = useState('[#,$,&]')

    const cleanedVal = (val: string) => {
        const value = val.slice(1, -1)
        const cleanValue = value.split(',')
        return cleanValue
    }

    const [dropdownValue, setDropdownValue] = useState('none')

    useEffect(() => {
        if (dropdownValue === 'custom [#,$,&,...]') {
            gsap.to(customCharRef.current, {
                height: forRef.current?.offsetHeight,
                duration: 0.2,
                ease: 'power2.out'
            })
        } else {
            gsap.to(customCharRef.current, {
                height: 0,
                duration: 0.2,
                ease: 'power2.out'
            })
        }
    }, [dropdownValue])

    const customCharRef = useRef<HTMLDivElement | null>(null)
    const forRef = useRef<HTMLDivElement | null>(null)

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        const elem = ev.currentTarget
        const key = ev.key
        const includedKeys = ['\\', '^', '_']
        if (key === ' ') {
            ev.preventDefault()
        } else if (key === 'ArrowLeft') {
            const curAt = elem.selectionStart ?? 0
            curAt < 2 ? elem.setSelectionRange(2, 2) : null
        } else if (key === 'ArrowRight') {
            const curAt = elem.selectionStart ?? 0
            const max = elem.value.length - 2
            curAt > max ? elem.setSelectionRange(max, max) : null
        } else if (key === 'Backspace') {
            const val = elem.value
            const curEnd = elem.selectionEnd ?? 0
            const curStart = elem.selectionStart ?? 0
            const lastChar = val.slice(curEnd - 1, curEnd)
            if (lastChar === '[' || lastChar === ']') {
                ev.preventDefault()
            }
            else if ((curEnd - curStart) > 1) {
                const slice = val.slice(curStart, curEnd)
                if (slice.includes('[') || slice.includes(']')) {
                    ev.preventDefault()
                }
            }
        } else if (/[a-zA-z0-9]/.test(key) && !ev.ctrlKey && !includedKeys.includes(key)) {
            ev.preventDefault()
        }
    }

    return (
        <div className="p-3 border border-[#1A1A1A]/20 bg-[#FAF8F5] space-y-3">

            <span className="text-[#E27D60] font-bold uppercase text-[10px] block">
                [ Mutation tolerances ]
            </span>

            <div className="w-full h-[1.5px] bg-[black]/15"
            ></div>

            <StyledButton label="Allow Emoji" parameter={CNTX.allowEmoji}
                onClick={() => CNTX.setAllowEmoji(!CNTX.allowEmoji)} />

            <div className="w-full h-[1px] bg-[black]/15"
            ></div>

            <StyledButton label="Allow Space" parameter={CNTX.allowSpace}
                onClick={() => CNTX.setAllowSpace(!CNTX.allowSpace)} />

            <div className="w-full h-[1.5px] bg-[black]/15"
            ></div>

            <Slider value={CNTX.charCapacity}
                setValue={(val) => CNTX.setCharCapacity(Number(val))}
                label="Max Editable Chars"
                min={5}
                max={45}
                formatedValue={`${CNTX.charCapacity} chars`}
            />

            <div className="grid grid-cols-2 gap-2">
                <Dropdown label="format" setValue={(val) => CNTX.setLabelFormat(val)}
                    options={['alphabetic', 'numeric', 'alphanumeric']}
                    startValue="alphanumeric"
                />
                <Dropdown label="Special Characters" setValue={(val) => {
                    if (val === 'custom [#,$,&,...]') {
                        CNTX.setSpecialChars(cleanedVal(specialChars))
                    }
                    else CNTX.setSpecialChars(val)
                    setDropdownValue(val)

                }}
                    options={['all', 'none', 'custom [#,$,&,...]']}
                    startValue={'none'}
                />
            </div>

            <div ref={customCharRef} className="h-[0] overflow-hidden">
                <div ref={forRef}>
                    <TextInput label="custom [#,$,&,...]"
                        value={specialChars}
                        setValue={(val) => {
                            setSpecialChars(val)
                            CNTX.setSpecialChars(cleanedVal(val))
                        }}
                        onKeyDown={(ev) => handleKeyDown(ev)}
                        onBlur={(ev) => {
                            const value = ev.currentTarget.value
                            if (value === '[]') {
                                setSpecialChars('[#,$,&]')
                                CNTX.setSpecialChars(cleanedVal('[#,$,&]'))
                            }
                        }}
                        onClick={(e) => {
                            const max = e.currentTarget.value.length - 1
                            const curAt = e.currentTarget.selectionEnd ?? 0
                            if (curAt > max) {
                                e.currentTarget.setSelectionRange(max, max)
                            }
                        }}
                    />
                </div>
            </div>

        </div>
    )
}
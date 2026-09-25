import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import './element.css'
import { PassInvisible, PassVisible } from "./icons"
import { rgba, trimLastChar, validations } from "./helpers"
import anime from "./animations"

type Props = {
    label?: string
    styles?: MechInputStyles
    labelAnimeFactors?: MechLabelAnime
    type?: MechInputTypes
    minChars?: number
    maxChars?: number
    matchValue?: string
    placeholder?: string
    withStrength?: boolean
    toggleHidden?: boolean
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (ev: React.KeyboardEvent<HTMLInputElement>) => void
    onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void
}

export type MechInputStates = 'base' | 'error' | 'warning' | 'success'
export type MechInputTypes = 'alphabetic' | 'numeric' | 'alphanumeric' | 'email' | 'password' | 'confirm password' | 'username' | 'email or username' | 'custom'
export type MechLabelAnime = { shrinkFactor?: number, backTravel?: number }

export type MechInputStyles = {
    bgColor?: string
    baseColor?: `#${string}`
    errorColor?: `#${string}`
    successColor?: `#${string}`
    warningColor?: `#${string}`
    borderSize?: number
    borderRadius?: string
    paddingX?: string
    paddingY?: string
    labelBorderRadius?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: number
    iconSize?: string
    width?: string
    mssgfontSize?: string
}

export type MechInputRef = {
    target: HTMLInputElement | null
    setState: (state: MechInputStates, options: { hideMessage?: boolean, message?: string }) => void
    showMessage: (message: string) => void
    hideMessage: () => void
    wrongValue: (message: string) => void
    shake: (message: string, highlightText?: boolean) => void
}

const MechInput = forwardRef<MechInputRef, Props>((props, ref) => {

    const labelRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const mainRef = useRef<HTMLDivElement | null>(null)
    const meterRef = useRef<HTMLDivElement | null>(null)
    const meterDivRef = useRef<HTMLDivElement | null>(null)
    const messageRef = useRef<HTMLDivElement | null>(null)
    const charsTelemetryRef = useRef<HTMLDivElement | null>(null)
    const passIconRef = useRef<HTMLButtonElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const initialWidth = useRef(0)
    const [toggleHidden, setToggleHidden] = useState(props.toggleHidden ?? false)

    const params = {
        label: props.label ?? 'Mechy/Techy',
        maxChar: props.maxChars ?? 20,
        shrinkFactor: props.labelAnimeFactors?.shrinkFactor ?? 0.7,
        backTravel: props.labelAnimeFactors?.backTravel ?? 50,
        type: props.type ?? 'alphanumeric',
        matchValue: props.matchValue ?? '',
        withStrength: props.withStrength ?? false,
        placeholder: props.placeholder ?? (props.label ? `Enter ${props.label}` : `<MechInput/>`),
    }

    const minChars = props.minChars ?? (params.type === 'password' || params.type === 'confirm password' ? 12 : (params.type.includes('email') ? 6 : 3))

    const [isPassVisible, setPassVisible] = useState(params.type === 'password' || params.type === 'confirm password' ? false : true)
    const [totalChars, setTotalChars] = useState(0)
    const [mssg, setMssg] = useState('This is where we will see long messages.')
    const [myState, setMyState] = useState<'base' | 'error' | 'warning' | 'success'>('base')

    useEffect(() => {
        initialWidth.current = labelRef.current?.offsetWidth ?? 0
        if (params.type === 'confirm password' || params.type === 'password') {
            setToggleHidden(props.toggleHidden ?? true)
        } else if (toggleHidden) {
            setPassVisible(false)
        }
    }, [])

    const styles: MechInputStyles = {
        bgColor: props.styles?.bgColor ?? '#030712',
        baseColor: props.styles?.baseColor ?? '#fff',
        errorColor: props.styles?.errorColor ?? '#eb4034',
        successColor: props.styles?.successColor ?? '#46eb34',
        warningColor: props.styles?.warningColor ?? '#eb9e34',
        borderSize: props.styles?.borderSize ?? 2,
        borderRadius: props.styles?.borderRadius ?? '0.5rem',
        paddingX: props.styles?.paddingX ?? '1rem',
        paddingY: props.styles?.paddingY ?? '0.4rem',
        fontSize: props.styles?.fontSize ?? '18px',
        fontFamily: props.styles?.fontFamily ?? 'Quicksand',
        fontWeight: props.styles?.fontWeight ?? 500,
        iconSize: props.styles?.iconSize ?? '1.5rem',
        width: props.styles?.width ?? '17rem',
        mssgfontSize: props.styles?.mssgfontSize ?? '10px'
    }

    const InputCss: React.CSSProperties = {
        backgroundColor: styles.bgColor,
        borderRadius: styles.borderRadius,
        paddingTop: styles.paddingY,
        paddingBottom: styles.paddingY,
        paddingLeft: styles.paddingX,
        paddingRight: styles.paddingX,
        border: `${styles.borderSize}px solid ${styles.baseColor}`,
        fontSize: styles.fontSize,
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        color: styles.baseColor,
        '--selectTxt': styles.baseColor,
        "--selectBg": rgba(styles.baseColor ?? '', 0.7) ?? '',
        width: styles.width
    }

    const telemetryCss: React.CSSProperties = {
        fontSize: styles.fontSize,
        borderRadius: styles.borderRadius,
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        backgroundColor: styles.bgColor,
    }

    const iconCss: React.CSSProperties = {
        fill: styles.baseColor,
        width: styles.iconSize
    }

    const onFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
        props.onFocus?.(ev)
        anime.focus({
            inputRef,
            labelRef,
            mainRef,
            textRef,
            shrinkFactor: params.shrinkFactor,
            backTravel: params.backTravel,
            styles,
            charsTelemetryRef,
            meterDivRef,
            passIconRef,
            toggleHidden: toggleHidden,
            myState
        })
    }

    const setState = (state: 'base' | 'error' | 'warning' | 'success', hide?: boolean) => {
        setMyState(state)
        anime.setState({
            state: state,
            styles,
            inputRef,
            labelRef,
            passIconRef,
            meterDivRef,
            meterRef,
            charsTelemetryRef,
            messageRef,
            hideMessage: hide ?? false,
            toggleHidden
        })
    }

    const checkFinalState = (ev: React.FocusEvent<HTMLInputElement>) => {
        const elem = ev.currentTarget
        const val = elem.value
        if (val === '') {
            setState('base', true)
        } else if (['alphabetic', 'numeric', 'alphanumeric', 'email', 'username', 'email or username'].includes(params.type)) {
            if (val.length < minChars) {
                setMssg(`Minimum ${minChars} characters are required.`)
                setState('warning')
            } else if (['alphabetic', 'numeric', 'alphanumeric'].includes(params.type)) {
                setMssg(`✓ ${params.label}`)
                setState("success")
            } else if (params.type === 'email') {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    setMssg(`✓ ${params.label}`)
                    setState("success")
                } else {
                    setMssg('Invalid Email.')
                    setState("error")
                }
            } else if (params.type === 'username') {
                if (/^@[a-zA-Z0-9_-]+$/.test(val)) {
                    setMssg(`✓ ${params.label}`)
                    setState("success")
                } else {
                    setMssg('Invalid Username.')
                    setState("error")
                }
            } else if (params.type === 'email or username') {
                const result = validations.checkEmailOrUsername(ev)
                if (result.type === 'username') {
                    if (/^@[a-zA-Z0-9_-]+$/.test(val)) {
                        setMssg(`✓ Username.`)
                        setState("success")
                    } else {
                        setMssg('Invalid Username.')
                        setState("error")
                    }
                } else if (result.type === 'email') {
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                        setMssg(`✓ Email.`)
                        setState("success")
                    } else {
                        setMssg('Invalid Email.')
                        setState("error")
                    }
                }
            }
        } else if (params.type === 'password' && !params.withStrength) {
            if (val.length < minChars) {
                setMssg(`Minimum ${minChars} characters are required.`)
                setState('error')
            } else {
                setMssg(`✓ ${params.label}`)
                setState('success')
            }
        }
    }

    const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
        checkFinalState(ev)
        anime.blur({
            inputRef,
            labelRef,
            textRef,
            styles,
            charsTelemetryRef,
            meterDivRef,
            passIconRef,
            toggleHidden: toggleHidden,
            initialWidth: initialWidth.current,
        })
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(ev)

        const elem = ev.currentTarget
        const val = elem.value
        const chars = val.length
        const curEnd = elem.selectionEnd ?? 0

        if (chars > params.maxChar) {
            const value = trimLastChar(val, curEnd)
            setTotalChars(value.length)
            elem.value = value
            elem.setSelectionRange(curEnd - 1, curEnd - 1)
        } else if (params.type !== 'password' && params.type !== 'confirm password' && params.type !== 'custom') {
            let result: { type?: string, error: boolean, value: string, message: string } = { error: false, value: '', message: '' }
            switch (params.type) {
                case 'alphabetic': result = validations.checkAlphabetic(ev); break
                case 'numeric': result = validations.checkNumeric(ev); break
                case 'email': result = validations.checkEmail(ev); break
                case 'alphanumeric': result = validations.checkAlphanumeric(ev); break
                case 'username': result = validations.checkUsername(ev); break
                case 'email or username': result = validations.checkEmailOrUsername(ev); break
            }
            if (result.error) {
                elem.value = result.value
                elem.setSelectionRange(curEnd - 1, curEnd - 1)
                setMssg(result.message)
                anime.shakeOnErr({
                    inputRef,
                    meterDivRef,
                    meterRef,
                    messageRef,
                    styles,
                    type: params.type,
                    myState,
                    highlightText: true
                })
            } else {
                setTotalChars(chars)
                const percent = Math.floor((chars / params.maxChar) * 100)
                anime.setMeterScale(percent * 0.01, meterRef)
            }
        } else if (params.type === 'password') {
            if (!params.withStrength) {
                setTotalChars(chars)
                const percent = Math.floor((chars / params.maxChar) * 100)
                anime.setMeterScale(percent * 0.01, meterRef)
                return
            }
            const result = validations.checkPassword(ev, minChars)
            const points = result.points
            const scale = points * 0.2
            let strength = ''
            let state: MechInputStates = 'base'
            if (points <= 2) { strength = 'VERY WEAK'; state = 'error' }
            else if (points <= 4) { strength = 'WEAK'; state = 'warning' }
            else if (points === 5) { strength = 'STRONG'; state = 'success' }
            setMssg(`${strength}  •  ${result.message}`)
            anime.setMeterScale(scale, meterRef)
            setState(state)
            setTotalChars(chars)
        } else if (params.type === 'confirm password') {
            const result: { state: 'base' | 'error' | 'success' | 'warning', message: string } = validations.checkConfirmPassword(ev, minChars, params.matchValue)
            setTotalChars(chars)
            setMssg(result.message)
            const percent = Math.floor((chars / params.maxChar) * 100)
            anime.setMeterScale(percent * 0.01, meterRef)
            setState(result.state)
        } else if (params.type === 'custom') {
            setTotalChars(chars)
            const percent = Math.floor((chars / params.maxChar) * 100)
            anime.setMeterScale(percent * 0.01, meterRef)
        }
    }

    const iconClick = (state: 'down' | 'up', ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (state === 'down') {
            anime.passIconClick('down', passIconRef)
        } else {
            setPassVisible(!isPassVisible)
            anime.passIconClick('up', passIconRef)
        }
    }

    const exposedSetState = (state: MechInputStates, options: { hideMessage?: boolean, message?: string }) => {
        if (options.message) setMssg(options.message)
        setMyState(state)
        anime.setState({
            state: state,
            styles,
            inputRef,
            labelRef,
            passIconRef,
            meterDivRef,
            meterRef,
            charsTelemetryRef,
            messageRef,
            hideMessage: options.hideMessage ?? false,
            toggleHidden
        })
    }

    const showMessage = (message: string) => {
        setMssg(message)
        anime.showMessage(messageRef)
    }

    const hideMessage = () => {
        anime.hideMessage(messageRef)
    }

    const shake = (message: string, highlightText?: boolean) => {
        setMssg(message)
        anime.shakeOnErr({
            inputRef,
            meterDivRef,
            meterRef,
            messageRef,
            styles,
            type: params.type,
            myState,
            highlightText: highlightText ?? false
        })
    }

    const wrongValue = (message: string) => {
        const curAt = inputRef.current?.selectionEnd ?? 0
        const newVal = trimLastChar(inputRef.current?.value ?? '', curAt)
        if (inputRef.current) {
            inputRef.current.value = newVal
            inputRef.current.setSelectionRange(curAt - 1, curAt - 1)
        }
        shake(message, true)
    }

    useImperativeHandle(ref, () => ({
        target: inputRef.current,
        setState: exposedSetState,
        showMessage,
        hideMessage,
        shake,
        wrongValue
    }))

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            // onFocus={() => inputRef.current?.focus()}
            ref={mainRef}
            className="relative"
        >
            <input
                placeholder={params.placeholder}
                type={isPassVisible ? 'text' : 'password'}
                style={InputCss}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(ev) => handleChange(ev)}
                onKeyDown={(ev) => props.onKeyDown?.(ev)}
                onKeyUp={(ev) => props.onKeyUp?.(ev)}
                ref={inputRef}
                className="relative z-[1] outline-none meSelect"
            />

            <div
                className="w-full h-full absolute top-0 left-0 cursor-text"
                style={{ ...InputCss, borderColor: 'transparent' }}
            >
                <div
                    ref={labelRef}
                    style={{ ...telemetryCss }}
                    className="relative z-[2] w-full"
                >
                    <div ref={textRef}
                        className="w-fit whitespace-nowrap"
                    >{params.label}</div>

                </div>
            </div>

            <div
                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                onMouseDown={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                onMouseUp={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                className="absolute bottom-full right-0 w-[80px] translate-y-1/2 z-[1]
                text-center"
            >
                <div
                    style={{
                        ...telemetryCss,
                        border: `${styles.borderSize}px solid ${styles.baseColor}`,
                        color: styles.baseColor
                    }}
                    ref={charsTelemetryRef}
                    className="scale-0"
                >{totalChars}/{params.maxChar}
                </div>

                <div
                    ref={meterDivRef}
                    className="absolute top-0 right-full w-[120%] rounded-full
                    overflow-hidden scale-x-0 opacity-0 origin-left"
                    style={{ backgroundColor: rgba(styles.baseColor ?? '', 0.5) ?? '' }}
                    onClick={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                    onMouseDown={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                    onMouseUp={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                >
                    <div
                        ref={meterRef}
                        style={{ backgroundColor: styles.baseColor }}
                        className="h-[3px] w-full rounded-full scale-x-0 origin-left"
                    ></div>
                </div>

                {toggleHidden
                    ? <button
                        ref={passIconRef}
                        style={iconCss}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 cursor-pointer
                        translate-y-[30px] opacity-0"
                        onPointerDown={(ev) => iconClick('down', ev)}
                        onPointerCancel={() => anime.passIconClick('cancel', passIconRef)}
                        onPointerMove={() => anime.passIconClick('cancel', passIconRef)}
                        onPointerUp={(ev) => iconClick('up', ev)}
                    >
                        {isPassVisible
                            ? <div><PassInvisible /></div>
                            : <div><PassVisible /></div>
                        }
                    </button> : null
                }

            </div>

            <div
                style={{ fontSize: styles.mssgfontSize }}
                ref={messageRef}
                className="absolute top-full mt-1 left-0 opacity-0 cursor-default"
                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                onMouseDown={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
                onMouseUp={(ev) => { ev.stopPropagation(); ev.preventDefault() }}
            >
                {mssg}
            </div>

        </div>
    )
})

export default MechInput
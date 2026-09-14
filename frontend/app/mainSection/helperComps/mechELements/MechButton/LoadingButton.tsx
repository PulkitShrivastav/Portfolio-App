import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import type { LoaderTimer, LoaderTypes } from "./myTypes"

type Props = {
    styles: LoadCss
    loaderMessage: string
    label: string
    loaderType: LoaderTypes
    loaderTimer: LoaderTimer
    isLoading: boolean
    endLoader: () => void
    loaderTinerStopped: () => void
}

export type LoadCss = {
    bgColor: string
    fontColor: string
    fontSize: string
    fontFamily: string
    fontWeight: number
    paddingX: string
    paddingY: string
    borderRadius: string
    focusColor: string
    spinnerDimension: string
    spinnerSize: string
}

const LoadingButton = ({ ...props }: Props) => {

    const labelRef = useRef<HTMLButtonElement | null>(null)
    const valueRef = useRef<HTMLButtonElement | null>(null)
    const mainRef = useRef<HTMLButtonElement | null>(null)
    const spinnerRef = useRef<HTMLParagraphElement | null>(null)
    const mssgRef = useRef<HTMLParagraphElement | null>(null)

    const timerObj = useRef({ min: 0, sec: 0 })
    const [timerString, setTimerString] = useState('')

    const [label, setLabel] = useState(props.label)

    const enterAnime = () => {
        const elm = mainRef.current
        gsap.timeline({ delay: 0.1 }).to(elm, {
            width: valueRef.current?.offsetWidth,
            duration: 0.3,
            ease: 'linear'
        }).to(elm, {
            height: valueRef.current?.offsetHeight,
            duration: 0.2,
            ease: 'linear',
            onComplete: () => gsap.set([mssgRef.current, spinnerRef.current], {
                display: 'block'
            })
        }).to(mssgRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'linear'
        }).to(spinnerRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power3.out'
        })
    }

    const exitAnime = () => {
        const elm = mainRef.current
        gsap.timeline({ onComplete: () => props.endLoader() }).to(spinnerRef.current, {
            opacity: 0,
            duration: 0.1,
            ease: 'linear'
        }).to(mssgRef.current, {
            opacity: 0,
            duration: 0.1,
            ease: 'linear'
        }).to(elm, {
            height: labelRef.current?.offsetHeight,
            duration: 0.1,
            ease: 'linear'
        }).to(elm, {
            width: labelRef.current?.offsetWidth,
            duration: 0.1,
            ease: 'linear'
        })
    }

    useEffect(() => {
        parseTimer()
        timerInterval()
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    useEffect(() => {
        if (props.isLoading) {
            enterAnime()
        } else {
            exitAnime()
        }
    }, [props.isLoading])

    useEffect(() => {
        setLabel(props.label)
    }, [props.label])

    const interval = useRef<any>(null)
    const timerInterval = () => {
        if (props.loaderType === 'timer') {
            interval.current = setInterval(() => {
                const sec = timerObj.current.sec
                const min = timerObj.current.min
                if (sec === 0 && min > 0) {
                    timerObj.current.min = min - 1
                    timerObj.current.sec = 59
                } else if (sec === 0 && min === 0) {
                    clearInterval(interval.current)
                    exitAnime()
                    props.loaderTinerStopped()
                } else {
                    timerObj.current.sec = sec - 1
                }
                setTime(timerObj.current.min, timerObj.current.sec)
            }, 1000)
        }
    }

    const parseTimer = () => {
        const que = props.loaderTimer
        const vals = que.split(':')
        timerObj.current.min = Number(vals[0])
        timerObj.current.sec = Number(vals[1])
        setTime(timerObj.current.min, timerObj.current.sec)
    }

    const setTime = (min: number, sec: number) => {
        const mins = min < 10 ? `0${min}` : `${min}`
        const secs = sec < 10 ? `0${sec}` : `${sec}`
        setTimerString(`${mins}:${secs}`)
    }

    const loadCss = {
        backgroundColor: props.styles.bgColor,
        borderRadius: props.styles.borderRadius,
        color: props.styles.fontColor,
        fontSize: props.styles.fontSize,
        fontWeight: props.styles.fontWeight,
        fontFamily: props.styles.fontFamily,
        paddingTop: props.styles.paddingY,
        paddingBottom: props.styles.paddingY,
        paddingLeft: props.styles.paddingX,
        paddingRight: props.styles.paddingX,
    }

    const spinnerCss = {
        width: props.styles.spinnerDimension,
        height: props.styles.spinnerDimension,
        '--color-1': props.styles.fontColor,
        '--size': props.styles.spinnerSize,
    }

    const spinnerClasses = `${props.loaderType} translate-x-[8px]`
    const messageClasses = 'whitespace-nowrap'

    return (
        <div className="relative">
            <button className="relative z-[1]" style={{
                ...loadCss,
                width: labelRef.current?.offsetWidth,
                height: labelRef.current?.offsetHeight
            }} ref={mainRef} >
                <div className="flex items-center justify-center gap-1">
                    <p style={{
                        opacity: 0,
                        display: 'none'
                    }} ref={mssgRef} className={messageClasses} >{props.loaderMessage}</p>
                    {
                        props.loaderType === 'timer' ?
                            <p ref={spinnerRef} style={{ opacity: 0, display: 'none' }}
                                className={messageClasses}>{timerString}</p> :
                            <span className={spinnerClasses} ref={spinnerRef}
                                style={{ ...spinnerCss, opacity: 0, display: 'none' }}></span>
                    }
                </div>
            </button>
            <button style={loadCss} ref={labelRef}
                className="absolute border-2 top-0 z-[0] opacity-0 whitespace-nowrap left-0 mt-1" >
                <p>{label}</p>
            </button>
            <button style={loadCss} ref={valueRef}
                className="absolute border-2 top-0 z-[0] opacity-0 left-0 mb-1" >
                <div className="flex items-center gap-2">
                    <p className={messageClasses}>{props.loaderMessage}</p>
                    {
                        props.loaderType === 'timer' ?
                            <p className="whitespace-nowrap"
                            >00:00</p> :
                            <span className={spinnerClasses}
                                style={spinnerCss}></span>
                    }
                </div>
            </button>
        </div>
    )
}

export default LoadingButton
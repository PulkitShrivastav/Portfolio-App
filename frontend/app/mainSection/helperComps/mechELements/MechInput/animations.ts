import gsap from "gsap"
import type { ButtonRef, DivRef, InputRef } from "./myTypes"
import type { MechInputStates, MechInputStyles, MechInputTypes } from "./MechInput"
import { rgba } from "./helpers"

const focus = (params: {
    inputRef: InputRef,
    labelRef: DivRef
    textRef: DivRef,
    mainRef: DivRef,
    meterDivRef: DivRef,
    passIconRef: ButtonRef,
    charsTelemetryRef: DivRef,
    styles: MechInputStyles,
    shrinkFactor: number,
    backTravel: number,
    toggleHidden: boolean,
    myState: 'base' | 'error' | 'warning' | 'success'
}) => {

    gsap.killTweensOf([
        params.inputRef.current,
        params.labelRef.current,
        params.textRef.current,
        params.meterDivRef.current,
        params.passIconRef.current,
        params.charsTelemetryRef.current
    ])

    const labelWidth = params.inputRef.current?.offsetWidth ?? 0
    const textWidth = params.textRef.current?.offsetWidth ?? 0
    const mainHeight = params.mainRef.current?.offsetHeight ?? 0

    const travelX = Math.floor((labelWidth * params.shrinkFactor) / 2) - Math.floor(textWidth / 2)
    const travleY = Math.floor(mainHeight / 2)

    let borderColor = ''
    switch (params.myState) {
        case 'base': borderColor = params.styles.baseColor ?? ''; break
        case 'error': borderColor = params.styles.errorColor ?? ''; break
        case 'success': borderColor = params.styles.successColor ?? ''; break
        case 'warning': borderColor = params.styles.warningColor ?? ''; break
    }

    const tl = gsap.timeline()
    const endAnime = () => {
        tl.to(params.charsTelemetryRef.current, {
            scaleY: 0.4,
            duration: 0.1,
            ease: 'linear',
        }).to(params.charsTelemetryRef.current, {
            scaleX: 0.4,
            duration: 0.1,
            ease: 'linear',
        }).to(params.meterDivRef.current, {
            scaleX: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
        })

        if (params.toggleHidden) {
            tl.to(params.passIconRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'elastic.out'
            })
        }
    }

    const startAnime = () => {
        tl.to(params.textRef.current, {
            x: travelX,
            duration: 0.1,
            ease: 'linear'
        }).to(params.labelRef.current, {
            x: -params.backTravel,
            y: -travleY,
            width: labelWidth * params.shrinkFactor,
            border: `${params.styles.borderSize}px solid ${borderColor}`,
            scale: 0.4,
            duration: 0.1,
            ease: 'linear',
        })
    }

    const val = params.inputRef.current?.value
    if (val !== '') {
        endAnime()
    } else {
        startAnime()
        endAnime()
    }

}

const blur = (params: {
    inputRef: InputRef,
    labelRef: DivRef
    textRef: DivRef,
    meterDivRef: DivRef,
    passIconRef: ButtonRef,
    charsTelemetryRef: DivRef,
    styles: MechInputStyles,
    toggleHidden: boolean,
    initialWidth: number
}) => {

    // gsap.killTweensOf([
    //     params.inputRef.current,
    //     params.labelRef.current,
    //     params.textRef.current,
    //     params.meterDivRef.current,
    //     params.passIconRef.current,
    //     params.charsTelemetryRef.current
    // ])

    const tl = gsap.timeline()
    tl.to(params.charsTelemetryRef.current, {
        scaleY: 0,
        duration: 0.1,
        ease: 'linear',
    }).to(params.charsTelemetryRef.current, {
        scaleX: 0,
        duration: 0.1,
        ease: 'linear',
    }).to(params.meterDivRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.1,
        ease: 'linear',
    })

    const endAnime = () => {
        const val = params.inputRef.current?.value
        if (val !== '') {
            return
        } else {
            tl.to(params.labelRef.current, {
                x: 0,
                y: 0,
                width: params.initialWidth,
                border: `0px solid transparent`,
                scale: 1,
                duration: 0.1,
                ease: 'linear',
            }).to(params.textRef.current, {
                x: 0,
                duration: 0.1,
                ease: 'linear',
            })
        }
    }

    if (params.toggleHidden) {
        tl.to(params.passIconRef.current, {
            y: -10,
            duration: 0.1,
            ease: 'linear',
        }).to(params.passIconRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.1,
            ease: 'linear',
        })
        endAnime()
    } else {
        endAnime()
    }

}

const setMeterScale = (scale: number, meterRef: DivRef) => {
    gsap.to(meterRef.current, {
        scaleX: scale,
        duration: 0.2,
        ease: 'linear'
    })
}

const passIconClick = (state: 'down' | 'up' | 'cancel', passIconRef: ButtonRef) => {
    gsap.killTweensOf(passIconRef.current)
    if (state === 'down') {
        gsap.to(passIconRef.current, {
            scale: 0.4,
            duration: 0.05,
            ease: 'linear'
        })
    } else if (state === 'up') {
        gsap.to(passIconRef.current, {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out'
        })
    } else {
        gsap.set(passIconRef.current, { scale: 1 })
    }

}

const shakeOnErr = (params: {
    inputRef: InputRef,
    meterDivRef: DivRef,
    meterRef: DivRef,
    messageRef: DivRef,
    type: MechInputTypes,
    styles: MechInputStyles,
    myState: MechInputStates,
    highlightText: boolean
}) => {

    const dur = { duration: 0.06, ease: 'linear' }
    const half_dur = { duration: 0.03, ease: 'linear' }
    const repeat = 4

    let baseColor = ''
    switch (params.myState) {
        case 'base': baseColor = params.styles.baseColor ?? ''; break
        case 'error': baseColor = params.styles.errorColor ?? ''; break
        case 'success': baseColor = params.styles.successColor ?? ''; break
        case 'warning': baseColor = params.styles.warningColor ?? ''; break
    }

    gsap.killTweensOf([
        params.inputRef.current,
        params.meterDivRef.current,
        params.meterRef.current,
        params.messageRef.current
    ])

    gsap.set(params.inputRef.current, { color: params.highlightText ? params.styles.errorColor : baseColor })
    gsap.timeline({
        repeat,
        onComplete: () => {
            gsap.set(params.inputRef.current, { color: baseColor })
        }
    }).to(params.inputRef.current, {
        x: 5,
        ...half_dur
    }).to(params.inputRef.current, {
        x: -5,
        ...dur
    }).to(params.inputRef.current, {
        x: 0,
        ...half_dur
    })

    gsap.to(params.messageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
    })
    gsap.timeline({
        repeat,
        onComplete: () => {
            gsap.to(params.messageRef.current, {
                delay: 0.5,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            })
        }
    }).to(params.meterDivRef.current, {
        x: -5,
        ...half_dur
    }).to(params.meterDivRef.current, {
        x: 5,
        ...dur
    }).to(params.meterDivRef.current, {
        x: 0,
        ...half_dur
    })


}

const setState = (params: {
    state: MechInputStates
    inputRef: InputRef
    meterDivRef: DivRef
    meterRef: DivRef
    labelRef: DivRef
    charsTelemetryRef: DivRef
    passIconRef: ButtonRef
    messageRef: DivRef
    styles: MechInputStyles
    hideMessage?: boolean
    toggleHidden: boolean
}) => {
    let color: string
    switch (params.state) {
        case 'base': color = params.styles.baseColor ?? ''; break
        case 'error': color = params.styles.errorColor ?? ''; break
        case 'success': color = params.styles.successColor ?? ''; break
        case 'warning': color = params.styles.warningColor ?? ''; break
    }

    const animeParams = { duration: 0.03, ease: 'power2.out' }
    const hideMessage = params.hideMessage ?? false

    const tl = gsap.timeline().to(params.inputRef.current, {
        borderColor: color,
        "--selectBg": rgba(color, 0.5),
        "--selectTxt": color,
        color: color,
        ...animeParams,
    }).to(params.labelRef.current, {
        border: `${params.styles.borderSize}px solid ${color}`,
        color: color,
        ...animeParams,
    }).to(params.charsTelemetryRef.current, {
        border: `${params.styles.borderSize}px solid ${color}`,
        color: color,
        ...animeParams
    }).to(params.meterDivRef.current, {
        backgroundColor: rgba(color, 0.5) ?? '',
        ...animeParams,
    }).to(params.meterRef.current, {
        backgroundColor: color,
        ...animeParams,
    })

    if (params.toggleHidden) {
        tl.to(params.passIconRef.current, {
            fill: color,
            ...animeParams,
        })
    }

    tl.to(params.messageRef.current, {
        color: color,
        opacity: hideMessage ? 0 : 1,
        ...animeParams,
    })

}

const showMessage = (messageRef: DivRef) => {
    gsap.to(messageRef.current, {
        opacity: 1,
        duration: 0.03,
        ease: 'power2.out'
    })
}

const hideMessage = (messageRef: DivRef) => {
    gsap.to(messageRef.current, {
        opacity: 0,
        duration: 0.03,
        ease: 'power2.out'
    })
}

const anime = {
    focus,
    blur,
    setMeterScale,
    passIconClick,
    shakeOnErr,
    setState,
    showMessage,
    hideMessage
}

export default anime
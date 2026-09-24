import gsap from "gsap"
import type { ButtonRef, DivRef, OnEntryAnime, ParagraphRef } from "./myTypes"

const disableHandler = (params: {
    buttonRef: ButtonRef,
    state: 'activate' | 'de-activate'
    props: {
        disableBgColor?: string,
        disableFontColor?: string,
        normalBgColor?: string,
        normalFontColor?: string
    }
}) => {
    gsap.to(params.buttonRef.current, {
        backgroundColor: params.state === 'activate' ? params.props.normalBgColor : params.props.disableBgColor,
        color: params.state === 'activate' ? params.props.normalFontColor : params.props.disableFontColor,
        duration: 0.3,
        ease: 'linear'
    })
}

const clickDisable = (params: {
    buttonRef: ButtonRef
    mssgRef: DivRef
}) => {
    gsap.to(params.mssgRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'linear'
    })

    const target = params.buttonRef.current
    gsap.timeline({ repeat: 3 }).to(target, {
        x: 5,
        duration: 0.03,
        ease: 'linear'
    }).to(target, {
        x: -5,
        duration: 0.06,
        ease: 'linear'
    }).to(target, {
        x: 0,
        duration: 0.03,
        ease: 'linear'
    })
}

const floaterHandler = (params: {
    floaterRef: DivRef,
    state: 'appear' | 'disappear'
}) => {

    if (params.state === 'appear') gsap.set(params.floaterRef.current, { opacity: 1 })

    gsap.to(params.floaterRef.current, {
        y: params.state === 'appear' ? 0 : 50,
        duration: 0.3,
        ease: params.state === 'appear' ? 'power2.out' : 'linear',
        onComplete: () => params.state === 'disappear' ? gsap.set(params.floaterRef.current, { opacity: 0 }) : undefined
    })
}

const submitted = (params: {
    buttonRef: ButtonRef,
}) => {
    gsap.set(params.buttonRef.current, { opacity: 0 })
    gsap.timeline().set(params.buttonRef.current, { opacity: 1 }).to(params.buttonRef.current, {
        scale: 1.08,
        duration: 0.1,
        ease: 'linear'
    }).to(params.buttonRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out'
    })
}

const entry = (
    buttonRef: ButtonRef,
    labelRef: ParagraphRef,
    animeType: OnEntryAnime
) => {
    const pheonix = () => {
        gsap.set(buttonRef.current, {
            y: 30,
            scaleY: 0.2,
            opacity: 0,
        })
        gsap.set(labelRef.current, {
            opacity: 0
        })
        gsap.timeline().to(buttonRef.current, {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            ease: 'linear'
        }).to(labelRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'linear'
        })
    }

    const bounce = () => {
        gsap.set(buttonRef.current, {
            transformOrigin: 'bottom center',
            scale: 0.9
        })
        gsap.timeline().to(buttonRef.current, {
            y: -10,
            scale: 1.1,
            duration: 0.1,
            ease: 'linear'
        }).to(buttonRef.current, {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out'
        })
    }

    switch (animeType) {
        case 'bounce': bounce(); break
        case 'pheonix': pheonix(); break
        case 'none': return
    }
}

const onFocus = (params: {
    buttonRef: ButtonRef,
    focusColor: string
}) => {
    const target = params.buttonRef.current
    gsap.timeline().to(target, {
        scale: 1.1,
        duration: 0.1,
        ease: 'linear'
    }).to(target, {
        border: `3px solid ${params.focusColor}`,
        duration: 0.1,
        ease: 'linear'
    }).to(target, {
        scale: 1,
        duration: 0.1,
        ease: 'linear'
    })
}

const onBlur = (buttonRef: ButtonRef) => {
    const target = buttonRef.current
    gsap.timeline().to(target, {
        borderWidth: `0px`,
        duration: 0.1,
        ease: 'linear'
    }).to(target, {
        scaleX: 1,
        duration: 0.1,
        ease: 'linear'
    }).to(target, {
        scaleY: 1,
        duration: 0.1,
        ease: 'linear'
    })
}

const helpHandler = {
    disableHandler,
    clickDisable,
    floaterHandler,
    submitted,
    entry,
    onFocus,
    onBlur
}

export default helpHandler
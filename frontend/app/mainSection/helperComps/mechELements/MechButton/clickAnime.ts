import gsap from "gsap"
import type React from "react"
import type { ButtonClickAnime, ButtonRef, DivRef, DownUp, OnRemoveAnime } from "./myTypes"
import mainHelp, { type AnimeParams } from "./mainKeyHandler"

const iconClick = (
    iconRef: DivRef,
    state: DownUp,
    wobbleIndex: number
) => {

    gsap.killTweensOf(iconRef.current)
    if (state === 'down') {
        gsap.to(iconRef.current, {
            rotate: wobbleIndex,
            duration: 0.1,
            ease: 'linear'
        })
    } else {
        gsap.timeline().to(iconRef.current, {
            rotate: wobbleIndex * -1,
            duration: 0.1,
            ease: 'linear'
        }).to(iconRef.current, {
            rotate: 0,
            duration: 0.8,
            ease: 'elastic.out'
        })
    }

}

const clickRemove = (params: {
    buttonRef: ButtonRef,
    animeType: OnRemoveAnime,
    onComplete: () => void
}) => {
    const target = params.buttonRef.current
    const goTo = (que: 'right' | 'left' | 'down' | 'up') => {
        let translate: any
        switch (que) {
            case 'right': translate = { x: 50 }; break
            case 'left': translate = { x: -50 }; break
            case 'down': translate = { y: 30 }; break
            case 'up': translate = { y: -30 }; break
        }
        gsap.to(target, {
            ...translate,
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: 'linear',
            onComplete: () => params.onComplete()
        })
    }

    const fadeOut = () => {
        gsap.to(target, {
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.5,
            ease: 'linear',
            onComplete: () => params.onComplete()
        })
    }

    const shrink = () => {
        gsap.timeline().to(target, {
            scale: 0,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => params.onComplete()
        })
    }

    switch (params.animeType) {
        case 'go-to-right': goTo('right'); break
        case 'go-to-left': goTo('left'); break
        case 'go-to-down': goTo('down'); break
        case 'go-to-up': goTo('up'); break
        case 'fade-out': fadeOut(); break
        case 'shrink': shrink(); break
    }

}

const floterClick = (params: {
    floaterRef: DivRef
    state: DownUp
    onComplete?: () => void
}) => {
    gsap.killTweensOf(params.floaterRef.current)
    if (params.state === 'down') {
        gsap.to(params.floaterRef.current, {
            scaleY: 1.15,
            scaleX: 0.85,
            duration: 0.1,
            ease: 'linear'
        })
    } else {
        gsap.timeline({ onComplete: () => params.onComplete?.() }).to(params.floaterRef.current, {
            scaleY: 0.7,
            scaleX: 1.3,
            duration: 0.1,
            ease: 'linear'
        }).to(params.floaterRef.current, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.8,
            ease: 'elastic.out'
        })
    }
}

const buttonClick = (
    buttonRef: ButtonRef,
    state: DownUp,
    animeType: ButtonClickAnime,
    animeParams: AnimeParams
) => {

    const jiggle = () => {
        const jiggle = {
            x: animeParams.buttonClick.jiggle.x,
            y: animeParams.buttonClick.jiggle.y,
            d: animeParams.buttonClick.jiggle.d
        }
        if (state === 'down') {
            gsap.to(buttonRef.current, {
                scaleY: 1.2,
                scaleX: 0.8,
                duration: 0.1,
                ease: 'linear'
            })
        } else {
            gsap.timeline().to(buttonRef.current, {
                scaleY: jiggle.y,
                scaleX: jiggle.x,
                duration: 0.1,
                ease: 'linear'
            }).to(buttonRef.current, {
                scaleX: 1,
                scaleY: 1,
                duration: jiggle.d,
                ease: 'elastic.out'
            })
        }
    }

    const bounce = () => {
        gsap.to(buttonRef.current, {
            y: state === 'down' ? 3 : 0,
            scale: state === 'down' ? 0.9 : 1,
            duration: state === 'down' ? 0.1 : 0.5,
            ease: state === 'down' ? 'linear' : 'elastic.out'
        })
    }

    const tap = () => {
        gsap.to(buttonRef.current, {
            scale: state === 'down' ? 0.9 : 1,
            duration: 0.1,
            ease: 'linear'
        })
    }

    gsap.killTweensOf(buttonRef.current)
    switch (animeType) {
        case 'bounce': bounce(); break
        case 'jiggle': jiggle(); break
        case 'tap': tap(); break
    }

}

const clickHandler = {
    iconClick,
    buttonClick,
    clickRemove,
    floterClick,
}

export default clickHandler
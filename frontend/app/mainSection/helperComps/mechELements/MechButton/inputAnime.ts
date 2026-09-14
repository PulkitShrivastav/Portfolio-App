import gsap from "gsap"
import type React from "react"
import type { ButtonRef, DivRef, InputRef, ParagraphRef } from "./myTypes"

const enableEdit = (params: {
    inputRef: InputRef,
    labelRef: DivRef,
    buttonRef: ButtonRef,
    iconRef: DivRef,
    widthSlack: number,
    focusColor: string
}) => {
    gsap.set(params.inputRef.current, {
        width: params.labelRef.current?.offsetWidth,
        opacity: 0,
    })
    gsap.timeline({ onComplete: () => params.inputRef.current?.focus() }).to(params.buttonRef.current, {
        scaleX: 0.8,
        duration: 0.1,
        ease: 'linear'
    }).to(params.buttonRef.current, {
        scaleY: 0.8,
        border: `3px solid ${params.focusColor}`,
        duration: 0.1,
        ease: 'linear'
    }).to(params.inputRef.current, {
        opacity: 1,
        width: (params.labelRef.current?.offsetWidth ?? 0) + params.widthSlack,
        duration: 0.1,
        ease: 'linear'
    }).to(params.iconRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: 'linear'
    })
}

const disableEdit = (params: {
    inputRef: InputRef
    labelRef: ParagraphRef
    buttonRef: ButtonRef
    iconRef: DivRef
    onComplete: () => void
}) => {
    gsap.timeline({ onComplete: () => params.onComplete() }).to(params.iconRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: 'linear'
    }).to(params.buttonRef.current, {
        scaleX: 1,
        duration: 0.1,
        ease: 'linear'
    }).to(params.buttonRef.current, {
        scaleY: 1,
        borderWidth: '0px',
        duration: 0.1,
        ease: 'linear'
    }).to(params.inputRef.current, {
        width: params.labelRef.current?.offsetWidth ?? 0,
        duration: 0.1,
        ease: 'linear'
    })
}

const setWidth = (params: {
    inputRef: InputRef,
    width: number
}) => {
    gsap.set(params.inputRef.current, {
        width: params.width
    })
}

const shake = (params: {
    buttonRef: ButtonRef,
    iconRef: DivRef,
    errorColor: string,
    focusColor: string,
    fontColor: string
}) => {
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
    gsap.timeline().to(target, {
        borderColor: params.errorColor,
        color: params.errorColor,
        duration: 0.3,
        ease: 'linear'
    }).to(target, {
        borderColor: params.focusColor,
        color: params.fontColor,
        duration: 0.3,
        ease: 'linear'
    })
    gsap.timeline().to(params.iconRef.current, {
        fill: params.errorColor,
        duration: 0.3,
        ease: 'linear'
    }).to(params.iconRef.current, {
        fill: params.focusColor,
        duration: 0.3,
        ease: 'linear'
    })
}

const entryAnime = (
    buttonRef: ButtonRef,
    onComplete: () => void
) => {
    gsap.set(buttonRef.current, { scale: 0 })
    gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => onComplete()
    })
}

const inputHandler = {
    setWidth,
    enableEdit,
    disableEdit,
    shake,
    entryAnime,
}

export default inputHandler
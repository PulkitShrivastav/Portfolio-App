import gsap from "gsap"
import type React from "react"
import type { ButtonHoverAnime, ButtonRef, CloseIconAnime, DivRef, InOut, InputRef, ParagraphRef, ToolTipAnime } from "./myTypes"
import type { AnimeParams } from "./mainKeyHandler"


const handleToolTip = (
    ref: DivRef,
    state: 'show' | 'hide',
    animeType: ToolTipAnime
) => {
    gsap.killTweensOf(ref.current)
    const appear = () => {
        if (state === 'show') {
            gsap.set(ref.current, {
                y: 20,
                x: 0,
                scale: 1,
                opacity: 0,
                transformOrigin: 'center center'
            })
            gsap.to(ref.current, {
                y: 0,
                duration: 0.2,
                ease: 'linear'
            })
            gsap.to(ref.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'linear'
            })
        } else {
            gsap.to(ref.current, {
                y: 20,
                opacity: 0,
                duration: 0.2,
                ease: 'linear'
            })
        }
    }

    const strecth = () => {
        if (state === 'show') {
            gsap.set(ref.current, {
                transformOrigin: 'bottom right',
                y: 0,
                x: 0,
                scale: 0,
                opacity: 1
            })
            gsap.to(ref.current, {
                scale: 1,
                duration: 0.2,
                ease: 'linear'
            })
        } else {
            gsap.to(ref.current, {
                scale: 0,
                duration: 0.3,
                ease: 'linear',
            })
        }
    }

    const dash = () => {
        if (state === 'show') {
            gsap.set(ref.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                x: 30,
                transformOrigin: 'center center'
            })
            const tl = gsap.timeline()
            tl.to(ref.current, {
                x: 0,
                duration: 0.2,
                ease: 'linear'
            })
            tl.to(ref.current, {
                x: -5,
                duration: 0.05,
                ease: 'linear'
            })
            tl.to(ref.current, {
                x: 0,
                duration: 0.1,
                ease: 'linear'
            })
        } else {
            gsap.to(ref.current, {
                x: 50,
                duration: 0.3,
                ease: 'linear',
                opacity: 0,
            })
        }
    }

    switch (animeType) {
        case 'appear': appear(); break
        case 'dash': dash(); break
        case 'stretch': strecth(); break
    }
}

const labelMouse = (params: {
    labelRef: ParagraphRef,
    toolTipRef: React.RefObject<HTMLDivElement | null>,
    state: InOut,
    toolTipAnime: ToolTipAnime,
    props: {
        hoverColor?: string,
        fontColor?: string,
    }
    animeParams: AnimeParams,
    showToolTip: boolean
}) => {
    if (params.showToolTip) {
        handleToolTip(
            params.toolTipRef,
            params.state === 'in' ? 'show' : 'hide',
            params.toolTipAnime
        )
    }
    if (params.animeParams.buttonHover.type === 'none') {
        return
    } else {
        gsap.to(params.labelRef.current, {
            color: params.state === 'in' ? params.props.hoverColor : params.props.fontColor,
            duration: 0.2,
            ease: 'linear'
        })
    }
}

const iconMouse = (params: {
    iconRef: DivRef,
    toolTipRef: DivRef,
    state: InOut,
    animeType: CloseIconAnime
    toolTipAnime: ToolTipAnime
    props: { hoverColor?: string, normalColor?: string }
    animeParams: AnimeParams,
    showTooltip: boolean,
}) => {
    const wiggle = () => {
        const wiggle = params.animeParams.iconHover.wiggle
        const tl = gsap.timeline({ onStart: () => highlight() })
        tl.to(params.iconRef.current, {
            rotate: params.state === 'in' ? wiggle : (wiggle * -1),
            scale: params.state === 'in' ? 1.1 : 1.2,
            duration: 0.1,
            ease: 'linear'
        })
        tl.to(params.iconRef.current, {
            rotate: params.state === 'in' ? (wiggle * -1) : wiggle,
            scale: params.state === 'in' ? 1.2 : 1.1,
            duration: 0.2,
            ease: 'linear'
        })
        tl.to(params.iconRef.current, {
            rotate: 0,
            scale: params.state === 'in' ? 1.3 : 1,
            duration: 0.1,
            ease: 'linear'
        })
    }

    const pop = () => {
        const pop = params.animeParams.iconHover.pop
        gsap.to(params.iconRef.current, {
            onStart: () => highlight(),
            scale: params.state === 'in' ? pop : 1,
            duration: params.state === 'in' ? 0.6 : 0.1,
            ease: params.state === 'in' ? 'elastic.out' : 'linear'
        })
    }

    const highlight = () => {
        gsap.to(params.iconRef.current, {
            fill: params.state === 'in' ? params.props.hoverColor : params.props.normalColor,
            duration: 0.3,
            ease: 'linear'
        })
    }

    if (params.showTooltip) {
        if (params.state === 'in') {
            handleToolTip(params.toolTipRef, 'show', params.toolTipAnime)
        } else {
            handleToolTip(params.toolTipRef, 'hide', params.toolTipAnime)
        }
    }

    gsap.killTweensOf(params.iconRef.current)
    gsap.set(params.iconRef.current, {
        opacity: 1,
        scale: 1
    })
    switch (params.animeType) {
        case 'pop': pop(); break
        case "wiggle": wiggle(); break
        case 'highlight': highlight(); break
    }

}

const buttonMouse = (params: {
    buttonRef: ButtonRef,
    labelRef: ParagraphRef,
    iconRef: DivRef,
    state: InOut,
    animeType: ButtonHoverAnime,
    enableEdit: boolean,
    enableRemove: boolean,
    props: {
        hoverFontColor?: string,
        hoverBgColor?: string,
        normalFontColor?: string,
        normalBgColor?: string,
        hoverSvgColor?: string,
        svgColor?: string,
        onComplete?: () => void
    },
    animeParams: AnimeParams,
    title: string
    toolTipRef: DivRef,
    toolTipAnime: ToolTipAnime,
    svg: boolean
}) => {
    if (!params.enableEdit) {
        gsap.to(params.labelRef.current, {
            color: params.state === 'in' ? params.props.hoverFontColor : params.props.normalFontColor,
            duration: 0.3,
            ease: 'linear'
        })
    }

    if (params.enableRemove && params.iconRef.current) {
        gsap.to(params.iconRef.current, {
            opacity: params.state === 'in' ? 1 : 0,
            duration: params.state === 'in' ? 0.2 : (params.animeType === 'arise' ? params.animeParams.buttonHover.arise.d : 0.3),
            ease: 'linear'
        })
    }

    if (params.title) {
        if (params.state === 'in') {
            handleToolTip(params.toolTipRef, 'show', params.toolTipAnime)
        }
        else {
            handleToolTip(params.toolTipRef, 'hide', params.toolTipAnime)
        }
    }

    const highlight = () => {
        if (params.svg) {
            gsap.to(params.labelRef.current, {
                fill: params.state === 'in' ? params.props.hoverSvgColor : params.props.svgColor,
                duration: 0.2,
                ease: 'linear'
            })
        }
        gsap.to(params.buttonRef.current, {
            backgroundColor: params.state === 'in' ? params.props.hoverBgColor : params.props.normalBgColor,
            duration: 0.3,
            ease: 'linear',
            onComplete: params.props.onComplete ?? undefined
        })
    }

    const arise = () => {
        const vals = {
            i: params.animeParams.buttonHover.arise.i * -1,
            l: params.animeParams.buttonHover.arise.l * -1,
            b: params.animeParams.buttonHover.arise.b * -1,
            d: params.animeParams.buttonHover.arise.d,
        }
        if (params.iconRef.current) {
            gsap.to(params.iconRef.current, {
                y: params.state === 'in' ? vals.i : 0,
                duration: vals.d,
                ease: 'linear'
            })
        }
        gsap.to(params.buttonRef.current, {
            y: params.state === 'in' ? vals.b : 0,
            duration: vals.d,
            ease: 'linear'
        })
        gsap.to(params.labelRef.current, {
            y: params.state === 'in' ? vals.l : 0,
            duration: vals.d,
            ease: 'linear',
            onComplete: params.props.onComplete ?? undefined
        })

        highlight()
    }

    switch (params.animeType) {
        case 'arise': arise(); break
        case 'highlight': highlight(); break
    }

}

const hoverHandler = {

    labelMouse,
    iconMouse,
    buttonMouse,
    handleToolTip,

}

export default hoverHandler
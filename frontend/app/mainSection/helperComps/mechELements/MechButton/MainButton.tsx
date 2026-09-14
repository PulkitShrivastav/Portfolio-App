import { useEffect, useMemo, useRef, useState } from "react"
import { CloseIcon, TrashIcon } from "./icons"
import hoverHandler from "./hoverAnime"
import clickHandler from "./clickAnime"
import helpHandler from "./helperAnime"
import mainHelp, { type AnimeParams } from "./mainKeyHandler"
import type { ButtonClickAnime, ButtonHoverAnime, CloseIconAnime, IconClickWobble, InOut, OnEntryAnime, OnRemoveAnime, ToolTipAnime } from "./myTypes"
import gsap from "gsap"


type Props = {
    label: string
    onClick: () => void
    styles: MainButtonCss
    onDoubleClick: () => void
    onRemove: () => void
    clickedDisabled: () => void
    enableRemove: boolean
    enableEdit: boolean
    disabled: boolean
    disabledMessage: string
    animeTypes: AnimeTypes
    toolTipMssg: ToolTipType
    submitted: boolean
    entryDone: boolean
    isAddCancelled: boolean
    showToolTip: boolean
    title: string
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>> | null
}

export type AnimeTypes = {
    onIconHover: CloseIconAnime
    toolTipAnime: ToolTipAnime
    onButtonHover: ButtonHoverAnime
    onIconClick: IconClickWobble,
    onButtonClick: ButtonClickAnime
    onRemove: OnRemoveAnime
    onEntry: OnEntryAnime
}

export type ToolTipType = {
    onLabel: string,
    onRemove: string
}

export type MainButtonCss = {
    bgColor: string
    fontColor: string
    fontSize: string
    fontFamily: string
    fontWeight: number
    paddingX: string
    paddingY: string
    borderRadius: string
    toolTipBgColor: string
    toolTipFontColor: string
    toolTipBorderSize: number
    toolTipBorderColor: string
    toolTipFontSize: string
    toolTipBorderRadius: string
    closeIconColor: string
    closeIconSize: string
    floaterIconColor: string
    floaterIconSize: string
    disableMssgFontSize: string
    disableMssgFontColor: string
    disableMssgBorderColor: string
    disableMssgBorderSize: string
    disableMssgBorderRadius: string
    disableMssgBgColor: string
    toolTipPaddingX: string
    toolTipPaddingY: string
    disableMssgPaddingX: string
    disableMssgPaddingY: string
    hoverFontColor: string
    hoverCloseIconColor: string
    hoverBgColor: string
    disableFontColor: string
    disableBgColor: string
    focusColor: string
    iconSize: string
    iconColor: string
    hoverIconColor: string
}

const MainButton = ({ ...props }: Props) => {

    const labelRef = useRef<HTMLParagraphElement | null>(null)
    const toolTipRef = useRef<HTMLDivElement | null>(null)
    const iconRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const disableMssgRef = useRef<HTMLDivElement | null>(null)
    const floaterRef = useRef<HTMLDivElement | null>(null)

    const [toolTipMssg, setToolTipMssg] = useState('')
    const [label, setLabel] = useState(props.label)

    const [animeParams, setAnimeParams] = useState<AnimeParams>(mainHelp.setAnimeParameters({
        buttonClick: props.animeTypes.onButtonClick,
        buttonHover: props.animeTypes.onButtonHover,
        iconClick: props.animeTypes.onIconClick,
        iconHover: props.animeTypes.onIconHover
    }))

    useEffect(() => {
        helpHandler.disableHandler({
            buttonRef,
            state: props.disabled ? 'de-activate' : 'activate',
            props: props.disabled ? {
                disableBgColor: props.styles.disableBgColor,
                disableFontColor: props.styles.disableFontColor
            } : {
                normalBgColor: props.styles.bgColor,
                normalFontColor: props.styles.fontColor
            }
        })
    }, [props.disabled])

    useEffect(() => {
        if (!props.entryDone) {
            helpHandler.entry(buttonRef, labelRef, props.animeTypes.onEntry)
        } else if (props.isAddCancelled) {
            setLabel('a')
            gsap.set(labelRef.current, { opacity: 0 })
            clickHandler.clickRemove({
                buttonRef,
                animeType: props.animeTypes.onRemove,
                onComplete: () => props.onRemove()
            })
        } else { setLabel(props.label) }
    }, [props.label])

    useEffect(() => setAnimeParams(mainHelp.setAnimeParameters({
        buttonClick: props.animeTypes.onButtonClick,
        buttonHover: props.animeTypes.onButtonHover,
        iconClick: props.animeTypes.onIconClick,
        iconHover: props.animeTypes.onIconHover
    })), [
        props.animeTypes.onButtonClick,
        props.animeTypes.onButtonHover,
        props.animeTypes.onIconClick,
        props.animeTypes.onIconHover
    ])



    useEffect(() => {
        if (props.submitted) {
            helpHandler.submitted({
                buttonRef
            })
        }
    }, [props.submitted])

    const labelMouse = (state: InOut) => hoverHandler.labelMouse({
        labelRef,
        toolTipRef,
        state,
        toolTipAnime: props.animeTypes.toolTipAnime,
        props: {
            hoverColor: props.styles.hoverFontColor,
            fontColor: props.styles.fontColor
        },
        animeParams,
        showToolTip: props.icon ? false : props.showToolTip
    })

    const pointerLabel = (state: 'in' | 'out', ev: React.PointerEvent) => {
        if (props.showToolTip && !props.icon) setToolTipMssg(props.toolTipMssg.onLabel)
        if (state === 'in' && ev.pointerType === 'mouse') {
            labelMouse(state)
        } else if (state === 'out' && ev.pointerType === 'mouse') {
            labelMouse(state)
        }
    }

    const iconMouse = (state: InOut) => hoverHandler.iconMouse({
        iconRef,
        toolTipRef,
        state,
        animeType: animeParams.iconHover.type,
        toolTipAnime: props.animeTypes.toolTipAnime,
        props: {
            hoverColor: props.styles.hoverCloseIconColor,
            normalColor: props.styles.closeIconColor,
        },
        animeParams,
        showTooltip: props.showToolTip
    })

    const pointerIcon = (state: 'in' | 'out' | 'down' | 'up', ev: React.PointerEvent) => {
        ev.stopPropagation()
        ev.preventDefault()
        if (props.showToolTip) setToolTipMssg(props.toolTipMssg.onRemove)
        if (state === 'in' && ev.pointerType === 'mouse') {
            iconMouse(state)
        } else if (state === 'out' && ev.pointerType === 'mouse') {
            iconMouse(state)
        } else {
            const wobble = animeParams.iconClick.wobble
            clickHandler.iconClick(iconRef, state === 'down' ? 'down' : 'up',
                wobble)
            state === 'up' ? (
                hoverHandler.handleToolTip(toolTipRef, 'hide', props.animeTypes.toolTipAnime),
                clickHandler.clickRemove({
                    buttonRef,
                    animeType: props.animeTypes.onRemove,
                    onComplete: () => props.onRemove?.()
                })
            ) : null
        }
    }

    const normalise = () => {
        hoverHandler.handleToolTip(toolTipRef, 'hide', props.animeTypes.toolTipAnime)
        hoverHandler.buttonMouse({
            buttonRef,
            labelRef,
            iconRef,
            state: 'out',
            enableEdit: props.enableEdit,
            enableRemove: props.enableRemove,
            animeType: props.animeTypes.onButtonHover,
            props: {
                normalFontColor: props.styles.fontColor,
                normalBgColor: props.styles.bgColor,
                onComplete: () => props.onDoubleClick()
            },
            animeParams,
            toolTipRef,
            toolTipAnime: props.animeTypes.toolTipAnime,
            title: props.title,
            svg: props.icon ? true : false
        })
    }

    const buttonTimer = useRef<any>(null)
    const buttonClick = (pointerType: 'touch' | 'mouse' | 'pen') => {
        if (buttonTimer.current && props.enableEdit) {
            clearTimeout(buttonTimer.current)
            if (!props.icon) {
                pointerType === 'mouse' && animeParams.buttonClick.type !== 'none' ? normalise() : props.onDoubleClick()
            } else {
                props.onClick()
            }
            buttonTimer.current = null
        } else {
            if (props.enableEdit) {
                buttonTimer.current = setTimeout(() => {
                    props.onClick()
                    buttonTimer.current = null
                }, 250)
            } else {
                props.onClick()
            }
        }
    }

    const buttonMouse = (state: InOut) => hoverHandler.buttonMouse({
        buttonRef,
        labelRef,
        iconRef,
        state,
        enableEdit: props.enableEdit,
        enableRemove: props.enableRemove,
        animeType: animeParams.buttonHover.type,
        props: {
            hoverFontColor: props.styles.hoverFontColor,
            hoverBgColor: props.styles.hoverBgColor,
            normalFontColor: props.styles.fontColor,
            normalBgColor: props.styles.bgColor,
            hoverSvgColor: props.styles.hoverIconColor,
            svgColor: props.styles.iconColor
        },
        animeParams,
        toolTipRef,
        toolTipAnime: props.animeTypes.toolTipAnime,
        title: props.title,
        svg: props.icon ? true : false
    })

    const buttonPointTimer = useRef<any>(null)
    const pointerButton = (state: 'in' | 'out' | 'down' | 'up', ev: React.PointerEvent) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (state === 'in' && ev.pointerType === 'mouse') {
            if (props.title) setToolTipMssg(props.title)
            buttonMouse(state)
        } else if (state === 'out' && ev.pointerType === 'mouse') {
            buttonMouse(state)
        } else {
            const animeType = animeParams.buttonClick.type
            clickHandler.buttonClick(
                buttonRef,
                state === 'down' ? 'down' : 'up',
                animeType as ButtonClickAnime,
                animeParams
            )
            state === 'up' ? buttonClick(ev.pointerType) : null
            if (ev.pointerType === 'touch' || ev.pointerType === 'pen') {
                if (state === 'up') {
                    clearTimeout(buttonPointTimer.current)
                    buttonPointTimer.current = null
                } else if (state === 'down') {
                    buttonPointTimer.current = setTimeout(() => {
                        helpHandler.floaterHandler({
                            floaterRef,
                            state: 'appear'
                        })
                        floaterRef.current?.focus()
                        buttonPointTimer.current = null
                    }, 500)
                }
            }
        }
    }

    const handleFocus = () => {
        helpHandler.onFocus({
            buttonRef,
            focusColor: props.styles.focusColor
        })
    }

    const handleBlur = () => {
        helpHandler.onBlur(buttonRef)
        buttonRef.current?.blur()
    }

    const handleEnter = (ev: React.KeyboardEvent, state: 'down' | 'up') => {
        if (props.disabled) {
            helpHandler.clickDisable({
                buttonRef,
                mssgRef: disableMssgRef,
            })
        } else {
            mainHelp.enter(ev, {
                buttonRef,
                animeType: props.animeTypes.onButtonClick,
                state: state,
                onClick: () => props.onClick(),
                onDoubleClick: () => props.onDoubleClick(),
                enableEdit: props.enableEdit,
                animeParams
            })
        }
    }

    const handleKeys = (ev: React.KeyboardEvent, state: 'down' | 'up') => {
        const myKey = ev.key
        switch (myKey) {
            case 'Enter': handleEnter(ev, state); break
            case 'Escape': handleBlur(); break
            default: return
        }
    }

    const clickDisabled = (ev: React.PointerEvent) => {
        ev.preventDefault()
        ev.stopPropagation()
        helpHandler.clickDisable({
            buttonRef,
            mssgRef: disableMssgRef
        })
        props.clickedDisabled()
    }

    const buttonCss = {
        backgroundColor: props.styles.bgColor,
        color: props.styles.fontColor,
        fontSize: props.styles.fontSize,
        fontFamily: props.styles.fontFamily,
        fontWeight: props.styles.fontWeight,
        paddingTop: props.styles.paddingY,
        paddingBottom: props.styles.paddingY,
        paddingLeft: props.styles.paddingX,
        paddingRight: props.styles.paddingX,
        borderRadius: props.styles.borderRadius,
    }

    const toolTipCss = {
        backgroundColor: props.styles.toolTipBgColor,
        color: props.styles.toolTipFontColor,
        fontSize: props.styles.toolTipFontSize,
        borderRadius: props.styles.toolTipBorderRadius,
        border: `${props.styles.toolTipBorderSize}px solid ${props.styles.toolTipBorderColor}`,
        paddingTop: props.styles.toolTipPaddingY,
        paddingBottom: props.styles.toolTipPaddingY,
        paddingLeft: props.styles.toolTipPaddingX,
        paddingRight: props.styles.toolTipPaddingX,
    }

    const closeIconCss = {
        fill: props.styles.closeIconColor,
        width: props.styles.closeIconSize,
        height: props.styles.closeIconSize,
        opacity: 0,
    }

    const floaterCss = {
        fill: props.styles.floaterIconColor,
        width: props.styles.floaterIconSize,
        height: props.styles.floaterIconSize,
    }

    const disableMssgCss = {
        fontSize: props.styles.disableMssgFontSize,
        backgroundColor: props.styles.disableMssgBgColor,
        color: props.styles.disableMssgFontColor,
        border: `${props.styles.disableMssgBorderSize}px solid ${props.styles.disableMssgBorderColor}`,
        borderRadius: props.styles.disableMssgBorderRadius,
        paddingTop: props.styles.disableMssgPaddingY,
        paddingBottom: props.styles.disableMssgPaddingY,
        paddingLeft: props.styles.disableMssgPaddingX,
        paddingRight: props.styles.disableMssgPaddingX,
    }

    const labelCss = {
        width: props.icon ? props.styles.iconSize : '',
        height: props.icon ? props.styles.iconSize : '',
        fill: props.icon ? props.styles.iconColor : '',
        '--selectBg': 'yellow',
        '--selectTxt': 'red'
    }

    return (
        <div className="relative">

            <button style={buttonCss} ref={buttonRef} onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                onKeyDown={(ev) => handleKeys(ev, 'down')}
                onKeyUp={(ev) => handleKeys(ev, 'up')}
                onPointerEnter={(ev) => !props.disabled ? pointerButton('in', ev) : null}
                onPointerLeave={(ev) => !props.disabled ? pointerButton('out', ev) : null}
                onPointerDown={(ev) => !props.disabled ? pointerButton('down', ev) : clickDisabled(ev)}
                onPointerUp={(ev) => !props.disabled ? pointerButton('up', ev) : null}
                className="cursor-pointer relative z-[1] outline-none">

                <p ref={labelRef} style={labelCss} className="whitespace-nowrap meSelect"
                    // className="flex justify-center items-center"
                    onPointerEnter={(ev) => props.enableEdit && !props.disabled ? pointerLabel('in', ev) : null}
                    onPointerLeave={(ev) => props.enableEdit && !props.disabled ? pointerLabel("out", ev) : null}
                >{props.icon ? props.icon : label}</p>

                {props.enableRemove && !props.disabled ? <div style={closeIconCss} ref={iconRef}
                    onPointerEnter={(ev) => pointerIcon('in', ev)}
                    onPointerLeave={(ev) => pointerIcon('out', ev)}
                    onPointerDown={(ev) => pointerIcon('down', ev)}
                    onPointerUp={(ev) => pointerIcon('up', ev)}
                    className="absolute top-2 right-2 z-[2]">
                    <CloseIcon />
                </div> : null}

            </button>

            {props.showToolTip || props.title ?
                <div style={toolTipCss} ref={toolTipRef}
                    className={`absolute bottom-full right-2 px-2 py-1 mb-1
                    text-center whitespace-nowrap w-fit opacity-0 translate-y-[20px] 
                    ${props.animeTypes.onButtonHover === 'arise' ? 'mb-2' : ''}`}
                >{toolTipMssg}</div> : null}

            {props.disabled ? <div style={disableMssgCss} ref={disableMssgRef}
                className="absolute text-center top-full left-1/2 -translate-x-1/2
                whitespace-nowrap w-fit opacity-0 mt-1 py-1 px-2 cursor-default"
            >{props.disabledMessage}</div> : null}

            {props.enableRemove && !props.disabled ? <div style={floaterCss}
                tabIndex={0}
                ref={floaterRef}

                onBlur={() => helpHandler.floaterHandler({
                    floaterRef,
                    state: 'disappear'
                })}

                onPointerDown={() => clickHandler.floterClick({
                    floaterRef,
                    state: 'down'
                })}

                onPointerUp={() => {
                    clickHandler.floterClick({
                        floaterRef,
                        state: 'up',
                    })
                    helpHandler.floaterHandler({
                        floaterRef,
                        state: 'disappear'
                    })
                    clickHandler.clickRemove({
                        buttonRef,
                        animeType: props.animeTypes.onRemove,
                        onComplete: () => props.onRemove?.()
                    })
                }}

                className="absolute mb-1 bottom-full right-2 opacity-0 outline-none">
                <TrashIcon />
            </div> : null}
        </div>
    )
}

export default MainButton
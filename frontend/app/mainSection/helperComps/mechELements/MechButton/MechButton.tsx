// title: Ultimate React Button Build | Coding Depth Ep. 1

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import MainButton, { type MainButtonCss } from "./MainButton"
import EditButton, { type EditButtonCss } from "./EditButton"
import './element.css'
import type { ButtonClickAnime, ButtonHoverAnime, CloseIconAnime, IconClickWobble, LoaderTimer, LoaderTypes, OnEntryAnime, OnRemoveAnime, SpecialChars, ToolTipAnime } from "./myTypes"
import LoadingButton, { type LoadCss } from "./LoadingButton"

type Props = {
    label?: string
    styles?: MechButtonStyles
    enableEdit?: boolean
    enableRemove?: boolean
    disabled?: boolean
    disabledMessage?: string
    onClick?: () => void
    onSubmit?: (newValue: string, oldValue: string) => void
    onRemove?: () => void
    clickedDisable?: () => void
    onAddSuccess?: (value: string) => void
    animations?: AnimationTypes
    toolTipMssg?: ToolTipMessage
    widthSlack?: number
    maxChars?: number
    allowedChars?: AllowedChars
    openInEditMode?: boolean
    showToolTip?: boolean
    title?: string
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>> | null
    isLoading?: boolean
    loaderMessage?: string
    loaderType?: LoaderTypes
    loaderTimer?: LoaderTimer
    loaderTimerStopped?: () => void
}

export type ToolTipMessage = {
    onLabel?: string
    onRemove?: string
}

export type AllowedCharFormat = 'alphabetic' | 'numeric' | 'alphanumeric'
export type AllowedSpecialChar = 'all' | 'none' | SpecialChars[]
export type SpecialCharacters = SpecialChars
export type AllowedChars = {
    format?: AllowedCharFormat
    space?: boolean
    specialChars?: AllowedSpecialChar
    emoji?: boolean
}

export type AnimationTypes = {
    onIconHover?: CloseIconAnime
    toolTipAnime?: ToolTipAnime
    onButtonHover?: ButtonHoverAnime
    onIconClick?: IconClickWobble
    onButtonClick?: ButtonClickAnime
    onRemove?: OnRemoveAnime
    onEntry?: OnEntryAnime
}

export type MechButtonStyles = {
    bgColor?: string
    fontColor?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: number
    paddingX?: string
    paddingY?: string
    borderRadius?: string
    toolTipBgColor?: string
    toolTipFontColor?: string
    toolTipBorderSize?: number
    toolTipBorderColor?: string
    toolTipFontSize?: string
    toolTipBorderRadius?: string
    toolTipPaddingX?: string
    toolTipPaddingY?: string
    closeIconColor?: string
    closeIconSize?: string
    editIconSize?: string
    floaterIconColor?: string
    floaterIconSize?: string
    disableMssgFontSize?: string
    disableMssgFontColor?: string
    disableMssgBorderColor?: string
    disableMssgBorderSize?: string
    disableMssgBorderRadius?: string
    disableMssgBgColor?: string
    disableMssgPaddingX?: string
    disableMssgPaddingY?: string
    hoverFontColor?: string
    hoverCloseIconColor?: string
    hoverBgColor?: string
    disableBgColor?: string
    disableFontColor?: string
    focusColor?: string
    errorColor?: string
    iconSize?: string
    iconColor?: string
    hoverIconColor?: string
    spinnerDimension?: string
    spinnerSize?: string
}


const MechButton = ({ ...props }: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [label, setLabel] = useState<string>(props.label ?? 'MechE/Techy')
    const [submitted, setSubmitted] = useState(false)

    const [enteryDone, setEntryDone] = useState(false)
    const [addCancel, setAddCancel] = useState(false)
    const [openInEditMode, setOpenInEditMode] = useState(props.openInEditMode ?? false)
    const [loader, setLoader] = useState(Boolean(props.isLoading))

    useEffect(() => {
        setTimeout(() => setEntryDone(true), 100)
    }, [])

    useLayoutEffect(() => {
        if (openInEditMode) {
            setIsEditMode(true)
        }
    }, [])

    useEffect(() => {
        setLabel(props.label ?? label)
    }, [props.label])

    useLayoutEffect(() => {
        if (props.isLoading === true) {
            setLoader(true)
        }
    }, [props.isLoading])

    const baseCss = {
        bgColor: props.styles?.bgColor ?? '#3685cf',
        fontColor: props.styles?.fontColor ?? '#d6e9e7',
        fontSize: props.styles?.fontSize ?? '14px',
        fontFamily: props.styles?.fontFamily ?? 'Quicksand',
        fontWeight: props.styles?.fontWeight ?? 500,
        paddingX: props.styles?.paddingX ?? '22px',
        paddingY: props.styles?.paddingY ?? '5px',
        borderRadius: props.styles?.borderRadius ?? '0.8rem',
        focusColor: props.styles?.focusColor ?? '#eee8a9'
    }

    const mainCss: MainButtonCss = {
        ...baseCss,
        toolTipBgColor: props.styles?.toolTipBgColor ?? 'transparent',
        toolTipFontColor: props.styles?.toolTipFontColor ?? 'white',
        toolTipBorderSize: props.styles?.toolTipBorderSize ?? 2,
        toolTipBorderColor: props.styles?.toolTipBorderColor ?? 'white',
        toolTipFontSize: props.styles?.toolTipFontSize ?? '10px',
        toolTipBorderRadius: props.styles?.toolTipBorderRadius ?? '0.5rem',
        toolTipPaddingX: props.styles?.toolTipPaddingX ?? '8px',
        toolTipPaddingY: props.styles?.toolTipPaddingY ?? '2px',

        closeIconColor: props.styles?.closeIconColor ?? '#8aa6c1',
        hoverCloseIconColor: props.styles?.hoverCloseIconColor ?? '#eee8a9',
        closeIconSize: props.styles?.closeIconSize ?? '9px',

        floaterIconColor: props.styles?.floaterIconColor ?? 'white',
        floaterIconSize: props.styles?.floaterIconSize ?? '18px',

        disableMssgFontSize: props.styles?.disableMssgFontSize ?? '12px',
        disableMssgFontColor: props.styles?.disableMssgFontColor ?? '#ff4a3d',
        disableMssgBorderColor: props.styles?.disableMssgBorderColor ?? 'transparent',
        disableMssgBorderSize: props.styles?.disableMssgBorderSize ?? '0',
        disableMssgBorderRadius: props.styles?.disableMssgBorderRadius ?? '',
        disableMssgBgColor: props.styles?.disableMssgBgColor ?? 'transparent',
        disableMssgPaddingX: props.styles?.disableMssgPaddingX ?? '',
        disableMssgPaddingY: props.styles?.disableMssgPaddingY ?? '',

        hoverFontColor: props.styles?.hoverFontColor ?? '#eee8a9',
        hoverBgColor: props.styles?.hoverBgColor ?? '#3685cfd3',

        iconSize: props.styles?.iconSize ?? '20px',
        iconColor: props.styles?.iconColor ?? 'white',
        hoverIconColor: props.styles?.hoverIconColor ?? '#eee8a9',

        disableBgColor: props.styles?.disableBgColor ?? '#a2acbd',
        disableFontColor: props.styles?.disableFontColor ?? '#5a5b5d',
    }

    const editCss: EditButtonCss = {
        ...baseCss,
        editIconSize: props.styles?.editIconSize ?? '14px',
        errorColor: props.styles?.errorColor ?? '#ff4a3d'
    }

    const loadCss: LoadCss = {
        ...baseCss,
        spinnerDimension: props.styles?.spinnerDimension ?? '20px',
        spinnerSize: props.styles?.spinnerSize ?? '',
    }

    const doubleClick = () => {
        setSubmitted(false)
        setIsEditMode(!isEditMode)
    }

    const click = () => {
        props.onClick?.()
    }

    const submit = (newValue: string) => {
        setSubmitted(true)
        const oldValue = label
        setLabel(newValue)
        setIsEditMode(false)
        props.onSubmit?.(newValue, oldValue)
        if (openInEditMode) {
            props.onAddSuccess?.(newValue)
            setOpenInEditMode(false)
        }
    }

    const disableEditMode = () => {
        setIsEditMode(false)
    }

    const cancelAddButton = () => {
        setAddCancel(true)
        props.onRemove?.()
    }

    return (
        <>{isEditMode ?
            <EditButton label={label} styles={editCss} onClick={click}
                onSubmit={(value) => submit(value)}
                openInEditMode={openInEditMode}
                onRemove={() => cancelAddButton()}
                widthSlack={props.widthSlack ?? 15}
                maxChars={props.maxChars ?? 30}
                allowedChars={{
                    format: props.allowedChars?.format ?? 'alphanumeric',
                    space: props.allowedChars?.space ?? true,
                    emoji: props.allowedChars?.emoji ?? true,
                    specialChars: props.allowedChars?.specialChars ?? 'all'
                }}
                disableEdit={disableEditMode} /> :
            (!loader ?
                <MainButton onClick={click} label={label} styles={mainCss}
                    onDoubleClick={doubleClick}
                    submitted={submitted}
                    entryDone={enteryDone}
                    icon={props.icon ?? null}
                    disabledMessage={props.disabledMessage ?? 'Please fill the required fields.'}
                    isAddCancelled={addCancel}
                    onRemove={() => props.onRemove?.()}
                    clickedDisabled={() => props.clickedDisable?.()}
                    enableRemove={props.enableRemove ?? false}
                    enableEdit={props.enableEdit ?? false}
                    disabled={props.disabled ?? false}
                    showToolTip={props.showToolTip ?? true}
                    title={props.title ?? ''}
                    animeTypes={{
                        onIconHover: props.animations?.onIconHover ?? 'pop',
                        toolTipAnime: props.animations?.toolTipAnime ?? 'stretch',
                        onButtonHover: props.animations?.onButtonHover ?? 'highlight',
                        onIconClick: props.animations?.onIconClick ?? 'wobble-[20]',
                        onButtonClick: props.animations?.onButtonClick ?? 'tap',
                        onRemove: props.animations?.onRemove ?? 'fade-out',
                        onEntry: props.animations?.onEntry ?? 'none'
                    }}
                    toolTipMssg={{
                        onLabel: props.toolTipMssg?.onLabel ?? 'rename',
                        onRemove: props.toolTipMssg?.onRemove ?? 'remove'
                    }} /> :
                <LoadingButton styles={loadCss}
                    label={label}
                    loaderTinerStopped={() => props.loaderTimerStopped?.()}
                    loaderType={props.loaderType ?? 'spinner1'}
                    loaderTimer={props.loaderTimer ?? "02:00"}
                    isLoading={props.isLoading ?? false}
                    endLoader={() => setLoader(false)}
                    loaderMessage={props.loaderMessage ?? label}
                />)
        }

        </>
    )
}

export default MechButton
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import inputHandler from "./inputAnime"
import inputHelp from "./inputHelpers"
import { EditIcon } from "./icons"
import type { SpecialChars } from "./myTypes"
import clickHandler from "./clickAnime"


type Props = {
    label: string
    styles: EditButtonCss
    onClick: () => void
    onSubmit: (value: string) => void
    disableEdit: () => void
    widthSlack: number
    maxChars: number
    allowedChars: {
        format: 'alphabetic' | 'numeric' | 'alphanumeric'
        space: boolean
        specialChars: 'all' | 'none' | SpecialChars[]
        emoji: boolean
    }
    openInEditMode: boolean
    onRemove: () => void
}

export type EditButtonCss = {
    bgColor: string,
    fontColor: string,
    fontSize: string,
    fontFamily: string,
    paddingX: string,
    paddingY: string,
    borderRadius: string,
    editIconSize: string,
    focusColor: string,
    errorColor: string
}

const EditButton = ({ ...props }: Props) => {

    const [label, setLabel] = useState(props.label)

    const [value, setValue] = useState(label)

    const inputRef = useRef<HTMLInputElement | null>(null)
    const labelRef = useRef<HTMLDivElement | null>(null)
    const valueRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const iconRef = useRef<HTMLDivElement | null>(null)

    const widthSlack = props.widthSlack
    const allowedRegex = useRef(inputHelp.getRegex(props.allowedChars))

    useEffect(() => {
        allowedRegex.current = (inputHelp.getRegex(props.allowedChars))
    }, [
        props.allowedChars.emoji,
        props.allowedChars.format,
        props.allowedChars.space,
        props.allowedChars.specialChars,
    ])

    const styles = {
        backgroundColor: props.styles.bgColor,
        color: props.styles.fontColor,
        fontSize: props.styles.fontSize,
        fontFamily: props.styles.fontFamily,
        paddingTop: props.styles.paddingY,
        paddingBottom: props.styles.paddingY,
        paddingLeft: props.styles.paddingX,
        paddingRight: props.styles.paddingX,
        borderRadius: props.styles.borderRadius,
    }

    const referenceDivStyle = {
        fontFamily: props.styles.fontFamily,
        fontSize: props.styles.fontSize,
        transform: 'scale(0.9, 0.8)'
    }

    const enableEdit = () => inputHandler.enableEdit({
        inputRef,
        labelRef,
        buttonRef,
        widthSlack: widthSlack,
        focusColor: props.styles.focusColor,
        iconRef,
    })

    useEffect(() => {
        if (props.openInEditMode) {
            if (inputRef.current) inputRef.current.value = ''
            setLabel('')
            inputHandler.entryAnime(buttonRef, () => enableEdit())
        } else {
            if (inputRef.current) inputRef.current.value = label
            enableEdit()
        }
    }, [])

    const handleEnter = () => {
        const value = inputRef.current?.value?.trim() ?? ''
        if (!value || value === label) {
            disableEditMode(() => props.disableEdit())
        } else {
            setLabel(value)
            setTimeout(() => disableEditMode(() => props.onSubmit(value)), 10)
        }
    }

    const disableEditMode = (onComplete: () => void) => inputHandler.disableEdit({
        inputRef,
        labelRef,
        buttonRef,
        iconRef,
        onComplete: () => onComplete()
    })

    const handleEscape = () => {
        disableEditMode(() => {
            if (props.openInEditMode) {
                clickHandler.clickRemove({
                    buttonRef,
                    animeType: 'shrink',
                    onComplete: () => {
                        props.disableEdit()
                        props.onRemove()
                    }
                })
            } else {
                props.disableEdit()
            }
        })
    }

    const handleKeys = (ev: React.KeyboardEvent) => {
        const myKey = ev.key
        switch (myKey) {
            case 'Enter': handleEnter(); break
            case 'Escape': handleEscape(); break
        }

    }

    useLayoutEffect(() => {
        const labelWidth = (labelRef.current?.offsetWidth ?? 0) + widthSlack
        const valueWidth = (valueRef.current?.offsetWidth ?? 0) + widthSlack
        let myWidth = 0
        valueWidth <= labelWidth ? myWidth = labelWidth : myWidth = valueWidth
        inputHandler.setWidth({
            inputRef,
            width: myWidth
        })
    }, [value])

    const shake = () => inputHandler.shake({
        buttonRef,
        iconRef,
        errorColor: props.styles.errorColor,
        fontColor: props.styles.fontColor,
        focusColor: props.styles.focusColor,
    })

    const prevLen = useRef<number>(props.label.length)
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const elem = ev.target
        const cur_val = elem.value
        const valLen = cur_val.length
        const cursorAt = elem.selectionStart ?? 0
        const slice_1 = cur_val.substring(0, cursorAt)
        const slice_2 = cur_val.substring(cursorAt, valLen)
        const charsOfSlice1 = [...inputHelp.segmentation.segment(slice_1)].map(s => s.segment)
        const lastChar = charsOfSlice1.at(-1)

        const trimLastChar = () => {
            const newSlice = charsOfSlice1.slice(0, charsOfSlice1.length - 1)
            const newVal = newSlice.join('') + slice_2
            elem.value = newVal
            elem.setSelectionRange(cursorAt - 1, cursorAt - 1)
            shake()
        }

        if (valLen > props.maxChars) trimLastChar()
        else if (lastChar === ' ' && !props.allowedChars.space) trimLastChar()
        else if (lastChar === ' ' && valLen > prevLen.current) setValue(prev => prev + 't')
        else if (lastChar === ' ' && valLen <= prevLen.current) setValue(value.substring(0, valLen - 1))
        else if (!allowedChar(lastChar ?? '')) trimLastChar()
        else setValue(cur_val.replaceAll(' ', 't'))

        prevLen.current = valLen
    }

    const allowedChar = (char: string) => {
        return inputHelp.isAllowedChar(
            char, allowedRegex.current,
            props.allowedChars.specialChars === 'none' ? true : false,
            props.allowedChars.emoji
        )
    }

    const handlePaste = (ev: React.ClipboardEvent<HTMLInputElement>) => {
        ev.preventDefault()
        const elem = ev.currentTarget
        const pastedVal = ev.clipboardData.getData('text')
        const curVal = elem.value
        const startPos = elem.selectionStart ?? 0
        const endPos = elem.selectionEnd ?? 0
        const valLen = curVal.length

        let error = false

        const slice_1 = curVal.substring(0, startPos)
        const slice_2 = curVal.substring(endPos, valLen)

        const charsOfPasted = [...inputHelp.segmentation.segment(pastedVal)].map(s => s.segment)
        const cleanVal = charsOfPasted.filter(char => {
            if (char === ' ' && props.allowedChars.space) return true
            else if (allowedChar(char)) return true
            else {
                error = true
                return false
            }
        })

        const newSlice_1 = slice_1 + cleanVal.join('')
        const cursorAt = newSlice_1.length
        const newValue = newSlice_1 + slice_2

        let valToPaste = ''
        if (newValue.length > props.maxChars) {
            error = true
            valToPaste = newValue.substring(0, props.maxChars)
        } else {
            valToPaste = newValue
        }
        elem.value = valToPaste
        elem.setSelectionRange(cursorAt, cursorAt)

        setValue(valToPaste.replaceAll(' ', 't'))

        if (error) shake()
    }

    return (
        <div className="relative">
            <button ref={buttonRef} style={styles} className="relative z-[1]">
                <input ref={inputRef} type="text" className="text-center outline-none"
                    onKeyDown={(event) => handleKeys(event)}
                    onBlur={() => handleEscape()} spellCheck={false}
                    onChange={(ev) => handleChange(ev)}
                    onPaste={(ev) => handlePaste(ev)}
                />

                <div style={{
                    width: props.styles.editIconSize,
                    height: props.styles.editIconSize,
                    fill: props.styles.focusColor,
                    opacity: 0
                }} ref={iconRef}
                    className="absolute top-1 right-2">
                    <EditIcon />
                </div>

            </button>

            <div ref={valueRef} style={referenceDivStyle} className="absolute opacity-0 top-2 left-2" >
                {value}
            </div>

            <div ref={labelRef} style={referenceDivStyle} className="absolute opacity-0 top-2 left-2" >
                {label}
            </div>

        </div>
    )
}

export default EditButton
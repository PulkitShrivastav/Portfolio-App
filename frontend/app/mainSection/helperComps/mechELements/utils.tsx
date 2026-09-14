import React, { useState } from "react"

type InputProps = {
    label: string
    value: string
    setValue: (value: string, ev: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void
    onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void
    onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void
    onPointerDown?: (ev: React.PointerEvent<HTMLInputElement>) => void
}
export const TextInput = ({ ...props }: InputProps) => {
    return (
        <div>
            <label className="block text-[#7A5C43] uppercase mb-1.5 text-[11px]">
                {props.label}
            </label>
            <input
                type="text"
                value={props.value}
                onFocus={(ev) => props.onFocus?.(ev)}
                onChange={(e) => props.setValue(e.target.value, e)}
                onKeyDown={(e) => props.onKeyDown?.(e)}
                onBlur={(e) => props.onBlur?.(e)}
                onClick={(e) => props.onClick?.(e)}
                onPointerDown={(e) => props.onPointerDown?.(e)}
                className="w-full bg-transparent border-b border-[#1A1A1A]/30 pb-1 text-[#1A1A1A] focus:outline-none focus:border-[#E27D60] transition-colors rounded-none"
            />
        </div>
    )
}

type SliderProps = {
    label: string
    value: number
    formatedValue: string
    accent?: boolean
    setValue: (val: string) => void
    max: number
    min: number
}
export const Slider = ({ ...props }: SliderProps) => {
    return (
        <div>
            <div className="flex justify-between items-center text-[10px] text-[#7A5C43] uppercase mb-1">
                <span>{props.label}</span>
                <span className="font-bold text-[#1A1A1A]">{props.formatedValue}</span>
            </div>
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={1}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                className={`w-full cursor-pointer ${props.accent ? 'accent-[#E27D60]' : 'accent-[#1A1A1A]'}`}
            />
        </div>
    )
}

type StyledButtonProps = {
    label: string
    onClick: () => void
    parameter: boolean
    trueValue?: string
    falseValue?: string
    accent?: boolean
}
export const StyledButton = ({ ...props }: StyledButtonProps) => {

    const accent = props.accent ?? false

    return (
        <div className="flex items-center justify-between">
            <span className={`uppercase text-[10px] 
                ${accent ? 'text-[#E27D60] font-bold' : 'text-[#7A5C43]'}`}>
                {props.label}
            </span>
            <button
                onClick={props.onClick}
                className={`px-2.5 py-1 border border-[#1A1A1A] transition-colors text-[10px] cursor-pointer
                            ${props.parameter
                        ? `text-white ${props.accent ?
                            'bg-[#E27D60] border-[#E27D60]' : 'bg-[#1A1A1A] text-[#F5F2EB]'
                        }`
                        : "bg-transparent text-[#1A1A1A]"
                    }`}
            >
                {props.parameter ? (props.trueValue ? props.trueValue : "TRUE") :
                    (props.falseValue ? props.falseValue : "FALSE")}
            </button>
        </div>
    )
}

type DropdownProps = {
    label: string
    options: string[]
    setValue: (value: string) => void
    startValue?: string
}
export const Dropdown = ({ ...props }: DropdownProps) => {
    const [value, setValue] = useState(props.startValue ?? props.options[0])
    return (
        <div>
            <label className="block text-[#7A5C43] uppercase text-[10px] mb-1">
                {props.label}
            </label>
            <select
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    props.setValue(e.target.value)
                }}
                className="w-full bg-[#F5F2EB] border border-[#1A1A1A]/30 
                py-1 px-1.5 text-[#1A1A1A] focus:outline-none text-[11px]
                rounded-none"
            >
                {props.options.map((opt, indx) => <option key={indx} value={opt}> {opt} </option>)}
            </select>
        </div>
    )
}
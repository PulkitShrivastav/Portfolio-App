import React, { createContext, useContext, useState, type SetStateAction } from "react";

type ElemCntxType = {
    activeComponent: string
    setActiveComponent: React.Dispatch<SetStateAction<string>>
    allowEmoji: boolean
    setAllowEmoji: React.Dispatch<SetStateAction<boolean>>
    enableEdit: boolean
    setEnableEdit: React.Dispatch<SetStateAction<boolean>>
    enableRemove: boolean
    setEnableRemove: React.Dispatch<SetStateAction<boolean>>
    disabled: boolean
    setDisabled: React.Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    timerSeconds: number
    setTimerSeconds: React.Dispatch<SetStateAction<number>>
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
    loaderType: string
    setLoaderType: React.Dispatch<SetStateAction<string>>
    loaderMessage: string
    setLoaderMessage: React.Dispatch<SetStateAction<string>>
    btnClickAnime: string
    setBtnClickAnime: React.Dispatch<SetStateAction<string>>
    btnHoverAnime: string
    setBtnHoverAnime: React.Dispatch<SetStateAction<string>>
    iconHoverAnime: string
    setIconHoverAnime: React.Dispatch<SetStateAction<string>>
    iconRemoveAnime: string
    setIconRemoveAnime: React.Dispatch<SetStateAction<string>>
    iconWobbleIntensity: number
    setIconWobbleIntensity: React.Dispatch<SetStateAction<number>>
    allowSpace: boolean
    setAllowSpace: React.Dispatch<SetStateAction<boolean>>
    charCapacity: number
    setCharCapacity: React.Dispatch<SetStateAction<number>>
    telemetry: string
    setTelemetry: React.Dispatch<SetStateAction<string>>
    logEvent: (msg: string) => void
    inputLabel: string
    setInputLabel: React.Dispatch<SetStateAction<string>>
    inputPlaceholder: string
    setInputPlaceholder: React.Dispatch<SetStateAction<string>>
    inputValue: string
    setInputValue: React.Dispatch<SetStateAction<string>>
    inputError: boolean
    setInputError: React.Dispatch<SetStateAction<boolean>>
    labelFormat: string
    setLabelFormat: React.Dispatch<SetStateAction<string>>
    specialChars: string | string[]
    setSpecialChars: React.Dispatch<SetStateAction<string | string[]>>
    showTtlp: boolean
    setShowTtlp: React.Dispatch<SetStateAction<boolean>>
    tltpAnime: string
    setTltpAnime: React.Dispatch<SetStateAction<string>>
    buttonAlive: boolean
    setButtonAlive: React.Dispatch<SetStateAction<boolean>>
}

const Cntx = createContext<ElemCntxType | null>(null)

export const MechElemCntx = ({ children }: { children: React.ReactNode }) => {
    const [activeComponent, setActiveComponent] = useState("button")

    const [enableEdit, setEnableEdit] = useState(true)
    const [enableRemove, setEnableRemove] = useState(true)
    const [disabled, setDisabled] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [loaderType, setLoaderType] = useState("timer")
    const [timerSeconds, setTimerSeconds] = useState(15)
    const [loaderMessage, setLoaderMessage] = useState("Processing Pipeline")

    const [btnClickAnime, setBtnClickAnime] = useState("tap")
    const [btnHoverAnime, setBtnHoverAnime] = useState("highlight")
    const [iconHoverAnime, setIconHoverAnime] = useState("highlight")
    const [iconRemoveAnime, setIconRemoveAnime] = useState("fade-out")
    const [iconWobbleIntensity, setIconWobbleIntensity] = useState(20)
    const [charCapacity, setCharCapacity] = useState(28)

    const [showTtlp, setShowTtlp] = useState(true)
    const [tltpAnime, setTltpAnime] = useState("stretch")

    const [inputLabel, setInputLabel] = useState("Access Key")
    const [inputPlaceholder, setInputPlaceholder] = useState("Enter alphanumeric key...")
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState(false)

    const [allowEmoji, setAllowEmoji] = useState(true)
    const [allowSpace, setAllowSpace] = useState(true)
    const [labelFormat, setLabelFormat] = useState('alphanumeric')
    const [specialChars, setSpecialChars] = useState<string | string[]>('none')

    const [buttonAlive, setButtonAlive] = useState(true)

    const [telemetry, setTelemetry] = useState<string>("[SYS_READY] Calibration bench online.")

    const logEvent = (msg: string) => {
        setTelemetry(`[${new Date().toLocaleTimeString()}] ${msg}`)
    }

    const values = {
        activeComponent,
        setActiveComponent,
        allowEmoji,
        setAllowEmoji,
        enableEdit,
        setEnableEdit,
        enableRemove,
        setEnableRemove,
        disabled,
        setDisabled,
        timerSeconds,
        setTimerSeconds,
        isLoading,
        setIsLoading,
        loaderType,
        setLoaderType,
        loaderMessage,
        setLoaderMessage,
        btnClickAnime,
        setBtnClickAnime,
        btnHoverAnime,
        setBtnHoverAnime,
        iconHoverAnime,
        setIconHoverAnime,
        iconRemoveAnime,
        setIconRemoveAnime,
        iconWobbleIntensity,
        setIconWobbleIntensity,
        allowSpace,
        setAllowSpace,
        labelFormat,
        setLabelFormat,
        charCapacity,
        setCharCapacity,
        telemetry,
        setTelemetry,
        logEvent,
        inputLabel,
        setInputLabel,
        inputPlaceholder,
        setInputPlaceholder,
        inputValue,
        setInputValue,
        inputError,
        setInputError,
        specialChars,
        setSpecialChars,
        showTtlp,
        setShowTtlp,
        tltpAnime,
        setTltpAnime,
        buttonAlive,
        setButtonAlive
    }

    return (
        <Cntx.Provider value={values} >{children}</Cntx.Provider>
    )
}

export const useMechElemCntx = () => {
    const context = useContext(Cntx)
    if (!context) {
        throw new Error("Error No Context")
    }
    return context
}
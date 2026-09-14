import clickHandler from "./clickAnime"
import type { ButtonClickAnime, ButtonHoverAnime, CloseIconAnime, DownUp, IconClickWobble } from "./myTypes"

// type JiggleIndex = 'x' | 'y' | 'd'
type ButtonClick = {
    type: ButtonClickAnime
    jiggle: {
        x: number
        y: number
        d: number
    }
}

type AriseIndex = 'i' | 'l' | 'b' | 'd'
type ButtonHover = {
    type: ButtonHoverAnime,
    arise: {
        i: number
        l: number
        b: number
        d: number
    }
}

type IconClick = { type: IconClickWobble, wobble: number }

type IconHover = { type: CloseIconAnime, wiggle: number, pop: number }

export type AnimeParams = {
    buttonClick: ButtonClick,
    buttonHover: ButtonHover,
    iconClick: IconClick,
    iconHover: IconHover,
}

const formatButtonClick = (value: ButtonClickAnime) => {
    let response = { x: 1.3, y: 0.7, d: 0.8 }
    if (value.includes('-')) {
        const animeType = value.substring(0, value.indexOf('-'))
        const start = value.indexOf('[') + 1
        const end = value.length - 1
        const formattedValue = value.substring(start, end)
        const modifyResponse = (val: string) => {
            const vals = val.split(':')
            if (vals[0] === 'x') {
                response.x = Number(`1.${vals[1]}`)
            } else if (vals[0] === 'y') {
                response.y = Number(`0.${vals[1]}`)
            } else if (vals[0] === 'd') {
                response.d = Number(vals[1])
            }
        }
        if (formattedValue.includes(',')) {
            const params = formattedValue.split(',')
            params.forEach((val, indx) => {
                modifyResponse(val)
            })
            return {
                type: animeType,
                jiggle: response
            } as ButtonClick
        } else {
            modifyResponse(formattedValue)
            return {
                type: animeType,
                jiggle: response
            } as ButtonClick
        }
    } else {
        return {
            type: value,
            jiggle: response
        } as ButtonClick
    }
}

const formatButtonHover = (value: ButtonHoverAnime) => {
    let response = { i: 2, l: 3, b: 5, d: 0.3 }
    if (value.includes('-')) {
        const animeType = value.substring(0, value.indexOf('-'))
        const start = value.indexOf('[') + 1
        const end = value.length - 1
        const formattedValue = value.substring(start, end)
        const modifyResponse = (val: string) => {
            const vals = val.split(':')
            response[vals[0] as AriseIndex] = Number(vals[1])
        }
        if (formattedValue.includes(',')) {
            const params = formattedValue.split(',')
            params.forEach((val, indx) => {
                modifyResponse(val)
            })
            return {
                type: animeType,
                arise: response
            } as ButtonHover
        } else {
            modifyResponse(formattedValue)
            return {
                type: animeType,
                arise: response
            } as ButtonHover
        }
    } else {
        return {
            type: value,
            arise: response
        } as ButtonHover
    }
}

const formatIconClick = (value: IconClickWobble) => {
    if (value.includes('-')) {
        const start = value.indexOf('[') + 1
        const end = value.length - 1
        const formattedValue = value.substring(start, end)
        return {
            type: 'wobble',
            wobble: Number(formattedValue)
        } as IconClick
    } else {
        return {
            type: value,
            wobble: 20
        } as IconClick
    }
}

const formatIconHover = (value: CloseIconAnime) => {
    if (value.includes('-')) {
        const animeType = value.substring(0, value.indexOf('-'))
        const start = value.indexOf('[') + 1
        const end = value.length - 1
        const formattedValue = value.substring(start, end)
        if (animeType === 'pop') {
            return {
                type: 'pop',
                pop: Number(`1.${formattedValue}`),
                wiggle: 10
            } as IconHover
        } else if (animeType === 'wiggle') {
            return {
                type: 'wiggle',
                pop: 1.3,
                wiggle: Number(formattedValue)
            } as IconHover
        }
    } else {
        return {
            type: value,
            wiggle: 10,
            pop: 1.3
        } as IconHover
    }
}

const setAnimeParameters = (params: {
    buttonClick: ButtonClickAnime,
    iconClick: IconClickWobble,
    buttonHover: ButtonHoverAnime,
    iconHover: CloseIconAnime,
}) => {
    return {
        buttonClick: formatButtonClick(params.buttonClick),
        buttonHover: formatButtonHover(params.buttonHover),
        iconClick: formatIconClick(params.iconClick),
        iconHover: formatIconHover(params.iconHover)
    } as AnimeParams
}

const enter = (ev: React.KeyboardEvent, params: {
    buttonRef: React.RefObject<HTMLButtonElement | null>
    animeType: ButtonClickAnime
    state: DownUp
    onClick: () => void
    onDoubleClick: () => void
    enableEdit: boolean
    animeParams: AnimeParams
}) => {
    ev.preventDefault()
    const animeType = params.animeParams.buttonClick.type
    if (params.state === 'down') {
        clickHandler.buttonClick(
            params.buttonRef,
            'down',
            animeType as ButtonClickAnime,
            params.animeParams
        )
    } else {
        clickHandler.buttonClick(
            params.buttonRef,
            'up',
            animeType as ButtonClickAnime,
            params.animeParams
        )
        if (ev.shiftKey && params.enableEdit) {
            params.onDoubleClick()
        } else {
            params.onClick()
        }
    }
}


const mainHelp = {
    enter,
    setAnimeParameters,
}

export default mainHelp
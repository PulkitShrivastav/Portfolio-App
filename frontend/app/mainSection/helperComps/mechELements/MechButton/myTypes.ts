import type React from "react"

export type InOut = 'in' | 'out'
export type DownUp = 'down' | 'up'
export type States = 'in' | 'out' | 'down' | 'up'

export type SpecialChars = '~' | '`' | '@' | '!' | '#' | '$' | '%' | '^' | '&' | '*' | '()' |
    '_' | '-' | '+' | '=' | '{}' | '[]' | '\\' | '|' | '/' | '?' | '<>' | '.' | ',' | ';' | ':' |
    '"' | "'"

export type ToolTipAnime = 'appear' | 'stretch' | 'dash'

export type CloseIconAnime = `wiggle${'' | `-[${number}]`}` |
    `pop${'' | `-[${Digits}]`}` | 'highlight' | 'none'

export type ButtonHoverAnime = 'highlight' | 'none' |
    `arise${'' | `-[${'i' | 'l' | 'b' | 'd'}:${number}]` |
    `-[i:${number},${'l' | 'b' | 'd'}:${number}]` |
    `-[i:${number},l:${number},${'b' | 'd'}:${number}]` |
    `-[i:${number},l:${number},b:${number},d:${number}]`}`

export type ButtonClickAnime = 'tap' | 'bounce' | 'none' |
    `jiggle${'' | `-[${'x' | 'y'}:${Digits}]` | `-[d:${number}]` |
    `-[x:${Digits},y:${Digits}]` |
    `-[${'x' | 'y'}:${Digits},d:${number}]` |
    `-[x:${Digits},y:${Digits},d:${number}]`}`

export type OnEntryAnime = 'pheonix' | 'bounce' | 'none'
export type IconClickWobble = `wobble${'' | `-[${number}]`}` | 'none'

export type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type OnRemoveAnime = 'go-to-right' | 'go-to-left' | 'go-to-down' | 'go-to-up' |
    'fade-out' | 'shrink'

export type DivRef = React.RefObject<HTMLDivElement | null>
export type ButtonRef = React.RefObject<HTMLButtonElement | null>
export type InputRef = React.RefObject<HTMLInputElement | null>
export type ParagraphRef = React.RefObject<HTMLParagraphElement | null>

export type LoaderTypes = 'spinner1' | 'spinner2' | 'timer'
export type LoaderTimer = `${number}:${number}`
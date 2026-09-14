import type { SpecialChars } from "../myTypes"

export type MechButtonStyles = {

    button: {
        bgColor: string
        textColor: string
        fontSize: string

        fontFamily: {
            primary: string
            secondary: string
        }

        fontWeight: {
            primary: number
            secondary: number
        }

        paddingX: string
        paddingY: string
        borderSize: string
        borderColor: string
        borderRadius: string
        position: string
        top: string
        bottom: string
        left: string
        right: string
        marignTop: string
        marginBottom: string
        marginLeft: string
        marginRight: string
        focusColor: string
        errorColor: string
        width: string
        height: string
        translateX: string
        translateY: string
        spinnerDimension: string
        spinnerSize: string
        spinnerColor: string
        selectionBg: string
        selectionText: string
    }

    tooltip: {
        bgColor: string
        textColor: string
        borderSize: string
        borderColor: string
        fontSize: string
        borderRadius: string
        paddingX: string
        paddingY: string
        marginTop: string
        marginLeft: string
        marginBottom: string
        marginRight: string
        top: string
        left: string
        right: string
        bottom: string
        translateY: string
        translateX: string
    }

    icons: {

        close: {
            fill: string
            size: string
            bgColor: string
            top: string
            right: string
            translateY: string
            borderColor: string
            borderSize: string
            borderRadius: string
        }

        edit: {
            fill: string
            size: string
            bgColor: string
            top: string
            right: string
            translateY: string
            borderColor: string
            borderSize: string
            borderRadius: string
        }

        floater: {
            fill: string
            size: string
            bgColor: string
            top: string
            right: string
            left: string
            translateX: string
            translateY: string
            borderColor: string
            borderSize: string
            borderRadius: string
        }

    }

    mssg: {
        fontSize: string
        fontColor: string
        borderColor: string
        borderSize: string
        borderRadius: string
        bgColor: string
        paddingX: string
        paddingY: string
        top: string
        bottom: string
    }

    disabled: {
        bgColor: string
        textColor: string
        borderColor: string
        borderSize: string
    }

    anime: {
        button: {
            click: {
                type: 'jiggle' | 'tap' | 'bounce'
                jiggle: {
                    x: number
                    y: number
                    d: number
                }
                tap: {
                    color: string
                }
            }
            hover: {
                type: 'arise' | 'highlight'
                arise: {
                    icon: number
                    label: number
                    button: number
                    duration: number
                }
                highlight: {
                    bgColor: string
                    textColor: string
                }
            }
        }

        icon: {
            click: {
                type: 'wobble'
                wobble: number
            }
            hover: {
                type: 'pop' | 'highlight' | 'wiggle'
                pop: { scale: number }
                highlight: { fill: string }
            }
        }

        floater: {
            click: {
                type: 'jiggle' | 'tap' | 'bounce'
                jiggle: {
                    x: number
                    y: number
                    d: number
                }
                tap: {
                    color: string
                }
            }
        }
    }

    input: {
        format: 'alphabetic' | 'numeric' | 'alphanumeric'
        space: boolean
        emoji: boolean
        specialChars: 'all' | 'none' | SpecialChars[]
    }

}

type brackets = `[${string}]`
type priSec = 'pri' | 'sec'
type fonts = 'size' | `family-${priSec}` | `weight-${priSec}` | brackets
type padding = `p${'' | 'x' | 'y'}-${brackets}`
type border = 'size' | 'radi' | brackets
type position = 'absolute' | 'static' | 'fixed' | 'relative' | 'sticky'
type TLBR = `${'top' | 'left' | 'bottom' | 'right'}-${brackets}`
type margin = `m${'' | 'x' | 'y' | 't' | 'l' | 'b' | 'r'}-${brackets}`
type numBYnum = `[${`${number}/${number}`}]`
type WH = `${'w' | 'h'}-${brackets | 'fit' | 'full' | numBYnum}`
type translate = `${'-' | ''}translate-${'x' | 'y'}-${numBYnum | brackets}`
type spinner = `spinr-${'dim' | 'size' | 'color'}-${brackets}`
type selection = `slctn-${'bg' | 'text'}-${brackets}`
type BRDR = `brdr-${border}${`-${brackets}` | ''}`
type tootip = 'bg' | 'size' | 'text'
type tooltipPos = `pos-${'tl' | 'tr' | 'bl' | 'br' | 'left' | 'right'}`
type icons = 'close' | 'edit' | 'float'
type midORStr = 'mid' | string
type iconPos = `pos-[${`${'t' | 'l' | 'b' | 'r'}:${midORStr}` |
    `t:${midORStr},${'l' | 'b' | 'r'}:${midORStr}` |
    `t:${midORStr},l:${midORStr},${'b' | 'r'}:${midORStr}` |
    `t:${midORStr},l:${midORStr},b:${midORStr}r:${midORStr}`
    }]`

export type ButtonToken = `bg-[${string}]` | `text-[${string}]` | `fcs-clr-${brackets}` |
    `font-${fonts}-${brackets}` | padding | BRDR | selection | WH | translate | spinner |
    position | TLBR | margin | `err-clr-${brackets}`

export type TooltipToken = `tltp-${border | padding | `${tootip}-${brackets}` |
    margin | TLBR | tooltipPos}`


export type IconToken = `icn-${icons}-${BRDR | `bg-${brackets}` | `text-${brackets}` | `fill-${brackets}` |
    iconPos}`

export type animationToke = ``

// anime: {
//         button: {
//             click: {
//                 type: 'jiggle' | 'tap' | 'bounce'
//                 jiggle: {
//                     x: number
//                     y: number
//                     d: number
//                 }
//                 tap: {
//                     color: string
//                 }
//             }
//             hover: {
//                 type: 'arise' | 'highlight'
//                 arise: {
//                     icon: number
//                     label: number
//                     button: number
//                     duration: number
//                 }
//                 highlight: {
//                     bgColor: string
//                     textColor: string
//                 }
//             }
//         }

//         icon: {
//             click: {
//                 type: 'wobble'
//                 wobble: number
//             }
//             hover: {
//                 type: 'pop' | 'highlight' | 'wiggle'
//                 pop: { scale: number }
//                 highlight: { fill: string }
//             }
//         }

//         floater: {
//             click: {
//                 type: 'jiggle' | 'tap' | 'bounce'
//                 jiggle: {
//                     x: number
//                     y: number
//                     d: number
//                 }
//                 tap: {
//                     color: string
//                 }
//             }
//         }
//     }
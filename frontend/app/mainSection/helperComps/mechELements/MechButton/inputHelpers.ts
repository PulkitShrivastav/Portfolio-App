import type { SpecialChars } from "./myTypes"



const getRegex = (allowedChars: {
    format: 'alphabetic' | 'numeric' | 'alphanumeric'
    space: boolean
    specialChars: 'all' | 'none' | SpecialChars[]
    emoji: boolean
}) => {
    let formatRegex = ''
    if (allowedChars.format === 'alphabetic') formatRegex = '\\p{L}\\p{M}\\p{P}\\p{S}'
    else if (allowedChars.format === 'numeric') formatRegex = '\\p{N}'
    else formatRegex = '\\p{L}\\p{M}\\p{P}\\p{S}\\p{N}'

    let specialCharRegex = ''
    if (allowedChars.specialChars === 'all' || allowedChars.specialChars === 'none') {
        specialCharRegex = '\\^\\[\\]\\-\\\\~`!@#$%.&*()_+={};:\'"<>?/'
    } else {
        const chars = allowedChars.specialChars as SpecialChars[]
        console.log(chars)
        let regExp = ''
        const escapedChars = ['^', '[]', '-', '\\']
        chars.forEach(c => {
            if (escapedChars.includes(c)) {
                c === '[]' ? regExp = regExp + '\\[\\]' : regExp = regExp + `\\${c}`
            } else regExp = regExp + c
        })
        specialCharRegex = regExp
    }

    const allowedRegex = {
        format: RegExp(`[${formatRegex}]`, 'u'),
        specialChar: RegExp(`[${specialCharRegex}]`, 'u'),
        emoji: RegExp('[\\p{Extended_Pictographic}]', 'u')
    }

    return allowedRegex
}

const segmentation = new Intl.Segmenter(undefined, { granularity: 'grapheme' })

const specialCharArray = ['~', '`', '@', '!', '#', '$', '%', '^', '&', '*', '(', ')',
    '_', '-', '+', '=', '{', '}', '[', ']', '\\', ',', '/', '?', '<', '>', '.', ';', ':',
    '"', "'"]
const isAllowedChar = (
    lastChar: string,
    regex: {
        format: RegExp,
        specialChar: RegExp,
        emoji: RegExp
    },
    isNoneChar: boolean,
    emoji: boolean
) => {
    if (lastChar === '') return true
    if (regex.emoji.test(lastChar) && emoji) return true
    else if (regex.emoji.test(lastChar) && !emoji) return false
    else if (specialCharArray.includes(lastChar)) {
        if (isNoneChar) return false
        else if (regex.specialChar.test(lastChar)) return true
        else return false
    }
    else if (regex.format.test(lastChar)) return true
    else return false
}

const inputHelp = {
    getRegex,
    segmentation,
    isAllowedChar,
}

export default inputHelp
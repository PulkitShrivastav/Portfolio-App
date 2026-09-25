import type React from "react";

export function rgba(hex: string, alpha: number): string | null {
    let normalizedHex = hex.replace(/^#/, "");

    // Expand shorthand hex (#fff -> #ffffff)
    if (normalizedHex.length === 3) {
        normalizedHex = normalizedHex
            .split("")
            .map(char => char + char)
            .join("");
    }

    // Validate
    if (!/^[0-9a-fA-F]{6}$/.test(normalizedHex)) {
        return null;
    }

    const color = parseInt(normalizedHex, 16);
    const rgb = {
        r: (color >> 16) & 255,
        g: (color >> 8) & 255,
        b: color & 255,
    }
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

export const trimLastChar = (val: string, curEnd: number) => {
    const slice1 = val.slice(0, curEnd - 1)
    const slice2 = val.slice(curEnd, val.length)
    const newVal = slice1 + slice2
    return newVal
}

const checkAlphabetic = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const elem = ev.currentTarget
    const val = elem.value
    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)
    if (val === '') return { error: false, value: val, message: '' }
    if (!/[A-Za-z ]/.test(lastChar)) {
        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: 'Only alphabetic characters are allowed.' }
    }
    return { error: false, value: val, message: '' }
}

const checkNumeric = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const elem = ev.currentTarget
    const val = elem.value
    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)
    if (val === '') return { error: false, value: val, message: '' }
    if (!/[0-9+\-]/.test(lastChar)) {
        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: 'Only "+", "-" & numeric characters are allowed.' }
    }
    return { error: false, value: val, message: '' }
}

const checkAlphanumeric = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const elem = ev.currentTarget
    const val = elem.value
    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)
    if (val === '') return { error: false, value: val, message: '' }
    if (!/[0-9A-Za-z ]/.test(lastChar)) {
        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: 'Only alphabetic & numeric characters are allowed.' }
    }
    return { error: false, value: val, message: '' }
}

const checkUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const elem = ev.currentTarget
    const val = elem.value
    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)

    if (val === '') return { error: false, value: val, message: '' }

    if (lastChar === ' ') {

        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: `Whitespaces are not allowed.` }

    } else if (!/[0-9A-Za-z_@\-]/.test(lastChar)) {

        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: `" ${lastChar} " is not allowed.` }

    } else if (lastChar === '@') {
        const slice_before = val.slice(0, curEnd - 1)

        if (slice_before.includes('@')) {

            const value = trimLastChar(val, curEnd)
            return { error: true, value, message: 'Only a single " @ " is allowed.' }

        } else if (slice_before !== "") {

            const value = trimLastChar(val, curEnd)
            return { error: true, value, message: '" @ " must be the first character of a username.' }

        }
    }

    return { error: false, value: val, message: '' }
}

const checkEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {

    const elem = ev.currentTarget
    const val = elem.value

    if (val === '') return { error: false, value: val, message: '' }

    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)

    if (lastChar === ' ') {

        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: 'Whitespaces are not allowed.' }

    } else if (val.includes('@') && curEnd > val.indexOf('@')) {

        const at_pos = val.lastIndexOf('@')
        const slice_before_at = val.slice(0, at_pos)

        if (!slice_before_at.includes('@') && lastChar === '@') return { error: false, value: val, message: '' }
        else if (!/[a-zA-Z0-9.\-]/.test(lastChar)) {

            const value = trimLastChar(val, curEnd)
            return { error: true, value, message: `" ${lastChar} " is not allowed in domain.` }

        } else return { error: false, value: val, message: '' }

    } else if (!/[a-zA-Z0-9@!#$%&'*+/=?^_`{|}~.\-]/.test(lastChar)) {

        const value = trimLastChar(val, curEnd)
        return { error: true, value, message: `" ${lastChar} " is not allowed.` }

    } else return { error: false, value: val, message: '' }

}

const checkPassword = (ev: React.ChangeEvent<HTMLInputElement>, minChars: number) => {
    const val = ev.currentTarget.value
    let points: number = 0
    let message: string = 'Password meets all requirements'

    if (val.length >= minChars) points = points + 1
    else message = `Minimum ${minChars} characters are required`

    if (/[0-9]/.test(val)) points = points + 1
    else message = 'One numeric character is required.'

    if (/[^A-Za-z0-9]/.test(val)) points = points + 1
    else message = 'One special character is required.'

    if (/[A-Z]/.test(val)) points = points + 1
    else message = 'One uppercase letter is required.'

    if (/[a-z]/.test(val)) points = points + 1
    else message = 'One lowercase letter is required.'

    return { points, message }
}

type ConfPassReturnObj = { state: 'base' | 'error' | 'warning' | 'success', message: string }
const checkConfirmPassword = (ev: React.ChangeEvent<HTMLInputElement>, minChars: number, passValue: string): ConfPassReturnObj => {
    const val = ev.currentTarget.value
    if (passValue === "") return { state: 'base', message: 'Password field is empty.' }
    else if (val.length < minChars) return { state: 'warning', message: `Minimum ${minChars} characters are required.` }
    else if (passValue === val) return { state: 'success', message: `Password values matched.` }
    else return { state: 'error', message: 'Password values does not match.' }
}

const checkEmailOrUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const elem = ev.currentTarget
    const val = elem.value
    if (val === "") return { type: '', error: false, value: val, message: '' }
    const curEnd = elem.selectionEnd ?? 0
    const lastChar = val.slice(curEnd - 1, curEnd)
    if (val.includes('@')) {
        const slice_before_at = val.slice(0, val.indexOf('@'))
        if (slice_before_at === "") {
            const result = checkUsername(ev)
            return { type: 'username', ...result }
        } else {
            const result = checkEmail(ev)
            return { type: 'email', ...result }
        }
    } else if (val.includes(' ')) {
        const value = trimLastChar(val, curEnd)
        return { type: 'none', error: true, value, message: 'Whitespaces are not allowed.' }
    } else if (!/[a-zA-Z0-9.\-]/.test(lastChar)) {
        const value = trimLastChar(val, curEnd)
        return { type: '', error: true, value, message: `" ${lastChar} " is not allowed in domain.` }
    } else {
        return { type: 'email', error: false, value: val, message: '' }
    }
}

export const validations = {
    checkAlphabetic,
    checkNumeric,
    checkEmail,
    checkAlphanumeric,
    checkPassword,
    checkUsername,
    checkConfirmPassword,
    checkEmailOrUsername
}
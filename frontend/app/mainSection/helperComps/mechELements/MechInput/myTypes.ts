import type React from "react";

export type DivRef = React.RefObject<HTMLDivElement | null>
export type InputRef = React.RefObject<HTMLInputElement | null>
export type SpanRef = React.RefObject<HTMLSpanElement | null>
export type ButtonRef = React.RefObject<HTMLButtonElement | null>

export type Styles = {
    bgColor: string,
    focusColor: string,
    labelPadding: number,
    labelBdrRadius: number
}
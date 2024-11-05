import { ComponentSize, Fonts } from "../UtilsIndex";

export const fontClasses = {
    [Fonts.H1]: "s-h1",
    [Fonts.H2]: "s-h2",
    [Fonts.H3]: "s-h3",
    [Fonts.H4]: "s-h4",
    [Fonts.H5]: "s-h5",
    [Fonts.H6]: "s-h6",
    [Fonts.P]: "s-p",
    [Fonts.Small]: "s-small",
    default: "s-p"
}

export const componentSize = {
    [ComponentSize.Large]: 's-size-large',
    [ComponentSize.Medium]: 's-size-medium',
    [ComponentSize.Small]: 's-size-small',
    [ComponentSize.Fit]: 's-size-fit',
    default: 's-size-medium'
}
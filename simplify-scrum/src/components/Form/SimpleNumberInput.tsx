import { BgColor, bgColorClasses, FontColor, fontColorClasses, Fonts } from "../../utils/UtilsIndex";
import { SimpleIcon } from "../ComponentsIndex";

interface Props {
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    color?: BgColor;
    fontcolor?: FontColor;
    placeholder?: string;
    icon?: string;
    value: number;
    min?: number;
    changeValue: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SimpleNumberInput({ icon, min, label, placeholder, value, changeValue, disabled, readonly, color, fontcolor }: Props) {
    let bgColor = bgColorClasses[color!] ?? bgColorClasses.default;
    let bgInputColor = bgColorClasses[color == BgColor.Dark ? BgColor.DarkSubtle : color!] ?? bgColorClasses.default;
    let fontColor = fontColorClasses[fontcolor!] ?? fontColorClasses.default;

    return (
        <div className={`d-flex s-text-inpt ps-1 pe-2 border h-100 rounded overflow-hidden align-items-center justify-content-between w-100 ${bgColor}`}>
            {icon && (
                <SimpleIcon 
                    icon={`bi ${icon}`} 
                    font={Fonts.H5} 
                />
            )}
            <h6 className="m-0 user-select-none me-2 h-100 d-flex align-items-center">
                {label}
            </h6> 
            <input 
                type="number"
                className={`border-0 d-flex w-100 h-100 text-end  ${bgInputColor} ${fontColor}`}
                value={value} 
                onChange={e => {changeValue(e)}}
                placeholder={placeholder || undefined}
                disabled={disabled || undefined}
                readOnly={readonly || undefined}
                min={min || undefined}
            />
        </div>
    );
}
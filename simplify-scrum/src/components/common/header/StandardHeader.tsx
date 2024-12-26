import { useMemo } from "react"
import { Button, StandardHeaderProps } from "../../ComponentsIndex"
import { Role, Size, Style } from "../button/ButtonProps"

export function StandardHeader({title, buttonConfigs}: StandardHeaderProps){ 
    const buttons = useMemo(() => {
        return buttonConfigs?.map((config, index) => (
            <Button
                disabled={config.disabled}
                className={config.isActive ? "s-header-active-button" : ""}
                style={Style.Borderless}
                role={Role.Primary}
                size={Size.XLarge}
                icon={config.icon}
                key={index}
                onClick={() => {
                    config.onClick();
                }}
            />
        ));
    }, [buttonConfigs]);

    return (
        <div className=" user-select-none s-bg-dark-darker border-2 d-flex  p-3 align-items-center rounded-top justify-content-between border-bottom">
            <h3>
                {title}
            </h3>
            <div  className="mt-1">
                {buttons}
            </div>                                                                                                                                                              
        </div>
    )
}
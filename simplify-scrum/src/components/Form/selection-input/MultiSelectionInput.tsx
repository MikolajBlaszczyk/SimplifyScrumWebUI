import Select, { SelectChangeEvent } from "@mui/material/Select"
import { StandardInputTemplate } from "../shared/StandardInputTemplate"
import { MultiSelectionInputProps } from "./MultiSelectionInputProps"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"

export function MultiSelectionInput({ icon, placeholder, disabled, selectedValues, className, onSelectedValuesChange, options, tooltipContent, validation }: MultiSelectionInputProps) {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        const selectedOptions = options.filter(option => value.includes(option.value));
        onSelectedValuesChange(selectedOptions);
    };

    return (
        <StandardInputTemplate
            icon={icon}
            className={className}
            tooltipContent={tooltipContent}
            validation={validation}
            buttonVisible={false}
            element={
                <Select
                    className="w-100 s-input-multiselect"
                    multiple
                    value={selectedValues.map(item => item.value)}
                    onChange={handleChange}
                    input={<OutlinedInput label={placeholder} />}
                    renderValue={(selected) => selected.map((value: string) => {
                        const option = options.find(option => option.value === value);
                        return option ? option.description : value;
                    }).join(', ')}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <Checkbox checked={selectedValues.some(selected => selected.value === option.value)} />
                            <ListItemText primary={option.description} />
                        </MenuItem>
                    ))}
                </Select>
            }
            clearValue={() => { }}
        />
    );
}
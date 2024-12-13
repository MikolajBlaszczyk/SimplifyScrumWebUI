import React, { useState } from 'react';

export interface Option {
    value: string;
    label: string;
}

interface MultiSelectDropdownProps {
    options: Option[];
    selectedOptions: Option[];
    onChange: (selectedOptions: Option[]) => void;
    label?: string;
    icon?: string;
}

export function MultiSelectDropdown({ options, selectedOptions, onChange, label, icon }: MultiSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: Option) => {
        if (selectedOptions.some(selected => selected.value === option.value)) {
            onChange(selectedOptions.filter(selected => selected.value !== option.value));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    return (
        <div className="multi-select-dropdown mt-2">
            {label && (
                <div className="dropdown-label">
                    {icon && <i className={`bi ${icon} me-2`}></i>}
                    {label}
                </div>
            )}
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="selected-options">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map(option => (
                            <span key={option.value} className="selected-option">
                                {option.label}
                            </span>
                        ))
                    ) : (
                        <span className="placeholder">Select options</span>
                    )}
                </div>
                <div className="dropdown-toggle">{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map(option => (
                        <li key={option.value} className="dropdown-list-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.some(selected => selected.value === option.value)}
                                    onChange={() => handleOptionClick(option)}
                                />
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
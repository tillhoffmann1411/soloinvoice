'use client'

import { InputHTMLAttributes } from 'react';

type Props = {
    label: string;
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    selectLabel?: string;
    selectOptions?: string[];
    hidden?: boolean;
    step?: string;
    onChange?: (value: string) => void;
};

export default function Input({ label, type = 'text', name, id = name, placeholder, selectLabel, selectOptions, hidden, step, onChange }: Props) {
    return (
        <div className={`text-gray-900 dark:text-gray-100 ${hidden && 'hidden'}`}>
            <label htmlFor={id} className="block text-sm font-medium leading-6">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type={type}
                    name={name}
                    id={id}
                    step={step}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 pl-2 ${selectLabel ? 'pr-20' : 'pr-2'} ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900`}
                    placeholder={placeholder}
                />
                {selectLabel && selectOptions && (
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor={selectLabel} className="sr-only">
                            {selectLabel}
                        </label>
                        <select
                            id={selectLabel}
                            name={selectLabel}
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                            {selectOptions?.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};  
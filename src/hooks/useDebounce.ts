import { useEffect, useState } from "react";

/**
 * Debounces a value and returns the debounced value.
 * 
 * Optionally, a callback can be provided to be called when the debounced value changes.
 */
export function useDebounce<T>(value: T, delay: number, callback?: (value: T) => void): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    useEffect(() => {
        if (callback) {
            callback(debouncedValue);
        }
    }, [debouncedValue]);

    return debouncedValue;
}
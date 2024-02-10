import { useEffect, useRef, useState } from "react";

/**
 * Debounces a value and returns the debounced value.
 * 
 * Optionally, a callback can be provided to be called when the debounced value changes.
 */
export function useDebounce<T>(value: T, delay: number, callback?: (value: T) => void): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            if (isInitialMount.current) isInitialMount.current = false;
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    useEffect(() => {
        if (callback && !isInitialMount.current) {
            callback(debouncedValue);
        }
    }, [debouncedValue]);

    return debouncedValue;
}
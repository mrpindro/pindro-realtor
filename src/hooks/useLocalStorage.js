import { useEffect, useState } from "react";

const PREFIX = 'assist-';

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [storage, setStorage] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            return JSON.parse(jsonValue);
        }

        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(storage))
    }, [prefixedKey, storage]);

    return [storage, setStorage];
}

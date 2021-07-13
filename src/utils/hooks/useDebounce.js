import { useState } from 'react'

export default function useDebounce() {
    const [typingTimeout, settypingTimeout] = useState('');

    function debounce(func, wait) {
        clearTimeout(typingTimeout);
        const timeout = setTimeout(() => func(), wait);
        settypingTimeout(timeout);
    }
    return debounce;
}
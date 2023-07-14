export function togglePasswordInput(inputEl: HTMLInputElement) {
    const type = inputEl.getAttribute('type')!;
    if(type === 'password') {
        inputEl.setAttribute('type', 'text');
        return false;
    }

    inputEl.setAttribute('type', 'password');
    return true;
}

export function addScriptIfNotAdded(src: string) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'module';
    document.head.appendChild(script);
}

export function setAttributes(element: HTMLElement, props: Record<string, any>) {
    for (const [key, value] of Object.entries(props)) {
        if (value !== undefined && value !== null) {
            element.setAttribute(key, value.toString());
        }
    }
}
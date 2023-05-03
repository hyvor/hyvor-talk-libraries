


export function addScriptIfNotAdded(src: string) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'module';
    document.head.appendChild(script);
}
import { Newsletters, NewslettersCustomElement, NewslettersProps } from '@hyvor/hyvor-talk-base';
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

export const NewsletterForm = forwardRef((props: NewslettersProps, ref) => {

    const wrap = useRef<null | HTMLDivElement>(null);
    const element = useRef<null | NewslettersCustomElement>(null);

    useImperativeHandle(ref, () => {
        return {
            wrap: () => wrap.current,
            element: () => element.current
        }
    }, []);

    useEffect(() => {
        element.current = Newsletters.form(
            props,
            wrap.current!,
        )

        return () => {
            element.current?.remove();
        }
    }, []);

    return <div className="ht-newsletter-wrap" ref={wrap}></div>

});
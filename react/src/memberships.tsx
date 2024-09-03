import { MembershipsCustomElement, MembershipsProps as MembershipsPropsBase, Memberships as MembershipsBase, MembershipsEvents, GatedContentProps } from '@hyvor/hyvor-talk-base';
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

type OnType<T extends keyof MembershipsEvents = keyof MembershipsEvents> = Record<T, (data: MembershipsEvents[T]) => void>

type MembershipsProps = MembershipsPropsBase & {
    on?: Partial<OnType>
}

export const Memberships = forwardRef((props: MembershipsProps, ref) => {

    const wrap = useRef<null | HTMLDivElement>(null);
    const element = useRef<null | MembershipsCustomElement>(null);

    const { on: _, ...propsWithoutOn } = props;

    useImperativeHandle(ref, () => {
        return {
            wrap: () => wrap.current,
            element: () => element.current
        }
    }, []);

    useEffect(() => {
        element.current = MembershipsBase.memberships(
            propsWithoutOn,
            wrap.current!,
            (event, data) => {
                const callback = props.on?.[event];
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
            }
        )
    }, []);

    return <div className="ht-memberships-wrap" ref={wrap}></div>

});

/**
 * key is a reserved word in React. So, we use _key instead.
 */
export const GatedContent = forwardRef((props: GatedContentProps & { _key?: string }, ref) => {

    const wrap = useRef<null | HTMLDivElement>(null);
    const element = useRef<null | HTMLElement>(null);

    useImperativeHandle(ref, () => {
        return {
            wrap: () => wrap.current,
            element: () => element.current
        }
    }, []);

    useEffect(() => {

        const p = { ...props };
        if (p._key) {
            p.key = p._key;
            delete p._key;
        }

        element.current = MembershipsBase.gatedContent(
            p,
            wrap.current!,
        )
    }, []);

    return <div className="ht-gated-content-wrap" ref={wrap}></div>

});
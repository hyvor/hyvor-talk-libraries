import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import type { CommentsProps as CommentsPropsBase, CommentsEvents, CommentsCustomElement } from '@hyvor/hyvor-talk-base';
import { Comments as CommentsBase } from '@hyvor/hyvor-talk-base';

type OnType<T extends keyof CommentsEvents = keyof CommentsEvents> = Record<T, (data: CommentsEvents[T]) => void>

type CommentsProps = CommentsPropsBase & {
    on?: Partial<OnType>
}

export const Comments = forwardRef((props: CommentsProps, ref) => {

    const wrap = useRef<null | HTMLDivElement>(null);
    const element = useRef<null | CommentsCustomElement>(null);

    const { on: _, ...propsWithoutOn } = props;

    useImperativeHandle(ref, () => {
        return {
            wrap: () => wrap.current,
            element: () => element.current
        }
    }, []);

    useEffect(() => {
        element.current = CommentsBase.comments(
            propsWithoutOn,
            wrap.current!,
            (event, data) => {
                const callback = props.on?.[event];
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
            }
        )

        return () => {
            element.current?.remove();
        }
    }, []);

    return <div className="ht-comments-wrap" ref={wrap}></div>

});
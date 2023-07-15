import React, { useEffect, useRef } from 'react';
import type { CommentsProps as CommentsPropsBase, Events } from '@hyvor/hyvor-talk-base';
import { addComments } from '@hyvor/hyvor-talk-base';

type OnType<T extends keyof Events = keyof Events> = Record<T, (data: Events[T]) => void>

type CommentsProps = CommentsPropsBase & {
    on?: Partial<OnType>
}

export function Comments(props: CommentsProps) {

    const ref = useRef<null | HTMLDivElement>(null);
    const { on: _, ...propsWithoutOn } = props;

    useEffect(() => {
        addComments(
            propsWithoutOn,
            ref.current!,
            (event, data) => {
                const callback = props.on?.[event];
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
            }
        )
    }, []);

    return <div ref={ref}></div>

}
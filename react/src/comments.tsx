import React, { useEffect, useRef } from 'react';
import type { CommentsProps as CommentsPropsBase } from '../../types';
import { addComments } from '../../helper';

type CommentsProps = CommentsPropsBase & {
    on: Record<keyof CommentsPropsBase, boolean>;
}

export function Comments(props: CommentsProps) {

    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => addComments(props, ref.current!), []);

    return <div ref={ref}></div>

}
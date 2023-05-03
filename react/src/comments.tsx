import React, { useEffect, useRef } from 'react';
import type { CommentsProps } from '../../types';
import { addComments } from '../../helper';

export function Comments(props: CommentsProps) {

    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => addComments(props, ref.current!), []);

    return <div ref={ref}></div>

}
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CommentCounts } from "@hyvor/hyvor-talk-base";
import type { CommentCountProps, CommentCountCustomElement } from "@hyvor/hyvor-talk-base";

export const CommentCount = forwardRef((props: CommentCountProps, ref) => {

    const wrap = useRef<HTMLSpanElement>(null);
    const element = useRef<CommentCountCustomElement>(null);

    useImperativeHandle(ref, () => {
        return {
            wrap: () => wrap.current,
            element: () => element.current
        }
    }, []);

    useEffect(() => {
        element.current = CommentCounts.commentCount(props, wrap.current!);
    }, []);


    return <span className="ht-comment-count-wrap" ref={wrap}></span>

});
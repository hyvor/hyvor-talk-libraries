import React, { useEffect } from "react";
import { addCommentCounts } from "@hyvor/hyvor-talk-base";
import type { CommentCountProps } from "@hyvor/hyvor-talk-base";

export function CommentCount(props: CommentCountProps) {

    useEffect(() => addCommentCounts(props), []);
    return <hyvor-talk-comment-count {...props} />

}
import React, { useEffect } from "react";
import { addCommentCounts } from "../../helper";
import type { CommentCountProps } from "../../types";

export function CommentCount(props: CommentCountProps) {

    useEffect(() => addCommentCounts(props), []);
    return <hyvor-talk-comment-count {...props} />

}
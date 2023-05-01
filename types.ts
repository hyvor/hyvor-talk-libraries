

export interface Settings {



}


export type TranslationsKeys =
    'reactions_text' |
    'ratings_text' |
    'ratings_1' |
    'ratings_multi' |

    'login' |
    // 'signup' |
    'login_to_continue' |

    'page_closed' |
    'login_to_comment' |
    'no_comments_text' |
    'comments_0' |
    'comments_1' |
    'comments_multi' |
    'online' |

    'notifications' |
    'notifications_no' |
    'notifications_read' |
    'notifications_reply' |
    'notifications_mention' |
    'notifications_load_more' |

    'top' |
    'newest' |
    'oldest' |

    'just_now' |
    'ago_seconds' |
    'ago_day' |
    'ago_days' |
    'ago_hour' |
    'ago_hours' |
    'ago_minute' |
    'ago_minutes' |
    'ago_year' |
    'ago_years' |

    'featured' |
    'pending' |
    'deleted' |
    'loved_by' |
    'team' |
    'author' |
    'edited' |

    'moderate' |
    'spam' |
    'feature' |
    'unfeature' |
    'love' |
    'unlove' |

    'show_more' |
    'show_less' |
    'expand_comment' |
    'expand_comments' |
    'load_more_comments' |
    'load_more' |
    'more_replies' |
    'hidden_comment' |
    'reply' |
    'replying_with_count' |
    'guest' |
    'guests' |
    'show_new_comment' |
    'show_new_comments' |
    'show_new_reply' |
    'show_new_replies' |
    'show_all_comments' |
    'show_parent_comment' |

    'guest_name' |
    'guest_email' |
    'guest_name_fill' |
    'guest_email_required' |
    'guest_email_invalid' |
    'comment_char_limit' |

    'comment_box_text' |
    'reply_box_text' |

    'guest_vote' |
    'as_guest' |
    'comment_button_text' |
    'reply_button_text' |
    'edit' |
    'delete' |
    'delete_confirm' |
    'cancel' |
    'search' |
    'search_comments' |
    'search_back' |
    'search_type' |
    'flag' |
    'unflag' |
    'flag_comment' |
    'flag_reason' |
    'optional' |
    'banned' |

    'comments' |
    'settings' |
    'settings_for_website' |
    'blocked' |
    'unblocked' |
    'reply_emails' |
    'mention_emails' |
    'saved' |

    'no_results' |
    'powered_by' |

    'upload_image' |
    'or' |
    'paste_url' |
    'add' |
    'link' |
    'embed' |
    'copy_link' |
    'link_copied' |

    'block' |
    'block_button' |
    'unblock' |

    'account_logout' |
    'account_my' |

    'default_error'
;

export type Translations = Record<TranslationsKeys, string>;
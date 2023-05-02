declare global {
    namespace JSX {
        interface IntrinsicElements {
            'hyvor-talk-comments': any,
            'hyvor-talk-comment-count': any
        }
    }
}

export interface Settings {

    // Name of the website
    name: string,

    custom_css: string | null,

    auth: {
        sso_stateless_login_url: null, // or URL string  
    },

    comments_view: {

        // note shown above the comments section
        note: string | null,

        // close the comments section after these number of days
        // use 0 to never close
        close_after_days: number,

        // keyboard navigation
        is_keyboard_navigation_on: boolean,

        // number of nested levels to show
        // when a comment's depth is equal to or larger than this, the left margin will be removed
        nested_levels: number,

    }

    profiles: {

        // whether to show profile pictures
        pictures: boolean,

        // whether to show popup user profile
        profile: boolean,

        // default picture for users who haven't set a profile picture
        default_picture: string | null,

        // can be set to 'username' to hide the user's account name
        // only applies for HYVOR users
        display_name_type: 'name' | 'username',

    },

    realtime: {

        // whether to turn on realtime communication using websockets
        on: boolean,

        // whether to show the online users count
        count: boolean,

        // whether to show online users list
        // realtime.count should be true on to make this work
        users: boolean,

        // show when someone is typing a comment or replying to a comment
        typing: 'off' |
            'on_without_typer' | // icon shown, but cannot see who is typing
            'on_with_typer' // icon shown, can see who is typing

    }


    voting: {


        // What types of votes are shown
        type: 'both' | 'upvotes' | 'none',

        // whether to show who voted
        voters: boolean,

        // whether non-logged in users can vote
        guest: boolean

    },


    // what top widget to show
    top_widget: 'none' | 'reactions' | 'ratings',

    // Reaction configurations
    reactions: {
        configs: {
            type: 'superb' | 'love' | 'wow' | 'sad' |  'laugh' | 'angry',
            is_shown: boolean,
            image_url: string | null,
            text: string
        }[],
        display_type: 'image' | 'text' | 'both'
    },

    // ratings configurations
    ratings: {
        star_color: string
    }

    /**
     * Texts
     *
     * If you set a string, it will be shown *regardless* of the language.
     * Therefore, if you have a multi-language website, keep make sure to set
     * strings according to the current language dynamically.
     *
     * If you keep set it to null, default strings will be used based on the language.
     */
    text : {
        comment_box: string | null,
        reply_box: string | null,
        no_comments: string | null,
        reactions: string | null,
        ratings: string | null,
        comment_count_0: string | null,
        comment_count_1: string | null,
        comment_count_multi: string | null,
    },

    // editor options
    editor: {

        emoji: boolean,
        images: boolean,
        gifs: boolean, // images should be enabled
        embeds: boolean, // link embedding
        mentions: boolean,
        code_blocks: boolean,
        blockquotes: boolean,
        inline_styles: boolean, // bold, italic, inline code, strike
        links: boolean,
        math: boolean,

    },

    ui: {

        // width of the comments box, 100% if null
        width: number | null,

        // box-shadow CSS property for the comments and other "boxes"
        box_shadow: string,

        // border-radius CSS property for the comments and other "boxes"
        box_radius: string,

        // border-size CSS property for the comments and other "boxes"
        box_border_size: string,

        // border-color CSS property for the comments and other "boxes"
        box_border_color: string,

        // border-radius CSS property for buttons
        button_radius: string,

    },

    light_palette: Partial<Palette>,
    dark_palette: Partial<Palette>,

    // highlighting comments
    highlight: {
        // whether to highlight new comments
        new: boolean,
        new_color: string,

        // upvote-based highlighting
        upvote_1_threshold: null | number,
        upvote_2_threshold: null | number,
        upvote_1_color: string,
        upvote_2_color: string,
    },

}

interface Palette {

    accent: string,
    accent_text: string,
    box: string,
    box_text: string,
    box_text_light: string,
    box_secondary: string,
    box_secondary_text: string,

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
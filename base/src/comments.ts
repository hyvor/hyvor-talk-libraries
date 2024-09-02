import { addScriptIfNotAdded } from "./helper";

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export type CommentsProps = {
    "website-id": number,
    
    "page-id"?: number | string,
    "page-url"?: string,
    "page-title"?: string,
    "page-language"?: string,
    "page-author"?: string,

    "sso-user"?: string,
    "sso-hash"?: string,

    colors?: 'light' | 'dark' | 'os',
    loading?: 'default' | 'lazy' | 'manual',

    instance?: string;
    
    settings?: RecursivePartial<CommentsSettings>,
    /**
     * @deprecated
     */
    translations?: Partial<Record<string, string>>

} & Partial<{
    [K in CommentsTranslationsKeys as `t-${K & string}`]: string
}>;

export type CommentsCustomElement = HTMLElement & {
    api: {},
};

const COMMENTS_EVENTS : (keyof CommentsEvents)[] = [
    'loaded',
    'comment:published',
    'comment:edited',
    'comment:deleted',
    'comment:voted',
    'comment:flagged',
    'reaction',
    'rating',
    'auth:login:clicked',
    'profile:clicked',
];

export class Comments {

    static script(instance?: string) {
        instance = instance || 'https://talk.hyvor.com';
        addScriptIfNotAdded(`${instance}/embed/embed.js`);
    }

    static comments(
        props: CommentsProps,
        container: HTMLElement,
        onEvent?: <T extends keyof CommentsEvents>(event: T, data: CommentsEvents[T]) => void
    ) {
    
        Comments.script(props.instance);

        const comments = document.createElement('hyvor-talk-comments') as CommentsCustomElement;

        for (let [key, value] of Object.entries(props)) {
            if (value !== undefined) {

                if (key === 'translations' && typeof value === 'object') {
                    for (let [k, v] of Object.entries(value)) {
                        k = k.replace('_', '-');
                        comments.setAttribute(`t-${k}`, v as string);
                    }
                    continue;
                }

                if (key === 'settings') {
                    value = JSON.stringify(value);
                }
            
                comments.setAttribute(key, value as string);
            }
        }

        if (onEvent) {
            COMMENTS_EVENTS.forEach(eventName => {
                comments.addEventListener(eventName, (e: any) => {
                    onEvent(eventName, e.detail);
                });
            });
        }

        container.innerHTML = '';
        container.appendChild(comments);

        return comments;
    
    }

}

export interface CommentsSettings {

	/**
	 * All the following options are extendable via <hyvor-talk-comments> settings attribute
	 * @see https://talk.hyvor.com/docs/comments#settings
	 */

	// Name of the website
	name: string;
	custom_css: string | null;

	comments_view: {
		// default sort for comments
		default_sort: 'top' | 'newest' | 'oldest';
		// note shown above the comments section
		note: string | null;
		// close the comments section after these number of days
		// use 0 to never close
		close_after_days: number;
		// keyboard navigation
		is_keyboard_navigation_on: boolean;
		// number of nested levels to show
		// when a comment's depth is equal to or larger than this, the left margin will be removed
		nested_levels: number;
		// whether to show
		display_replied_to_type: 'none' | 'deep' | 'all';
	};

	profiles: {
		// whether to show profile pictures
		pictures: boolean;
		// whether to show popup user profile
		profile: boolean;
		// default picture for users who haven't set a profile picture
		default_picture: string | null;
		// can be set to 'username' to hide the user's account name
		// only applies for HYVOR users
		display_name_type: 'name' | 'username';
		// used for aliasing a moderator's name
		// displayed only if the moderator has is_alias_used set to true
		mod_alias_name: string | null;
		// used for aliasing a moderator's picture
		// displayed only if the moderator has is_alias_used set to true
		mod_alias_picture: string | null;
		// for showing a special badge for moderators
		mod_badge_id: number | null;
	};

	realtime: {
		// whether to turn on realtime communication using websockets
		on: boolean;
		// whether to show the online users count
		count: boolean;
		// whether to show online users list
		// realtime.count should be true on to make this work
		users: boolean;
		// show when someone is typing a comment or replying to a comment
		typing:
			| 'off'
			| 'on_without_typer' // icon shown, but cannot see who is typing
			| 'on_with_typer'; // icon shown, can see who is typing
	};

	voting: {
		// What types of votes are shown
		type: 'both' | 'upvotes' | 'none';
		// whether to show who voted
		voters: boolean;
		// whether non-logged in users can vote
		guest: boolean;
	};

	// what top widget to show
	top_widget: 'none' | 'reactions' | 'ratings';

	// Reaction configurations
	reactions: {
		configs: {
            type: 'superb' | 'love' | 'wow' | 'sad' |  'laugh' | 'angry',
            is_shown: boolean,
            image_url: string | null,
            text: string
        }[];
		display_type: 'image' | 'text' | 'both';
	};

	// ratings configurations
	ratings: {
		star_color: string;
	};

	/**
	 * Texts
	 *
	 * If you set a string, it will be shown *regardless* of the language.
	 * Therefore, if you have a multi-language website, keep make sure to set
	 * strings according to the current language dynamically.
	 *
	 * If you keep set it to null, default strings will be used based on the language.
	 */
	text: {
		comment_box: string | null;
		reply_box: string | null;
		no_comments: string | null;
		reactions: string | null;
		ratings: string | null;
		comment_count_0: string | null;
		comment_count_1: string | null;
		comment_count_multi: string | null;
	};

	// editor options
	editor: {
		emoji: boolean;
		images: boolean;
		gifs: boolean; // images should be enabled
		embeds: boolean; // link embedding
		mentions: boolean;
		code_blocks: boolean;
		blockquotes: boolean;
		inline_styles: boolean; // bold, italic, inline code, strike
		links: boolean;
		math: boolean;
	};

	ui:  {
        // width of the comments box, 100% if null
        width: number | null;
        // box-shadow CSS property for the comments and other "boxes"
        box_shadow: string;
        // border-radius CSS property for the comments and other "boxes"
        box_radius: string;
        // border-size CSS property for the comments and other "boxes"
        box_border_size: string;
        // border-color CSS property for the comments and other "boxes"
        box_border_color: string;
        // border-radius CSS property for buttons
        button_radius: string;
        // default color theme
        color_theme: 'os' | 'light' | 'dark';
    };

	light_palette: Palette;
	dark_palette: Palette;

	// highlighting comments
	highlight: {
		// whether to highlight new comments
		new: boolean;
		new_color: string;

		// upvote-based highlighting
		upvote_1_threshold: null | number;
		upvote_2_threshold: null | number;
		upvote_1_color: string;
		upvote_2_color: string;
	};
}

interface Palette {
    text: string;
	accent: string;
	accent_text: string;
	box: string;
	box_text: string;
	box_text_light: string;
	input: string;
}


export type CommentsTranslationsKeys =
    'reactions-text' |
    'ratings-text' |
    'ratings-1' |
    'ratings-multi' |

    'login' |
    // 'signup' |
    'login-to-continue' |

    'page-closed' |
    'login-to-comment' |
    'no-comments-text' |
    'comments-0' |
    'comments-1' |
    'comments-multi' |
    'online' |

    'notifications' |
    'notifications-no' |
    'notifications-read' |
    'notifications-reply' |
    'notifications-mention' |
    'notifications-load-more' |

    'top' |
    'newest' |
    'oldest' |

    'just-now' |
    'ago-seconds' |
    'ago-day' |
    'ago-days' |
    'ago-hour' |
    'ago-hours' |
    'ago-minute' |
    'ago-minutes' |
    'ago-year' |
    'ago-years' |

    'featured' |
    'pending' |
    'deleted' |
    'loved-by' |
    'team' |
    'author' |
    'edited' |

    'moderate' |
    'spam' |
    'feature' |
    'unfeature' |
    'love' |
    'unlove' |

    'show-more' |
    'show-less' |
    'expand-comment' |
    'expand-comments' |
    'load-more-comments' |
    'load-more' |
    'more-replies' |
    'hidden-comment' |
    'reply' |
    'replying-with-count' |
    'guest' |
    'guests' |
    'show-new-comment' |
    'show-new-comments' |
    'show-new-reply' |
    'show-new-replies' |
    'show-all-comments' |
    'show-parent-comment' |

    'guest-name' |
    'guest-email' |
    'guest-name-fill' |
    'guest-email-required' |
    'guest-email-invalid' |
    'comment-char-limit' |

    'comment-box-text' |
    'reply-box-text' |

    'guest-vote' |
    'as-guest' |
    'comment-button-text' |
    'reply-button-text' |
    'edit' |
    'delete' |
    'delete-confirm' |
    'cancel' |
    'search' |
    'search-comments' |
    'search-back' |
    'search-type' |
    'flag' |
    'unflag' |
    'flag-comment' |
    'flag-reason' |
    'optional' |
    'banned' |

    'comments' |
    'settings' |
    'settings-for-website' |
    'blocked' |
    'unblocked' |
    'reply-emails' |
    'mention-emails' |
    'saved' |

    'no-results' |
    'powered-by' |

    'upload-image' |
    'or' |
    'paste-url' |
    'add' |
    'link' |
    'embed' |
    'copy-link' |
    'link-copied' |

    'block' |
    'block-button' |
    'unblock' |

    'account-logout' |
    'account-my' |

    'default-error'
;

export interface CommentCountProps {
    'page-id': string | number,
    'website-id'?: number,
    mode?: 'text' | 'number',
    language?: string,

    loading?: 'manual'
}


// Events ========================================


export interface CommentsEvents {

    /**
     * Comments section is fully loaded
     * This is triggered after the initial `/init` API call is completed
     */
    'loaded': null,

    /**
     * A comment is published.
     * Spam detection and rules are run asynchronously after this event. 
     * Therefore, the status of the comment may change in a few seconds.
     */
    'comment:published': CommentsApiRealComment,

    /**
     * The comment body was edited.
     */
    'comment:edited': Comment,

    /**
     * A comment was deleted by the user.
     * (Not triggered when a moderator deletes a comment in the embed)
     */
    'comment:deleted': Comment,

    /**
     * A user voted/unvoted to a comment
     * vote: null means the current vote was removed
     */
    'comment:voted': {
        comment: Comment,
        vote: 'up' | 'down' | null
    },

    /**
     * A user flagged a comment
     * The comment will be hidden from the public view until a moderator reviews it
     */
    'comment:flagged': {
        comment: Comment
    },

    /**
     * A user reacted to a comment
     */
    'reaction': {
        type: 'superb' | 'love' | 'wow' | 'sad' |  'laugh' | 'angry'
    },

    /**
     * A user rated (star ratings) the page
     */
    'rating': {
        rating: number,
        count: number,
        average: number
    },

    /**
     * The login button was clicked
     * You may use this 
     */
    'auth:login:clicked': null,

    /**
     * A user clicked on the profile picture or the name of another user
     * This usually triggers the user profile popup
     * You may use this to show a custom user profile (ex: using location.href)
     */
    'profile:clicked': CommentsApiLoggedUser,

}

// API Types ========================================

export interface CommentsApiBaseComment {
    id: number,
    page_id: number,
    url: string,
    parent_id: number | null,
    depth: number,
    created_at: number,
}
export interface CommentsApiHiddenComment extends CommentsApiBaseComment {
    is_hidden: true,
}
export interface CommentsApiRealComment extends CommentsApiBaseComment {
    is_hidden: false,
    content: string
    content_html: string,
    is_featured: boolean,
    is_loved: boolean,
    is_edited: boolean,
    upvotes: number,
    downvotes: number,
    user: User,
    status: 'published' | 'spam' | 'deleted' | 'pending'
}
export type Comment = CommentsApiHiddenComment | CommentsApiRealComment;


export interface CommentsApiBaseUser {
    name: string,
    username: string,
    picture_url: string | null,
    bio: string | null,
    location: string | null,
    website_url: string | null,
    badges: number[],
}

export interface CommentsApiGuestUser extends CommentsApiBaseUser {
    id: undefined,
    type: null
}

export interface CommentsApiLoggedUser extends CommentsApiBaseUser {
    id: number,
    type: 'hyvor' | 'sso'
}

export type User = CommentsApiGuestUser | CommentsApiLoggedUser;



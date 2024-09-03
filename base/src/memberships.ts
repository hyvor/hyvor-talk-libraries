import { addScriptIfNotAdded } from "./helper";
import { HYVOR_TALK_CLOUD_INSTANCE } from "./vars";

export type MembershipsProps = {
    'website-id': number;
    instance?: string;
    'sso-user'?: string;
    'sso-hash'?: string;
    language?: string;
    colors?: 'light' | 'dark' | 'os';
} & Partial<{
    [K in keyof MembershipsTAttributes as `t-${K & string}`]: MembershipsTAttributes[K]
}>;

interface MembershipsTAttributes {
	'button-subscribe': string;
	'modal-title': string;
	'modal-title-members': string;
	monthly: string;
	yearly: string;
	'month-per': string;
	'year-per': string;
	'save-percent': string;
	'subscribe-as': string;
	'login-to-subscribe': string;
	'manage-subscription': string;
	'switch-to': string;
	'switch-button': string;
	'current-plan': string;
	'logged-in-as': string;
	'manage-account': string;
	logout: string;
	'will-cancel': string;
	'past-due': string;
	switched: string;
	'payment-verifying': string;
	'payment-success': string;
	'payment-failed': string;
	'payment-thank-you': string;
	'default-gate-title': string;
	'default-gate-content': string;
	continue: string;
	cancel: string;
	close: string;
};

export type MembershipsCustomElement = HTMLElement & {
    api: {
        auth: {
            user: () => MembershipsApiUser | null,
            logout: () => void,
        },
        plans: () => MembershipsApiPlan[],
        modal: {
            open: () => void,
            close: () => void,
        }
    }
};

export interface MembershipsApiUser {
    id: number;
    type: 'hyvor' | 'sso';
    name: string;
    username: string;
    picture_url: string | null;
    bio: string | null;
    location: string | null;
    website_url: string | null;
    subscription: MembershipsApiSubscription | null;
}

export interface MembershipsApiPlan {
    id: number;
    name: string;
    description: string;
    monthly_price: number;
    badge_id: number | null;
}

export interface MembershipsApiSubscription {
    id: number;
    is_yearly: boolean;
    status: 'active' | 'past_due';
    cancel_at: number | null;
    plan: MembershipsApiPlan;
}

export interface MembershipsEvents {
    /**
     * <hyvor-talk-memberships> is loaded.
     * API is ready to use.
     */
    loaded: null,

    /**
     * A new subscription is created. Payment is still pending.
     */
    'subscription:created': {
        subscription: MembershipsApiSubscription
    },

    /**
     * Subscription is successfully verified.
     */
    'subscription:success': {
        subscription: MembershipsApiSubscription
    },

    /**
     * User changed the plan.
     */
    'subscription:updated': {
        subscription: MembershipsApiSubscription
    }
}

export const MEMBERSHIPS_EVENTS : (keyof MembershipsEvents)[] = [
    'loaded',
    'subscription:created',
    'subscription:success',
    'subscription:updated',
];

export type GatedContentProps = {
    key?: string;
    secure?: string;
    'default-gate-title'?: string;
    'default-gate-content'?: string;
}

export class Memberships {

    static script(instance?: string) {
        instance = instance || HYVOR_TALK_CLOUD_INSTANCE;
        addScriptIfNotAdded(`${instance}/embed/memberships.js`);
    }

    static memberships(
        props: MembershipsProps, 
        container?: HTMLElement,
        onEvent?: <T extends keyof MembershipsEvents>(event: T, data: MembershipsEvents[T]) => void
    ) : MembershipsCustomElement {
        Memberships.script(props.instance);
        
        const memberships = document.createElement('hyvor-talk-memberships') as MembershipsCustomElement;

        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                memberships.setAttribute(key, value.toString());
            }
        }

        if (onEvent) {
            MEMBERSHIPS_EVENTS.forEach(eventName => {
                memberships.addEventListener(eventName, (e: any) => {
                    onEvent(eventName, e.detail);
                });
            });
        }

        container = container || document.body;
        container.appendChild(memberships);

        return memberships;
    }

    static gatedContent(
        props: GatedContentProps, 
        container: HTMLElement
    ) {
        
        const gatedContent = document.createElement('hyvor-talk-gated-content') as HTMLElement;

        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                gatedContent.setAttribute(key, value.toString());
            }
        }

        container.appendChild(gatedContent);

        return gatedContent;

    }

}
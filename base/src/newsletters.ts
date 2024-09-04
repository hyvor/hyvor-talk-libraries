import { addScriptIfNotAdded, setAttributes } from "./helper";
import { HYVOR_TALK_CLOUD_INSTANCE } from "./vars";

export type NewslettersProps = {
    'website-id': number;
    instance?: string;
    title?: string;
    description?: string;
    language?: string;
    'sso-user'?: string;
    'sso-hash'?: string;
    colors?: 'light' | 'dark' | 'os';
} & Partial<{
    [K in keyof NewslettersTAttributes as `t-${K & string}`]: NewslettersTAttributes[K]
}>;

export interface NewslettersTAttributes {
    email: string;
    'button-subscribe': string;
    'button-subscribed': string;
    'button-save': string;
    success: string;
};

export type NewslettersCustomElement = HTMLElement & {};

export class Newsletters {

    static script(instance?: string) {
        instance = instance || HYVOR_TALK_CLOUD_INSTANCE;
        addScriptIfNotAdded(`${instance}/embed/newsletter.js`);
    }

    static form(props: NewslettersProps, container: HTMLElement) : NewslettersCustomElement {
        Newsletters.script(props.instance);
        
        const newsletter = document.createElement('hyvor-talk-newsletter') as NewslettersCustomElement;
        setAttributes(newsletter, props);

        container.appendChild(newsletter);

        return newsletter;
    }

}
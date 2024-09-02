import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { beforeEach } from "bun:test";

GlobalRegistrator.register({
    settings: {
        disableJavaScriptEvaluation: true,
    }
});

beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
})
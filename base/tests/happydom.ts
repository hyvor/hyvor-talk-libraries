import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { beforeEach } from "bun:test";

GlobalRegistrator.register();

beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
})
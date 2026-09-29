import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type UserRulesKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'settings.user-rules': UserRulesKey;
    }
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map
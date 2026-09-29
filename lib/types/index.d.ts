/**
 * Host registration: the `user-rules` settings namespace and its systemPrompt
 * injection. Under the profile-config settings model the plugin's Config schema
 * IS the namespace, so the owning profile entry id must equal `user-rules`.
 * `rules` is volatile; the section's text provider reads the live reference at
 * assembly time, so new turns pick up edits without a remount.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { UserRulesHostConfig } from './user-rules-schema.ts';
export { USER_RULES_NAMESPACE, UserRulesSchema } from './user-rules-schema.ts';
export type { UserRulesSettings } from './user-rules-schema.ts';
/** Services required: the systemPrompt registry this plugin contributes a section to. */
export declare const inject: string[];
/** Config schema; the owning profile entry's id must equal {@link USER_RULES_NAMESPACE}. */
export declare const Config: import("@deepseek-ai/schemastery").default<Schemastery.ObjectS<NoInfer<{
    rules: import("@deepseek-ai/schemastery").default<NoInfer<string[]>, NoInfer<string[]>, "volatile-defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    rules: import("@deepseek-ai/schemastery").default<NoInfer<string[]>, NoInfer<string[]>, "volatile-defined">;
}>>, "plain">;
/**
 * Inject the resolved user-rules value as a systemPrompt section.
 * @param ctx - Host context whose systemPrompt registry owns the section.
 * @param config - resolved `user-rules` section; `rules` is a live volatile reference.
 */
export declare function apply(ctx: Context, config: UserRulesHostConfig): void;
//# sourceMappingURL=index.d.ts.map
/**
 * Host registration: the `user-rules` settings namespace and its systemPrompt
 * injection. Under the profile-config settings model the plugin's Config schema
 * IS the namespace, so the owning profile entry id must equal `user-rules`.
 * `rules` is volatile; the section's text provider reads the live reference at
 * assembly time, so new turns pick up edits without a remount.
 */
import { UserRulesSchema } from "./user-rules-schema.js";
export { USER_RULES_NAMESPACE, UserRulesSchema } from "./user-rules-schema.js";
const PROMPT_HEADER = '## 用户自定义规则\n\n以下是你在开发过程中必须遵守的条例:\n\n';
/** Services required: the systemPrompt registry this plugin contributes a section to. */
export const inject = ['systemPrompt'];
/** Config schema; the owning profile entry's id must equal {@link USER_RULES_NAMESPACE}. */
export const Config = UserRulesSchema;
/**
 * Inject the resolved user-rules value as a systemPrompt section.
 * @param ctx - Host context whose systemPrompt registry owns the section.
 * @param config - resolved `user-rules` section; `rules` is a live volatile reference.
 */
export function apply(ctx, config) {
    const dispose = ctx.systemPrompt.section({
        name: 'user-rules',
        order: -50,
        text: () => {
            const rules = config.rules.get() ?? [];
            if (rules.length === 0)
                return '';
            return PROMPT_HEADER + rules.map((rule, index) => `${index + 1}. ${rule}`).join('\n') + '\n';
        },
    });
    ctx.effect(() => dispose, 'user-rules: systemPrompt section');
}
//# sourceMappingURL=index.js.map
/** User rules settings schema (host + browser shared). */
import z from '@deepseek-ai/schemastery';
/** Settings namespace owned by the user-rules settings bridge. */
export const USER_RULES_NAMESPACE = 'user-rules';
/**
 * Durable user-rules schema. `rules` is volatile so the profile-config settings
 * model exposes it as a live-editable field; the section text reads the live
 * reference at assembly time, so new turns pick up edits without a remount.
 */
export const UserRulesSchema = z.object({
    rules: z.array(z.string()).default([]).volatile(),
});
//# sourceMappingURL=user-rules-schema.js.map
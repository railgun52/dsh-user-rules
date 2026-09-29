/** User rules settings schema (host + browser shared). */
import type { Volatile } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Settings namespace owned by the user-rules settings bridge. */
export declare const USER_RULES_NAMESPACE = "user-rules";
/** Durable user-rules section shared by the Host schema and the browser scope. */
export interface UserRulesSettings {
    rules: string[];
}
/**
 * Durable user-rules schema. `rules` is volatile so the profile-config settings
 * model exposes it as a live-editable field; the section text reads the live
 * reference at assembly time, so new turns pick up edits without a remount.
 */
export declare const UserRulesSchema: z<Schemastery.ObjectS<NoInfer<{
    rules: z<NoInfer<string[]>, NoInfer<string[]>, "volatile-defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    rules: z<NoInfer<string[]>, NoInfer<string[]>, "volatile-defined">;
}>>, "plain">;
/** Resolved Host config; the volatile field is read through its live reference. */
export type UserRulesHostConfig = {
    rules: Volatile<string[]>;
};
//# sourceMappingURL=user-rules-schema.d.ts.map
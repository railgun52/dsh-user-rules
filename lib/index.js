import z from "@deepseek-ai/schemastery";
//#region lib/types/user-rules-schema.js
/** User rules settings schema (host + browser shared). */
/** Settings namespace owned by the user-rules settings bridge. */
const USER_RULES_NAMESPACE = "user-rules";
/**
* Durable user-rules schema. `rules` is volatile so the profile-config settings
* model exposes it as a live-editable field; the section text reads the live
* reference at assembly time, so new turns pick up edits without a remount.
*/
const UserRulesSchema = z.object({ rules: z.array(z.string()).default([]).volatile() });
//#endregion
//#region lib/types/index.js
/**
* Host registration: the `user-rules` settings namespace and its systemPrompt
* injection. Under the profile-config settings model the plugin's Config schema
* IS the namespace, so the owning profile entry id must equal `user-rules`.
* `rules` is volatile; the section's text provider reads the live reference at
* assembly time, so new turns pick up edits without a remount.
*/
const PROMPT_HEADER = "## 用户自定义规则\n\n以下是你在开发过程中必须遵守的条例:\n\n";
/** Services required: the systemPrompt registry this plugin contributes a section to. */
const inject = ["systemPrompt"];
/** Config schema; the owning profile entry's id must equal {@link USER_RULES_NAMESPACE}. */
const Config = UserRulesSchema;
/**
* Inject the resolved user-rules value as a systemPrompt section.
* @param ctx - Host context whose systemPrompt registry owns the section.
* @param config - resolved `user-rules` section; `rules` is a live volatile reference.
*/
function apply(ctx, config) {
	const dispose = ctx.systemPrompt.section({
		name: "user-rules",
		order: -50,
		text: () => {
			const rules = config.rules.get() ?? [];
			if (rules.length === 0) return "";
			return PROMPT_HEADER + rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n") + "\n";
		}
	});
	ctx.effect(() => dispose, "user-rules: systemPrompt section");
}
//#endregion
export { Config, USER_RULES_NAMESPACE, UserRulesSchema, apply, inject };

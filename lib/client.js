window.__ModuleLoader__.load({
	id: "@railgun52/dsh-user-rules",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:G:\DSH2026\deepseek-harness-master\packages\client\ui-settings-user-rules\src\client\UserRulesSection.module.css.mjs
		const css = ".i3ub5q_section{max-width:800px;padding:24px}.i3ub5q_header{margin-bottom:24px}.i3ub5q_title{margin:0 0 8px;font-size:20px;font-weight:600}.i3ub5q_intro{color:var(--text-secondary);margin:0;font-size:14px}.i3ub5q_toolbar{margin-bottom:16px}.i3ub5q_list{flex-direction:column;gap:8px;display:flex}.i3ub5q_ruleCard{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;align-items:center;gap:12px;padding:12px 16px;transition:box-shadow .15s;display:flex}.i3ub5q_ruleCard:hover{box-shadow:0 1px 4px #0000000f}.i3ub5q_ruleText{-webkit-line-clamp:2;word-break:break-all;cursor:default;-webkit-box-orient:vertical;flex:1;min-width:0;font-size:14px;line-height:1.5;display:-webkit-box;overflow:hidden}.i3ub5q_ruleActions{flex-shrink:0;align-items:center;gap:4px;display:flex}.i3ub5q_deleteBtn{cursor:pointer;color:var(--text-secondary);background:0 0;border:none;border-radius:4px;align-items:center;padding:4px;display:flex}.i3ub5q_deleteBtn:hover{background:var(--bg-hover);color:var(--text-error)}.i3ub5q_empty{text-align:center;color:var(--text-secondary);padding:40px}.i3ub5q_error{background:var(--bg-error);color:var(--text-error);border-radius:6px;margin-bottom:16px;padding:8px 12px;font-size:13px}.i3ub5q_loading{text-align:center;color:var(--text-secondary);padding:40px}.i3ub5q_modalBody{padding:16px}.i3ub5q_modalBody p{margin:8px 0}.i3ub5q_modalActions{justify-content:flex-end;gap:8px;padding:0 16px 16px;display:flex}.i3ub5q_textarea{border:1px solid var(--border);resize:vertical;background:var(--bg-input);width:100%;color:var(--text-primary);box-sizing:border-box;border-radius:6px;padding:8px 12px;font-family:inherit;font-size:14px;line-height:1.5}.i3ub5q_textarea:focus{border-color:var(--border-focus);outline:none}.i3ub5q_dialogRules{width:min(660px,100%)}";
		const tagId = "@railgun52/dsh-user-rules/UserRulesSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@railgun52/dsh-user-rules";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var UserRulesSection_module_css_default = {
			"deleteBtn": "i3ub5q_deleteBtn",
			"dialogRules": "i3ub5q_dialogRules",
			"empty": "i3ub5q_empty",
			"error": "i3ub5q_error",
			"header": "i3ub5q_header",
			"intro": "i3ub5q_intro",
			"list": "i3ub5q_list",
			"loading": "i3ub5q_loading",
			"modalActions": "i3ub5q_modalActions",
			"modalBody": "i3ub5q_modalBody",
			"ruleActions": "i3ub5q_ruleActions",
			"ruleCard": "i3ub5q_ruleCard",
			"ruleText": "i3ub5q_ruleText",
			"section": "i3ub5q_section",
			"textarea": "i3ub5q_textarea",
			"title": "i3ub5q_title",
			"toolbar": "i3ub5q_toolbar"
		};
		//#endregion
		//#region src/client/UserRulesSection.tsx
		function UserRulesSection({ load, save, t: t_ }) {
			const t = t_ ?? ((key) => key);
			const [rules, setRules] = (0, react.useState)([]);
			const [loading, setLoading] = (0, react.useState)(true);
			const [saving, setSaving] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [editIndex, setEditIndex] = (0, react.useState)(null);
			const [editText, setEditText] = (0, react.useState)("");
			const [showEditModal, setShowEditModal] = (0, react.useState)(false);
			const [deleteTarget, setDeleteTarget] = (0, react.useState)(null);
			const loadConfig = (0, react.useCallback)(() => {
				setLoading(true);
				setError(null);
				try {
					setRules(load?.() ?? []);
				} catch (e) {
					setError(t("loadFailed"));
				} finally {
					setLoading(false);
				}
			}, [load, t]);
			(0, react.useEffect)(() => {
				loadConfig();
			}, [loadConfig]);
			const saveConfig = async (newRules) => {
				setSaving(true);
				setError(null);
				try {
					await save?.(newRules);
					setRules(newRules);
				} catch (e) {
					setError(t("saveFailed"));
				} finally {
					setSaving(false);
				}
			};
			const handleAdd = () => {
				setEditText("");
				setEditIndex(null);
				setShowEditModal(true);
			};
			const handleEdit = (index) => {
				const rule = rules[index];
				if (rule === void 0) return;
				setEditText(rule);
				setEditIndex(index);
				setShowEditModal(true);
			};
			const handleSave = async () => {
				const trimmed = editText.trim();
				if (!trimmed) return;
				const newRules = [...rules];
				if (editIndex !== null) newRules[editIndex] = trimmed;
				else newRules.push(trimmed);
				await saveConfig(newRules);
				setShowEditModal(false);
				setEditText("");
			};
			const handleDelete = async (index) => {
				await saveConfig(rules.filter((_, i) => i !== index));
				setDeleteTarget(null);
			};
			if (loading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: UserRulesSection_module_css_default.section,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: UserRulesSection_module_css_default.loading,
					children: "Loading..."
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: UserRulesSection_module_css_default.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: UserRulesSection_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							className: UserRulesSection_module_css_default.title,
							children: t("title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: UserRulesSection_module_css_default.intro,
							children: t("intro")
						})]
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: UserRulesSection_module_css_default.error,
						children: error
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: UserRulesSection_module_css_default.toolbar,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: handleAdd,
							disabled: saving,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {}),
								" ",
								t("add")
							]
						})
					}),
					rules.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: UserRulesSection_module_css_default.empty,
						children: t("noRules")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: UserRulesSection_module_css_default.list,
						children: rules.map((rule, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UserRulesSection_module_css_default.ruleCard,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: UserRulesSection_module_css_default.ruleText,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
									label: rule,
									side: "top",
									disabled: rule.length <= 40,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: { cursor: "default" },
										children: rule
									})
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: UserRulesSection_module_css_default.ruleActions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									onClick: () => handleEdit(i),
									children: t("edit")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: UserRulesSection_module_css_default.deleteBtn,
									onClick: () => setDeleteTarget(i),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, {})
								})]
							})]
						}, i))
					}),
					showEditModal && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: true,
						onClose: () => setShowEditModal(false),
						title: editIndex !== null ? t("edit") : t("add"),
						closeLabel: t("close"),
						className: UserRulesSection_module_css_default.dialogRules ?? "",
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: handleSave,
							disabled: saving || !editText.trim(),
							children: t("save")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: () => setShowEditModal(false),
							children: t("cancel")
						})] }),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: UserRulesSection_module_css_default.modalBody,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
								className: UserRulesSection_module_css_default.textarea,
								value: editText,
								onChange: (e) => setEditText(e.target.value),
								placeholder: t("rulePlaceholder"),
								rows: 10
							})
						})
					}),
					deleteTarget !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: true,
						onClose: () => setDeleteTarget(null),
						title: t("remove"),
						closeLabel: t("close"),
						className: UserRulesSection_module_css_default.dialogRules ?? "",
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: () => handleDelete(deleteTarget),
							children: t("remove")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: () => setDeleteTarget(null),
							children: t("cancel")
						})] }),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UserRulesSection_module_css_default.modalBody,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("deleteConfirm") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("deleteDescription") })]
						})
					})
				]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		const en = {
			nav: "User Rules",
			title: "User Rules",
			intro: "Set custom rules that the AI agent must follow during development.",
			add: "Add rule",
			edit: "Edit",
			remove: "Delete",
			deleteConfirm: "Delete this rule?",
			deleteDescription: "This rule will no longer be injected into new sessions.",
			rulePlaceholder: "e.g. Always use TypeScript for new files.",
			save: "Save",
			saving: "Saving...",
			cancel: "Cancel",
			close: "Close",
			noRules: "No rules configured. Click \"Add rule\" to get started.",
			loadFailed: "Failed to load user rules.",
			saveFailed: "Failed to save user rules.",
			saved: "Rules saved.",
			reorder: "Drag to reorder"
		};
		const zh = {
			nav: "用户规则",
			title: "用户规则",
			intro: "设置 AI 智能体在开发过程中必须遵守的自定义规则。",
			add: "添加规则",
			edit: "编辑",
			remove: "删除",
			deleteConfirm: "删除这条规则？",
			deleteDescription: "这条规则将不再注入到新的会话中。",
			rulePlaceholder: "例如：新建文件时使用 TypeScript。",
			save: "保存",
			saving: "保存中...",
			cancel: "取消",
			close: "关闭",
			noRules: "还没有配置规则，点击\"添加规则\"开始配置。",
			loadFailed: "加载用户规则失败。",
			saveFailed: "保存用户规则失败。",
			saved: "规则已保存。",
			reorder: "拖拽排序"
		};
		//#endregion
		//#region src/client/index.ts
		const NS = "settings.user-rules";
		const NAMESPACE = "user-rules";
		const inject = [
			"slots",
			"locale",
			"configForms"
		];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-settings-user-rules: copy dictionaries");
			const form = ctx.configForms.get(NAMESPACE);
			const t = ctx.locale.bind(NS);
			const load = () => form.getSnapshot().value?.rules ?? [];
			const save = async (rules) => {
				await form.set("rules", rules);
			};
			ctx.effect(() => ctx.configForms.whileServed([NAMESPACE], () => ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "user-rules",
				order: 30,
				label: () => t("nav"),
				locale: NS,
				inject: () => ({
					load,
					save,
					t
				})
			}, UserRulesSection))), "ui-settings-user-rules: page");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
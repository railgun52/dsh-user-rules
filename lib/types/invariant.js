const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-settings-user-rules';
export const name = 'client-ui-settings-user-rules-invariant';
export const inject = ['invariants'];
const install = () => { };
export const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//# sourceMappingURL=invariant.js.map
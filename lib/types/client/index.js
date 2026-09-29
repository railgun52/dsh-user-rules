import { UserRulesSection } from "./UserRulesSection.js";
import { en, zh } from "./locales.js";
const NS = 'settings.user-rules';
const NAMESPACE = 'user-rules';
export const inject = ['slots', 'locale', 'configForms'];
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-settings-user-rules: copy dictionaries');
    const form = ctx.configForms.get(NAMESPACE);
    const t = ctx.locale.bind(NS);
    const load = () => form.getSnapshot().value?.rules ?? [];
    const save = async (rules) => { await form.set('rules', rules); };
    ctx.effect(() => ctx.configForms.whileServed([NAMESPACE], () => ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'user-rules',
        order: 30,
        label: () => t('nav'),
        locale: NS,
        inject: () => ({ load, save, t }),
    }, UserRulesSection))), 'ui-settings-user-rules: page');
}
//# sourceMappingURL=index.js.map
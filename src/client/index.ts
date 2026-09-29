import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import { UserRulesSection } from './UserRulesSection.tsx'
import type { UserRulesSectionInjected } from './UserRulesSection.tsx'
import { en, zh, type UserRulesKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'settings.user-rules': UserRulesKey
  }
}
const NS = 'settings.user-rules'
const NAMESPACE = 'user-rules'

interface UserRulesConfig {
  rules: string[]
}

export const inject = ['slots', 'locale', 'configForms']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-settings-user-rules: copy dictionaries')
  const form = ctx.configForms.get<UserRulesConfig>(NAMESPACE)
  const t = ctx.locale.bind(NS) as UserRulesSectionInjected['t']
  const load = (): string[] => form.getSnapshot().value?.rules ?? []
  const save = async (rules: string[]): Promise<void> => { await form.set('rules', rules) }
  ctx.effect(() => ctx.configForms.whileServed([NAMESPACE], () => ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'user-rules',
    order: 30,
    label: () => t('nav'),
    locale: NS,
    inject: (): UserRulesSectionInjected => ({ load, save, t }),
  }, UserRulesSection))), 'ui-settings-user-rules: page')
}

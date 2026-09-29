import type { UserRulesKey } from './locales.ts';
export interface UserRulesSectionInjected {
    load: () => string[];
    save: (rules: string[]) => Promise<void>;
    t: (key: UserRulesKey) => string;
}
export type UserRulesSectionProps = Partial<UserRulesSectionInjected>;
export declare function UserRulesSection({ load, save, t: t_ }: UserRulesSectionProps): import("react").JSX.Element;
//# sourceMappingURL=UserRulesSection.d.ts.map
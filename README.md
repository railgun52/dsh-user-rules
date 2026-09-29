# dsh-user-rules — User rules settings page

[![npm](https://img.shields.io/npm/v/@railgun52/dsh-user-rules?style=flat-square)](https://www.npmjs.com/package/@railgun52/dsh-user-rules)

English | [中文](README.zh.md)

> A profile-config settings page for DeepSeek Harness that injects your own development rules into every session's system prompt.

Rules you add here are concatenated into a `user-rules` systemPrompt section, so the model obeys them on the next turn — edit and it takes effect without a restart. The page is a list editor over the `user-rules` profile-config namespace; the Host half owns the schema and the systemPrompt section, the browser half owns the editor card.

## Features

| Feature | Description |
|---|---|
| Settings page | A first-level Settings section `用户规则` with add/edit/remove/reorder card list |
| systemPrompt injection | The resolved `rules` become a numbered systemPrompt section named `user-rules` (order `-50`) |
| Live edits | `rules` is declared `.volatile()`; the section text reads the live value at assembly time, so new turns pick up edits with no remount |
| Profile-config backed | Values persist to the active profile's plugin config; the page reads/writes through the shared `configForms` namespace |

## Architecture

```text
dsh-user-rules/
|-- src/
|   |-- index.ts               # host half: Config schema (volatile rules) + systemPrompt section
|   |-- user-rules-schema.ts   # UserRulesSchema
|   |-- invariant.ts
|   `-- client/
|       |-- index.ts           # browser half: configForms.whileServed + settings.section card
|       |-- UserRulesSection.tsx
|       |-- UserRulesSection.module.css
|       `-- locales.ts         # zh/en nav + page copy
`-- cordis.patch.yml           # bundle patch: inserts the user-rules plugin row
```

- **Namespace**: `user-rules`. The owning profile entry id must equal this string; the plugin's Config schema IS the namespace under the profile-config settings model.
- **Injection**: `apply` registers a `systemPrompt.section` whose `text` reads `config.rules.get()` on every assembly, so the rules always reflect the current value.
- **Browser bundle**: rides the `window.__ModuleLoader__.load` contract; React and `@deepseek-ai/dsh-client-ui-primitives` resolve from the loader's module table (external); CSS Modules are inlined by lightningcss as `<style data-plugin>`.

## Install

```sh
### From a local directory (development)
dsh plugin --profile web add link:/absolute/path/to/dsh-user-rules

### From npm (recommended)
dsh plugin --profile web add @railgun52/dsh-user-rules@latest
```

After installing, **restart `dsh web`**. Open Settings → 用户规则 to manage rules. In link mode, run `pnpm build` and refresh the page after a code change; no reinstall needed.

## Development

```sh
pnpm install
pnpm build        # tsc -b (types+declarations) && tsdown (node half + browser bundle)
pnpm typecheck    # type check only
```

The browser bundle is produced with the harness `clientBundle` helper; building from a fresh clone requires the DeepSeek Harness repository available (the `tsdown.config.ts` imports its `clientBundle`). The shipped `lib/` is pre-built, so consumers never build.

## License

[MIT](LICENSE)

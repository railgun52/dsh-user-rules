# dsh-user-rules — 用户规则设置页

[![npm](https://img.shields.io/npm/v/@railgun52/dsh-user-rules?style=flat-square)](https://www.npmjs.com/package/@railgun52/dsh-user-rules)

[English](README.md) | 中文

> DeepSeek Harness 的 profile-config 设置页，把你的开发规则注入到每个会话的系统提示里。

你在这里添加的规则会拼接成一个名为 `user-rules` 的 systemPrompt section，模型从下一轮起就会遵守——改完即生效，无需重启。页面是对 `user-rules` profile-config 命名空间的列表编辑器；Host 端负责 schema 与 systemPrompt section，浏览器端负责编辑卡片。

## 功能

| 功能 | 说明 |
|---|---|
| 设置页 | 一级设置 section `用户规则`，提供增/改/删/排序卡片列表 |
| systemPrompt 注入 | 解析后的 `rules` 成为名为 `user-rules` 的编号 systemPrompt section（order `-50`） |
| 实时编辑 | `rules` 声明为 `.volatile()`；section 文本在装配时读实时值，新会话立即生效，不重载插件 |
| profile-config 存储 | 值持久化到当前 profile 的插件配置；页面通过共享 `configForms` 命名空间读写 |

## 架构

```text
dsh-user-rules/
|-- src/
|   |-- index.ts               # host 端：Config schema（volatile rules）+ systemPrompt section
|   |-- user-rules-schema.ts   # UserRulesSchema
|   |-- invariant.ts
|   `-- client/
|       |-- index.ts           # 浏览器端：configForms.whileServed + settings.section 卡片
|       |-- UserRulesSection.tsx
|       |-- UserRulesSection.module.css
|       `-- locales.ts         # zh/en 导航与页面文案
`-- cordis.patch.yml           # bundle patch：插入 user-rules 插件行
```

- **命名空间**：`user-rules`。所属 profile 条目 id 必须等于该字符串；在 profile-config 设置模型下，插件的 Config schema 即命名空间。
- **注入**：`apply` 注册一个 `systemPrompt.section`，其 `text` 在每次装配时读 `config.rules.get()`，因此规则始终反映当前值。
- **浏览器 bundle**：走 `window.__ModuleLoader__.load` 契约；React 与 `@deepseek-ai/dsh-client-ui-primitives` 从加载器模块表解析（external）；CSS Modules 由 lightningcss 内联为 `<style data-plugin>`。

## 安装

```sh
### 从本地目录（开发）
dsh plugin --profile web add link:/absolute/path/to/dsh-user-rules

### 从 npm（推荐）
dsh plugin --profile web add @railgun52/dsh-user-rules@latest
```

安装后**重启 `dsh web`**。打开 设置 → 用户规则 管理规则。link 模式下改代码后跑 `pnpm build` 再刷新页面即可，无需重新安装。

## 开发

```sh
pnpm install
pnpm build        # tsc -b（类型+声明）&& tsdown（node 半 + 浏览器 bundle）
pnpm typecheck    # 仅类型检查
```

浏览器 bundle 用 harness 的 `clientBundle` helper 产出；从全新克隆构建需要 DeepSeek Harness 仓库在场（`tsdown.config.ts` 引入其 `clientBundle`）。发布的 `lib/` 已预构建，使用者无需构建。

## 许可证

[MIT](LICENSE)

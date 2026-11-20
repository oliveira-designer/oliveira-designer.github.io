# Applied to design-organization/CHANGELOG.md on 2026-11-20 (version 2.7.0, MINOR, approved by the owner). Kept here as the source draft.

## v2.7.0 · 20 de novembro de 2026 · Renomeação semântica dos tokens (Figma Foundation), Button completo, anel de foco em outline, Badge Draft removido (MINOR)

**Versão aprovada pelo dono: MINOR (2.6.17 para 2.7.0).** Pela seção 3 do `GOVERNANCE.md`, MINOR cobre nova família de tokens e "expansão de escala (mais tamanhos, mais variantes)". Entram 14 tokens semânticos novos e 4 variantes de Button (Accent, Inverse, Destructive, Small Ghost). Não é MAJOR porque a renomeação não quebra a compatibilidade reversa: os 28 nomes antigos continuam funcionando como alias (`--antigo: var(--novo)`). Única quebra real: a classe `.badge--draft` foi removida **sem alias** (nenhuma página do site a usava; só o `design-system.html` e as páginas de docs). Os nomes antigos dos tokens são aliases deprecated e só saem numa futura versão MAJOR. Versões: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.7.0, `tokens.css` (cabeçalho) 2.7.0, `GOVERNANCE.md` 1.5 e `PATTERNS.md` 1.1.2 sem mudança (precedente da v2.6.17). A entrada v2.6.18 (só docs) continua válida como história.

**1. Renomeação (tabela `token-rename-2026-11-20.md`)**
- Gramática Property/Role/Level[ Modifier]; níveis Default, Secondary, Tertiary, Strong; Inverse para texto, ícone e borda sobre o preenchimento contrastante.
- 28 nomes antigos viram alias deprecated em `css/tokens.css` (`/* deprecated 2026-11, use --novo */`). Todos os usos em `css/`, `docs/`, `scripts/` e HTML foram trocados pelos nomes novos (50 substituições fora de `tokens.css`).
- `--icon-color-on-neutral` vira `--icon-color-neutral`; `.icon--on-neutral` vira `.icon--neutral`. Os antigos seguem como alias.
- Valores: `--color-bg-neutral-secondary` passa a Night/800 e `--color-text-neutral-secondary` a Night/300, em todos os modos. Único uso antigo era `.badge--draft` (removido).

**2. Tokens novos (valor Light também no dark, marcados `TODO dark mode`)**
- `--color-error-deep`, `--color-bg-danger-hover`, `--color-bg-neutral-tertiary`, `--color-text-neutral-tertiary`, `--color-border-neutral-default`, `--color-border-neutral-strong`, `--color-bg-neutral-inverse` (dark `#0d0d0f`), `--color-text-neutral-inverse` (dark `#ffffff`), `--focus-ring-width`, `--focus-ring-gap`.
- Derivados de primitivos existentes pelo snapshot do Figma de 20/11/2026 (valores Light em `:root`, valores Dark em `[data-theme="dark"]`, sem `TODO dark mode`): `--color-bg-brand-default`, `--color-bg-brand-hover`, `--color-text-brand-inverse`, `--color-bg-accent-default`, `--color-bg-accent-hover`, `--color-text-accent-inverse`, `--color-bg-danger-default`, `--color-bg-positive-default`, `--color-text-positive-inverse`, `--color-text-danger-inverse`.
- Dark dos 10 derivados, do Figma: `bg-brand-default` Tide, `bg-brand-hover` Anchor, `text-brand-inverse` Ink, `bg-accent-default` Daybreak, `bg-accent-hover` Solar, `text-accent-inverse` Ink, `bg-danger-default` Night/error-soft, `bg-positive-default` Night/success-soft, `text-positive-inverse` e `text-danger-inverse` Cloud. Seguem com `TODO dark mode` a família Neutral e `--color-bg-danger-hover` (no Figma o Dark é igual ao Light de propósito).
- Não criado: `--color-bg-brand-tertiary` (Figma: Sky a 40% no Light, Anchor a 15% no Dark; sem token equivalente no CSS). Novo token auxiliar: `--border-width-normal: 1px` (a largura sozinha, para `calc()`; `--border-normal` é um atalho e não entra em `calc()`).

**3. Button (Figma Core)**
- Medium: raio 12px, gap 8px, label 13px SemiBold, line-height 1.6, ícone 16px, borda de 1px em todos os estilos. No Figma a borda de 1px é desenhada por dentro; no CSS ela soma ao tamanho, então é subtraída do padding com `calc()`: Medium `11px 19px` (44,8px de altura) e Small Ghost `7px 15px` (36,8px), mesmo tamanho em todos os estados.
- Novos: `.btn--accent`, `.btn--inverse`, `.btn--destructive`, `.btn--ghost-sm`. Hover de Secondary e Ghost passa a seguir o Figma. Disabled por tokens, com especificidade que vence o hover.

**4. Anel de foco**
- De `box-shadow` de 3px para `outline: var(--focus-ring-width) solid var(--color-border-focus-ring)` com `outline-offset: var(--focus-ring-gap)`. Botão, Link, botão genérico, auth gate (fechar, olho, campo) e fechar do Lightbox. O campo do auth gate deixa de mudar a borda no foco.

**5. Badge**
- `.badge--draft` removido; `.badge--neutral` no lugar (`design-system.html`).

**6. Rodapé alinhado ao Figma (Footer, Style=Dark)**
- Superfície `--color-bg-neutral-default` (Ink) no lugar de Abyss; todo o texto em `--color-text-neutral-default`, sem variantes de branco translúcido; borda da barra inferior `--color-border-strong`; botões `.btn--inverse`. `.btn--footer` e suas regras saíram do `layout.css` e do HTML, sem nenhum override local de foco, hover ou disabled. Comentário `TODO dark mode`: a superfície do rodapé acompanha os tokens Neutral no tema escuro.

**7. Borda superior do rodapé em tokens (D-26)**
- `--border-width-accent: 3px` (Figma `Stroke/accent`), no mesmo padrão do `--border-width-normal`. A borda do rodapé usa `var(--border-width-accent) solid var(--color-border-accent-default)`; o resultado computado segue 3px sólido Solar. O Figma foi atualizado para o código.
- Snapshot do Foundation relido: `Stroke/thin` agora aponta para `--border-width-normal` e `Stroke/accent` para `--border-width-accent`. Comparador: 149 iguais, 2 diferentes (dark já conhecidos).

**8. Guarda no `docs:check` (D-28)**
- Falha se `components-content.json` ou `components-code-notes.json` faltarem enquanto houver páginas de componente, ou se um slug do conteúdo não tiver `docs/components/<slug>.html`. Itens já respondidos saíram das listas "unverified" de Button, Badge e Link.

**9. `case-studies/dotz backup.html` removido (D-27)**
- Página órfã, sem nenhuma referência funcional (só menções históricas em prosa) e sem CSS exclusivo.

**10. `--color-bg-brand-tertiary` criado (D-29)**
- Light `rgba(232, 240, 249, 0.40)` (Sky a 40%), Dark `rgba(28, 95, 168, 0.15)` (Anchor a 15%), iguais ao Figma. Reservado: nenhum componente usa. Chaves `bg-brand-tertiary` e `bg-brand-tertiary-dark` no YAML do `DESIGN.md`. Comparador: 150 iguais, 0 tokens do Figma sem token no CSS.

**11. Seção vazia nas páginas de componente (D-29)**
- O gerador deixa de renderizar "Not yet verified" (e a entrada do sumário) quando a lista `unverified` está vazia; só a página do Badge mudou.

**12. CSS dividido por componente (D-18)**
- `css/components.css` virou 17 arquivos em `css/components/` (um por família de componente) e `css/layout.css` virou 18 arquivos em `css/site/` (mais `site/animations.css`, que era `animations.css`). `tokens.css` e `reset.css` ficam como estavam; `auth.css` segue carregado por `js/auth.js` e `output.css` é o Tailwind.
- As páginas carregam um único `css/hope.css`, **gerado** por `npm run css:build` (`scripts/build-css.mjs`) na ordem fixa: tokens, reset, `components/*` em ordem alfabética, `site/*` na ordem original do `layout.css`, `animations`. O site continua carregando depois da camada de componentes porque sobrescreve `.btn`, `.logo-strip`, `.testimonial-card`, `.icon` e `.case-section__body`.
- `docs:check` falha se `css/hope.css` estiver defasado das fontes. Os geradores de docs, `docs/data/css-sources.json` e as páginas passaram a apontar para o agregado; a referência de código das páginas de componente continua citando o arquivo de origem.
- Refatoração pura: nenhum seletor, valor ou classe mudou. Verificado com estilo computado (hash por elemento, incluindo `::before` e `::after`, hover e foco por teclado) em 13 páginas, 3 larguras e 2 temas: 0 diferenças nas páginas do site; nas páginas de docs só mudou texto de prosa (menções ao nome dos arquivos).

**13. Diário de decisões v0.8**
- `docs/case/decisoes-hope.md` atualizado (D-01 a D-30, inclui o foco do Breadcrumb no Figma), substituindo a versão anterior sem mesclar.

**Débitos**
- Comparador de tokens: 150 iguais e 2 diferentes (`--color-bg-scrim-strong` e `--color-bg-icon-chip` no Dark, já conhecidos); nenhum token do Figma sem token no CSS.
- `--color-text-neutral-secondary` (Night/300) tem contraste baixo sobre fundo claro; hoje sem uso.
- Altura do Button Medium: 44,8px no código contra 45px no Figma (diferença de 0,2px do line-height 1.6).
- Pesquisa das superfícies escuras (decisão D-24): ver `docs/case/drafts/dark-surface-survey.md` (feita antes do alinhamento do rodapé). Sobre Ink, o anel de foco Anchor tem 3,01:1. O modo "Neutral surface" e o `data-surface` seguem adiados.
- `GOVERNANCE.md` seção 7 ainda lista `hope-demo.html`.

---

# DRAFT, DESIGN.md YAML key updates (not applied)

Keys in `colors:` (the `-dark` variants follow the same rename):

| Old YAML key | New YAML key |
|---|---|
| bg-disabled / bg-disabled-dark | bg-disabled-default / bg-disabled-default-dark |
| text-disabled / text-disabled-dark | text-disabled-default / text-disabled-default-dark |
| text-on-disabled / text-on-disabled-dark | text-disabled-inverse / text-disabled-inverse-dark |
| border-disabled / border-disabled-dark | border-disabled-default / border-disabled-default-dark |
| bg-warning | bg-warning-default |
| bg-warning-soft / bg-warning-soft-dark | bg-warning-secondary / bg-warning-secondary-dark |
| text-warning / text-warning-dark | text-warning-default / text-warning-default-dark |
| text-on-warning | text-warning-inverse |
| border-warning | border-warning-default |
| bg-info | bg-info-default |
| bg-info-soft / bg-info-soft-dark | bg-info-secondary / bg-info-secondary-dark |
| text-info / text-info-dark | text-info-default / text-info-default-dark |
| text-on-info | text-info-inverse |
| border-info | border-info-default |
| text-success / text-success-dark | text-positive-default / text-positive-default-dark |
| text-error / text-error-dark | text-danger-default / text-danger-default-dark |
| border-success | border-positive-default |
| border-error / border-error-dark | border-danger-default / border-danger-default-dark |

Also update `components:` entries that reference these (for example line 311-312: `backgroundColor: "{colors.bg-disabled}"` and `textColor: "{colors.text-on-disabled}"`), and the prose that names the old tokens (sections around lines 969, 978, 1006, 1007).

Keys to add (Light value, dark = Light until dark mode is revisited): bg-neutral-tertiary, text-neutral-tertiary, border-neutral-default, border-neutral-strong, bg-neutral-inverse (+ `-dark` #0D0D0F), text-neutral-inverse (+ `-dark` #FFFFFF), bg-brand-default, bg-brand-hover, text-brand-inverse, bg-accent-default, bg-accent-hover, text-accent-inverse, bg-danger-default, bg-danger-hover, text-danger-inverse, bg-positive-default, text-positive-inverse, error-deep (primitive #7A2020). Spacing/focus: focus-ring-width 2px, focus-ring-gap 2px.

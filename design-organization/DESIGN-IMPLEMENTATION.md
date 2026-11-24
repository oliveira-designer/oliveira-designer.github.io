# DESIGN-IMPLEMENTATION.md
# Hope Design System — Implementação técnica detalhada
# Versão 2.11.0 · Baseado no Brandbook V2.2 · 2026

Este arquivo é o **companion técnico do DESIGN.md**. Enquanto o `DESIGN.md` segue o formato Google Labs (YAML front matter + prosa curta para agentes), este documento contém o **CSS completo e detalhado** para implementação humana.

**Ler em conjunto com:**
- `DESIGN.md` — fonte da verdade dos tokens
- `PATTERNS.md` — anatomias de página que combinam os componentes deste arquivo
- `GOVERNANCE.md` — regras de evolução e quando criar componente novo

**Changelog v2.11.0 (MINOR, 24/11/2026)**: Lote 2B (Indicadores e dicas): Tooltip, Progress, Spinner, Skeleton e Icon Button no CSS, escala de z-index do Figma, correções do Lote 2A (Toast sem Default, papéis Alert e Status, área de clique do dismiss, regra da borda por `strokesIncludedInLayout`). Detalhes no `CHANGELOG.md`.

**Changelog v2.10.0 (MINOR, 23/11/2026)**: Lote 2A (Mensagens): Alert, Toast, Banner (Notice do Figma) e Empty state no CSS. Checkbox, Radio e Switch com o texto de apoio fora do label. Detalhes no `CHANGELOG.md`.

**Changelog v2.9.0 (MINOR, 23/11/2026)**: Lote 1 (Forms): Input, Textarea, Select, Checkbox, Radio e Switch no CSS, com os tokens `--border-width-medium` e `--color-border-input`. Regra única da borda dentro da caixa (seção 5), aplicada também ao Badge Neutral (que passa de 30,8px para 28,8px de altura). Detalhes no `CHANGELOG.md`.

**Changelog v2.8.1 (PATCH, 23/11/2026)**: só documentação e site de docs. Todas as páginas de `docs/` passam ao mesmo layout (menu lateral, cartão de exemplo, HTML num `<details>`), as páginas de componentes saem de um único gerador a partir dos dados, a página de tokens usa o componente Table, e o layout antigo foi removido. Sem mudança de token, CSS de componente ou classe. Detalhes no `CHANGELOG.md`.

**Changelog v2.8.0 (MINOR, 23/11/2026)**: componente Table (`css/components/table.css`: `.data-table` e seus elementos), `.badge` com a geometria do Figma (padding 4 e 12, line-height 1,6) e `.badge--success` no token `--color-bg-positive-secondary`, snippet `a.link` da seção 15 removido, componentes do Figma codificados em lotes (GOVERNANCE v1.6), layout `ds` das páginas de docs e guarda de fonte mono no `docs:check`. Detalhes no `CHANGELOG.md`.

**Changelog v2.7.0 (MINOR, 20/11/2026)**: renomeação semântica dos tokens (Figma Foundation), Button completo (Accent, Inverse, Destructive, Small Ghost), anel de foco em `outline`, `.badge--draft` removido. Nomes antigos seguem como alias deprecated. Detalhes no CHANGELOG.

**Changelog v2.6.17 (PATCH, 19/11/2026)**: só documentação. Entra `docs/case/decisoes-hope.md` (diário de decisões do Hope). Sem mudança de token, CSS ou componente. Detalhes no CHANGELOG.

**Changelog v2.6.16 (PATCH, 19/11/2026)**: o layout da v2.6.15 foi revertido por decisão do dono (`git revert` de `cb3404c`): a largura do conteúdo, o `.nav`, a prosa de 68ch e a conta do `.cs-figure--full-bleed` voltam ao que eram. Nenhum token `--layout-*` existe no CSS. Registrada a divergência conhecida contra o Figma Layout/* (seção 18). As bordas da v2.6.15 ficam.

**Changelog v2.6.15 (PATCH, 19/11/2026)**: `--border-thin` passa de 0,5px para 0,8px (Stroke/hairline; `--border-normal` e `--border-strong` seguem 1px). A parte de layout desta versão foi revertida na v2.6.16.

**Changelog v2.6.14 (PATCH, 19/11/2026)**: correções vindas do relatório de divergência contra o Figma de 19/11/2026. `tokens.css`: novo `--space-none: 0`, cabeçalho e comentários da escala tipográfica corrigidos. Docs: dark `text-3` (#9090A8), dark `border-strong` (#69697E), link hover dark (#FFD96B), `borda-dark` renomeado para `bg-neutral-hover-dark` (#E2E2E8), primitivos Night que faltavam, `bg-scrim-strong` dark (#000000 a 88%) registrado como divergência conhecida no CSS, aliases que se referiam a si mesmos removidos, nomes `--color-link`, `--color-link-hover` e `--color-focus-ring` marcados como nomes do code syntax do Figma (no CSS são `--color-text-brand-primary`, `--color-text-brand-primary-hover` e `--color-border-focus-ring`), tokens `--icon-*` de tamanho, `--shadow-focus-error` e `--fs-code` removidos (nunca definidos, nunca usados). Nenhum token renomeado, nenhuma mudança de renderização. Detalhes no CHANGELOG.

**Changelog v2.6.13 (PATCH, 19/11/2026)**: a pilha monoespaçada literal do Tailwind sai do `css/output.css`. Novo `css/preflight-nomono.css` (cópia do preflight do Tailwind v4.3.0 sem o `font-family` da regra `code, kbd, samp, pre`), importado por `css/tailwind.css` na camada `base`, junto com `theme.css` e `utilities.css`, e `--font-mono: initial` no `@theme`. Zero diferenças de estilo computado. O `preflight-nomono.css` precisa ser ressincronizado a cada upgrade do Tailwind (ver `GOVERNANCE.md`, seção 11). Documentação alinhada às variáveis `size/*` do Figma.

**Changelog v2.6.12 (PATCH, 19/11/2026)**: `--fs-h3` passa de `clamp(14px, 1.5vw, 16px)` para `16px` fixo (Figma Heading/H3). `.case-section__subtitle` passa a usar `--fs-h3` no lugar de `--fs-body` (mesmo 16px, zero diferença de estilo computado). `--fs-body-xl` não muda e passa de "divergência aceita" a token fluido documentado, com os extremos iguais ao Figma (Desktop 19px, Mobile 16px). Medições no CHANGELOG.

**Changelog v2.6.11 (PATCH, 19/11/2026)**: `--fs-body-sm` passa de `clamp(12px, 1vw, 13px)` para `13px` fixo (Figma Body sm), como o `--fs-body` na v2.6.8. `.skill-card__body` e `.persona__role` renderizam 13px em todas as larguras, e todos os outros usos do token também. `--fs-h3` (14 a 16px) e `--fs-body-xl` (16 a 19px) seguem fluidos e ficam documentados como divergências aceitas do Figma, revisáveis depois, não como defeitos. Medições no CHANGELOG.

**Changelog v2.6.10 (PATCH, 18/11/2026)**: `:where(.case-section__body) p` no lugar de `.case-section__body p`, para que `.skill-card__body`, `.persona__role`, `.case-lead__text` e `.result-card__title` usem a própria regra; parágrafos sem classe inalterados. Removidas as regras `.about-split` sem uso. `.testimonials-ticker` recebe `position: relative`, o que corrige a largura do documento e o header em celular com movimento reduzido. Medições e a decisão pendente sobre `.skill-card__body` em 13px estão no CHANGELOG.

**Changelog v2.6.9 (PATCH, 18/11/2026)**: todas as labels uppercase passam a Regular (400): `.case-phase-break__label` (era 700), `.case-card__eyebrow` (500), `.badge--draft` (500) e `.header__status-badge` (600). `.team-section__title` passa a Label caps de verdade (11px, 400, 1,4, `--color-text-3`). Removidas as regras órfãs `.about-split__quote-text`, `.about-split__quote::before` e `.about-split__attribution`.

**Changelog v2.6.8 (PATCH, 18/11/2026)**: `--fs-body` passa de `clamp(14px, 1.2vw, 16px)` para `16px` fixo (Figma Body). `.about-bridge__headline` mapeado para `--fs-h1` (1.2, -0.01em). `.case-section__body p` deixa de definir line height, e os componentes mantêm o seu.

**Changelog v2.6.7 (PATCH, 18/11/2026)**: `.case-lead__text` registrado como o Body xl do Figma (19px, tracking -1%, no código -0,01em), sem mudança de CSS. `css/output.css` reconstruído com o build do projeto, sem diferença de renderização.

**Changelog v2.6.6 (PATCH, 18/11/2026)**: `.hero__body` e `.case-hero__subtitle` passam de `--fs-body-xl` para `--fs-body` (Body, 16px no máximo, line height 1,75). Decisão de 18/11/2026: o lead de 19px ficou grande demais no hero. As duas regras usam Body, não Body lg, de propósito. `--fs-body` não foi alterado.

**Changelog v2.6.5 (PATCH, 18/11/2026)**: `.hero__body` e `.case-hero__subtitle` passam de `--fs-body-lg` para `--fs-body-xl` (lead de 19px, line height 1,7). `--fs-body-lg` removido, porque o Figma não tem 17px. O changelog v2.2 abaixo cita o token como era na época.

**Changelog v2.6.4 (PATCH, 18/11/2026)**: H3 em Bold no CSS (`.text-h3`, `.case-section__subtitle`). Novo `--fs-body-xs` (11px) e `--fs-label` fixo em 11px (antes `clamp(10px, 1vw, 11px)`). Títulos com o tracking e o line height do estilo do Figma do seu tamanho (H1 1,2 e -0,01em; H2 1,3 e -0,01em; H3 1,4). `--fs-body-lg` segue em decisão.

**Changelog v2.6.3 (PATCH, 18/11/2026)**: a escala tipográfica segue os estilos de texto do Figma Foundation. Display 36–52px (máximo 52), H2 18–22px (máximo 22), H3 em Bold, Label caps com peso 400 e 0,12em, Metric no tamanho `--fs-h2` com line height 1.4 (removido o `--fs-metric`, que nunca existiu em `tokens.css`). Tracking das labels uppercase alinhado em 0,12em no CSS do site (`.badge--draft`, `.case-card__eyebrow`, `.persona__meta dt`, `.case-hero__meta dt`, `.case-phase-break__label`, `.case-callout__attribution`, `.about-split__attribution`, `.header__status-badge`).

**Changelog v2.6.2 (PATCH, 18/11/2026)**: `.badge--warning` passa a ser alias do `.badge--solar` na documentação (tokens `--color-bg-accent-secondary` e `--color-text-accent-secondary`, sem borda), no lugar dos tons de laranja. O bloco de `.badge--solar` agora espelha o `components.css`. Sem mudança de CSS no site.

**Changelog v2.6 (MINOR, 13/11/2026)**: Warning passa para a família Solar (`--color-bg-warning` Solar, `--color-bg-warning-soft` Aurora, `--color-text-warning` Dusk, `--color-border-warning` Amber; no dark, soft `--color-night-aurora-soft` e texto Solar). `--color-warning` (#C47A1F) fica só como primitivo Functional. Novo token `--color-bg-scrim-strong` (#0D0D0F a 88%, igual nos dois temas), usado pelo `.lightbox__backdrop`. Regra de uso do Solar reescrita (marca, Warning, Banner, Solar Badge). Tipografia: `label-caps` e `metric` do Figma migraram de Geist para Plus Jakarta Sans, sem mudança de CSS.

**Changelog v2.4 (MINOR, nov/2026)**: Tokens `--icon-color-*` e classes `.icon--<papel>` (equivalente do `Icon/Color` do Figma). Tipografia reescrita para uma única família (Plus Jakarta Sans). Nomes de tokens e classes em inglês (`--color-anchor`, `.badge--anchor`, `--color-bg-neutral-hover`), alinhados ao CSS e ao Figma. `--font-mono` removido dos exemplos.

**Changelog v2.3 (MINOR, Figma sync, novembro de 2026)**: tokens de estado e status (`--color-bg-disabled`, `--color-text-disabled`, `--color-text-on-disabled`, `--color-border-disabled`, família `warning` e `info`, `--color-text-success`, `--color-text-error`, `--color-border-success`, `--color-border-error`), scrim (`--color-bg-scrim`), primitivos `--color-night-500`, `--color-success-deep`, `--color-warning-deep`, `--color-error-light`, `--color-info-light`. O estado disabled deixa de usar `opacity` (`.btn:disabled`, `.case-card__action--disabled`). Contraste: `--color-border-strong` no dark passa a `--color-night-500`; texto de sucesso no light usa `--color-text-success`; mensagem e borda de erro do auth gate usam `--color-text-error` e `--color-border-error`. Componentes novos do Figma ainda não têm CSS.

**Changelog v2.2 (MINOR)**: Novos tokens `--fs-body-lg` e `--fs-body-xl` para escala fluida de parágrafos maiores. Novo token semântico `--color-bg-neutral-hover` para hover de `btn--primary` no tema escuro. BEM: `hero__greeting__avatar/text` → `hero__greeting-avatar/text`; `case-lead-text/split` → `case-lead__text/split`; `pivot` consolidado em `.case-lead`; `case-card--hope` renomeado para `case-card--glass`; `case-card--featured` removido (sem CSS correspondente). Hardcodes tokenizados: z-index, cores de nav mobile, fontes de `hero__body` e `case-hero__subtitle`. Dez componentes promovidos ao DS: `case-card--glass`, `testimonial-card`, `logo-strip`, `result-card`, `lightbox`, `skill-card--metric`, `phase-break`, `case-callout`, `cs-figure--full-bleed`, `header__status-badge` + `status-pulse`.

**Changelog v2.1 (MAJOR)**: Plus Jakarta Sans passa a cobrir toda a tipografia (display, headlines, body, overlines, labels, métricas e code). `--font-mono` foi removido (use `--font-body`). Novo token `--fs-metric`. Anti-padrão: família hardcoded fora do Hope é violação.

**Changelog v1.4**: Adicionada referência cruzada para PATTERNS.md e GOVERNANCE.md no preâmbulo.

**Changelog v1.3**: Adicionada seção 22 (Naming Conventions). **Changelog v1.2**: SVGs embarcados. **Changelog v1.1**: Acessibilidade, motion, estados, z-index.

---

## ÍNDICE

1. Logos (SVG inline)
2. Tipografia
3. Cores (com contraste WCAG)
4. Espaçamento
5. Bordas e raios
6. Sombras
7. Motion (transições, easing, reduced-motion)
8. Z-index system
9. Componentes — Botões
10. Componentes — Badges
11. Componentes — Cards
12. Componentes — Inputs
13. Componentes — Navegação (header, footer, nav)
14. Componentes — Mídia (imagens, vídeos)
15. Componentes — Conteúdo editorial (links, listas, blockquotes, code)
16. Componentes — Estados (loading, empty, error)
17. Tipografia — Classes utilitárias
18. Layout — Container e grid
19. Reset
20. Acessibilidade (focus, screen readers, contrast)
21. Ícones
22. Naming conventions
23. Estrutura de arquivos
24. Brandbook — referência rápida
25. Componentes promovidos v2.2 — CSS completo

---

## 1. LOGOS

Três arquivos SVG oficiais. Nunca recriar, sempre usar o arquivo original.

### Versão light mode
- **Arquivo**: `logo-light-mode.svg`
- **Dimensões**: 881 × 244px (viewBox)
- **Ícone solar**: `#F5C842`
- **Wordmark**: `#000000`
- **Uso**: headers em fundo claro, propostas, CV, assinatura de email

### Versão dark mode
- **Arquivo**: `logo-dark-mode.svg`
- **Dimensões**: 881 × 244px (viewBox)
- **Ícone solar**: `#F5C842`
- **Wordmark**: `#FFFFFF`
- **Uso**: fundos escuros (Abismo `#1A1A2E`), slides, covers de redes

### Ícone isolado (favicon / avatar)
- **Arquivo**: `logo-icon.svg`
- **Dimensões**: 244 × 244px (viewBox)
- **Cor**: `#F5C842`
- **Uso**: favicon (24px), avatar de redes (32px+), marca d'água, ícone de app

### SVG inline — Logo Light Mode (fallback embarcado)

```svg
<svg width="881" height="244" viewBox="0 0 881 244" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Renan Moura">
<path d="M228.75 144.875H190.196C190.478 142.343 190.621 139.797 190.625 137.25C190.625 119.049 183.395 101.594 170.525 88.7246C157.656 75.8549 140.2 68.6248 122 68.6248C103.8 68.6248 86.3445 75.8549 73.4748 88.7246C60.6051 101.594 53.375 119.049 53.375 137.25C53.3793 139.797 53.5225 142.343 53.8039 144.875H15.25C13.2277 144.875 11.2883 145.678 9.85831 147.108C8.42835 148.538 7.625 150.477 7.625 152.5C7.625 154.522 8.42835 156.461 9.85831 157.891C11.2883 159.321 13.2277 160.125 15.25 160.125H228.75C230.772 160.125 232.712 159.321 234.142 157.891C235.572 156.461 236.375 154.522 236.375 152.5C236.375 150.477 235.572 148.538 234.142 147.108C232.712 145.678 230.772 144.875 228.75 144.875ZM68.625 137.25C68.611 129.91 70.111 122.646 73.0313 115.912C75.9517 109.178 80.2295 103.119 85.5975 98.1126C90.9655 93.1067 97.3083 89.2617 104.23 86.818C111.151 84.3743 118.502 83.3843 125.823 83.91C133.144 84.4357 140.278 86.4658 146.779 89.8733C153.28 93.2808 159.008 97.9926 163.606 103.714C168.204 109.436 171.572 116.044 173.5 123.126C175.428 130.208 175.875 137.612 174.813 144.875H69.1873C68.8183 142.35 68.6304 139.802 68.625 137.25ZM205.875 190.625C205.875 192.647 205.072 194.586 203.642 196.016C202.212 197.446 200.272 198.25 198.25 198.25H45.75C43.7277 198.25 41.7883 197.446 40.3583 196.016C38.9283 194.586 38.125 192.647 38.125 190.625C38.125 188.602 38.9283 186.663 40.3583 185.233C41.7883 183.803 43.7277 183 45.75 183H198.25C200.272 183 202.212 183.803 203.642 185.233C205.072 186.663 205.875 188.602 205.875 190.625ZM69.4256 41.537C68.5207 39.727 68.3717 37.6317 69.0117 35.712C69.6516 33.7923 71.0279 32.2054 72.8378 31.3004C74.6478 30.3954 76.7431 30.2465 78.6628 30.8864C80.5825 31.5263 82.1694 32.9026 83.0744 34.7126L90.6994 49.9626C91.1475 50.8588 91.4147 51.8344 91.4857 52.8339C91.5567 53.8333 91.4302 54.837 91.1133 55.7875C90.7965 56.7381 90.2955 57.6169 89.639 58.3739C88.9825 59.1308 88.1834 59.751 87.2872 60.1991C86.391 60.6472 85.4153 60.9144 84.4159 60.9855C83.4164 61.0565 82.4128 60.93 81.4622 60.6131C80.5117 60.2963 79.6328 59.7953 78.8759 59.1388C78.1189 58.4823 77.4987 57.6831 77.0506 56.787L69.4256 41.537ZM16.0506 88.0876C16.4991 87.1918 17.1196 86.3931 17.8769 85.7372C18.6341 85.0813 19.5132 84.5811 20.4638 84.2651C21.4145 83.9491 22.4181 83.8235 23.4173 83.8956C24.4165 83.9676 25.3917 84.2358 26.2872 84.6849L41.5372 92.3099C43.3459 93.2149 44.721 94.8013 45.36 96.7201C45.999 98.6389 45.8496 100.733 44.9446 102.542C44.0396 104.35 42.4532 105.725 40.5344 106.365C38.6156 107.004 36.5215 106.854 34.7128 105.949L19.4628 98.3241C18.5662 97.8765 17.7666 97.2566 17.1097 96.4997C16.4529 95.7428 15.9516 94.8639 15.6347 93.9132C15.3178 92.9625 15.1914 91.9586 15.2628 90.959C15.3342 89.9594 15.6019 88.9836 16.0506 88.0876ZM199.051 102.537C198.147 100.728 197.999 98.6348 198.639 96.7169C199.279 94.7991 200.654 93.2139 202.463 92.3099L217.713 84.6849C218.608 84.2368 219.583 83.9695 220.582 83.8982C221.581 83.827 222.584 83.9531 223.534 84.2696C224.485 84.586 225.363 85.0864 226.12 85.7423C226.876 86.3982 227.497 87.1968 227.945 88.0923C228.393 88.9879 228.66 89.963 228.731 90.9618C228.803 91.9607 228.676 92.9638 228.36 93.9139C228.044 94.864 227.543 95.7425 226.887 96.4992C226.231 97.2559 225.433 97.876 224.537 98.3241L209.287 105.949C208.391 106.398 207.415 106.666 206.416 106.737C205.416 106.808 204.412 106.682 203.462 106.365C202.511 106.048 201.632 105.547 200.875 104.89C200.118 104.233 199.498 103.434 199.051 102.537ZM153.301 49.9626L160.926 34.7126C161.831 32.9026 163.417 31.5263 165.337 30.8864C167.257 30.2465 169.352 30.3954 171.162 31.3004C172.972 32.2054 174.348 33.7923 174.988 35.712C175.628 37.6317 175.479 39.727 174.574 41.537L166.949 56.787C166.044 58.5969 164.458 59.9732 162.538 60.6131C160.618 61.253 158.523 61.1041 156.713 60.1991C154.903 59.2942 153.527 57.7073 152.887 55.7875C152.247 53.8678 152.396 51.7725 153.301 49.9626Z" fill="#F5C842"/>
<path d="M292.033 164.5V86.7816H320.303C325.519 86.7816 330.109 87.7552 334.074 89.7026C338.038 91.5803 341.133 94.3622 343.358 98.0482C345.653 101.665 346.801 106.011 346.801 111.088C346.801 116.443 345.444 121.033 342.732 124.858C340.089 128.683 336.508 131.465 331.987 133.204L349.93 164.5H335.951L316.861 130.596L324.893 135.29H304.342V164.5H292.033ZM304.342 124.337H320.512C323.363 124.337 325.832 123.78 327.919 122.668C330.005 121.555 331.605 120.025 332.717 118.078C333.9 116.061 334.491 113.696 334.491 110.984C334.491 108.272 333.9 105.942 332.717 103.994C331.605 101.978 330.005 100.448 327.919 99.4043C325.832 98.2916 323.363 97.7352 320.512 97.7352H304.342V124.337ZM375.178 165.752C369.545 165.752 364.537 164.465 360.156 161.892C355.844 159.249 352.471 155.702 350.037 151.251C347.603 146.731 346.386 141.689 346.386 136.125C346.386 130.422 347.603 125.38 350.037 120.999C352.541 116.617 355.879 113.175 360.052 110.671C364.225 108.098 368.954 106.811 374.239 106.811C378.482 106.811 382.272 107.541 385.61 109.002C388.948 110.462 391.765 112.479 394.06 115.052C396.355 117.556 398.094 120.442 399.276 123.711C400.528 126.98 401.154 130.457 401.154 134.143C401.154 135.047 401.119 135.986 401.049 136.96C400.98 137.933 400.841 138.837 400.632 139.672H355.67V130.283H393.956L388.322 134.56C389.018 131.152 388.775 128.127 387.592 125.484C386.479 122.772 384.741 120.651 382.376 119.121C380.081 117.521 377.369 116.721 374.239 116.721C371.11 116.721 368.328 117.521 365.894 119.121C363.46 120.651 361.582 122.876 360.26 125.797C358.939 128.649 358.417 132.126 358.696 136.229C358.348 140.054 358.869 143.393 360.26 146.244C361.721 149.095 363.738 151.321 366.311 152.92C368.954 154.52 371.944 155.32 375.282 155.32C378.69 155.32 381.576 154.555 383.941 153.025C386.375 151.495 388.288 149.513 389.679 147.079L399.276 151.773C398.163 154.416 396.425 156.815 394.06 158.971C391.765 161.057 388.983 162.727 385.714 163.978C382.515 165.161 379.003 165.752 375.178 165.752Z" fill="black"/>
<!-- ... wordmark continua. SVG completo em /logos/logo-light-mode.svg -->
</svg>
```

**Nota**: o path do wordmark foi truncado por brevidade nesta documentação. O arquivo completo está em `/logos/logo-light-mode.svg`.

### SVG inline — Logo Dark Mode (fallback embarcado)

Idêntico ao light mode, exceto pela cor do wordmark (`fill="white"` ao invés de `fill="black"`):

```svg
<svg width="881" height="244" viewBox="0 0 881 244" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Renan Moura">
  <!-- Ícone solar (mesmo path do light mode, fill="#F5C842") -->
  <!-- Wordmark "Renan Moura" com fill="white" -->
  <!-- SVG completo em /logos/logo-dark-mode.svg -->
</svg>
```

### SVG inline — Ícone isolado (favicon / avatar)

```svg
<svg width="244" height="244" viewBox="0 0 244 244" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Hope">
<path d="M228.75 144.875H190.196C190.478 142.343 190.621 139.797 190.625 137.25C190.625 119.049 183.395 101.594 170.525 88.7246C157.656 75.8549 140.2 68.6248 122 68.6248C103.8 68.6248 86.3445 75.8549 73.4748 88.7246C60.6051 101.594 53.375 119.049 53.375 137.25C53.3793 139.797 53.5225 142.343 53.8039 144.875H15.25C13.2277 144.875 11.2883 145.678 9.85831 147.108C8.42835 148.538 7.625 150.477 7.625 152.5C7.625 154.522 8.42835 156.461 9.85831 157.891C11.2883 159.321 13.2277 160.125 15.25 160.125H228.75C230.772 160.125 232.712 159.321 234.142 157.891C235.572 156.461 236.375 154.522 236.375 152.5C236.375 150.477 235.572 148.538 234.142 147.108C232.712 145.678 230.772 144.875 228.75 144.875ZM68.625 137.25C68.611 129.91 70.111 122.646 73.0313 115.912C75.9517 109.178 80.2295 103.119 85.5975 98.1126C90.9655 93.1067 97.3083 89.2617 104.23 86.818C111.151 84.3743 118.502 83.3843 125.823 83.91C133.144 84.4357 140.278 86.4658 146.779 89.8733C153.28 93.2808 159.008 97.9926 163.606 103.714C168.204 109.436 171.572 116.044 173.5 123.126C175.428 130.208 175.875 137.612 174.813 144.875H69.1873C68.8183 142.35 68.6304 139.802 68.625 137.25ZM205.875 190.625C205.875 192.647 205.072 194.586 203.642 196.016C202.212 197.446 200.272 198.25 198.25 198.25H45.75C43.7277 198.25 41.7883 197.446 40.3583 196.016C38.9283 194.586 38.125 192.647 38.125 190.625C38.125 188.602 38.9283 186.663 40.3583 185.233C41.7883 183.803 43.7277 183 45.75 183H198.25C200.272 183 202.212 183.803 203.642 185.233C205.072 186.663 205.875 188.602 205.875 190.625ZM69.4256 41.537C68.5207 39.727 68.3717 37.6317 69.0117 35.712C69.6516 33.7923 71.0279 32.2054 72.8378 31.3004C74.6478 30.3954 76.7431 30.2465 78.6628 30.8864C80.5825 31.5263 82.1694 32.9026 83.0744 34.7126L90.6994 49.9626C91.1475 50.8588 91.4147 51.8344 91.4857 52.8339C91.5567 53.8333 91.4302 54.837 91.1133 55.7875C90.7965 56.7381 90.2955 57.6169 89.639 58.3739C88.9825 59.1308 88.1834 59.751 87.2872 60.1991C86.391 60.6472 85.4153 60.9144 84.4159 60.9855C83.4164 61.0565 82.4128 60.93 81.4622 60.6131C80.5117 60.2963 79.6328 59.7953 78.8759 59.1388C78.1189 58.4823 77.4987 57.6831 77.0506 56.787L69.4256 41.537ZM16.0506 88.0876C16.4991 87.1918 17.1196 86.3931 17.8769 85.7372C18.6341 85.0813 19.5132 84.5811 20.4638 84.2651C21.4145 83.9491 22.4181 83.8235 23.4173 83.8956C24.4165 83.9676 25.3917 84.2358 26.2872 84.6849L41.5372 92.3099C43.3459 93.2149 44.721 94.8013 45.36 96.7201C45.999 98.6389 45.8496 100.733 44.9446 102.542C44.0396 104.35 42.4532 105.725 40.5344 106.365C38.6156 107.004 36.5215 106.854 34.7128 105.949L19.4628 98.3241C18.5662 97.8765 17.7666 97.2566 17.1097 96.4997C16.4529 95.7428 15.9516 94.8639 15.6347 93.9132C15.3178 92.9625 15.1914 91.9586 15.2628 90.959C15.3342 89.9594 15.6019 88.9836 16.0506 88.0876ZM199.051 102.537C198.147 100.728 197.999 98.6348 198.639 96.7169C199.279 94.7991 200.654 93.2139 202.463 92.3099L217.713 84.6849C218.608 84.2368 219.583 83.9695 220.582 83.8982C221.581 83.827 222.584 83.9531 223.534 84.2696C224.485 84.586 225.363 85.0864 226.12 85.7423C226.876 86.3982 227.497 87.1968 227.945 88.0923C228.393 88.9879 228.66 89.963 228.731 90.9618C228.803 91.9607 228.676 92.9638 228.36 93.9139C228.044 94.864 227.543 95.7425 226.887 96.4992C226.231 97.2559 225.433 97.876 224.537 98.3241L209.287 105.949C208.391 106.398 207.415 106.666 206.416 106.737C205.416 106.808 204.412 106.682 203.462 106.365C202.511 106.048 201.632 105.547 200.875 104.89C200.118 104.233 199.498 103.434 199.051 102.537ZM153.301 49.9626L160.926 34.7126C161.831 32.9026 163.417 31.5263 165.337 30.8864C167.257 30.2465 169.352 30.3954 171.162 31.3004C172.972 32.2054 174.348 33.7923 174.988 35.712C175.628 37.6317 175.479 39.727 174.574 41.537L166.949 56.787C166.044 58.5969 164.458 59.9732 162.538 60.6131C160.618 61.253 158.523 61.1041 156.713 60.1991C154.903 59.2942 153.527 57.7073 152.887 55.7875C152.247 53.8678 152.396 51.7725 153.301 49.9626Z" fill="#F5C842"/>
</svg>
```

### Regras de uso
- Tamanho mínimo digital: 120px de largura (logo completo) · 24px (ícone)
- Área de proteção: equivalente à altura do ícone solar em todas as direções
- Fundo preferencial light: `#FFFFFF` e `#F7F7F9`
- Fundo preferencial dark: `#1A1A2E` e `#0D0D0F`
- **Sempre incluir `aria-label="Renan Moura"` ou `aria-label="Hope Design System"`** no SVG
- **Proibido**: distorcer proporções, alterar cores, adicionar efeitos, recriar em outra fonte

---

## 2. TIPOGRAFIA

### Fontes

#### Plus Jakarta Sans — única família do Hope

Variable font (peso 200–800). Cobre todos os papéis: display, headlines, body, UI, overlines, labels, métricas e code.

```css
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./fonts/PlusJakartaSans-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
```

### Tokens de família e fallbacks

```css
:root {
  --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body:    'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Nota**: não existe `--font-mono`. Code e micro-labels usam `--font-body` com `text-transform` e `letter-spacing`.

### Escala tipográfica

| Token | Fonte | Tamanho | Peso | Line Height | Letter Spacing | Uso |
|-------|-------|---------|------|-------------|----------------|-----|
A escala segue os estilos de texto do Figma Foundation (decisão de 18/11/2026). O máximo de cada faixa é o tamanho do Figma; o mínimo vem do `tokens.css`.

| Token | Fonte | Tamanho | Peso | Line Height | Letter Spacing | Uso |
|-------|-------|---------|------|-------------|----------------|-----|
| `--fs-display` | Plus Jakarta Sans | 36–52px | 700 | 1.1 | -0.02em | Hero, capa, nome da marca |
| `--fs-h1` | Plus Jakarta Sans | 26–32px | 700 | 1.2 | -0.01em | Título de página, case study |
| `--fs-h2` | Plus Jakarta Sans | 18–22px | 700 | 1.3 | -0.01em | Subtítulo de seção. Também é o tamanho de Metric |
| `--fs-h3` | Plus Jakarta Sans | 16px fixo | 700 | 1.4 | 0 | Subseção, label de grupo |
| `--fs-body` | Plus Jakarta Sans | 16px fixo | 400 | 1.75 | 0 | Parágrafos, texto corrido. Também `.hero__body` e `.case-hero__subtitle`, de propósito (não usam Body lg) |
| `--fs-body-xl` | Plus Jakarta Sans | 16–19px (fluido, extremos iguais ao Figma) | 400 (o `.case-lead__text` usa 500) | 1.7 | -0.01em | Case lead text. É o Body xl (`size/lead`, 19px, tracking -1%) do Figma |
| `--fs-body-sm` | Plus Jakarta Sans | 13px fixo | 400 | 1.6 | 0 | Body em UI compacta (Body sm do Figma) |
| `--fs-body-xs` | Plus Jakarta Sans | 11px fixo | 400 | 1.6 | 0 | Texto mínimo (Body xs do Figma) |
| `--fs-label` | Plus Jakarta Sans | 11px fixo | 400 | 1.4 | 0.12em | Label caps: overlines, metadata (uppercase) |
| Metric (usa `--fs-h2`) | Plus Jakarta Sans | 18–22px | 700 | 1.4 | 0 | Métricas (+21%, +12%). Não existe `--fs-metric` |
| (sem token) | Plus Jakarta Sans | 13–14px (0.875rem no DESIGN.md) | 400 | 1.6 | 0 | Code inline e blocks. Não existe `--fs-code` em `tokens.css` |

```css
:root {
  --fs-display:  clamp(36px, 5vw, 52px);
  --fs-h1:       clamp(26px, 3.5vw, 32px);
  --fs-h2:       clamp(18px, 2.5vw, 22px);
  --fs-h3:       16px;
  --fs-body:     16px;
  --fs-body-sm:  13px;
  --fs-body-xl:  clamp(16px, 1.7vw, 19px);
  --fs-body-xs:  11px;
  --fs-label:    11px;
}
```

**`--fs-body` é 16px fixo** (Figma Body, v2.6.8). Antes era fluido, de 14 a 16px.

**`--fs-body-sm` é 13px fixo** (Figma Body sm, v2.6.11). Antes era `clamp(12px, 1vw, 13px)`, que só chegava a 13px acima de cerca de 1300px. O `.skill-card__body` mantém o seu line height (1,7), então renderiza 13px com 22,1px de line height.

**`--fs-h3` é 16px fixo** (Figma Heading/H3, v2.6.12). Antes era `clamp(14px, 1.5vw, 16px)`. `.persona__name`, `.result-card__title` e `.text-h3` passam de 14 e 15,36px para 16px abaixo de 1067px; `.case-section__subtitle` já era 16px e agora consome o token.

**Token fluido documentado (v2.6.12).** `--fs-body-xl` é o **único token de texto de corpo fluido**: `clamp(16px, 1.7vw, 19px)`. O Figma mostra os dois extremos, Desktop 19px e Mobile 16px. O CSS interpola entre os dois: 16px até cerca de 941px de janela, depois cresce (1,7vw) até 19px em cerca de 1118px, e fica em 19px acima disso. Valores intermediários, como 17,408px em 1024px, são esperados e **não são divergência**. Único consumidor: `.case-lead__text` (peso 500, line height 1,7, tracking -0,01em), 8 instâncias nas 3 páginas de case (5 no `dotz`, 1 no `sb-home-redesign`, 2 no `cloud-cost-intelligence`) mais 1 no `dotz backup.html`. Display, H1 e H2 também são fluidos (`clamp()`), mas são títulos e não entram nesta nota. Fixá-lo em 19px traria de volta o lead grande demais no celular, rejeitado para os heróis (v2.6.6). Não é divergência: os extremos coincidem com o Figma, que deve ter os modos Desktop 19px e Mobile 16px na variável.

**Variáveis `size/*` do Figma (v2.6.13).** Mobile é igual a Desktop em H3 (16px), Body (16px), Body sm (13px), Label (11px) e Body xs (11px): por isso esses tokens são fixos no CSS. O lead (Body xl, `size/lead`) é Desktop 19px e Mobile 16px, com code syntax `var(--fs-body-xl)`, e o CSS representa os dois modos com `clamp(16px, 1.7vw, 19px)`. Display, H1 e H2 continuam responsivos (valores diferentes por modo no Figma, `clamp()` no CSS). Nada na documentação trata H3, Body, Body sm, Body xs ou Label como fluidos ou divergentes do Figma.

### Regras de uso

- **Plus Jakarta Sans**: tudo — display, headlines, body, UI, overlines, labels, badges, botões, métricas, code
- **Itálico nunca** — ênfase por peso (bold) ou cor (Âncora), nunca por inclinação
- **Labels uppercase são sempre Regular (400)** (Label caps do Figma: 11px, 400, 0.12em, uppercase). Não existe variante bold de label. `.case-phase-break__label`, `.case-card__eyebrow` e `.header__status-badge` não declaram peso e herdam 400; `.badge--draft` declara 400 porque herdaria 500 do `.badge`
- Títulos seguem o estilo do Figma do seu tamanho: Display 1.1 e -0.02em, H1 1.2 e -0.01em, H2 1.3 e -0.01em, H3 1.4 e 0. Tracking sempre em `em`
- Métricas (+21%, +12%) sempre em `--fs-h2` / Plus Jakarta Sans 700 / line height 1.4. Não existe `--fs-metric`: o Figma reusa o tamanho `size/h2`
- Os estilos `Label/label-caps` e `Metric/metric` do Figma usam Plus Jakarta Sans desde 13/11/2026 (antes Geist). `label-caps` é uppercase, peso 400, 0,12em de tracking e line height 1.4, como em `--fs-label` acima. A classe pronta é `.text-label`

### Anti-padrões

- ✗ Qualquer outra família hardcoded (`font-family: 'Space Mono'` etc.) — o Hope usa só Plus Jakarta Sans
- ✗ Qualquer `font-style: italic` — proibido no Hope

---

## 3. CORES

### Tokens completos

```css
:root {
  /* --- Família Solar --- */
  --color-aurora:      #FEF8E0;
  --color-daybreak:   #FAE19A;
  --color-solar:       #F5C842; /* ★ ACENTO MARCA */
  --color-amber:       #C49A1F;
  --color-dusk:  #8B6914;

  /* --- Família Âncora --- */
  --color-sky:         #E8F0F9;
  --color-tide:        #8CB4E0;
  --color-anchor:      #1C5FA8; /* ★ ACENTO MARCA */
  --color-deep:    #144278;
  --color-abyss:      #1A1A2E;

  /* --- Neutras --- */
  --color-cloud:       #FFFFFF;
  --color-surface:  #F7F7F9;
  --color-border-base:       #E2E2E8;
  --color-muted:        #5F5F6E; /* AJUSTADO de #7B7B8A para passar WCAG AA */
  --color-shadow:      #3D3D45;
  --color-ink:       #0D0D0F;

  /* --- Funcionais (cinco senshi) --- */
  --color-success: #4A9F6B; /* AJUSTADO de #6BBF8A para contraste */
  --color-warning: #C47A1F; /* AJUSTADO de #E89A3D para contraste. Primitivo Functional apenas desde 13/11/2026: a família Warning dos componentes usa Solar */
  --color-error:         #B83434; /* AJUSTADO de #D44545 para contraste */
  --color-info:       #634590; /* AJUSTADO de #7B5BA8 para contraste */
  --color-celebrate:           #F5A8C0; /* Mantida — uso só em destaque, não em texto */

  /* --- Superfícies (light mode default) ---
     --color-link, --color-link-hover e --color-focus-ring são os nomes do code syntax do Figma e NÃO existem no tokens.css.
     No CSS os nomes são --color-text-brand-primary, --color-text-brand-primary-hover e --color-border-focus-ring
     (decisão de nomenclatura pendente: renomear o Figma ou o CSS). */
  --color-bg:           var(--color-cloud);
  --color-bg-alt:       var(--color-surface);
  --color-bg-inverse:   var(--color-abyss);
  --color-border:       var(--color-border-base);
  --color-border-strong: var(--color-muted);
  --color-text-1:       var(--color-ink);    /* Texto principal */
  --color-text-2:       var(--color-shadow);   /* Texto secundário */
  --color-text-3:       var(--color-muted);     /* Texto terciário */
  --color-text-inverse: var(--color-cloud);    /* Texto sobre escuro */
  --color-link:         var(--color-anchor);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary */
  --color-link-hover:   var(--color-deep);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary-hover */
  --color-focus-ring:   var(--color-anchor);  /* Nome do code syntax do Figma. Nome no CSS: --color-border-focus-ring */
}

/* Dark mode automático */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           var(--color-abyss);
    --color-bg-alt:       #242438;
    --color-bg-inverse:   var(--color-cloud);
    --color-border:       #2E2E40;
    --color-border-strong: #69697E;
    --color-text-1:       var(--color-cloud);
    --color-text-2:       #B4B4C8;
    --color-text-3:       #9090A8;
    --color-text-inverse: var(--color-ink);
    --color-link:         var(--color-solar);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary */
    --color-link-hover:   #FFD96B;  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary-hover */
    --color-focus-ring:   var(--color-solar);  /* Nome do code syntax do Figma. Nome no CSS: --color-border-focus-ring */
  }
}

/* Dark mode manual via classe */
[data-theme="dark"] {
  --color-bg:           var(--color-abyss);
  --color-bg-alt:       #242438;
  --color-bg-inverse:   var(--color-cloud);
  --color-border:       #2E2E40;
  --color-border-strong: #69697E;
  --color-text-1:       var(--color-cloud);
  --color-text-2:       #B4B4C8;
  --color-text-3:       #9090A8;
  --color-text-inverse: var(--color-ink);
  --color-link:         var(--color-solar);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary */
  --color-link-hover:   #FFD96B;  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary-hover */
  --color-focus-ring:   var(--color-solar);  /* Nome do code syntax do Figma. Nome no CSS: --color-border-focus-ring */
}

/* Forçar light mode manual */
[data-theme="light"] {
  --color-bg:           var(--color-cloud);
  --color-bg-alt:       var(--color-surface);
  --color-bg-inverse:   var(--color-abyss);
  --color-border:       var(--color-border-base);
  --color-text-1:       var(--color-ink);
  --color-text-2:       var(--color-shadow);
  --color-text-3:       var(--color-muted);
  --color-text-inverse: var(--color-cloud);
  --color-link:         var(--color-anchor);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary */
  --color-link-hover:   var(--color-deep);  /* Nome do code syntax do Figma. Nome no CSS: --color-text-brand-primary-hover */
  --color-focus-ring:   var(--color-anchor);  /* Nome do code syntax do Figma. Nome no CSS: --color-border-focus-ring */
}
```

### Contraste WCAG AA (verificado)

| Combinação | Ratio | Nível |
|------------|-------|-------|
| Tinta sobre Nuvem | 19.5:1 | AAA |
| Sombra sobre Nuvem | 11.6:1 | AAA |
| Mudo (#5F5F6E) sobre Nuvem | 6.4:1 | AA Large + AAA Small |
| Mudo (#5F5F6E) sobre Superfície | 6.1:1 | AA |
| Âncora sobre Nuvem | 6.2:1 | AA |
| Nuvem sobre Âncora | 6.2:1 | AA |
| Nuvem sobre Abismo | 16.8:1 | AAA |
| Solar sobre Abismo | 11.2:1 | AAA |
| Tinta sobre Solar | 12.2:1 | AAA |
| Crepúsculo (#8B6914) sobre Aurora | 4.78:1 | AA |
| Solar sobre Night/aurora-soft (#2A2618) | 9.52:1 | AAA |
| Crepúsculo sobre Solar | 3.2:1 | Não usar como texto |
| Âmbar (#C49A1F) sobre Aurora | 2.47:1 | Só borda decorativa (aceito) |

**Regras de contraste**:
- Texto em corpo nunca abaixo de 4.5:1 (use Sombra, Mudo ajustado ou Tinta)
- Texto grande (>18px ou >14px bold) pode usar 3:1 mínimo
- Lua **nunca como cor de texto** — só fundo de badges ou destaques visuais
- Ícones decorativos podem ignorar contraste; ícones funcionais não

### Filosofia
- **Solar** representa esperança e movimento — quente, luminoso, o novo dia
- **Uso do Solar** (decidido em 13/11/2026): acento da marca e do logo, e também permitido em elementos Warning, no Banner e no Solar Badge. Não vira cor de UI funcional fora disso (o preto é a ação primária)
- **Âncora** representa estrutura e sistema — frio, preciso, permanente
- Os dois acentos coexistem sem disputar
- **Lua** é reservada para marcos e celebrações — aparece raramente

---

## 3b. TOKENS v2.3 — ESTADO, STATUS E CONTRASTE

Espelham o Figma (Hope DS | Foundation). Valores em `css/tokens.css`.

```css
/* Primitivos novos */
--color-night-500:          #69697E;  /* disabled e contorno de controle no dark */
--color-night-warning-soft: #2A1E10;
--color-night-info-soft:    #1E182A;
--color-success-deep: #2A7347;  /* texto de sucesso no light, 5,77:1 sobre branco */
--color-warning-deep: #94540A;  /* derivado do Functional/warning, 5,94:1 sobre branco. Não é mais o texto do Warning (v2.6) */
--color-error-light:  #F28585;  /* texto e borda de erro no dark, 6,88:1 */
--color-info-light:   #B89EDB;  /* texto de info no dark, 7,3:1 */

/* Semânticos (Light; o dark sobrescreve em [data-theme="dark"]) */
--color-bg-disabled:      var(--color-border-base);   /* dark: night-700 */
--color-text-disabled:    var(--color-night-400);     /* dark: night-500 */
--color-text-on-disabled: var(--color-night-400);     /* dark: night-500 */
--color-border-disabled:  var(--color-border-base);   /* dark: night-700 */
--color-bg-scrim: rgba(13, 13, 15, 0.5);              /* dark: rgba(0,0,0,0.65) */
--color-bg-scrim-strong: rgba(13, 13, 15, 0.88);      /* v2.6: foco em imagem (Lightbox). Figma dark: rgba(0,0,0,0.88). Divergência conhecida: o CSS usa este valor nos dois temas (pendente, adiada) */

/* Warning na família Solar (v2.6) */
--color-bg-warning:      var(--color-solar);          /* igual nos dois temas */
--color-bg-warning-soft: var(--color-aurora);         /* dark: night-aurora-soft (#2A2618) */
--color-text-warning:    var(--color-dusk);           /* dark: solar */
--color-text-on-warning: var(--color-ink);
--color-border-warning:  var(--color-amber);          /* cerca de 2,5:1 sobre Aurora: aceito, decorativo */

--color-text-success: var(--color-success-deep);      /* dark: success */
--color-text-error:   var(--color-error);             /* dark: error-light */
--color-border-error: var(--color-error);             /* dark: error-light */
```

Regras: disabled nunca usa `opacity`; texto de status usa `--color-text-*`, não o primitivo `--color-success` ou `--color-error`; scrim é `--color-bg-scrim` (modais e drawers) ou `--color-bg-scrim-strong` (quando a imagem é o foco, como no Lightbox), nunca `--color-material-*` (que é vidro). Não escreva `rgba(13, 13, 15, 0.88)` à mão.

---

### Cor de ícone (Figma `Hope · Icon` / `Icon/Color`)

O Figma tem uma coleção com a variável `Icon/Color` e 10 modos. No CSS, cada modo é um token `--icon-color-<papel>` que aponta para o token semântico de texto correspondente (dark mode vem junto). Ícones continuam herdando `currentColor` por padrão; use a classe `.icon--<papel>` quando quiser fixar um papel.

| Modo no Figma | Token CSS | Aponta para |
|---|---|---|
| Default | `--icon-color-default` | `--color-text-1` |
| Secondary | `--icon-color-secondary` | `--color-text-2` |
| Tertiary | `--icon-color-tertiary` | `--color-text-3` |
| On Neutral | `--icon-color-on-neutral` | `--color-text-on-neutral` |
| Brand Hover | `--icon-color-brand-hover` | `--color-text-brand-primary-hover` |
| Disabled | `--icon-color-disabled` | `--color-text-disabled` |
| Danger | `--icon-color-danger` | `--color-text-error` |
| Positive | `--icon-color-positive` | `--color-text-success` |
| Warning | `--icon-color-warning` | `--color-text-warning` |
| Info | `--icon-color-info` | `--color-text-info` |

## 4. ESPAÇAMENTO

```css
:root {
  /* Escala numérica (base 4px) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Tokens semânticos (camada de abstração) */
  --gap-tight:     var(--space-2);  /* itens muito próximos: pills lado a lado */
  --gap-component: var(--space-4);  /* dentro de um componente: card → seus filhos */
  --gap-element:   var(--space-6);  /* entre elementos: card → card */
  --gap-section:   var(--space-12); /* entre seções de página */
  --gap-page:      var(--space-24); /* margens grandes de página */
}
```

---

## 5. BORDAS E RAIOS

```css
:root {
  --radius-xs:   4px;
  --radius-sm:   8px;   /* Botões, inputs, chips */
  --radius-md:   12px;  /* Cards */
  --radius-lg:   16px;  /* Modais, painéis */
  --radius-xl:   24px;  /* Elementos grandes */
  --radius-pill: 999px; /* Badges, pills */

  /* Stroke scale do Figma: CSS thin = Stroke/hairline (0.8px); normal e strong = Stroke/thin (1px) */
  --border-thin:   0.8px solid var(--color-border);
  --border-normal: 1px solid var(--color-border);
  --border-strong: 1px solid var(--color-border-strong);

  /* Larguras soltas, para usar dentro de calc() (um atalho como --border-normal não entra numa conta) */
  --border-width-normal: 1px;    /* Figma Stroke/thin */
  --border-width-medium: 1.5px;  /* Figma Stroke/medium: campo, checkbox, radio, switch e o Error do campo */
  --border-width-accent: 3px;    /* Figma Stroke/accent */
}
```

### Borda dentro da caixa

**Regra.** Uma borda desenhada **dentro** da caixa no Figma (stroke inside) não soma ao tamanho. No CSS a borda soma. Por isso a borda é descontada do padding, com um token dentro de `calc()`: `padding: calc(var(--space-3) - var(--border-width-normal))`. Nunca use `box-shadow: inset` para desenhar borda: ele some no modo de alto contraste do Windows.

**Quando a borda muda de largura entre estados** (campo: 1px, e 1,5px no Error), uma custom property por componente guarda a largura da borda do estado (`--field-border-width`) e o padding é calculado a partir dela, para a caixa externa não mudar de tamanho. O navegador desenha uma borda de 1,5px como 1px numa tela 1x; por isso o campo também fixa a altura externa (`min-height`), e o texto fica centralizado.

**Regra de decisão: leia a propriedade `strokesIncludedInLayout` do nó no Figma antes de decidir.** Ela diz se o traço entra na conta do tamanho. Não deduza pela aritmética das alturas nem pela aparência.

- `strokesIncludedInLayout: false` (o traço não entra no tamanho): a borda no CSS soma ao box, então desconte-a do padding como descrito acima. Componentes lidos no Figma: **Button, Icon Button e Badge**.
- `strokesIncludedInLayout: true` (o traço entra no tamanho, como a borda do CSS): a borda soma ao box e o padding **não** é descontado. Componentes lidos no Figma: **Alert, Toast, Tab, Tag e Accordion item**. Conferência: o Alert mede 105 (3 linhas de 20,8, mais 8 de espaço, mais 32 de padding, mais 2 de borda) e o Toast 69 (24 mais 43 mais 2), e o número só bate com a borda somada.
- **A verificar (propriedade ainda não lida):** Input, Textarea, Select, Checkbox, Radio e Switch. Hoje o CSS desconta a borda nos três campos (Input, Textarea, Select) e usa tamanho fixo com `box-sizing: border-box` em Checkbox, Radio e Switch. Antes de mexer em qualquer um, leia a propriedade no Figma e registre o resultado aqui.

Componente novo: leia a propriedade primeiro, depois escolha entre descontar e não descontar.

---

## 6. SOMBRAS

Uso mínimo. O sistema é flat por princípio.

```css
:root {
  --shadow-sm: 0 1px 3px rgba(13, 13, 15, 0.06);
  --shadow-md: 0 4px 12px rgba(13, 13, 15, 0.08);
  --shadow-lg: 0 8px 32px rgba(13, 13, 15, 0.10);

  /* Focus ring (acessibilidade) */
  --shadow-focus: 0 0 0 3px var(--color-focus-ring);
}
```

---

## 7. MOTION

### Tokens

```css
:root {
  /* Durações */
  --duration-instant: 0ms;
  --duration-fast:    100ms;
  --duration-normal:  150ms;
  --duration-slow:    250ms;
  --duration-slower:  400ms;

  /* Easing curves */
  --ease-linear:    linear;
  --ease-out:       cubic-bezier(0.16, 1, 0.3, 1);     /* Saída suave (preferida) */
  --ease-in:        cubic-bezier(0.7, 0, 0.84, 0);     /* Entrada acelerada */
  --ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);    /* Loop suave */
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Leve overshoot */

  /* Transições prontas */
  --transition-color:     color var(--duration-normal) var(--ease-out);
  --transition-bg:        background-color var(--duration-normal) var(--ease-out);
  --transition-border:    border-color var(--duration-normal) var(--ease-out);
  --transition-transform: transform var(--duration-fast) var(--ease-out);
  --transition-shadow:    box-shadow var(--duration-normal) var(--ease-out);
  --transition-all:       all var(--duration-normal) var(--ease-out);
}

/* Respeita preferência de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Regras de uso
- **Sempre** anime: cor, background, border, opacity, transform
- **Nunca** anime: width, height, top/left/right/bottom, padding, margin (causam reflow)
- **Hover**: use `--duration-normal` com `--ease-out`
- **Entrada de elementos** (modais, tooltips): `--duration-slow` com `--ease-out`
- **Saída**: `--duration-fast` (mais rápido que entrada)
- Movimento maior que 5px requer respeito a `prefers-reduced-motion`

---

## 8. Z-INDEX SYSTEM

Escala do Figma (`Hope · Primitives`, grupo `Z-index`), com camadas a cada 100 para que uma camada nova caiba entre duas existentes:

```css
:root {
  --z-base:         0;
  --z-raised:       1;    /* Cards em hover */
  --z-sticky:       10;   /* Figma z-sticky: header do site */
  --z-modal-scrim:  100;  /* Figma z-modal-scrim: backdrop de modal */
  --z-modal:        200;  /* Figma z-modal: Modal, dialog */
  --z-popover:      300;  /* Figma z-popover: Popover, Menu, painel do Select */
  --z-tooltip:      400;  /* Figma z-tooltip */
  --z-notification: 500;  /* Figma z-notification: Toast */
}
```

A escala final é: base 0, raised 1, sticky 10, modal-scrim 100, modal 200, popover 300, tooltip 400, notification 500. Na v2.12.0 o header do site passou a usar `--z-sticky` (era `--z-overlay`, 100, que empatava com o scrim do modal) e `--z-overlay` foi removido. Não existe `--z-max`: o skip link usa `--z-modal`, como em `css/reset.css`. Ficam fora da escala, de propósito, `z-index: 1` em `lightbox.css` (camada interna do componente) e `z-index: -1` em `sections.css`.

---

## 9. COMPONENTES — BOTÕES

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 12px 24px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  border-radius: var(--radius-sm);
  border: 0.5px solid transparent;
  cursor: pointer;
  transition: var(--transition-bg), var(--transition-border),
              var(--transition-color), var(--transition-transform);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
}

.btn:active { transform: scale(0.98); }

/* Focus visible — para navegação por teclado */
.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Disabled — v2.3: tokens, sem opacity */
.btn:disabled,
.btn[aria-disabled="true"] {
  background-color: var(--color-bg-disabled);
  color: var(--color-text-on-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
  pointer-events: none;
  transform: none;
  box-shadow: none;
}

/* --- Variantes --- */

.btn--primary {
  background: var(--color-anchor);
  border-color: var(--color-anchor);
  color: #FFFFFF;
}
.btn--primary:hover {
  background: var(--color-deep);
  border-color: var(--color-deep);
  transform: translateY(-1px);
}

.btn--solar {
  background: var(--color-solar);
  border-color: var(--color-solar);
  color: var(--color-ink);
}
.btn--solar:hover {
  background: var(--color-amber);
  border-color: var(--color-amber);
  transform: translateY(-1px);
}

.btn--secondary {
  background: transparent;
  border-color: var(--color-anchor);
  color: var(--color-anchor);
}
.btn--secondary:hover { background: var(--color-sky); }

.btn--tertiary {
  background: var(--color-bg-alt);
  border-color: var(--color-border);
  color: var(--color-text-1);
}
.btn--tertiary:hover { background: var(--color-border); }

.btn--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--color-link);
  padding-inline: var(--space-1);
}
.btn--ghost:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* --- Tamanhos --- */
.btn--sm { padding: 8px 16px; font-size: 13px; }
.btn--lg { padding: 16px 32px; font-size: 16px; }
```

---

## 10. COMPONENTES — BADGES

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  border-radius: var(--radius-pill);
  border: 0.5px solid transparent;
  white-space: nowrap;
}

.badge--anchor  { background: var(--color-sky);    color: var(--color-deep); border-color: var(--color-tide); }
/* Solar, como no css/components/badge.css: tokens Accent/Secondary, sem borda.
   .badge--warning é alias do .badge--solar (decisão de 18/11/2026), só na documentação:
   o CSS não tem a classe porque o Figma não tem um estilo Warning no Badge. */
.badge--solar,
.badge--warning { background: var(--color-bg-accent-secondary); color: var(--color-text-accent-secondary); }
.badge--success { background: #E8F2EB; color: #1A5938; border-color: #A8D4B5; }
.badge--error   { background: #F8E0E0; color: #6E1818; border-color: #D89494; }
.badge--info    { background: #ECE5F2; color: #2D1F50; border-color: #B5A0CC; }
.badge--lua     { background: #FBEBF1; color: #6B2640; border-color: #ECBFCF; }
.badge--neutral { background: var(--color-bg-alt); color: var(--color-text-2); border-color: var(--color-border); }
```

---

## 11. COMPONENTES — CARDS

```css
.card {
  background: var(--color-bg);
  border: var(--border-thin);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  transition: var(--transition-border), var(--transition-shadow);
}
.card:hover {
  border-color: var(--color-anchor);
  box-shadow: var(--shadow-md);
}

/* Card de case study */
.card--case { display: grid; gap: var(--gap-component); }

.card--case .overline {
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
}
.card--case .title {
  font-family: var(--font-display);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-text-1);
}
.card--case .description {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.75;
  color: var(--color-text-2);
}
.card--case .metrics {
  display: flex;
  gap: var(--space-8);
  padding-top: var(--space-4);
  border-top: var(--border-thin);
}
.card--case .metric-value {
  font-family: var(--font-body);
  font-size: var(--fs-h2);
  font-weight: 700;
  color: var(--color-anchor);
  line-height: 1.4;
}
.card--case .metric-label {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--color-text-3);
  margin-top: var(--space-1);
}

/* Variantes de acento */
.card--solar  { border-left: 3px solid var(--color-solar); }
.card--anchor { border-left: 3px solid var(--color-anchor); }
```

---

## 12. COMPONENTES — INPUTS

> **Nota (v2.9.0):** Input, Textarea, Select, Checkbox, Radio e Switch existem no CSS, a partir do Figma: `css/components/field.css` (o que Input, Textarea e Select compartilham), `input.css`, `textarea.css`, `select.css`, `checkbox.css`, `radio.css` e `switch.css`. O bloco abaixo é o rascunho antigo e não vale mais; a referência é a página de cada componente em `docs/components/`.

```css
.input {
  width: 100%;
  padding: 10px 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-1);
  background: var(--color-bg);
  border: var(--border-thin);
  border-radius: var(--radius-sm);
  outline: none;
  transition: var(--transition-border), var(--transition-shadow);
}

.input::placeholder { color: var(--color-text-3); }

.input:hover { border-color: var(--color-border-strong); }

.input:focus,
.input:focus-visible {
  border-color: var(--color-anchor);
  box-shadow: var(--shadow-focus);
}

/* v2.3: destino é tokens, sem opacity (o site ainda não tem .input global; só .auth-gate__input) */
.input:disabled,
.input[aria-disabled="true"] {
  background: var(--color-bg-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.input--error {
  border-color: var(--color-error);
}
.input--error:focus,
.input--error:focus-visible {
  box-shadow: 0 0 0 3px rgba(184, 52, 52, 0.3); /* sem token: --shadow-focus-error não existe */
}

textarea.input { min-height: 120px; resize: vertical; }

.input-label {
  display: block;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
  margin-bottom: var(--space-2);
}

.input-helper {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-text-3);
  margin-top: var(--space-2);
}

.input-error-message {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-error);
  margin-top: var(--space-2);
}
```

---

## 13. COMPONENTES — NAVEGAÇÃO

### Header

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: var(--border-thin);
}

[data-theme="dark"] .site-header {
  background: rgba(26, 26, 46, 0.85);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
  max-width: 1280px;
  margin-inline: auto;
}

.site-header__logo {
  display: inline-flex;
  align-items: center;
  height: 32px;
}

.site-header__logo svg { height: 100%; width: auto; }
```

### Nav principal

```css
.site-nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.site-nav__link {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  padding: var(--space-2) 0;
  border-bottom: 2px solid transparent;
  transition: var(--transition-color), var(--transition-border);
}

.site-nav__link:hover,
.site-nav__link[aria-current="page"] {
  color: var(--color-text-1);
  border-bottom-color: var(--color-anchor);
}

.site-nav__link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
  border-radius: var(--radius-xs);
}
```

### Footer

```css
.site-footer {
  background: var(--color-abyss);
  color: var(--color-text-inverse);
  padding: var(--space-16) var(--space-6) var(--space-8);
  margin-top: var(--gap-page);
}

.site-footer__inner {
  max-width: 1280px;
  margin-inline: auto;
  display: grid;
  gap: var(--space-8);
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}
```

---

## 14. COMPONENTES — MÍDIA

### Imagens

```css
.image {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Aspect ratios mais comuns */
.image-frame {
  position: relative;
  width: 100%;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.image-frame--16-9 { aspect-ratio: 16 / 9; }
.image-frame--4-3  { aspect-ratio: 4 / 3; }
.image-frame--1-1  { aspect-ratio: 1 / 1; }
.image-frame--3-4  { aspect-ratio: 3 / 4; } /* mockup mobile */
.image-frame--21-9 { aspect-ratio: 21 / 9; } /* hero wide */

.image-frame > img,
.image-frame > video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Placeholder enquanto carrega */
.image-frame--loading {
  background: linear-gradient(
    90deg,
    var(--color-bg-alt) 0%,
    var(--color-border) 50%,
    var(--color-bg-alt) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .image-frame--loading { animation: none; }
}
```

### Vídeo

```css
.video {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
```

### Figure / caption

```css
.figure {
  margin: var(--space-8) 0;
}

.figure__caption {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--color-text-3);
  margin-top: var(--space-3);
  padding-left: var(--space-3);
  border-left: 2px solid var(--color-border);
}
```

---

## 15. COMPONENTES — CONTEÚDO EDITORIAL

> **Nota (Lote 0):** `.link` é o componente Link do Figma (`css/components/link.css`: sublinhado, negrito no hover e foco, anel de foco quadrado). O rascunho antigo de link editorial em prosa (`.prose a` e `a.link`) foi removido em 2026-11-23 porque nunca foi implementado.

### Listas

```css
.prose ul,
.prose ol {
  padding-left: var(--space-6);
  margin-block: var(--space-4);
}

.prose ul { list-style: disc; }
.prose ol { list-style: decimal; }

.prose li {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.75;
  color: var(--color-text-2);
  margin-bottom: var(--space-2);
}

.prose li::marker { color: var(--color-text-3); }

/* Lista sem bullets (links de navegação editorial) */
.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}
```

### Blockquotes

```css
.prose blockquote,
blockquote.quote {
  margin: var(--space-8) 0;
  padding: var(--space-4) 0 var(--space-4) var(--space-6);
  border-left: 3px solid var(--color-solar);
  font-family: var(--font-body);
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 300;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-text-1);
}

.prose blockquote cite,
blockquote.quote cite {
  display: block;
  font-family: var(--font-body);
  font-size: 11px;
  font-style: normal;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
  margin-top: var(--space-3);
}
```

### Code inline e blocks

```css
.prose code,
code.code-inline {
  font-family: var(--font-body);
  font-size: 0.875rem; /* typography.code, sem token --fs-code */
  font-weight: 400;
  padding: 2px 6px;
  background: var(--color-bg-alt);
  color: var(--color-anchor);
  border: var(--border-thin);
  border-radius: var(--radius-xs);
}

.prose pre,
pre.code-block {
  font-family: var(--font-body);
  font-size: 0.875rem; /* typography.code, sem token --fs-code */
  line-height: 1.6;
  padding: var(--space-4) var(--space-5);
  background: var(--color-abyss);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-block: var(--space-6);
}

.prose pre code,
pre.code-block code {
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
```

### Container de prosa

```css
.prose {
  max-width: 65ch;
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.75;
  color: var(--color-text-2);
}

.prose > * + * { margin-top: var(--space-4); }

.prose h1, .prose h2, .prose h3 {
  color: var(--color-text-1);
  margin-top: var(--space-12);
}

.prose strong { color: var(--color-text-1); font-weight: 600; }
.prose em { font-style: italic; }
```

---

## 16. COMPONENTES — ESTADOS (LOADING, EMPTY, ERROR)

### Loading skeleton

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-alt) 0%,
    var(--color-border) 50%,
    var(--color-bg-alt) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

.skeleton--text { height: 1em; width: 100%; margin-bottom: var(--space-2); }
.skeleton--title { height: 1.5em; width: 60%; margin-bottom: var(--space-3); }
.skeleton--card { height: 200px; width: 100%; border-radius: var(--radius-md); }
.skeleton--avatar { width: 40px; height: 40px; border-radius: 50%; }

@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; background: var(--color-bg-alt); }
}
```

### Empty state

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-16) var(--space-6);
  gap: var(--space-4);
}

.empty-state__icon {
  color: var(--color-text-3);
  width: 48px;
  height: 48px;
}

.empty-state__title {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 700;
  color: var(--color-text-1);
  letter-spacing: -0.01em;
}

.empty-state__description {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  color: var(--color-text-2);
  max-width: 40ch;
}
```

### Error state

```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-12) var(--space-6);
  gap: var(--space-4);
  background: #F8E0E0;
  border: 1px solid #D89494;
  border-radius: var(--radius-md);
}

.error-state__icon { color: var(--color-error); width: 32px; height: 32px; }
.error-state__title { color: #6E1818; font-family: var(--font-display); font-weight: 700; }
.error-state__message { color: #6E1818; font-family: var(--font-body); font-size: 14px; }
```

### Spinner

Ver `css/components/spinner.css` (Lote 2B). Anel de 24px com arco de cerca de 99 graus. A rotação é **linear**, 1s por volta, infinita (v2.12.0, decisão do Figma Core). Em `prefers-reduced-motion` a rotação vira um pulso de opacidade em ease-in-out. O pulso do Skeleton também é ease-in-out: o easing ease-in-out vale só para pulsos, nunca para a rotação.

---

## 17. CLASSES TIPOGRÁFICAS UTILITÁRIAS

```css
.text-display {
  font-family: var(--font-display);
  font-size: var(--fs-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-1);
}
.text-h1 {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-text-1);
}
.text-h2 {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-text-1);
}
.text-h3 {
  font-family: var(--font-body);
  font-size: var(--fs-h3);
  font-weight: 700; /* Figma: Bold. Igual ao reset.css do site desde a v2.6.4 */
  line-height: 1.4;
  color: var(--color-text-1);
}
.text-body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.75;
  color: var(--color-text-2);
}
.text-body-sm {
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-2);
}
.text-label {
  font-family: var(--font-body);
  font-size: var(--fs-label);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
}
.text-metric {
  font-family: var(--font-display);
  font-size: var(--fs-h2); /* Figma: Metric reusa size/h2. Não existe --fs-metric */
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-anchor);
}
[data-theme="dark"] .text-metric {
  color: var(--color-solar);
}

/* Cores de texto */
.text-primary   { color: var(--color-text-1); }
.text-secondary { color: var(--color-text-2); }
.text-tertiary  { color: var(--color-text-3); }
.text-solar     { color: var(--color-solar); }
.text-anchor    { color: var(--color-anchor); }
.text-error     { color: var(--color-error); }
.text-success   { color: var(--color-success); }

/* Alinhamento */
.text-left   { text-align: left; }
.text-center { text-align: center; }
.text-right  { text-align: right; }
```

---

## 18. LAYOUT

**Divergência conhecida (decisão do dono, pendente de atualização do Figma).** O Figma tem Layout/container 1040 e Layout/header 1200. O site renderiza o container em `min(1280px, 100% - 160px)` (gutter mínimo de 80px de cada lado) e o `.nav` com a mesma largura: 1206px em 1366px de viewport e 1280px a partir de 1440px. A prosa dos cases usa 68ch (cerca de 796px), no lugar do Layout/reading de 752px; a barra lateral é 240px, igual ao Figma. Os tokens `--layout-*` não existem no CSS. É uma decisão do dono, a ser corrigida no Figma (Layout/*), e **não deve ser reaberta como erro** no próximo relatório de divergência.

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--space-6);
}

@media (min-width: 640px)  { .container { padding-inline: var(--space-8); } }
@media (min-width: 1024px) { .container { padding-inline: var(--space-12); } }

.container--sm  { max-width: 640px; }
.container--md  { max-width: 768px; }
.container--lg  { max-width: 1024px; }
.container--2xl { max-width: 1440px; }
.container--prose { max-width: 65ch; }

/* Grid responsivo de cards */
.grid-cards {
  display: grid;
  gap: var(--gap-element);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

/* Stack vertical com gap */
.stack { display: flex; flex-direction: column; gap: var(--gap-component); }
.stack--tight   { gap: var(--gap-tight); }
.stack--element { gap: var(--gap-element); }
.stack--section { gap: var(--gap-section); }

/* Cluster (horizontal com wrap) */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-component);
  align-items: center;
}
```

---

## 19. RESET

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.75;
  color: var(--color-text-1);
  background: var(--color-bg);
}

img, video, svg {
  max-width: 100%;
  display: block;
}

/* a no reset: SEM estilo. Use .link (componente Link) para links visíveis. */
a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}

ul, ol { list-style: none; }

/* Headings sem estilo no reset — usar .text-h1, .text-h2 etc */
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

---

## 20. ACESSIBILIDADE

### Classe visually-hidden (para screen readers)

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip link

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-4);
  z-index: var(--z-modal);
  padding: var(--space-3) var(--space-4);
  background: var(--color-anchor);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  text-decoration: none;
}

.skip-link:focus {
  top: var(--space-4);
}
```

**HTML do skip link** (deve ser o primeiro elemento do `<body>`):

```html
<a href="#main" class="skip-link">Pular para o conteúdo principal</a>
```

### Focus visible global (fallback)

```css
/* Para elementos que não têm focus customizado */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}
```

### Checklist de acessibilidade
- Todo `<img>` precisa de `alt`. Decorativas: `alt=""`. Funcionais: descrição completa.
- Todo `<button>` precisa de label (texto visível ou `aria-label`).
- Todo `<a>` precisa de destino claro — evite "clique aqui", prefira "ver case Shell Box".
- Headings em ordem hierárquica (não pule de H1 para H4).
- Cor nunca é o único indicador de estado (erro = cor + ícone + texto).
- Foco visível em **toda** interação por teclado.
- Contraste mínimo 4.5:1 para corpo, 3:1 para texto grande.
- `prefers-reduced-motion` respeitado.

---

## 21. ÍCONES

### Biblioteca recomendada
**Lucide Icons** (https://lucide.dev) — outline, geométrica, alinhada com o caráter técnico do Hope. Stroke-width consistente.

### Tokens

Não existem tokens `--icon-xs` a `--icon-2xl` nem `--icon-stroke` no `tokens.css` (removidos desta documentação na v2.6.14: nenhum código os usava). O tamanho do ícone é definido no componente que o usa. O que existe em `css/components.css` é a classe `.icon` e as classes de cor `.icon--<papel>`, que usam os tokens `--icon-color-*` (ver a seção de cor de ícone).

### Regras de uso
- Ícones decorativos: `aria-hidden="true"` no SVG
- Ícones funcionais (botão só com ícone): adicionar `aria-label`
- Use `currentColor` no `stroke` para herdar cor do contexto
- **Nunca** misture estilos de biblioteca (Lucide + Phosphor) — confunde visualmente

### Setas — assinatura da marca

Setas com personalidade são parte da expressão do Hope (influência sutil de animes 90s). Para CTAs principais e navegação, prefira a seta `→` ou ícone customizado em vez de chevron padrão.

---

## 22. NAMING CONVENTIONS

Regras de nomenclatura para código, tokens e arquivos. **Consistência reduz dívida cognitiva** — quando você lê um nome, deve conseguir prever o que ele faz.

### CSS Classes — BEM modificado

Padrão: `block__element--modifier` em kebab-case.

```css
/* Block — componente raiz */
.btn { }
.card { }
.input { }

/* Block + variante (variant é parte do nome do bloco) */
.btn--primary { }
.btn--solar { }
.card--case { }
.card--anchor { }

/* Block + tamanho */
.btn--sm { }
.btn--lg { }

/* Block + estado */
.btn:hover { }
.btn:focus-visible { }
.btn:disabled { }
.input--error { }

/* Element — parte interna do block */
.card__overline { }
.card__title { }
.card__description { }
.card__metrics { }

/* Element + modifier */
.card__metric-value { }
.card__metric-label { }
```

**Regras:**

- Block sempre em uma palavra (`btn`, `card`, `input`) ou kebab-case (`site-header`, `case-card`)
- Variante usa `--` (dois hífens): `.btn--primary`, não `.btn-primary`
- Element usa `__` (dois underscores): `.card__title`, não `.card-title`
- Estado nativo usa pseudo-class CSS: `:hover`, `:focus-visible`, `:disabled`
- Estado custom usa atributo de data: `[data-state="loading"]`, não `.is-loading`

### CSS Custom Properties (variáveis)

Padrão: `--category-name-modifier` em kebab-case.

```css
/* Cores brutas (paleta) — categoria color */
--color-solar
--color-anchor
--color-ink

/* Cores semânticas (tokens de tema) — categoria color, sufixo função */
--color-background
--color-text-primary
--color-link

/* Tema dark — sufixo -dark */
--color-background-dark
--color-text-primary-dark

/* Tipografia — categoria font / fs (font-size) / lh (line-height) */
--font-display
--fs-h1
--lh-tight
--ls-tight

/* Espaçamento — categoria space */
--space-1
--space-4
--space-12

/* Espaçamento semântico — categoria gap */
--gap-tight
--gap-component
--gap-section

/* Bordas e raios — categoria radius / border */
--radius-sm
--border-thin

/* Sombras — categoria shadow */
--shadow-sm
--shadow-focus

/* Motion — categoria duration / ease / transition */
--duration-fast
--ease-out
--transition-hover

/* Z-index — categoria z */
--z-base  --z-raised  --z-sticky  --z-modal-scrim  --z-modal
--z-popover  --z-tooltip  --z-notification

/* Ícones — categoria icon */
--icon-color-default
--icon-color-danger
```

**Regras:**

- Toda variável começa com categoria (`color`, `font`, `fs`, `space`, `radius`, `shadow`, `duration`, `z`)
- Categoria identifica o tipo, não o uso — `--color-solar` não vira `--accent-yellow`
- Variantes vêm depois: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Tema usa sufixo: `--color-background-dark`. Nunca prefixo: `--dark-color-background` é proibido.

### Arquivos

```
DESIGN.md                       UPPERCASE.md (fonte da verdade, spec Google Labs)
DESIGN-IMPLEMENTATION.md        UPPERCASE-HIFEN.md (implementação técnica)
GOVERNANCE.md                   UPPERCASE.md (regras de evolução)

/logos/logo-light-mode.svg      kebab-case.svg
/logos/logo-dark-mode.svg
/logos/logo-icon.svg

/fonts/PlusJakartaSans-Medium.ttf  PascalCase-Variant.ttf (mantém convenção da fonte original)

tokens.css                      lowercase.css (CSS de implementação)
components.css
utilities.css
reset.css
```

**Regras:**

- Documentação principal em `UPPERCASE.md` — fica no topo da listagem alfabética, é convenção da indústria
- Assets visuais (`logos/`, `icons/`, `images/`) em `kebab-case`
- Fontes mantêm a convenção do publisher original (ex: PlusJakartaSans-VariableFont_wght.ttf)
- Arquivos CSS de implementação em `lowercase.css`

### Nomes de componentes — semântica vs aparência

Componentes carregam **função, não aparência**.

```css
/* ✓ Função */
.btn--primary        /* botão principal, qualquer cor */
.btn--solar          /* botão da família Solar — cor é parte da função (celebração) */
.badge--success      /* indicador de sucesso */
.card--case          /* card de case study */
.input--error        /* input em estado de erro */

/* ✗ Aparência */
.btn--yellow         /* o que acontece se Solar mudar de hex? */
.btn--big            /* big segundo qual sistema? */
.text--gray          /* gray-claro ou gray-escuro? */
.box--shadow         /* qual shadow? */
```

**Exceção legítima:** quando a função É a aparência. Exemplo: `.btn--solar` carrega significado de marca (família Solar = esperança, celebração). Não é "amarelo decorativo" — é "amarelo da identidade Hope".

### Nomes em código JavaScript / TypeScript

Padrão: `camelCase` para variáveis e funções, `PascalCase` para componentes e tipos.

```ts
// Componentes React/Framer
function CaseCard() { }
function BtnPrimary() { }

// Tipos
type ColorToken = 'solar' | 'anchor' | 'ink';
type Theme = 'light' | 'dark';

// Variáveis e funções
const buttonPadding = '12px 24px';
function getThemeColor(token: ColorToken, theme: Theme) { }

// Props
type ButtonProps = {
  variant: 'primary' | 'solar' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
};
```

**Regras:**

- Variantes seguem os nomes do CSS sem o prefixo `btn--`: `variant: 'primary'`, não `variant: 'btn--primary'`
- Estados booleanos prefixam com `is` ou `has`: `isDisabled`, `hasError`
- Funções de leitura prefixam com `get` ou `is`: `getThemeColor`, `isValidVariant`
- Funções de ação prefixam com verbo: `applyTheme`, `validateInput`

### Anti-padrões

✗ Nomes que descrevem **como** algo é em vez de **o que** algo faz: `.box-with-blue-border`
✗ Abreviações inventadas: `.btn-prm` (use `.btn--primary`)
✗ Numeração sem semântica: `.heading-1` (use `.text-h1` — categoria + função)
✗ Misturar convenções no mesmo arquivo: `--colorPrimary` ao lado de `--color-primary`
✗ Nomes que dependem da implementação atual: `.btn--rounded-12px` (se mudar o radius, o nome mente)
✗ Nomes em duas línguas: `--cor-solar` ao lado de `--color-anchor`

### Resumo — uma regra por linha

- CSS classes: `block__element--modifier`, tudo em kebab-case
- CSS variables: `--category-name-modifier`, sempre começa com categoria
- Tema dark: sufixo `-dark` no fim do nome
- Arquivos de documentação: `UPPERCASE.md`
- Assets visuais: `kebab-case`
- Fontes: convenção do publisher original
- Componentes React: `PascalCase`
- Variáveis JS: `camelCase`
- Estados booleanos: prefixo `is` / `has`
- Componentes carregam função, não aparência

## 23. ESTRUTURA DE ARQUIVOS

```
/hope-design-system
  /fonts
    PlusJakartaSans-VariableFont_wght.ttf
    PlusJakartaSans-Italic-VariableFont_wght.ttf
  /logos
    logo-light-mode.svg
    logo-dark-mode.svg
    logo-icon.svg
  /icons
    (Lucide icons como SVG inline ou via pacote)
  DESIGN.md          ← este arquivo (fonte da verdade)
  /css
    tokens.css       ← camada de tokens: :root e [data-theme="dark"]
    reset.css        ← reset base, foco, skip-link, visually-hidden
    /components      ← um arquivo por componente (button.css, badge.css, icon.css, case-card.css, ...)
    /site            ← layout e estilos de página (header, hero, footer, case study, animations, ...)
    hope.css         ← GERADO por npm run css:build (tokens, reset, components, site). Nunca editar à mão
    auth.css         ← carregado por js/auth.js só nas páginas protegidas
    output.css       ← Tailwind (npm run build:css), carregado antes do hope.css
```

**Lote 2B, Indicadores e dicas (v2.11.0).** `css/components/` ganhou `tooltip.css`, `progress.css`, `spinner.css`, `skeleton.css` e `icon-button.css`, e `tokens.css` ganhou `--z-modal-scrim`, `--z-popover`, `--z-tooltip` e `--z-notification`.

**Lote 2A, Mensagens (v2.10.0).** `css/components/` ganhou `alert.css`, `toast.css` e `empty-state.css`; `banner.css` passa a ser o Notice do Figma, com `.banner--wip` como modificador legado do site. Checkbox, Radio e Switch passam a ter o texto de apoio fora do `<label>`, ligado por `aria-describedby`.

**Lote 1, Forms (v2.9.0).** `css/components/` ganhou `field.css`, `input.css`, `textarea.css`, `select.css`, `checkbox.css`, `radio.css` e `switch.css`. Novos tokens: `--border-width-medium` (Figma Stroke/medium) e `--color-border-input` (Figma Border/Utilities/Input).

**Componentes entram em lotes (v2.8.0, GOVERNANCE v1.6).** Os componentes que existem no Figma são codificados em lotes por família (Lotes 0 a 4), a partir do Figma, com ou sem uso no site.

**Lote 0 (v2.7.0, 2026-11-21).** `css/components/` ganhou `link.css` (`.link`, `.link--small`) e `separator.css` (`.separator`), e `badge.css` ganhou `.badge--danger`.

**CSS dividido por componente (v2.7.0, D-18).** As páginas carregam um único `css/hope.css`, gerado por `scripts/build-css.mjs` na ordem fixa: tokens, reset, `components/*` (alfabética), `site/*` (ordem original do antigo `layout.css`), `animations`. A camada `site` carrega depois da `components` porque sobrescreve `.btn`, `.logo-strip`, `.testimonial-card`, `.icon` e `.case-section__body`. Mudou só a organização: nenhum seletor, valor ou classe mudou (0 diferenças de estilo computado nas páginas do site e do docs). `npm run docs:check` falha se `hope.css` estiver defasado das fontes.

---

## 24. BRANDBOOK — REFERÊNCIA RÁPIDA

**Tese**: Design não é o que se entrega. É como se chega lá.

**Posicionamento**: Traduzo contextos complexos em decisões que ficam de pé.

**Princípios**: Processo antes de produto · Dado antes de opinião · Pergunta antes de resposta · Estrutura antes de estética

**Tom de voz**: Direta · Técnica · Detalhista · Confiante · Com calor · Esperançosa · Lúdica

**O que evitar**: design como decoração · confiança performada · complexidade ostentatória · atalho disfarçado de eficiência

---

## 25. COMPONENTES PROMOVIDOS v2.2 — CSS COMPLETO

Esta seção registra o CSS canônico de cada componente promovido ao DS na v2.2. Para cada um, o bloco abaixo é a fonte da verdade — copie-o diretamente; não invente variações.

---

### 25.1 `case-card--glass` — Modificador do `.case-card`

Cartão de case glassmórfico com canvas de gradiente, chrome de paginação, pill de ano e CTA full-width.

```css
/* ── Card shell ─────────────────────────────────────────── */
.case-card--glass {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(30px) saturate(1.6);
          backdrop-filter: blur(30px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    0 4px 24px rgba(13, 13, 15, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  height: 100%;
  transition:
    box-shadow   var(--duration-slow) var(--ease-out),
    border-color var(--duration-slow) var(--ease-out),
    transform    var(--duration-slow) var(--ease-out);
}
@media (min-width: 768px) {
  .case-card--glass { min-height: 0; }
}
.case-card--glass:hover {
  transform:    translateY(-4px);
  box-shadow:
    var(--shadow-lg),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.80);
}
[data-theme="dark"] .case-card--glass {
  background: rgba(26, 26, 46, 0.50);
  -webkit-backdrop-filter: blur(30px) saturate(1.6);
          backdrop-filter: blur(30px) saturate(1.6);
  border-color: rgba(74, 74, 96, 0.30);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
[data-theme="dark"] .case-card--glass:hover {
  background: rgba(26, 26, 46, 0.65);
  border-color: rgba(245, 200, 66, 0.35);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.50),
    0 0   0  1px rgba(245, 200, 66, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
}

/* ── Canvas ──────────────────────────────────────────────── */
.case-card--glass .case-card__visual {
  display: block;
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 18% 8%,  var(--color-sky)    0%, transparent 55%),
    radial-gradient(120% 120% at 88% 16%, var(--color-aurora)  0%, transparent 52%),
    linear-gradient(150deg, var(--color-sky) 0%, var(--color-tide) 100%);
}
[data-theme="dark"] .case-card--glass .case-card__visual {
  background:
    radial-gradient(120% 120% at 15% 0%,  rgba(28, 95, 168, 0.45) 0%, transparent 55%),
    radial-gradient(120% 120% at 90% 12%, rgba(245, 200, 66, 0.20) 0%, transparent 50%),
    linear-gradient(150deg, #2A2A42 0%, #1B1B2C 100%);
}
.case-card--glass .case-card__img--light,
.case-card--glass .case-card__img--dark {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* ── Chrome dots (paginator) ─────────────────────────────── */
.case-card__chrome {
  position: absolute;
  top:       var(--space-3);
  left:      50%;
  transform: translateX(-50%);
  z-index:   var(--z-raised);
  display:   flex;
  gap:       4px;
  pointer-events: none;
}
.case-card__chrome span {
  width:  6px;
  height: 6px;
  border-radius: 1.5px;
  border: 1.5px solid rgba(13, 13, 15, 0.22);
  background: transparent;
}
.case-card__chrome span.is-filled {
  background: rgba(13, 13, 15, 0.28);
  border-color: rgba(13, 13, 15, 0.28);
}
[data-theme="dark"] .case-card__chrome span { border-color: rgba(255, 255, 255, 0.32); }
[data-theme="dark"] .case-card__chrome span.is-filled {
  background:   rgba(255, 255, 255, 0.55);
  border-color: rgba(255, 255, 255, 0.55);
}

/* ── Year pill ───────────────────────────────────────────── */
.case-card__year {
  position: absolute;
  top:   var(--space-3);
  right: var(--space-3);
  z-index: var(--z-raised);
  pointer-events: none;
  font-family:    var(--font-body);
  font-size:      var(--fs-label);
  font-weight:    600;
  letter-spacing: 0.08em;
  padding:        var(--space-1) var(--space-3);
  border-radius:  var(--radius-pill);
  background-color: rgba(247, 247, 249, 0.82);
  border: 1px solid rgba(13, 13, 15, 0.08);
  color:  var(--color-text-2);
  -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
}
[data-theme="dark"] .case-card__year {
  background-color: rgba(26, 26, 46, 0.80);
  border-color:     rgba(255, 255, 255, 0.10);
  color:            var(--color-text-3);
}

/* ── Content stack ───────────────────────────────────────── */
.case-card--glass .case-card__content {
  background-color: transparent;
  flex: 1;
  padding: var(--space-2) var(--space-3) var(--space-3);
  gap:     var(--space-3);
}
.case-card--glass .case-card__title {
  font-size:      var(--fs-h2);
  letter-spacing: -0.01em;
  line-height:    1.3;
}
.case-card__title-sep {
  margin:      0 calc(var(--space-2) + 2px);
  color:       var(--color-text-3);
  font-weight: 400;
}
.case-card__meta {
  font-family:    var(--font-body);
  font-size:      var(--fs-body-sm);
  letter-spacing: 0.01em;
  color:          var(--color-text-3);
  margin-top:     calc(-1 * var(--space-1));
}
.case-card--glass .case-card__tags { margin-top: var(--space-1); }
.case-card--glass .case-card__lead {
  margin-top: 0;
  font-size:  var(--fs-body-sm);
  line-height: 1.65;
  color: var(--color-text-2);
}
[data-theme="dark"] .case-card--glass .badge--anchor {
  background-color: rgba(245, 200, 66, 0.15);
  color: var(--color-solar);
}
.case-card--glass .case-card__metrics {
  margin-top:  var(--space-2);
  padding-top: var(--space-4);
  gap:         var(--space-6);
  border-top:  var(--border-normal);
}
[data-theme="dark"] .case-card--glass .case-card__metrics { border-color: var(--color-border); }
.case-card--glass .metric__value { font-size: var(--fs-h2); }
.case-card--glass .case-card__footer {
  margin-top:  auto;
  padding-top: var(--space-4);
}
.case-card--glass .case-card__footer .btn { width: 100%; }

/* ── Coming-soon placeholder (no lift) ───────────────────── */
.case-card--glass.case-card--placeholder:hover {
  transform:    none;
  box-shadow:   0 4px 24px rgba(13, 13, 15, 0.06), inset 0 1px 0 rgba(255,255,255,0.85);
  border-color: rgba(255, 255, 255, 0.65);
}
[data-theme="dark"] .case-card--glass.case-card--placeholder:hover {
  background:   rgba(26, 26, 46, 0.50);
  border-color: rgba(74, 74, 96, 0.30);
  box-shadow:   0 4px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.05);
}
```

---

### 25.2 `testimonial-card` — Card com borda degradê

```css
.testimonial-card {
  background-image:
    linear-gradient(to bottom, var(--color-bg-alt) 0%, var(--color-bg-alt) 50%, var(--color-bg) 100%),
    linear-gradient(to bottom, var(--color-border) 0%, transparent 80%);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
  border-bottom: var(--border-thin);
}
.testimonial-card__quote {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.75;
  color: var(--color-text-2);
}
.testimonial-card__quote strong {
  color: var(--color-text-1);
  font-weight: 600;
}
.testimonial-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-border);
  flex-shrink: 0;
  overflow: hidden;
  object-fit: cover;
  display: block;
}
.testimonial-card__name {
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  font-weight: 600;
}
.testimonial-card__role {
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  color: var(--color-text-3);
}
.testimonial-card__profile-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-link) 40%, transparent);
  text-underline-offset: 3px;
  transition:
    color                var(--duration-normal) var(--ease-out),
    text-decoration-color var(--duration-normal) var(--ease-out);
}
.testimonial-card__profile-link:hover {
  color: var(--color-link-hover);
  text-decoration-color: var(--color-link-hover);
}
.testimonial-card__linkedin-icon { width: 16px; height: 16px; flex-shrink: 0; }
```

---

### 25.3 `logo-strip` — Ticker infinito de logos

```css
.logo-strip {
  width: 100%;
  overflow: hidden;
  padding: var(--space-12) 0;
}
.logo-strip__label {
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--fs-label);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
  margin-bottom: var(--space-6);
}
.logo-strip__ticker {
  display: flex;
  overflow: hidden;
  width: 100%;
  user-select: none;
  mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
}
.logo-strip__track {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  flex-shrink: 0;
  gap: var(--space-24);
  padding-right: var(--space-24);
  animation: ticker-scroll 25s linear infinite;
}
.logo-strip__ticker:hover .logo-strip__track { animation-play-state: running; }
.logo-strip__item { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.logo-strip__item img {
  height: 32px;
  width: auto;
  opacity: 0.5;
  filter: grayscale(100%);
  transition:
    opacity var(--duration-normal) var(--ease-out),
    filter  var(--duration-normal) var(--ease-out);
}
.logo-strip__ticker:hover .logo-strip__item img { opacity: 1; filter: grayscale(0%); }
[data-theme="dark"] .logo-strip__item img        { filter: brightness(0) invert(1); opacity: 0.4; }
[data-theme="dark"] .logo-strip__ticker:hover .logo-strip__item img {
  filter: brightness(0) invert(1);
  opacity: 0.85;
}
/* Keyframe shared with testimonials-scroll — do not rename */
@keyframes ticker-scroll {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}
```

---

### 25.4 `result-card` — Card glassmórfico de resultado

```css
.result-card {
  padding:        var(--space-6);
  border-radius:  var(--radius-lg);
  display:        flex;
  flex-direction: column;
  gap:            var(--space-3);
  background: rgba(255, 255, 255, 0.60);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
          backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.70);
  box-shadow:
    0 4px 16px rgba(13, 13, 15, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.90);
  transition:
    transform    var(--duration-slow) var(--ease-out),
    box-shadow   var(--duration-slow) var(--ease-out),
    border-color var(--duration-slow) var(--ease-out);
}
.result-card:hover {
  transform:    translateY(-4px);
  box-shadow:
    0 12px 32px rgba(13, 13, 15, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.90);
  border-color: rgba(255, 255, 255, 0.85);
}
[data-theme="dark"] .result-card {
  background: rgba(26, 26, 46, 0.52);
  border-color: rgba(74, 74, 96, 0.32);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
[data-theme="dark"] .result-card:hover {
  transform:    translateY(-4px);
  border-color: rgba(245, 200, 66, 0.30);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.38),
    0 0   0  1px rgba(245, 200, 66, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.result-card__icon {
  width:         40px;
  height:        40px;
  border-radius: var(--radius-sm);
  display:       grid;
  place-items:   center;
  flex-shrink:   0;
  background-color: var(--color-sky);
  color:            var(--color-anchor);
}
[data-theme="dark"] .result-card__icon {
  background-color: rgba(245, 200, 66, 0.14);
  color:            var(--color-solar);
}
.result-card__title {
  font-family: var(--font-display);
  font-size:   var(--fs-h3);
  font-weight: 700;
  color:       var(--color-text-1);
  line-height: 1.4;
}
.result-card__body {
  font-family: var(--font-body);
  font-size:   var(--fs-body-sm);
  line-height: 1.70;
  color:       var(--color-text-2);
}
```

---

### 25.5 `lightbox` — Modal de zoom de imagem

JS: adiciona `.is-open` para abrir; `.is-zoomable` nas imagens aciona cursor zoom-in.

```css
.is-zoomable { cursor: zoom-in; transition: opacity var(--duration-normal) var(--ease-out); }
.is-zoomable:hover { opacity: 0.88; }

.lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity    var(--duration-slow) var(--ease-out),
    visibility 0s linear           var(--duration-slow);
}
.lightbox[hidden] { display: none; }
.lightbox.is-open {
  opacity: 1;
  visibility: visible;
  transition:
    opacity    var(--duration-slow) var(--ease-out),
    visibility 0s linear           0s;
}
.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-bg-scrim-strong);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
}
.lightbox__panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  max-width: min(92vw, 1280px);
  transform: scale(0.92) translateY(12px);
  transition: transform var(--duration-slower) var(--ease-out);
}
.lightbox.is-open .lightbox__panel { transform: scale(1) translateY(0); }
.lightbox__img {
  display: block;
  max-width: 100%;
  max-height: 82vh;
  width: auto;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.60);
}
.lightbox__caption {
  font-family: var(--font-body);
  font-size:   var(--fs-body-sm);
  color:       rgba(255, 255, 255, 0.55);
  text-align:  center;
  max-width:   60ch;
  line-height: 1.5;
}
.lightbox__close {
  position: absolute;
  top:   calc(-1 * var(--space-10));
  right: 0;
  display: grid;
  place-items: center;
  width:  36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.80);
  cursor: pointer;
  transition:
    background var(--duration-normal) var(--ease-out),
    color      var(--duration-normal) var(--ease-out);
}
.lightbox__close:hover {
  background: rgba(255, 255, 255, 0.22);
  color: var(--color-cloud);
}
.lightbox__close:focus-visible {
  outline: 2px solid var(--color-solar);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .lightbox__panel { transform: none !important; transition: none !important; }
}
```

---

### 25.6 `skill-card--metric` — Card de métrica (fundo escuro)

Sprint 2 spec: `background-color: var(--color-ink)`. Dark mode inverte para fundo claro.

```css
.skill-card--metric {
  background-color: var(--color-bg-alt);
  border: none;
  box-shadow: none;
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.skill-card--metric .metric-icon {
  color: var(--color-text-2);
  flex-shrink: 0;
}
.skill-card--metric .metric-value {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 700;
  color: var(--color-text-2);
  line-height: 1.4;
  margin: 0;
}
.skill-card--metric .metric-desc {
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  color: var(--color-text-3);
  line-height: 1.5;
  margin: 0;
}
/* Sprint 2 target: dark-bg card in light mode */
/* background-color: var(--color-ink); color: var(--color-cloud); */
/* Dark mode inverts back to light surface — full block TBD in Sprint 2 */
```

---

### 25.7 `case-phase-break` — Separador de fase editorial

```css
.case-phase-break {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-16) 0 var(--space-2);
  margin-bottom: var(--space-2);
}
.case-phase-break__label {
  font-family: var(--font-body);
  font-size: var(--fs-label);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-3);
  white-space: nowrap;
  flex-shrink: 0;
}
.case-phase-break__rule {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}
```

---

### 25.8 `case-callout` — Citação editorial full-width

```css
.case-callout {
  padding: var(--space-10) 0;
  margin: var(--space-8) 0;
}
.case-callout__text {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-abyss);
  max-width: 820px;
}
[data-theme="dark"] .case-callout__text { color: var(--color-solar); }
.case-callout__attribution {
  display: block;
  margin-top: var(--space-5);
  font-family: var(--font-body);
  font-size: var(--fs-label);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
}
```

---

### 25.9 `cs-figure--full-bleed` — Figure que rompe a coluna

**Atenção**: O cálculo das margens está acoplado a constantes de layout. Não altere sem recalcular os três breakpoints.

- Desktop (≥1024px): sidebar 240px + max-width 1120px + padding 40px → `margin-left: calc(128px - 50vw)`
- Tablet (768–1023px): coluna de 68ch centrada → `margin-left: calc(34ch - 50vw)`
- Mobile (<768px): `margin-left: calc(-1 * var(--space-6))`

```css
.cs-figure--full-bleed {
  width: 100vw;
  margin-left: calc(-1 * var(--space-6));
  border-left: none;
  border-right: none;
  border-radius: 0;
  max-width: none;
}
@media (min-width: 768px) {
  .cs-figure--full-bleed { margin-left: calc(34ch - 50vw); }
}
@media (min-width: 1024px) {
  .cs-figure--full-bleed { margin-left: calc(128px - 50vw); }
}
```

---

### 25.10 `header__status-badge` + `status-pulse` — Badge de status animado

```css
.header__status-badge {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  white-space: nowrap;
  font-family: var(--font-body);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: rgba(255, 255, 255, 0.70);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--color-text-2);
  box-shadow: var(--shadow-sm);
  -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
}
[data-theme="dark"] .header__status-badge {
  background: rgba(26, 26, 46, 0.60);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-3);
  -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
}
.status-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-amber);
  flex-shrink: 0;
  animation: status-pulse 2.4s ease-in-out infinite;
}
@keyframes status-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
```

---

*Hope Design System · DESIGN-IMPLEMENTATION.md · v2.11.0 · novembro de 2026*
*Renan Moura · renanmoura.framer.website*

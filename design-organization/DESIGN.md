---
version: v2.6.11
name: Hope
description: >
  Design system pessoal de Renan Moura. Tradução técnica do Brandbook V2.2
  em tokens, componentes e regras para aplicações digitais — portfólio,
  cases, plugins e produtos futuros.

colors:
  # --- Solar family: do amanhecer ao crepúsculo ---
  aurora: "#FEF8E0"
  daybreak: "#FAE19A"
  solar: "#F5C842"
  amber: "#C49A1F"
  dusk: "#8B6914"

  # --- Anchor family: profundidades ---
  sky: "#E8F0F9"
  tide: "#8CB4E0"
  anchor: "#1C5FA8"
  deep: "#144278"
  abyss: "#1A1A2E"

  # --- Neutrals: escala editorial ---
  cloud: "#FFFFFF"
  surface: "#F7F7F9"
  border-base: "#E2E2E8"
  muted: "#5F5F6E"
  shadow: "#3D3D45"
  ink: "#0D0D0F"

  # --- Funcionais ---
  success: "#4A9F6B"
  warning: "#C47A1F"  # v2.6: primitivo Functional/warning apenas. A família Warning dos componentes usa Solar
  error: "#B83434"
  info: "#634590"
  celebrate: "#F5A8C0"

  # --- Tokens semânticos · Tema LIGHT (default) ---
  # Estes são os slots que componentes referenciam.
  # Trocar tema = trocar valor destes tokens (light → dark).
  primary: "{colors.anchor}"
  secondary: "{colors.solar}"
  background: "{colors.cloud}"
  background-alt: "{colors.surface}"
  background-inverse: "{colors.abyss}"
  background-elevated: "{colors.cloud}"
  surface-atmospheric: "{colors.abyss}"
  text-primary: "{colors.ink}"
  text-secondary: "{colors.shadow}"
  text-tertiary: "{colors.muted}"
  text-inverse: "{colors.cloud}"
  text-on-primary: "{colors.cloud}"
  text-on-secondary: "{colors.ink}"
  text-on-atmospheric: "{colors.cloud}"
  border: "{colors.border-base}"
  border-strong: "{colors.muted}"
  link: "{colors.anchor}"
  link-hover: "{colors.deep}"
  focus-ring: "{colors.anchor}"
  on-primary: "{colors.cloud}"
  on-secondary: "{colors.ink}"

  # --- Tokens semânticos · Tema DARK ---
  # Mesmos slots semânticos com valores diferentes.
  # Componentes não referenciam estes diretamente — o runtime
  # (CSS prefers-color-scheme ou [data-theme="dark"]) faz o swap.
  primary-dark: "{colors.solar}"
  secondary-dark: "{colors.anchor}"
  background-dark: "{colors.abyss}"
  background-alt-dark: "#242438"
  background-inverse-dark: "{colors.cloud}"
  background-elevated-dark: "#242438"
  surface-atmospheric-dark: "{colors.ink}"
  text-primary-dark: "{colors.cloud}"
  text-secondary-dark: "#B4B4C8"
  text-tertiary-dark: "#8888A0"
  text-inverse-dark: "{colors.ink}"
  text-on-primary-dark: "{colors.ink}"
  text-on-secondary-dark: "{colors.cloud}"
  text-on-atmospheric-dark: "{colors.cloud}"
  border-dark: "#2E2E40"
  border-strong-dark: "{colors.night-500}"  # v2.3: contorno de controle no dark, 3,19:1 sobre abismo (era #4A4A60, 1,98:1)
  link-dark: "{colors.solar}"
  link-hover-dark: "{colors.daybreak}"
  focus-ring-dark: "{colors.solar}"
  success-dark: "{colors.success}"
  warning-dark: "{colors.warning}"
  error-dark: "{colors.error}"
  info-dark: "{colors.info}"

  # --- Extras semânticos ---
  borda-dark: "#E0E0E8"  # dark mode btn--primary hover surface. Token --color-bg-neutral-hover.

  # --- v2.3 (Figma sync, nov/2026): primitivos novos ---
  # Nomes em inglês, como no Figma (Hope · Primitives) e em css/tokens.css.
  # Rampa Night completa (dark mode), valores do Figma Foundation:
  night-800: "#242438"
  night-700: "#2E2E40"
  night-600: "#4A4A60"
  night-500: "#69697E"
  night-400: "#9090A8"
  night-300: "#B4B4C8"
  night-aurora-soft: "#2A2618"  # v2.6: fundo soft do Warning no dark
  night-warning-soft: "#2A1E10"
  night-info-soft: "#1E182A"
  success-deep: "#2A7347"
  warning-deep: "#94540A"
  error-light: "#F28585"
  info-light: "#B89EDB"

  # --- v2.3 · semânticos novos · Tema LIGHT ---
  bg-disabled: "{colors.border-base}"
  text-disabled: "#9090A8"
  text-on-disabled: "#9090A8"
  border-disabled: "{colors.border-base}"
  bg-scrim: "rgba(13, 13, 15, 0.5)"
  bg-scrim-strong: "rgba(13, 13, 15, 0.88)"  # v2.6: igual em light e dark. Usado no Lightbox
  # v2.6: Warning na família Solar (decisão de 13/11/2026)
  bg-warning: "{colors.solar}"
  bg-warning-soft: "{colors.aurora}"
  text-warning: "{colors.dusk}"
  text-on-warning: "{colors.ink}"
  border-warning: "{colors.amber}"  # cerca de 2,5:1 sobre Aurora: aceito, a borda é decorativa
  bg-info: "{colors.info}"
  bg-info-soft: "rgba(99, 69, 144, 0.10)"
  text-info: "{colors.info}"
  text-on-info: "{colors.cloud}"
  border-info: "{colors.info}"
  text-success: "{colors.success-deep}"
  text-error: "{colors.error}"
  border-success: "{colors.success}"
  border-error: "{colors.error}"

  # --- v2.3 · semânticos novos · Tema DARK ---
  bg-disabled-dark: "#2E2E40"
  text-disabled-dark: "{colors.night-500}"
  text-on-disabled-dark: "{colors.night-500}"
  border-disabled-dark: "#2E2E40"
  bg-scrim-dark: "rgba(0, 0, 0, 0.65)"
  bg-warning-soft-dark: "{colors.night-aurora-soft}"
  text-warning-dark: "{colors.solar}"
  bg-info-soft-dark: "{colors.night-info-soft}"
  text-info-dark: "{colors.info-light}"
  text-success-dark: "{colors.success}"
  text-error-dark: "{colors.error-light}"
  border-error-dark: "{colors.error-light}"

typography:
  # v2.6.3 (18/11/2026): a escala segue os estilos de texto do Figma Foundation.
  # Os tamanhos abaixo são os do Figma. No código, Display, H1, H2, H3 e Body xl são fluidos (clamp) e chegam a esse valor no máximo.
  # H3 e Body xl são divergências fluidas aceitas do Figma (16px e 19px), revisáveis depois. Ver a seção de tipografia.
  # Body (--fs-body), Body sm (--fs-body-sm, desde a v2.6.11), Body xs e Label caps são fixos.
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.25rem  # 52px. Fluido no código: clamp(36px, 5vw, 52px)
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem  # 22px. Fluido no código: clamp(18px, 2.5vw, 22px)
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 700  # Figma: Bold. O CSS (.text-h3, .case-section__subtitle) usa 700 desde a v2.6.4
    lineHeight: 1.4
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem  # 13px fixo. Token --fs-body-sm (fixo desde a v2.6.11, antes clamp(12px, 1vw, 13px))
    fontWeight: 400
    lineHeight: 1.6
  body-xs:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem  # 11px fixo. Estilo do Figma (Body xs). Token --fs-body-xs desde a v2.6.4
    lineHeight: 1.6
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem  # 11px fixo. Token --fs-label (fixo em 11px desde a v2.6.4, antes clamp(10px, 1vw, 11px))
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.12em  # Figma: 12%. Sempre uppercase. Classe pronta: .text-label (reset.css)
  metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem  # 22px. Usa o mesmo token de tamanho do h2 (--fs-h2). Não existe --fs-metric
    fontWeight: 700
    lineHeight: 1.4
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: -0.01em  # Figma Body xl: -1%
    # Fluid: clamp(16px, 1.7vw, 19px). Token --fs-body-xl. Use for case lead text. Divergência fluida aceita do Figma (19px), revisável depois (v2.6.11).
    # É o estilo Body xl (size/lead) do Figma: 19px, 170%, tracking -1%. Em versões anteriores aparecia como Body lg. O --fs-body-lg (17px) foi removido na v2.6.5.
    # .case-lead__text é este estilo (tracking -0.01em). Usa peso 500: o Body do Figma tem variantes Regular, Medium, SemiBold e Bold.
    # .hero__body e .case-hero__subtitle NÃO usam Body lg: usam Body (--fs-body), de propósito (v2.6.6).
  code:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
    note: Token --font-mono removed — code and uppercase micro-labels use
      --font-body (Plus Jakarta Sans) with text-transform/letter-spacing
      to simulate the technical register.

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  5xl: 128px

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 999px

motion:
  # --- Durations ---
  duration-instant: 0ms
  duration-fast: 100ms
  duration-normal: 150ms
  duration-slow: 250ms
  duration-slower: 400ms
  duration-deliberate: 600ms

  # --- Easing curves ---
  ease-linear: linear
  ease-out: cubic-bezier(0.16, 1, 0.3, 1)
  ease-in: cubic-bezier(0.7, 0, 0.84, 0)
  ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
  ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)

  # --- Transition presets (combinações canônicas) ---
  transition-hover: color 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms cubic-bezier(0.16, 1, 0.3, 1), border-color 150ms cubic-bezier(0.16, 1, 0.3, 1)
  transition-press: transform 100ms cubic-bezier(0.16, 1, 0.3, 1)
  transition-enter: opacity 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1)
  transition-exit: opacity 100ms cubic-bezier(0.7, 0, 0.84, 0)
  transition-atmospheric: opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)

components:
  # --- Botões (como no CSS: preto é a ação primária; Solar é acento de marca, ver regra de uso do Solar em Colors) ---
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cloud}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: "{colors.shadow}"
    textColor: "{colors.cloud}"
  button-primary-hover-dark:
    backgroundColor: "{colors.border-base}"
    textColor: "{colors.ink}"

  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 24px

  button-solar:
    backgroundColor: "{colors.solar}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-solar-hover:
    backgroundColor: "{colors.daybreak}"
    textColor: "{colors.ink}"

  button-disabled:
    backgroundColor: "{colors.bg-disabled}"
    textColor: "{colors.text-on-disabled}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 24px

  # --- Badges semânticas ---
  badge-anchor:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.deep}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  badge-solar:
    backgroundColor: "{colors.aurora}"
    textColor: "{colors.dusk}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  badge-success:
    backgroundColor: "#E8F2EB"
    textColor: "#1A5938"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  # v2.6.2 (decisão de 18/11/2026): badge-warning é alias do badge-solar, mesmos tokens
  # (Accent/Secondary: fundo e texto, sem borda). Sem valores próprios, sem token novo.
  badge-warning:
    backgroundColor: "{colors.aurora}"
    textColor: "{colors.dusk}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  badge-error:
    backgroundColor: "#F8E0E0"
    textColor: "#6E1818"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px
  badge-info:
    backgroundColor: "#ECE5F2"
    textColor: "#2D1F50"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 3px 10px

  # --- Card ---
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 32px
  card-description:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body}"
  card-meta:
    backgroundColor: "transparent"
    textColor: "{colors.text-tertiary}"
    typography: "{typography.label-caps}"

  # --- Input ---
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  input-focus:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
  input-error:
    backgroundColor: "{colors.background}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  input-placeholder:
    backgroundColor: "transparent"
    textColor: "{colors.text-tertiary}"

  # --- Divider ---
  divider:
    backgroundColor: "{colors.border}"
    textColor: "transparent"

  # --- Footer (dark surface) ---
  footer:
    backgroundColor: "{colors.background-inverse}"
    textColor: "{colors.text-inverse}"
    padding: 64px 24px

  # --- case-card--glass (portrait glassmorphic case study card) ---
  # Modifier of .case-card. Frosted-glass shell with inset gradient canvas,
  # paginator chrome dots, frosted year pill, and full-width CTA. Dark mode
  # flips accent Ancora->Solar and adds a glow ring.
  case-card-glass:
    backgroundColor: "rgba(255,255,255,0.55)"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"

  # --- testimonial-card ---
  # Gradient-border card. Author avatar (40px circle) + attribution above hr.
  # Quote text below. Used inside the testimonials ticker.
  testimonial-card:
    backgroundColor: "{colors.background-alt}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"

  # --- logo-strip ---
  # Infinite horizontal ticker carousel for logos. Fade-mask on both edges.
  # Keyframe ticker-scroll shared with testimonials-scroll — do not rename.
  logo-strip:
    backgroundColor: "transparent"

  # --- result-card ---
  # Glassmorphic card with Ancora-tinted icon chip (40x40), display-font
  # title, and body-sm text. Dark mode: Abismo fill + Solar gold chip + glow.
  result-card:
    backgroundColor: "rgba(255,255,255,0.60)"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"

  # --- lightbox ---
  # Full-screen image zoom modal. .is-zoomable triggers; .is-open toggles.
  # prefers-reduced-motion: skip scale, keep fade.
  lightbox:
    backgroundColor: "{colors.bg-scrim-strong}"

  # --- skill-card--metric ---
  # Dark-bg metric card. Sprint 2 spec: background-color: var(--color-ink);
  # dark mode inverts to light background.
  skill-card-metric:
    backgroundColor: "{colors.background-alt}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"

  # --- phase-break ---
  # Mono label left + flex-1 rule right. space-16 top padding separates phases.
  phase-break:
    backgroundColor: "transparent"

  # --- case-callout ---
  # Full-width quote block. fs-h1, Plus Jakarta Sans 700, max-width 820px.
  # Dark mode: text flips to Solar.
  case-callout:
    backgroundColor: "transparent"

  # --- cs-figure--full-bleed ---
  # Full-viewport breakout via negative margin math. Coupled to layout constants:
  # sidebar 240px, max-width 1120px, padding 40px, content 68ch.
  cs-figure-full-bleed:
    backgroundColor: "transparent"

  # --- header__status-badge + status-pulse ---
  # Frosted pill below nav pill at right. Animated amber dot (2.4s pulse).
  # Dark mode: Abismo fill, reduced opacity text.
  header-status-badge:
    backgroundColor: "rgba(255,255,255,0.70)"
    rounded: "{rounded.pill}"
    padding: "{spacing.xs} {spacing.sm}"

  # --- Atmospheric hero (uso restrito a quebras conceituais) ---
  hero-atmospheric:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.lg}"
    padding: 96px

  # --- Brand callout (uso editorial em artigos e cases) ---
  callout-anchor:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.deep}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 24px
  callout-anchor-border:
    backgroundColor: "{colors.tide}"
    textColor: "transparent"
---

## Overview

**Hope** é a tradução técnica da marca pessoal Renan Moura — product designer com 12 anos de experiência em B2B e B2C. O sistema é flat, editorial e preciso, com influência sutil de animes dos anos 90 como assinatura (nunca como base).

A tese da marca: **design não é o que se entrega, é como se chega lá**. O Hope existe para tornar essa tese operacional — uma infraestrutura de decisão visual.

A interface evoca clareza editorial e precisão técnica. Uma única tipografia humanista (Plus Jakarta Sans) ancora identidade, estrutura, leitura e UI. Dois acentos coexistem sem disputar: Âncora (azul) representa estrutura e sistema; Solar (amarelo) representa esperança e movimento.

**Princípios operacionais que guiam decisões de design:**

- Processo antes de produto
- Dado antes de opinião
- Pergunta antes de resposta
- Estrutura antes de estética

## Colors

A paleta é organizada em quatro famílias nomeadas. Cada cor tem papel — não é apenas hex code.

### Famílias

**Solar** — do amanhecer ao crepúsculo. Quente, luminoso, esperançoso.

- **Aurora (#FEF8E0):** primeira luz, highlights em amarelo, fundo de badges
- **Madrugada (#FAE19A):** suporte, fundos médios amarelos
- **Solar (#F5C842):** ★ acento da marca. Esperança. Cor das celebrações
- **Âmbar (#C49A1F):** versão profunda do Solar, hover de botão solar
- **Crepúsculo (#8B6914):** texto sobre Solar, fim de tarde

**Âncora** — das profundidades. Frio, preciso, estrutural.

- **Céu (#E8F0F9):** highlight em azul, callouts, hover de secondary
- **Maré (#8CB4E0):** suporte, bordas de badges azuis
- **Âncora (#1C5FA8):** ★ acento da marca. Estrutura. Primary brand color
- **Profundo (#144278):** versão densa do Âncora, hover de primary
- **Abismo (#1A1A2E):** dark mode base, footer, fundo inverso

**Neutras** — escala editorial.

- **Nuvem (#FFFFFF):** base editorial, fundo padrão
- **Superfície (#F7F7F9):** cards, fundos leves alternados
- **Borda (#E2E2E8):** linhas, divisores, bordas de input
- **Mudo (#5F5F6E):** texto terciário, metadados, placeholders
- **Sombra (#3D3D45):** texto secundário, body
- **Tinta (#0D0D0F):** texto principal, títulos

**Funcionais** — as cinco senshi (referência camada a animes 90s).

- **Folha Navalha (#4A9F6B):** sucesso, confirmação
- **Choque do Trovão (#F5C842, igual ao Solar):** atenção, alerta. Desde 13/11/2026 a senshi de atenção é o Solar (antes #E89A3D, depois #C47A1F). O laranja #C47A1F segue só como primitivo `Functional/warning`, cor de status da marca, e não é mais a cor dos componentes Warning
- **Marte (#B83434):** erro, crítico
- **Saturno (#634590):** informação, contexto
- **Lua (#F5A8C0):** celebração, marcos. Uso raro — quando aparece, significa algo

### Regras de aplicação

- Texto em corpo deve sempre garantir contraste WCAG AA mínimo (4.5:1)
- **Lua nunca como cor de texto** — apenas fundo de badges ou destaques
- Solar e Âncora coexistem mas não competem em uma mesma seção
- Em dark mode, Solar substitui Âncora como cor de link (melhor contraste sobre Abismo)
- **Uso do Solar** (decidido em 13/11/2026; substitui a regra "Solar só na marca/logo"): Solar é o acento da marca e do logo, e também pode aparecer em elementos Warning, no Banner e no Solar Badge. Fora desses casos, Solar não vira cor de UI funcional: o preto segue como ação primária e o Âncora como estrutura
- Contraste na família Solar: Tinta sobre Solar 12,2:1 e Crepúsculo sobre Aurora 4,78:1 passam para texto de corpo. Crepúsculo sobre Solar dá só 3,2:1, então não use como texto sobre Solar. Texto sobre Solar ou Aurora é sempre Tinta ou Crepúsculo (este só sobre Aurora ou branco)

### Cores de família — uso narrativo

Algumas cores existem como **tokens de família, não de componente**. São matéria-prima da identidade, usadas em contextos editoriais, backgrounds atmosféricos ou variações de hover:

- **Madrugada (#FAE19A)**: fundos médios amarelos, ilustrações editoriais, suporte ao Solar
- **Maré (#8CB4E0)**: fundos médios azuis, ilustrações editoriais, suporte ao Âncora
- **Crepúsculo (#8B6914)**: texto sobre Solar, gradientes de família

Essas cores aparecem no sistema mas não têm componente dedicado por design — são a paleta expandida que dá profundidade à marca sem dispersar a UI.

### As cinco senshi — cores narrativas

As cinco cores funcionais (**Folha Navalha**, **Choque do Trovão**, **Marte**, **Saturno**, **Lua**) são intencionalmente saturadas e claras. Elas funcionam como **tokens de identidade narrativa**, não como cores de texto sobre fundo claro.

**Uso correto**:
- Ícones e indicadores visuais grandes (não-texto)
- Backgrounds de elementos pequenos (dots, status indicators)
- Acentos em ilustrações e composições editoriais
- Texto sobre fundo escuro (Abismo), onde o contraste é suficiente

**Uso incorreto**:
- Texto sobre fundo claro — não passam no contraste WCAG AA
- Para badges de texto sobre fundo claro, use as versões escurecidas (#1A5938, #6E1818, #2D1F50, #6B2640) que já estão aplicadas nos componentes `badge-*`. O `badge-warning` não tem cor própria: é alias do `badge-solar` (Crepúsculo sobre Aurora, 4,78:1)

Linter warnings de "orphaned tokens" para essas cores são esperados e intencionais — elas existem como cores de marca, não como cores de componente.

### Aliases semânticos órfãos

Os tokens `success`, `warning`, `info` apontam para as senshi e aparecem como órfãs pelos mesmos motivos acima. Eles existem para serem usados em **ícones de status, indicadores visuais e contextos onde a senshi se aplica** — não em texto sobre fundo claro (para isso, use os componentes `badge-success`, `badge-warning`, etc).

### Tokens de tema dark — órfãos por arquitetura

Todos os tokens com sufixo `-dark` (`background-dark`, `text-primary-dark`, `link-dark`, etc.) aparecem como órfãos no linter. Isso é **esperado e intencional**.

O linter do Google Labs valida referências **estáticas** entre componentes e tokens. Mas o swap de tema acontece em **runtime** (via CSS `@media (prefers-color-scheme: dark)` ou seletor `[data-theme="dark"]`), fora do escopo do linter. Os tokens `-dark` são consumidos por essa camada de runtime, não por componentes diretamente.

Não tente "consertar" esses warnings adicionando componentes-fantasma. A arquitetura está correta — o linter apenas não modela temas multi-modo.

**`--color-bg-neutral-hover` (dark)**: hover do `btn--primary` em dark mode, igual a `--color-border-base` (#E2E2E8).

### Backgrounds atmosféricos

O sistema Hope é **flat por princípio** em toda a UI funcional (componentes, layouts, controles).

**Exceção estratégica**: backgrounds atmosféricos podem ser usados como **camada de quebra conceitual** em momentos específicos — heroes de portfólio, capas de case study, divisores entre seções narrativas, telas de transição.

Esses backgrounds são tratados como **mídia conceitual** (imagens, ilustrações, composições atmosféricas), não como estética geral. Eles entram via componente `hero-atmospheric` ou como `background-image` em seções específicas. Nunca contaminam componentes funcionais (botões, cards, inputs).

A lógica é a mesma de Solar vs Âncora: dois sistemas que coexistem sem disputar. UI funcional permanece editorial e plana; quebras conceituais ganham profundidade atmosférica quando o conteúdo justifica.

### Theme architecture

O Hope opera com **duas camadas de cor** que conversam entre si:

**Camada 1 — Paleta da marca** (`colors.aurora`, `colors.anchor`, `colors.ink`, etc.)
Cores brutas com nomes próprios. Definem a identidade visual e raramente mudam. Pensam em **família e narrativa** — não em função de UI.

**Camada 2 — Tokens semânticos de tema** (`colors.background`, `colors.text-primary`, `colors.link`, etc.)
Slots funcionais que apontam para cores da paleta. Definem **papéis na interface**. São esses tokens que os componentes referenciam — nunca a paleta diretamente.

**Por que essa separação importa**: trocar tema (light → dark) significa trocar para qual cor da paleta os slots semânticos apontam. Componentes não precisam ser reescritos — apenas leem `colors.background`, que muda automaticamente.

**Tema light (default)**: definido nos tokens sem sufixo (`background`, `text-primary`, `link`, etc.). Otimizado para fundos claros (Nuvem, Superfície). Link em Âncora.

**Tema dark**: definido nos tokens com sufixo `-dark` (`background-dark`, `text-primary-dark`, `link-dark`, etc.). Otimizado para fundos escuros (Abismo). **Link muda para Solar** — Âncora não tem contraste suficiente sobre Abismo, mas Solar brilha (11.2:1).

**Como o swap acontece em runtime**:

```css
/* Default: tema light */
:root {
  --background: var(--colors-cloud);
  --text-primary: var(--colors-ink);
  --link: var(--colors-anchor);
}

/* Auto: respeita preferência do sistema */
@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--colors-abyss);
    --text-primary: var(--colors-cloud);
    --link: var(--colors-solar);
  }
}

/* Manual: usuário escolhe */
[data-theme="dark"] {
  --background: var(--colors-abyss);
  --text-primary: var(--colors-cloud);
  --link: var(--colors-solar);
}
```

Componentes consomem **apenas os slots semânticos** (`var(--background)`, `var(--text-primary)`). Nunca cores da paleta diretamente. Isso garante que qualquer componente funcione em qualquer tema sem reescrita.

### Multi-theme — projeção futura

A arquitetura suporta temas adicionais além de light/dark. Possíveis temas futuros:

- **High-contrast**: para acessibilidade — Tinta absoluto, Nuvem absoluto, sem cinzas
- **Print**: ajustes para impressão (sem cores escuras de fundo, fontes maiores)
- **Reading**: variação com Superfície quente (#FAF7F2) e tipografia maior para artigos longos

Cada tema novo é apenas mais um conjunto de valores para os mesmos slots semânticos. Nenhum componente precisa ser tocado para adicionar um tema.

**Regra crítica**: nunca crie um componente que referencia a paleta diretamente (`backgroundColor: {colors.cloud}`). Sempre via slot semântico (`backgroundColor: {colors.background}`). O linter aceita ambos, mas o segundo é o único que escala para multi-tema.

## Typography

Uma fonte, um papel. Plus Jakarta Sans cobre tudo — display, headlines, body, UI, métricas, labels e code.

**Plus Jakarta Sans** — sans-serif humanista e calorosa. Variable font (peso 200–800), disponível como `PlusJakartaSans-VariableFont_wght.ttf`. Labels técnicas (overline, metadata) usam `text-transform: uppercase` + `letter-spacing: 0.12em` (Label caps do Figma) para simular o registro técnico, sem precisar de uma face monoespaçada.

**A escala tipográfica segue os estilos de texto do Figma Foundation** (decisão de 18/11/2026). Onde o Figma e este arquivo divergirem, vale o Figma.

### Escala

| Token | Fonte | Uso |
|-------|-------|-----|
| `display` | Plus Jakarta Sans | Hero, capa, nome da marca |
| `h1` | Plus Jakarta Sans | Título de página, case study |
| `h2` | Plus Jakarta Sans | Subtítulo de seção |
| `h3` | Plus Jakarta Sans | Subseção, label de grupo |
| `body` | Plus Jakarta Sans | Parágrafos, texto corrido. Também `.hero__body` e `.case-hero__subtitle`, de propósito (não usam Body lg) |
| `body-sm` | Plus Jakarta Sans | Corpo em UI compacta, botões, 13px fixo (`--fs-body-sm`) |
| `body-xl` | Plus Jakarta Sans | Lead (Body xl do Figma, -0.01em): case lead text (`.case-lead__text`), `clamp(16px, 1.7vw, 19px)` |
| `body-xs` | Plus Jakarta Sans | Texto mínimo, 11px fixo (`--fs-body-xs`) |
| `label-caps` | Plus Jakarta Sans | Overline, metadata (uppercase, 400, 0.12em) |
| `metric` | Plus Jakarta Sans | Números, métricas (+21%, +12%), 700 em Âncora/Solar, no tamanho do `--fs-h2` |
| `code` | Plus Jakarta Sans | Code inline e blocks |

### Estilos de texto do Figma (Foundation)

Valores de referência. Nos estilos fluidos o tamanho é o máximo: no código, os tokens `--fs-*` correspondentes usam `clamp()` e chegam a esse valor. Body, Body sm, Body xs e Label caps são fixos.

| Estilo | Tamanho | Line height | Tracking | Peso | Token de tamanho no código |
|--------|---------|-------------|----------|------|----------------------------|
| Display | 52px | 110% | -2% | Bold | `--fs-display` (36 a 52px) |
| H1 | 32px | 120% | -1% | Bold | `--fs-h1` (26 a 32px) |
| H2 | 22px | 130% | -1% | Bold | `--fs-h2` (18 a 22px) |
| H3 | 16px | 140% | 0 | Bold | `--fs-h3` (14 a 16px, fluido, divergência aceita) |
| Body | 16px | 175% | | | `--fs-body` (16px fixo desde a v2.6.8; antes 14 a 16px) |
| Body xl (`size/lead`) | 19px | 170% | -1% | | `--fs-body-xl` (16 a 19px, fluido, divergência aceita) |
| Body sm | 13px | 160% | | | `--fs-body-sm` (13px fixo desde a v2.6.11; antes 12 a 13px) |
| Body xs | 11px | 160% | | | `--fs-body-xs` (11px fixo) |
| Label caps | 11px | 140% | 12%, uppercase | Regular | `--fs-label` (11px fixo) |
| Metric | 22px | 140% | | Bold | `--fs-h2`, sem token próprio |

**Divergências fluidas aceitas (v2.6.11).** Dois tokens ficam fluidos de propósito e diferem do valor fixo do Figma fora do desktop largo:
- `--fs-body-xl`: `clamp(16px, 1.7vw, 19px)`, Figma 19px. Fixo em 19px traria de volta o lead grande demais no celular, rejeitado para os heróis (v2.6.6). Hoje só o `.case-lead__text` usa o token.
- `--fs-h3`: `clamp(14px, 1.5vw, 16px)`, Figma 16px. Segue fluido por enquanto.

Os dois são **revisáveis depois**. Não são defeitos nem débito aberto: mudar um deles é uma decisão nova, com medição, não uma correção.

O `--fs-body-lg` (17px) não existia no Figma e foi removido na v2.6.5. Os textos que o usavam (`.hero__body` e `.case-hero__subtitle`) passaram a `--fs-body-xl` na v2.6.5 e, em seguida, a `--fs-body` na v2.6.6 (decisão de 18/11/2026: o lead de 19px ficou grande demais no hero). Essas duas regras usam Body, não Body lg, de propósito.

### Regras

- **Plus Jakarta Sans**: tudo — display, headlines, body, UI, overlines, labels, métricas, code
- **Label caps é sempre Regular (400).** Não existe variante bold de label: overlines, metadata, números de seção e separadores de fase usam 400, 11px, uppercase, 0.12em. Hierarquia vem de posição, cor e tamanho, não de peso
- **Itálico nunca** — ênfase é feita por peso (bold) ou cor (Âncora), nunca por inclinação
- Métricas (+21%, +12%) sempre em Plus Jakarta Sans 700 com cor Âncora (light) ou Solar (dark), no tamanho `--fs-h2` e line height 1.4. Não existe `--fs-metric`
- Em mobile, Display, H1, H2, H3 e Body xl reduzem via `clamp()`. Body (`--fs-body`), Body sm (`--fs-body-sm`, desde a v2.6.11), Body xs e Label caps são fixos e não reduzem

### Tracking (letter-spacing) — nota do skill `apple-design`

O skill `apple-design` (§15) recomenda tracking específico por tamanho: negativo em display/headlines (letras "respiram" demais quando grandes), positivo em labels pequenas (legibilidade). **A prática já existe no CSS** — `layout.css`/`components.css` usam `letter-spacing: -0.01em` a `-0.02em` em títulos grandes e `0.12em` nas labels uppercase (Label caps do Figma, alinhado em 18/11/2026; antes variava de `0.05em` a `0.14em`). O que falta é formalizar isso como tokens amarrados à escala `--fs-*` (ex.: `--tracking-display`, `--tracking-label-caps`), em vez de repetir o valor em cada seletor.

**Títulos (v2.6.4):** cada título usa o tracking e o line height do estilo do Figma que corresponde ao seu tamanho renderizado: Display -0.02em e 1.1, H1 -0.01em e 1.2, H2 -0.01em e 1.3, H3 0 e 1.4, Metric 1.4. Tracking em código sempre em `em` (-2% é -0.02em, -1% é -0.01em). `.case-lead__text` é o Body xl do Figma (19px, tracking -1%, que no código é -0.01em) e já estava assim. O Body do Figma tem variantes Regular, Medium, SemiBold e Bold, então o peso 500 dessa regra é válido. `.about-bridge__headline` passou a H1 (`--fs-h1`, 1.2, -0.01em) na v2.6.8: 32px em 1024 e 1280px e 26px em 390px (antes 36 e 24px, com -0.02em). A regra órfã `.about-split__quote-text` (citação em itálico) foi removida na v2.6.9, com a aspa decorativa e a atribuição que só existiam para ela. Desde a v2.6.8, `.case-section__body p` não define mais line height: os parágrafos herdam o 1.75 do Body e os componentes mantêm o seu (`.case-lead__text` 1.7, como no Body xl do Figma).

Não formalizado nesta fase — os valores hand-tuned atuais já seguem a régua certa e uma tokenização recolheria ~20 declarações espalhadas em `layout.css` sozinho; vale como item futuro, não como correção de algo errado hoje.

## Layout

Sistema de espaçamento base 4px. Todas as medidas (padding, margin, gap) devem usar tokens de spacing.

### Containers

- Container padrão: 1280px max-width, padding lateral responsivo
- Container de prosa (artigo, case study): 65ch para legibilidade ideal
- Mobile: padding lateral 24px · Tablet: 32px · Desktop: 48px

### Grid

- Cards: grid responsivo com `auto-fill` e `minmax(320px, 1fr)`
- Gap entre cards: `lg` (24px)
- Gap entre seções: `2xl` (48px)
- Gap de página: `4xl` (96px)

### Hierarquia de espaçamento

Use tokens semânticos quando possível:

- `tight` (8px) — itens muito próximos (pills lado a lado)
- `component` (16px) — dentro de um componente
- `element` (24px) — entre elementos da mesma família
- `section` (48px) — entre seções de página
- `page` (96px) — margens grandes

## Content Density

Densidade é decisão funcional, não estética. Define **quanto conteúdo cabe em qual contexto** — e quando algo precisa virar outro tipo de componente.

### Três níveis de densidade

**Comfortable** — densidade padrão para a maior parte da UI.
Espaçamento `lg` (24px) entre elementos. Cards com até 5 elementos principais (overline, título, descrição, tags, métricas + CTA). Body em `body` (16px, line-height 1.75). Usado no portfólio, landing pages, cases.

**Compact** — densidade reduzida para UI funcional densa.
Espaçamento `md` (16px) entre elementos. Listas, tabelas, painéis administrativos, sidebars. Body em `body-sm` (13px, line-height 1.6). Usado em dashboards, ferramentas, plugins.

**Spacious** — densidade ampliada para momentos editoriais.
Espaçamento `2xl` (48px) entre elementos. Hero sections, artigos longos, capas de case study. Body em `body` com tracking ajustado. Usado em quebras conceituais e leitura imersiva.

### Quando trocar de componente

Se você está adicionando o 6º elemento a um card, **provavelmente o card virou outra coisa**. Sinais:

- **Card → Página**: quando precisa de mais de uma seção interna com hierarquia própria. Cards são unidades atômicas, não containers de seções.
- **Card → Modal**: quando o conteúdo é temporário, contextual ou requer foco isolado. Modais quebram fluxo intencionalmente.
- **Card → Lista expandida**: quando há repetição de estrutura para mais de 8 itens. Cards perdem força em grids longos — vira ruído visual.
- **Lista → Tabela**: quando há mais de 3 atributos por item que precisam ser comparados horizontalmente. Listas são para scanning vertical; tabelas para comparação.

### Regras de densidade

- **Nunca misture densidades na mesma seção.** Se um card é Comfortable, todos os cards da seção são Comfortable.
- **Densidade reduz com a importância do conteúdo.** Hero é Spacious. Listagem de cases é Comfortable. Dashboard interno é Compact.
- **Mobile geralmente reduz uma camada.** Spacious no desktop pode virar Comfortable no mobile. Comfortable no desktop pode virar Compact em telas pequenas.
- **Densidade não troca a paleta nem a tipografia** — só espaçamentos e tamanhos de body. Cor, identidade e voz permanecem constantes.

## Elevation & Depth

O sistema é flat por princípio. Sombras existem mas são usadas com parcimônia.

- **Sombra sutil (`sm`):** `0 1px 3px rgba(13, 13, 15, 0.06)` — cards estáticos
- **Sombra média (`md`):** `0 4px 12px rgba(13, 13, 15, 0.08)` — cards em hover, popovers
- **Sombra grande (`lg`):** `0 8px 32px rgba(13, 13, 15, 0.10)` — modais, overlays

Hierarquia de profundidade (z-index):

- Base: 0 · Sticky header: 10 · Modal backdrop: 100 · Modal: 200 · Popover: 300 · Tooltip: 400 · Toast: 500

Hover em cards: borda muda para Âncora + sombra `md`. Sem `transform: translateY` em cards (cria expectativa de drag).

### Materiais (Glassmorphism)

Superfícies de vidro (header, case cards portrait, result cards, metric cards) usam uma receita única — não improvise valores por componente:

| Token | Light | Dark |
|-------|-------|------|
| `--blur-glass` | `blur(24px) saturate(1.5)` | idem |
| `--color-material-bg` | `rgba(255,255,255,.60)` | `rgba(26,26,46,.52)` |
| `--color-material-border` | `rgba(255,255,255,.70)` | `rgba(74,74,96,.32)` |
| `--color-material-border-hover` | `rgba(255,255,255,.85)` | `rgba(245,200,66,.30)` |
| `--color-material-shadow-drop` / `-hover` / `-inset` | ver `tokens.css` | ver `tokens.css` |

Validado contra o skill `apple-design` (§12 — Materials & depth), que a receita já seguia sem ajustes:

- **Chrome translúcido com conteúdo passando por baixo** — o header flutua sobre o conteúdo com blur, não é uma barra opaca de altura fixa. ✓
- **Nunca empilhar vidro claro sobre vidro claro** — case cards, result cards e metric cards nunca se sobrepõem entre si. ✓
- **Superfícies maiores devem ler como mais "grossas"** — o header (superfície pequena) e os cards (superfícies maiores) já usam blur/sombra na mesma família; se um novo componente de vidro maior surgir, dê a ele um blur mais forte e sombra mais profunda que os cards atuais, não a mesma receita.
- **Vibrancy — texto sobre vidro nunca em cinza chapado** — os cards de vidro usam `--color-text-1`/`--color-text-2` (alto contraste), nunca um cinza plano por cima do blur.
- **`prefers-reduced-transparency`** — ver Motion → *Movimento, transparência e acessibilidade*.

## Shapes

Border radius progressivo, do mais fechado ao mais aberto:

- `xs` (4px) — code inline, badges minúsculos
- `sm` (8px) — botões, inputs, chips
- `md` (12px) — cards (padrão)
- `lg` (16px) — modais, painéis grandes
- `xl` (24px) — elementos heroicos
- `pill` (999px) — badges, tags, avatares

Bordas padrão: `0.5px solid {colors.border-base}` — meia espessura para um traço mais editorial.

## Motion

Motion no Hope é **funcional, não decorativo**. Existe para comunicar mudança de estado, dar feedback de ação e guiar atenção — nunca para impressionar.

A regra central: **motion deve fazer a interface parecer mais clara, não mais sofisticada**. Quando uma animação não adiciona compreensão, ela está sobrando.

### Princípios

**Saída rápida, entrada generosa.** Quando algo aparece (modal, tooltip), use `duration-slow` (250ms) — dá tempo para o usuário registrar. Quando algo sai, use `duration-fast` (100ms) — não desperdice atenção em algo que está indo embora.

**Curvas com personalidade, não acidente.** Cinco easings disponíveis:

- **ease-out** (default para tudo): saída suave, decelera. Imita objetos do mundo real chegando ao destino. Use em hovers, entradas, transições de cor.
- **ease-in**: aceleração. Use só em saídas — algo que está deixando a tela.
- **ease-in-out**: simétrico. Use em loops e animações cíclicas (spinners, shimmers).
- **ease-bounce**: leve overshoot. Use **com parcimônia** — só em momentos de celebração (badge Lua aparecendo, conquista desbloqueada).
- **ease-linear**: sem aceleração. Use apenas em progresso contínuo (barra de loading) ou animações cíclicas constantes.

**Quanto mais íntima a interação, mais rápida a resposta.** Click em botão: 100ms. Hover em link: 150ms. Modal abrindo: 250ms. Transição de página: 400ms+. Background atmosférico aparecendo: 600ms.

### Durações

| Token | Valor | Uso |
|-------|-------|-----|
| `duration-instant` | 0ms | Mudanças que não devem ser percebidas |
| `duration-fast` | 100ms | Press, click, saídas, micro-feedback |
| `duration-normal` | 150ms | **Default para hover** (cor, background, border) |
| `duration-slow` | 250ms | Modais, popovers, entrada de elementos |
| `duration-slower` | 400ms | Transições de página, mudanças contextuais grandes |
| `duration-deliberate` | 600ms | Backgrounds atmosféricos, momentos cinemáticos |

Validado contra a Quick Reference do skill `apple-design`: a faixa de spring padrão da Apple (`response 0.3–0.4s`, crítica ou levemente sub-amortecida) cobre exatamente `duration-slow`/`duration-slower`; `duration-deliberate` (600ms) fica deliberadamente acima dessa faixa — reservado para os poucos momentos cinemáticos, nunca para UI rotineira, o que é consistente com a recomendação do skill de usar motion mais longo apenas quando ele "materializa" algo (§12), não como default.

### O que animar — e o que NUNCA animar

**Anime livremente** (performam bem, não causam reflow):

- `color`, `background-color`, `border-color`
- `opacity`
- `transform` (translate, scale, rotate)
- `box-shadow`
- `filter` (blur, brightness)

**Nunca anime** (causam reflow do layout, animação trava):

- `width`, `height`, `min/max-width/height`
- `padding`, `margin`
- `top`, `left`, `right`, `bottom` (use `transform: translate()`)
- `font-size` (re-renderiza texto a cada frame)

Se precisa "animar largura", use `transform: scaleX()`. Se precisa "animar posição", use `transform: translate()`. A regra é: **propriedades que mudam o layout do documento são proibidas; propriedades que só repintam são bem-vindas**.

### Movimento, transparência e acessibilidade

Toda animação **deve respeitar `prefers-reduced-motion`**. Implementação canônica:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Movimento maior que 5px de deslocamento é considerado "movimento real" e deve ser desabilitado em modo reduzido. Mudanças sutis de cor e opacity podem permanecer. Isso não significa "sem feedback nenhum": conforme o skill `apple-design` (§14), reduced motion troca slides/springs/parallax por um cross-fade curto — não remove o feedback, só o modo não-vestibular.

**`prefers-reduced-transparency`** também é respeitado, via os tokens Material (`--color-material-bg/border/border-hover`, `--blur-glass` — ver Elevation & Depth). Em vez de tratar cada superfície de vidro individualmente, o sistema sobrescreve os tokens Material uma única vez:

```css
@media (prefers-reduced-transparency: reduce) {
  :root {
    --blur-glass: none;
    --color-material-bg: var(--color-cloud);
    --color-material-border: var(--color-border-base);
  }
  [data-theme="dark"] {
    --blur-glass: none;
    --color-material-bg: var(--color-night-800);
    --color-material-border: var(--color-night-700);
  }
}
```

Isso "engrossa" toda superfície translúcida (header, case cards, result cards, metric cards) para uma cor sólida e remove o blur, de um único ponto — sem tocar em cada componente. Esse é exatamente o payoff de ter unificado os tokens Material na Fase 4 da migração de código: uma nova regra de acessibilidade vira uma edição em um lugar, não em seis.

### Transições canônicas

O sistema define cinco transições prontas para componentes — não invente novas combinações sem motivo:

- **`transition-hover`**: cor + background + border simultâneos em 150ms ease-out. Use em botões, links, cards.
- **`transition-press`**: transform scale em 100ms ease-out. Use em `:active` de botões.
- **`transition-enter`**: opacity + transform em 250ms ease-out. Use para elementos que aparecem (modal, tooltip).
- **`transition-exit`**: opacity em 100ms ease-in. Use para elementos que somem.
- **`transition-atmospheric`**: opacity em 600ms ease-in-out. Reservada para backgrounds atmosféricos e momentos cinemáticos — uso raro.

### Anti-padrões

✗ Animar para chamar atenção sem motivo funcional ("parallax decorativo", "elementos que pulam ao scroll")
✗ Múltiplas animações simultâneas competindo pela atenção do usuário
✗ Durações longas em interações frequentes (hover de 400ms em um menu = frustração acumulada)
✗ Bounce em UI funcional (inputs, botões padrão) — fica infantil
✗ Animar via JavaScript quando CSS resolve (CSS é mais performático e respeita `prefers-reduced-motion` automaticamente)

## Components

Componentes principais do Hope. Variantes (hover, focus, disabled) são expressas como entradas relacionadas no YAML acima.

### Buttons

Quatro variantes hierárquicas:

- **Primary (Âncora):** CTA principal — "View Case Study", "Enviar mensagem"
- **Solar:** momentos de destaque, celebrações, marcos
- **Secondary:** outline em Âncora, ações alternativas
- **Tertiary:** neutro, ações de menor peso

Estados obrigatórios em todos os botões: `default`, `hover`, `focus-visible` (com ring de focus), `active` (scale 0.98), `disabled` (tokens `bg-disabled`, `text-on-disabled` e `border-disabled`, sem `opacity`; cursor not-allowed). Desde a v2.3 o CSS do site já usa esses tokens.

### Badges

Badges são pequenas, mas comunicam categoria, status ou métrica:

- **Ancora:** categorias técnicas (Product Strategy, Mobile UX)
- **Solar:** destaques especiais, "novo", "Hope Design System"
- **Success/Error/Info:** status semânticos
- **Warning:** alias do badge Solar (decidido em 18/11/2026). Usa os mesmos tokens do Solar, `Accent/Secondary` (`--color-bg-accent-secondary` e `--color-text-accent-secondary`), sem borda. Só existe na documentação: o CSS do site não tem `.badge--warning`, e as páginas usam `.badge--solar`
- **Lua:** marcos raros — celebração de lançamento, conquista

### Card

Card de case study é o componente mais usado no portfólio. Estrutura padrão:

1. Overline (Plus Jakarta Sans, label-caps): "Raízen · 2026"
2. Título (Plus Jakarta Sans, h2 ou h1)
3. Descrição (Plus Jakarta Sans, body)
4. Tags (badges)
5. Métricas (Plus Jakarta Sans bold em Âncora: "+21%")
6. CTA (Primary button)

Hover: borda Âncora + sombra `md`. Sem transform.

### Input

Estados obrigatórios: `default`, `hover` (borda mais escura), `focus-visible` (ring Âncora + box-shadow `ceu`), `disabled`, `error` (borda Marte + ring de erro).

Sempre acompanhado de label visível ou `aria-label`. Helper text e error message em `body-sm`.

## Figma sync v2.3, v2.4 e v2.6 (novembro de 2026)

Esta seção espelha o que mudou no Figma (Hope DS | Foundation e Core Components) e já está refletido em `css/tokens.css`. O histórico completo está em `CHANGELOG.md`.

### Tokens novos

- **Estados disabled:** `bg-disabled`, `text-disabled`, `text-on-disabled`, `border-disabled` e o primitivo `night-500` (#69697E). O estado disabled vem destes tokens, nunca de `opacity`. Migrado no CSS (`.btn:disabled`, `.case-card__action--disabled`).
- **Status:** famílias Warning e Info completas (fundo sólido, fundo soft, texto, texto sobre sólido, borda), mais `text-success`, `text-error`, `border-success` e `border-error`. Fundos sólidos de Warning e Info não mudam entre temas, porque o texto "On" é fixo. A família Warning passou para o Solar na v2.6 (ver abaixo).
- **Scrim:** `bg-scrim` (Light rgba(13,13,15,0.5), Dark rgba(0,0,0,0.65)) para o fundo atrás de modais e drawers. O `Overlay` de vidro (glass) não serve como scrim. Desde a v2.6 existe também `bg-scrim-strong` (88%) para foco em imagem.
- **Correções de contraste (calculadas, WCAG):**
  - Dark, texto e borda de erro: `error-light` (#F28585), 6,88:1 sobre o fundo padrão (antes 2,91:1).
  - Dark, contorno de controle (`border-strong-dark`): `night-500`, 3,19:1 sobre o fundo padrão (antes 1,98:1). Sobre o fundo secundário dá 2,83:1, abaixo de 3:1 (débito conhecido).
  - Light, texto de sucesso: `success-deep` (#2A7347), 5,77:1 sobre branco (antes 3,25:1). Aplicado no `.badge--success`.
  - Light, texto de warning: era `warning-deep` (#94540A, 5,94:1), passou a `dusk` (#8B6914) na v2.6, 4,78:1 sobre Aurora. Dark, texto de info: `info-light` (#B89EDB).
- **Cor de ícone (`--icon-color`):** no Figma, os ícones Phosphor usam uma variável única `Icon/Color` (coleção `Hope · Icon`, 10 modos que apontam para tokens de texto). O modo é definido no contêiner do ícone, nunca na instância. No CSS ainda não há equivalente; os SVGs herdam `currentColor`, então definir `color` no contêiner basta.

### Figma sync v2.6 (13 de novembro de 2026)

- **Warning na família Solar.** Light: fundo `solar` (#F5C842), soft `aurora` (#FEF8E0), texto `dusk` (#8B6914), borda `amber` (#C49A1F), texto sobre Warning `ink`. Dark: fundo `solar`, soft `night-aurora-soft` (#2A2618), texto `solar`, borda `amber`. O laranja #C47A1F fica só como primitivo `Functional/warning`. A borda Amber dá cerca de 2,5:1 sobre Aurora, abaixo de 3:1: trade-off aceito, a borda é decorativa.
- **Scrim Strong.** `bg-scrim-strong` = #0D0D0F a 88%, igual em light e dark, ao lado do `bg-scrim` (50% no light, 65% no dark). O Lightbox usa este token, no lugar de Tinta com 0,88 de opacidade. Era o único uso desse valor.
- **Choque do Trovão = Solar.** A senshi de atenção deixou de ser laranja. Os nomes poéticos (Folha Navalha, Choque do Trovão, Marte, Saturno, Lua) são narrativa de marca, não nomes de token.
- **Tipografia.** Os estilos de texto `Label/label-caps` e `Metric/metric` do Figma migraram de Geist para Plus Jakarta Sans (Display, H1, H2, H3 e body-sm já tinham migrado). O código já usava só Plus Jakarta Sans, então não houve mudança de CSS.
- **Conferência de valores (sem mudança).** Rampa Night (800 a 300) e famílias Functional e derivadas (`success-deep`, `error-light`, `info-light`, `warning-deep`) já existiam em `tokens.css` com os mesmos valores do Figma.

### Componentes novos no Figma (sem CSS ainda)

Formulários: Checkbox, Radio, Switch, Textarea, Select (gatilho fechado). Feedback: Alert, Toast, Tooltip, Progress, Spinner, Skeleton, Empty state. Navegação: Tabs, Breadcrumb, Pagination, Menu. Overlays e dados: Modal, Popover, Avatar, Tag, Accordion.

Entram neste arquivo e no `DESIGN-IMPLEMENTATION.md` quando forem implementados no código (teste 4 do `GOVERNANCE.md`). Table e Card genérico ficam de fora por decisão.

### Nomenclatura dos componentes no Figma

`State=Active` virou `State=Focus` (Input, Textarea, Select); propriedade `Text` virou `Label` (Link, Header Link); `Description` virou `Helper text` (Input, Textarea, Select); `Input Field` virou `Input`; Banner `Type=Warning` virou `Type=Notice`. Regras completas na seção 12 do `GOVERNANCE.md`.

### Divergências conhecidas entre Figma, este arquivo e o código

- **Case Callout e Lightbox:** foram removidos do Figma (sem uso lá), mas **continuam no código e neste arquivo** (`case-callout` em `layout.css`, `lightbox` em `components.css` e `js/lightbox.js`). Decidir: recriar no Figma ou aceitar como componentes só de código.
- **Resolvidas na v2.4:** Highlight Card passou a usar `--fs-h1` (32px) como no Figma; Space Mono foi removida (o `.brand-list li::before` usa `--font-body`); YAML com nomes em inglês (`anchor`, `success`, `border-base`...); entradas de botão refletem o CSS (preto como ação primária, Solar só na marca); badges senshi removidas (duplicavam `badge-success`/`warning`/`error`/`info`).
- **Case Callout e Lightbox:** continuam no código e neste arquivo, mas foram removidos do Figma. Decisão adiada para a revisão geral.
- **Ícones:** `Icon/Color` do Figma virou os tokens `--icon-color-*` e as classes `.icon--<papel>` (ver `DESIGN-IMPLEMENTATION.md`, seção 3b).

## Do's and Don'ts

### ✓ Do

- Use Plus Jakarta Sans para todo o texto — títulos, métricas e corpo
- Combine os dois acentos (Solar e Âncora) com propósito — Solar para esperança, Âncora para estrutura
- Mantenha contraste WCAG AA em todo texto funcional
- Use `:focus-visible` em toda interação por teclado
- Respeite `prefers-reduced-motion` em todas as animações
- Trate o monogram (ícone solar isolado) como mark — funciona sozinho em favicon e avatar
- No YAML, use kebab simples (`case-card-glass`). No CSS, use BEM com `--` (`case-card--glass`). São convenções diferentes para o mesmo componente — YAML não suporta `--` em chaves.

### ✗ Don't

- Não use Lua como cor de texto
- Não combine Solar e Âncora competindo no mesmo elemento
- Não use sombras decorativas, gradientes ou efeitos 3D
- Não anime propriedades que causam reflow (width, height, padding, margin)
- Não use cor como único indicador de estado (erro = cor + ícone + texto)
- Não distorça, espelhe ou recrie o logo — sempre use o SVG oficial

---

**Implementação completa:** ver `DESIGN-IMPLEMENTATION.md` para CSS detalhado, classes utilitárias, estados de loading/empty/error, navegação, mídia, conteúdo editorial e regras de acessibilidade.

**Logos:** `logo-light-mode.svg`, `logo-dark-mode.svg`, `logo-icon.svg` — todos no diretório `/logos`.

*Hope Design System · v2.6.11 · novembro de 2026 · Renan Moura*

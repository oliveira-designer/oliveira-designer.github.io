---
version: v2.20.1
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
  text-tertiary-dark: "#9090A8"
  text-inverse-dark: "{colors.ink}"
  text-on-primary-dark: "{colors.ink}"
  text-on-secondary-dark: "{colors.cloud}"
  text-on-atmospheric-dark: "{colors.cloud}"
  border-dark: "#2E2E40"
  border-strong-dark: "{colors.night-500}"  # v2.3: contorno de controle no dark, 3,19:1 sobre abismo (era #4A4A60, 1,98:1)
  link-dark: "{colors.solar}"
  link-hover-dark: "{colors.night-accent-hover}"  # Figma Night/accent-hover (#FFD96B). Era Daybreak, corrigido na v2.6.14
  focus-ring-dark: "{colors.solar}"
  success-dark: "{colors.success}"
  warning-dark: "{colors.warning}"
  error-dark: "{colors.error}"
  info-dark: "{colors.info}"

  # --- Extras semânticos ---
  bg-neutral-hover-dark: "{colors.border-base}"  # #E2E2E8. Dark mode btn--primary hover surface. Token --color-bg-neutral-hover. Era borda-dark (#E0E0E8), renomeado e corrigido na v2.6.14

  # --- v2.3 (Figma sync, nov/2026): primitivos novos ---
  # Nomes em inglês, como no Figma (Hope · Primitives) e em css/tokens.css.
  # Rampa Night completa (dark mode), valores do Figma Foundation:
  night-800: "#242438"
  night-700: "#2E2E40"
  night-600: "#4A4A60"
  night-500: "#69697E"
  night-400: "#9090A8"
  night-300: "#B4B4C8"
  night-accent-hover: "#FFD96B"  # Figma Night/accent-hover. Link hover no dark
  night-aurora-soft: "#2A2618"  # v2.6: fundo soft do Warning no dark
  night-success-soft: "#162418"
  night-error-soft: "#261616"
  night-warning-soft: "#2A1E10"
  night-info-soft: "#1E182A"
  success-deep: "#2A7347"
  warning-deep: "#94540A"
  error-light: "#F28585"
  info-light: "#B89EDB"

  # --- v2.3 · semânticos novos · Tema LIGHT ---
  bg-disabled-default: "{colors.border-base}"
  text-disabled-default: "#9090A8"
  text-disabled-inverse: "#9090A8"
  border-disabled-default: "{colors.border-base}"
  bg-scrim: "rgba(13, 13, 15, 0.5)"
  bg-scrim-strong: "rgba(13, 13, 15, 0.88)"  # v2.6: usado no Lightbox. Light #0D0D0F a 88%. NO FIGMA o dark é #000000 a 88% (bg-scrim-strong-dark abaixo); o CSS ainda usa o valor light nos dois temas (divergência conhecida, pendente, adiada de propósito)
  # v2.6: Warning na família Solar (decisão de 13/11/2026)
  bg-warning-default: "{colors.solar}"
  bg-warning-secondary: "{colors.aurora}"
  text-warning-default: "{colors.dusk}"
  text-warning-inverse: "{colors.ink}"
  border-warning-default: "{colors.amber}"  # cerca de 2,5:1 sobre Aurora: aceito, a borda é decorativa
  bg-info-default: "{colors.info}"
  bg-info-secondary: "rgba(99, 69, 144, 0.10)"
  text-info-default: "{colors.info}"
  text-info-inverse: "{colors.cloud}"
  border-info-default: "{colors.info}"
  text-positive-default: "{colors.success-deep}"
  text-danger-default: "{colors.error}"
  border-positive-default: "{colors.success}"
  border-danger-default: "{colors.error}"

  # --- v2.3 · semânticos novos · Tema DARK ---
  bg-disabled-default-dark: "#2E2E40"
  text-disabled-default-dark: "{colors.night-500}"
  text-disabled-inverse-dark: "{colors.night-500}"
  border-disabled-default-dark: "#2E2E40"
  bg-scrim-dark: "rgba(0, 0, 0, 0.65)"
  bg-scrim-strong-dark: "rgba(0, 0, 0, 0.88)"  # valor do Figma. Ainda não aplicado no CSS (divergência conhecida, pendente)
  bg-warning-secondary-dark: "{colors.night-aurora-soft}"
  text-warning-default-dark: "{colors.solar}"
  bg-info-secondary-dark: "{colors.night-info-soft}"
  text-info-default-dark: "{colors.info-light}"
  text-positive-default-dark: "{colors.success}"
  text-danger-default-dark: "{colors.error-light}"
  border-danger-default-dark: "{colors.error-light}"

  # --- v2.7.0 (20/11/2026): renomeação semântica do Figma Foundation. Valores Light; Dark conforme o Figma ---
  # Os nomes antigos seguem como alias deprecated em css/tokens.css até uma futura versão MAJOR.
  error-deep: "#7A2020"  # primitivo. Hover do Destructive. Figma Functional/error-deep
  bg-neutral-tertiary: "{colors.night-700}"  # TODO dark mode (igual ao Light por decisão do Figma)
  text-neutral-tertiary: "{colors.night-400}"  # TODO dark mode
  border-neutral-default: "{colors.night-700}"  # TODO dark mode
  border-neutral-strong: "{colors.night-500}"  # TODO dark mode
  bg-neutral-inverse: "{colors.cloud}"
  bg-neutral-inverse-dark: "{colors.ink}"
  text-neutral-inverse: "{colors.ink}"
  text-neutral-inverse-dark: "{colors.cloud}"
  bg-brand-default: "{colors.anchor}"
  bg-brand-default-dark: "{colors.tide}"
  bg-brand-hover: "{colors.deep}"
  bg-brand-hover-dark: "{colors.anchor}"
  bg-brand-tertiary: "rgba(232, 240, 249, 0.40)"  # Sky a 40%. Reservado, nenhum componente usa ainda
  bg-brand-tertiary-dark: "rgba(28, 95, 168, 0.15)"  # Anchor a 15%
  text-brand-inverse: "{colors.cloud}"
  text-brand-inverse-dark: "{colors.ink}"
  bg-accent-default: "{colors.solar}"
  bg-accent-default-dark: "{colors.daybreak}"
  bg-accent-hover: "{colors.amber}"
  bg-accent-hover-dark: "{colors.solar}"
  text-accent-inverse: "{colors.ink}"
  bg-danger-default: "{colors.error}"
  bg-danger-default-dark: "{colors.night-error-soft}"
  bg-danger-hover: "{colors.error-deep}"  # TODO dark mode
  text-danger-inverse: "{colors.cloud}"
  bg-positive-default: "{colors.success}"
  bg-positive-default-dark: "{colors.night-success-soft}"
  text-positive-inverse: "{colors.cloud}"

typography:
  # v2.6.3 (18/11/2026): a escala segue os estilos de texto do Figma Foundation.
  # Os tamanhos abaixo são os do Figma. No código, Display, H1, H2 e Body xl são fluidos (clamp) e chegam a esse valor no máximo.
  # Body xl é o único token de corpo fluido, com os extremos iguais ao Figma (Desktop 19px, Mobile 16px; code syntax var(--fs-body-xl)). Ver a seção de tipografia.
  # Variáveis size/* do Figma (v2.6.13): Mobile igual a Desktop em H3, Body, Body sm, Label e Body xs. Display, H1 e H2 seguem responsivos.
  # H3 (--fs-h3, desde a v2.6.12), Body (--fs-body), Body sm (--fs-body-sm, desde a v2.6.11), Body xs e Label caps são fixos.
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
    letterSpacing: 0.12em  # Figma: 12%. Sempre uppercase, só para rótulos de até 3 palavras (D-46). Classe pronta: .text-label (reset.css)
  body-xs-semibold:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem  # 11px fixo. Figma Body/SemiBold/body-xs semibold. Token --fs-body-xs. Rótulos com mais de 3 palavras, em caixa de frase (D-46). Classe pronta: .text-body-xs-semibold (reset.css)
    fontWeight: 600
    lineHeight: 1.6
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
    # Fluid: clamp(16px, 1.7vw, 19px). Token --fs-body-xl. Use for case lead text. Token fluido documentado: extremos iguais ao Figma (Desktop 19px, Mobile 16px), v2.6.12.
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
    backgroundColor: "{colors.bg-disabled-default}"
    textColor: "{colors.text-disabled-inverse}"
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

**Plus Jakarta Sans** — sans-serif humanista e calorosa. Variable font (peso 200–800), disponível como `PlusJakartaSans-VariableFont_wght.ttf`. Labels técnicas curtas (overline, metadata, até três palavras) usam `text-transform: uppercase` + `letter-spacing: 0.12em` (Label caps do Figma) para simular o registro técnico, sem precisar de uma face monoespaçada. Rótulos mais longos usam a caixa de frase (regra da caixa alta, abaixo).

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
| `body-xl` | Plus Jakarta Sans | Lead (Body xl do Figma, -0.01em): case lead text (`.case-lead__text`), `clamp(16px, 1.7vw, 19px)` (fluido, extremos iguais ao Figma) |
| `body-xs` | Plus Jakarta Sans | Texto mínimo, 11px fixo (`--fs-body-xs`) |
| `label-caps` | Plus Jakarta Sans | Overline, metadata de até 3 palavras (uppercase, 400, 0.12em) |
| `body-xs-semibold` | Plus Jakarta Sans | Rótulo com mais de 3 palavras, em caixa de frase (11px, 600, sem tracking) |
| `metric` | Plus Jakarta Sans | Números, métricas (+21%, +12%), 700 em Âncora/Solar, no tamanho do `--fs-h2` |
| `code` | Plus Jakarta Sans | Code inline e blocks |

### Estilos de texto do Figma (Foundation)

Valores de referência. Nos estilos fluidos o tamanho é o máximo: no código, os tokens `--fs-*` correspondentes usam `clamp()` e chegam a esse valor. H3, Body, Body sm, Body xs e Label caps são fixos.

| Estilo | Tamanho | Line height | Tracking | Peso | Token de tamanho no código |
|--------|---------|-------------|----------|------|----------------------------|
| Display | 52px | 110% | -2% | Bold | `--fs-display` (36 a 52px) |
| H1 | 32px | 120% | -1% | Bold | `--fs-h1` (26 a 32px) |
| H2 | 22px | 130% | -1% | Bold | `--fs-h2` (18 a 22px) |
| H3 | 16px | 140% | 0 | Bold | `--fs-h3` (16px fixo desde a v2.6.12; antes 14 a 16px) |
| Body | 16px | 175% | | | `--fs-body` (16px fixo desde a v2.6.8; antes 14 a 16px) |
| Body xl (`size/lead`) | 19px | 170% | -1% | | `--fs-body-xl` (16 a 19px, fluido, extremos iguais ao Figma) |
| Body sm | 13px | 160% | | | `--fs-body-sm` (13px fixo desde a v2.6.11; antes 12 a 13px) |
| Body xs | 11px | 160% | | | `--fs-body-xs` (11px fixo) |
| Label caps | 11px | 140% | 12%, uppercase | Regular | `--fs-label` (11px fixo) |
| Body xs semibold | 11px | 160% | | SemiBold | `--fs-body-xs` (11px fixo), caixa de frase |
| Metric | 22px | 140% | | Bold | `--fs-h2`, sem token próprio |

**Token fluido documentado (v2.6.12).** `--fs-body-xl` é o **único token de texto de corpo fluido**: `clamp(16px, 1.7vw, 19px)`. O Figma mostra os dois extremos, Desktop 19px e Mobile 16px. O CSS interpola entre os dois: 16px até cerca de 941px de janela, depois cresce (1,7vw) até 19px em cerca de 1118px, e fica em 19px acima disso. Valores intermediários, como 17,408px em 1024px, são esperados e **não são divergência**. Único consumidor: `.case-lead__text` (peso 500, line height 1,7, tracking -0,01em), 8 instâncias nas 3 páginas de case (5 no `dotz`, 1 no `sb-home-redesign`, 2 no `cloud-cost-intelligence`) mais 1 no `dotz backup.html`. Display, H1 e H2 também são fluidos (`clamp()`), mas são títulos e não entram nesta nota. Fixá-lo em 19px traria de volta o lead grande demais no celular, rejeitado para os heróis (v2.6.6). Não é divergência do Figma: os extremos coincidem.

**Variáveis `size/*` do Figma (v2.6.13).** Mobile é igual a Desktop em H3 (16px), Body (16px), Body sm (13px), Label (11px) e Body xs (11px): por isso esses tokens são fixos no CSS. O lead (Body xl, `size/lead`) é Desktop 19px e Mobile 16px, com code syntax `var(--fs-body-xl)`, e o CSS representa os dois modos com `clamp(16px, 1.7vw, 19px)`. Display, H1 e H2 continuam responsivos (valores diferentes por modo no Figma, `clamp()` no CSS). Nada na documentação trata H3, Body, Body sm, Body xs ou Label como fluidos ou divergentes do Figma.

**`--fs-h3` alinhado (v2.6.12).** Agora é 16px fixo, como o Heading/H3 do Figma. A lista de divergências fluidas anterior (v2.6.11) deixa de existir.

**Body lg e Link (Figma, sem token CSS, por decisão).** O Figma tem os estilos de texto Body lg (19px, 170%, sem tracking) e Link (link-xs 11px/160% e link-sm 13px/160%, Regular e Bold). Nenhum tem token CSS, de propósito. O Body xl (-1%) é o estilo que o CSS usa para o lead.

O `--fs-body-lg` (17px) não existia no Figma e foi removido na v2.6.5. Os textos que o usavam (`.hero__body` e `.case-hero__subtitle`) passaram a `--fs-body-xl` na v2.6.5 e, em seguida, a `--fs-body` na v2.6.6 (decisão de 18/11/2026: o lead de 19px ficou grande demais no hero). Essas duas regras usam Body, não Body lg, de propósito.

### Tokens de peso, line height e letter-spacing (v2.17.0)

Peso, line height e letter-spacing são tokens em `css/tokens.css`, na área de tipografia ao lado dos `--fs-*`. Os valores não mudam com o tema. A tabela dos estilos de texto do Figma (lida em 24/11/2026) está em `docs/data/figma-text-styles.json`, e a página de tokens dos docs compara com ela.

| Token | CSS | Figma |
|---|---|---|
| `--fw-regular` | `400` | variável `weight/regular` (estilo "Regular") |
| `--fw-medium` | `500` | variável `weight/medium` (estilo "Medium") |
| `--fw-semibold` | `600` | variável `weight/semibold` (estilo "SemiBold") |
| `--fw-bold` | `700` | variável `weight/bold` (estilo "Bold") |
| `--lh-110` | `1.1` | 110% (Display) |
| `--lh-120` | `1.2` | 120% (Heading/H1) |
| `--lh-130` | `1.3` | 130% (Heading/H2) |
| `--lh-140` | `1.4` | 140% (Heading/H3, Label/label-caps, Metric) |
| `--lh-160` | `1.6` | 160% (Body xs, Body sm, Link xs e Link sm) |
| `--lh-170` | `1.7` | 170% (Body lg, Body xl) |
| `--lh-175` | `1.75` | 175% (Body) |
| `--ls-tighter` | `-0.02em` | -2% (Display) |
| `--ls-tight` | `-0.01em` | -1% (Heading/H1, Heading/H2, Body xl) |
| `--ls-normal` | `0` | 0% (todos os outros) |
| `--ls-widest` | `0.12em` | 12% (Label/label-caps) |

**Conversão de unidades.** O Figma guarda line height e letter-spacing em porcentagem; o CSS usa razão sem unidade no line height (160% é `1.6`) e `em` no letter-spacing (12% é `0.12em`). A comparação da página de tokens converte as unidades antes de decidir se os valores são iguais.

**Nomes.** O peso usa nomes semânticos, como Polaris, Shoelace e Red Hat. O letter-spacing usa uma escada semântica (Tailwind, Polaris, Shoelace); `widest` entra no lugar de `wide` porque 12% passa do maior valor do Tailwind (10%) e os extremos podem crescer sem renomear. O line height é nomeado pelo valor (Polaris e o Codex da Wikimedia fazem assim) porque vários estilos compartilham o mesmo valor e nomes por papel seriam arbitrários. Os prefixos seguem o `--fs-*`.

**Lacuna conhecida (D-48, D-49).** Line height e letter-spacing não são variáveis do Figma porque o Figma lê uma variável numérica ligada a essas propriedades como pixels; os valores canônicos ficam nos estilos de texto. Quando o Figma passar a aceitar porcentagem em variáveis, criar variáveis com estes nomes e ligar os estilos; o CSS continua o mesmo. Só o peso é variável de verdade. A divergência estrutural está registrada em `docs/data/accepted-divergences.json`. O `docs:check` confere que cada token existe com o valor da tabela e que todo `var(--fw-*)`, `var(--lh-*)` e `var(--ls-*)` usado no CSS resolve para um token definido.

#### Densidades documentadas de line height e tracking pequeno (v2.17.1, D-52)

Além dos 160% do Figma, o Body sm e o Body xs têm no código duas densidades documentadas, as duas com tokens que já existem: **compacta** (`--lh-140`, 140%) para texto curto de interface (rótulos, legendas, links, nomes) e **arejada** (`--lh-170`, 170%, o mesmo valor que o Figma já tem para Body lg e Body xl) para texto corrido em cards e listas. O Body de 16px segue o Figma (`--lh-175`). O Figma não foi alterado: cada estilo novo se multiplicaria pelos pesos (cerca de cinco estilos a mais) para uma diferença visual de 2 a 3 px por linha. O texto pequeno de 11px com tracking positivo (`.experience-item__dates`, `.footer__copy` e os logos do showcase) é uma exceção documentada: não é uppercase, então não usa `--ls-widest` (D-46). Quatro regras esperam o auth gate (`.auth-gate__subtitle`, `.auth-gate__error`, `.auth-gate__input` e `.experience-item__logo-mono`): nenhuma página entregue carrega `js/auth.js`, e elas ficam como estão. Todas estão registradas em `docs/data/accepted-divergences.json` (com status "pending" para as do auth gate). Rever quando um componente do Figma precisar desse texto ou quando o auth gate for entregue.

### Regras

- **Plus Jakarta Sans**: tudo — display, headlines, body, UI, overlines, labels, métricas, code
- **Caixa alta (D-46).** Dois estilos de rótulo, e só eles: `Label/label-caps` (11px, Regular 400, line height 140%, 0.12em, uppercase, `--fs-label`) para rótulos de **até três palavras**, e `Body/SemiBold/body-xs semibold` (11px, 600, line height 160%, sem tracking, sem transform) para tudo que passa de três palavras. Siglas e iniciais (HTML, UX, B2B2C) ficam como escritas nos dois. Uma classe vai para a caixa de frase se qualquer texto que ela estiliza tiver mais de três palavras, em qualquer idioma do site (um "&" sozinho conta como palavra, travessão e dois-pontos não). As duas definições ficam em `css/reset.css` (`.text-label`, `.text-body-xs-semibold` e os grupos de seletores), e é o único lugar com `text-transform: uppercase`. Não existem tokens de peso, line height ou tracking: 400, 600, 1.4, 1.6 e 0.12em estão escritos ali, uma vez. Aplicação: `npm run docs:check` falha com `text-transform: uppercase` fora da definição única (CSS, blocos e atributos `style` das páginas) e com texto de mais de três palavras em elemento com o estilo Label no HTML estático do site e dos docs; texto inserido por JavaScript ou por `content` do CSS não é visto, e fica por conta de quem escreve.
- **Label caps é sempre Regular (400).** Não existe variante bold de label: overlines, metadata, números de seção e separadores de fase usam 400, 11px, uppercase, 0.12em. Hierarquia vem de posição, cor e tamanho, não de peso
- **Itálico nunca** — ênfase é feita por peso (bold) ou cor (Âncora), nunca por inclinação
- Métricas (+21%, +12%) sempre em Plus Jakarta Sans 700 com cor Âncora (light) ou Solar (dark), no tamanho `--fs-h2` e line height 1.4. Não existe `--fs-metric`
- Em mobile, Display, H1, H2 e Body xl reduzem via `clamp()`. H3 (`--fs-h3`, desde a v2.6.12), Body (`--fs-body`), Body sm (`--fs-body-sm`, desde a v2.6.11), Body xs e Label caps são fixos e não reduzem

### Tracking (letter-spacing) — nota do skill `apple-design`

O skill `apple-design` (§15) recomenda tracking específico por tamanho: negativo em display/headlines (letras "respiram" demais quando grandes), positivo em labels pequenas (legibilidade). **A prática já existe no CSS** — `layout.css`/`components.css` usam `letter-spacing: -0.01em` a `-0.02em` em títulos grandes e `0.12em` nas labels uppercase (Label caps do Figma, alinhado em 18/11/2026; antes variava de `0.05em` a `0.14em`). O que falta é formalizar isso como tokens amarrados à escala `--fs-*` (ex.: `--tracking-display`, `--tracking-label-caps`), em vez de repetir o valor em cada seletor.

**Títulos (v2.6.4):** cada título usa o tracking e o line height do estilo do Figma que corresponde ao seu tamanho renderizado: Display -0.02em e 1.1, H1 -0.01em e 1.2, H2 -0.01em e 1.3, H3 0 e 1.4, Metric 1.4. Tracking em código sempre em `em` (-2% é -0.02em, -1% é -0.01em). `.case-lead__text` é o Body xl do Figma (19px, tracking -1%, que no código é -0.01em) e já estava assim. O Body do Figma tem variantes Regular, Medium, SemiBold e Bold, então o peso 500 dessa regra é válido. `.about-bridge__headline` passou a H1 (`--fs-h1`, 1.2, -0.01em) na v2.6.8: 32px em 1024 e 1280px e 26px em 390px (antes 36 e 24px, com -0.02em). A regra órfã `.about-split__quote-text` (citação em itálico) foi removida na v2.6.9, com a aspa decorativa e a atribuição que só existiam para ela. Desde a v2.6.8, `.case-section__body p` não define mais line height: os parágrafos herdam o 1.75 do Body e os componentes mantêm o seu (`.case-lead__text` 1.7, como no Body xl do Figma).

Não formalizado nesta fase — os valores hand-tuned atuais já seguem a régua certa e uma tokenização recolheria ~20 declarações espalhadas nos arquivos de `css/site/` sozinhos; vale como item futuro, não como correção de algo errado hoje.

## Layout

Sistema de espaçamento base 4px. Todas as medidas (padding, margin, gap) devem usar tokens de spacing.

### Containers

- Container padrão: 1280px max-width, padding lateral responsivo
- Container de prosa (artigo, case study): 65ch para legibilidade ideal
- Mobile: padding lateral 24px · Tablet: 32px · Desktop: 48px

**Divergência conhecida (decisão do dono, pendente de atualização do Figma).** O Figma tem Layout/container 1040 e Layout/header 1200. O site renderiza o container em `min(1280px, 100% - 160px)` (gutter mínimo de 80px de cada lado) e o `.nav` com a mesma largura: 1206px em 1366px de viewport e 1280px a partir de 1440px. A prosa dos cases usa 68ch (cerca de 796px), no lugar do Layout/reading de 752px; a barra lateral é 240px, igual ao Figma. Os tokens `--layout-*` não existem no CSS. É uma decisão do dono, a ser corrigida no Figma (Layout/*), e **não deve ser reaberta como erro** no próximo relatório de divergência.

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

- Base: 0 · Raised: 1 · Sticky (header do site): 10 · Modal backdrop: 100 · Modal: 200 · Popover: 300 · Tooltip: 400 · Notification (Toast): 500. Detalhes na seção 8 do DESIGN-IMPLEMENTATION.

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

Bordas padrão: `0.8px solid {colors.border-base}` (`--border-thin`, o Stroke/hairline do Figma): um traço fino, mais editorial. Navegadores com Chromium desenham 0,8px como 1px de dispositivo; em telas que honram frações o traço sai mais leve.

### Escala de stroke

Valores do Figma (Stroke/*) e o token CSS equivalente:

| Figma | Valor | Token CSS |
|-------|-------|-----------|
| Stroke/hairline | 0.8px | `--border-thin` |
| Stroke/thin | 1px | `--border-normal` (também usado pelo `--border-strong`) |
| Stroke/medium | 1.5px | sem token CSS ainda |
| Stroke/thick | 2.4px | sem token CSS ainda |
| Stroke/accent | 3px | sem token CSS ainda |

**Deslocamento de nome proposital:** o "thin" do CSS é o "hairline" do Figma. Foi mantido assim para não invalidar as 33 referências existentes a `--border-thin`. A força do `--border-strong` vem da cor (`--color-border-strong`); o Figma não tem uma variável ligando "strong" ao Stroke/medium (1.5px).

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
- **Scrim Strong.** `bg-scrim-strong` = #0D0D0F a 88% no light e **#000000 a 88% no dark** (valor do Figma), ao lado do `bg-scrim` (50% no light, 65% no dark). **Divergência conhecida, pendente:** o `tokens.css` ainda usa #0D0D0F a 88% nos dois temas, adiado de propósito (dark mode fora do escopo desta rodada). O Lightbox usa este token, no lugar de Tinta com 0,88 de opacidade. Era o único uso desse valor.
- **Choque do Trovão = Solar.** A senshi de atenção deixou de ser laranja. Os nomes poéticos (Folha Navalha, Choque do Trovão, Marte, Saturno, Lua) são narrativa de marca, não nomes de token.
- **Tipografia.** Os estilos de texto `Label/label-caps` e `Metric/metric` do Figma migraram de Geist para Plus Jakarta Sans (Display, H1, H2, H3 e body-sm já tinham migrado). O código já usava só Plus Jakarta Sans, então não houve mudança de CSS.
- **Conferência de valores (sem mudança).** Rampa Night (800 a 300) e famílias Functional e derivadas (`success-deep`, `error-light`, `info-light`, `warning-deep`) já existiam em `tokens.css` com os mesmos valores do Figma.

### Componentes novos no Figma (sem CSS ainda)

Feedback: Tooltip, Progress, Spinner, Skeleton. Navegação: Tabs, Breadcrumb, Pagination, Menu. Overlays e dados: Modal, Bottom Sheet, Popover, Avatar, Tag, Accordion.

Entram neste arquivo e no `DESIGN-IMPLEMENTATION.md` quando forem implementados no código, em lotes por família (GOVERNANCE v1.6). O Card genérico fica de fora por decisão. A Table já está no código (v2.8.0).

### Componentes primitivos no código (Lote 0, 2026-11-21)

- **Badge:** cinco estilos, `.badge--neutral`, `.badge--anchor` (Ancora no Figma), `.badge--solar`, `.badge--success` e `.badge--danger`, em `css/components/badge.css`. Success (12%) e Danger (10%) têm opacidades diferentes de propósito (decisão D-32). Danger usa o token `Background/Danger/Secondary`; Success mantém o literal `rgba(74,159,107,0.12)`, igual ao token no Light, e fica como débito no Dark (o token é sólido lá e mudaria o `design-system.html`). Divergência conhecida na base `.badge`: padding 3px 10px, line-height 1.5 e borda Neutral de 0.8px, contra 4 e 12, 160% e 0.5 no Figma (altura 25,5 contra 29). A base é usada nas páginas publicadas, então a correção espera decisão do dono.
- **Link:** `.link` e `.link--small` em `css/components/link.css` (Medium e Small; Default, Hover, Focus e Disabled). Sempre sublinhado, sem ícone. Hover e Focus só passam a negrito (700), o que alarga o texto cerca de 1px. O Disabled é regular (400) nos dois tamanhos e usa `aria-disabled="true"` em âncora sem `href`. Os links do site continuam pela regra global `a` do `css/reset.css`; a classe `.link` é só do componente.
- **Separator:** `.separator` em `css/components/separator.css`. Linha horizontal de 1px em `Border/Default/Default`, largura total do container, decorativa: `<hr class="separator" aria-hidden="true">`. Não existe variante vertical no Figma.

### Formulários no código (Lote 1, 2026-11-23)

- **Input, Textarea e Select:** `css/components/field.css` (o que os três compartilham: `.field`, `.field__label`, `.field__control`, `.field__icon`, `.field__help` e a caixa do controle), mais `input.css`, `textarea.css` e `select.css` (`.input`, `.textarea`, `.select`). Estados: Hover (`:hover`), Focus (`:focus-visible`, anel de 2px com 2px de espaço), Error (`aria-invalid="true"`, borda de 1,5px em Danger, o texto do valor não muda) e Disabled (atributo `disabled`, sem `opacity`). Eixo Value: Empty é o placeholder (ou a opção vazia do Select), Filled é a cor própria do controle. O Select é o `<select>` nativo com `appearance: none` e um CaretDown de 16px; o painel de opções é o do navegador (o Menu não está no código).
- **Checkbox, Radio e Switch:** `checkbox.css`, `radio.css` e `switch.css` (`.checkbox`, `.radio`, `.switch`, com `__input`, `__text`, `__label` e `__help`). Controles nativos com `appearance: none`. O Switch não tem Error. O hover vale com o ponteiro sobre o rótulo inteiro (inferência, o Figma define só no controle).
- **Tokens novos:** `--border-width-medium` (1,5px, Figma Stroke/medium) e `--color-border-input` (Figma Border/Utilities/Input: Night/400 no Light e Night/500 no Dark; o `--color-border` do campo media 1,29:1 e não passava de 3:1).
- **Regra da borda dentro da caixa:** ver `DESIGN-IMPLEMENTATION.md`, seção 5.

### Mensagens no código (Lote 2A, 2026-11-23)

- **Alert:** `css/components/alert.css` (`.alert` com `--info`, `--success`, `--warning` e `--error`, mais `__icon`, `__content`, `__title`, `__description`, `__action` e `__dismiss`). Preenchimento e borda por tipo, ícone de status de 20px na cor do tipo, dismiss de 16px. Error com `role="alert"`, Warning, Info e Success com `role="status"` (regiões vivas anunciam conteúdo inserido dinamicamente). A borda não é descontada do padding: o Figma inclui o traço no layout (105 de altura).
- **Toast:** `toast.css` (`.toast` com `--success`, `--warning`, `--error` e `--info`; Info é o tipo padrão). Mesma borda e fundo em todos os tipos, sombra `--shadow-lg`, camada 500. O tipo vem do glifo e da cor do ícone. A região de posicionamento, o auto-dismiss e o movimento não estão no código.
- **Toast sobre Modal ou Bottom Sheet:** o Toast que aparece com um overlay aberto é só informativo. A camada 500 o deixa visível acima do scrim (200) e o ponteiro o alcança, mas o Tab não chega nele, porque a página fica inerte enquanto o overlay está aberto. Não ponha nele uma ação essencial: ela fica dentro do diálogo. Verificado no navegador: visibilidade, ponteiro e Tab. Não testado: se um leitor de tela anuncia um Toast mostrado sobre um overlay (lacuna `toast-over-overlay-screen-reader`).
- **Banner:** `banner.css`. `.banner` é o Notice do Figma (fundo Accent/Secondary, sem borda). O `.banner--wip` fica como modificador legado do site, para a página de case não mudar.
- **Empty state:** `empty-state.css` (`.empty-state`, `__icon`, `__title`, `__description`), com o Button Primary do Hope como ação. O nível do título é escolha de quem usa.

### Indicadores e dicas no código (Lote 2B, 2026-11-24)

- **Tooltip:** `css/components/tooltip.css` (`.tooltip` com `--top`, `--bottom`, `--left` e `--right`, mais `__bubble` e `__arrow`), `js/tooltip.js` e `js/position.js`. Balão e seta, camada `--z-tooltip`, só texto. Comportamento, só com mouse e foco de teclado (não há comportamento de toque e não há Toggletip): o gatilho tem `data-tooltip-trigger` e `aria-describedby` apontando o tooltip (`role="tooltip"`, escondido com `hidden`). Abre 300 ms depois do hover ou do foco visível e fecha logo que o hover e o foco saem do gatilho e do balão; esses dois valores são decisão de produto do Renan, não vêm de um padrão, e ficam como constantes nomeadas em `js/tooltip.js`. O ponteiro pode ir do gatilho ao balão (uma ponte invisível cobre os 8px), o tooltip fica enquanto houver hover ou foco, sem timeout, e Esc o dispensa sem mover o foco e sem fechar um Modal ou Bottom Sheet que contenha o gatilho (o primeiro Esc fecha só o tooltip, o segundo fecha o diálogo). O toque não mostra nada, então nada essencial pode depender dele. Seta: quando o balão é deslocado para caber, a seta continua apontando para o centro do gatilho (propriedade `--tooltip-arrow-offset` posta pelo `js/position.js`, limitada para não encostar nos cantos arredondados do balão). Não testado: leitor de tela, Firefox, WebKit, toque real.
- **Progress:** `progress.css` (`.progress`, `__header`, `__label`, `__value`, `__bar`, `__fill`, com `.progress__bar--0|25|50|75|100`). É um `div` com `role="progressbar"`, não um `<progress>`: o Firefox não anima o preenchimento do elemento nativo. Outro percentual: custom property `--progress-value`.
- **Spinner:** `spinner.css` (`.spinner`, `__ring`). Anel de 24px com arco de cerca de 99 graus, uma volta por segundo; em `prefers-reduced-motion` vira um pulso de opacidade. `role="status"` com texto visualmente oculto escrito por quem usa.
- **Skeleton:** `skeleton.css` (`.skeleton--text|title|avatar|block`). Pulso de opacidade (duração inferida, o Figma não informa), container com `aria-busy`.
- **Icon Button:** `icon-button.css` (`.icon-btn--primary|ghost`), 44 por 44, `aria-label` obrigatório. Não é modificador de `.btn`: o `.btn` traz padding, gap e largura total abaixo de 768px.
- **Escala de z-index:** ver `DESIGN-IMPLEMENTATION.md`, seção 8.

### Navegação no código (Lote 3, 2026-11-24)

- **Tabs:** `css/components/tabs.css` (`.tabs`, `.tabs__list`, `.tab`, `.tabs__panel`) e `js/tabs.js`. Item de 40px com a linha inferior de 1,5px incluída na altura (o `strokesIncludedInLayout` do Figma é verdadeiro), linha-base de 1px sob a lista, texto Medium também quando selecionado (v2.13.0). `role=tablist`, `tab` e `tabpanel`, tabindex móvel, setas, Home e End, aba desabilitada pulada.
- **Breadcrumb:** `breadcrumb.css` (`.breadcrumb__list`, `__item`, `__link`, `__current`, `__separator`). O anel de foco envolve só o rótulo; o último item não leva separador; a página atual é texto com `aria-current="page"`. Caminho recolhido (v2.15.0): `__ellipsis` é um botão com `aria-haspopup="menu"` que abre o Menu com os níveis escondidos (`__collapse` é o contêiner); o autor decide quais níveis recolher, sem recolhimento automático.
- **Pagination:** `pagination.css` (`.pagination__item`, `--ellipsis`). Itens de 36 por 36 com raio 12, atual com preenchimento escuro e `aria-current="page"`, Prev e Next desabilitados com `aria-disabled` e sem `href`, reticências decorativas.
- **Menu:** `menu.css` (`.menu`, `.menu__item`, `--danger`, `.menu__divider`, `.menu__check`) e `js/menu.js`. Painel com borda incluída no layout (238 = 220 + 16 + 2), `--z-popover`, itens de 36px, opção escolhida com `menuitemradio` e check. O posicionamento é opt-in: o painel com `data-placement` é posicionado pelo `js/position.js`; sem o atributo, continua no fluxo. Tom Danger com os cinco estados (Default, Hover, Focus, Selected, Disabled), 10 variantes no Figma.
- **Atual em três jeitos, de propósito:** Tabs marca com linha inferior e cor do texto, Pagination com preenchimento escuro, Menu com preenchimento claro, SemiBold e check.

### Sobreposições e dados no código (Lote 4, 2026-11-24)

- **Modal:** `css/components/modal.css` (`.modal`, `__header`, `__title`, `__close`, `__body`, `__footer`, `.modal-scrim`) e `js/modal.js`. Painel de 480 com borda incluída no layout (430 de conteúdo), `--shadow-lg`, camadas `--z-modal-scrim` (100) e `--z-modal` (200). Em tela estreita a largura é `min(480px, 100% - 32px)`, o corpo rola e o cabeçalho e o rodapé ficam fixos (v2.13.1). O X segue o Icon Button Ghost (hover com `--color-bg-alt`). `role="dialog"`, `aria-modal`, foco preso, Esc fecha, página inerte, rolagem travada; o clique no scrim não fecha. A parte comum com o Lightbox está em `js/overlay.js`.
- **Bottom Sheet:** `css/components/bottom-sheet.css` (`.bottom-sheet`, `__handle`, `__grabber`, `__content`, `__header`, `__title`, `__body`, `__footer`), `js/bottom-sheet.js` e `js/overlay.js`. Folha ancorada na borda inferior, com a largura da tela, borda de 1px em cima e nas laterais, raio `--radius-lg` só nos cantos de cima, `--shadow-lg`, camada `--z-modal` (200) sobre o mesmo scrim do Modal. O conteúdo é o do Modal (título, corpo, rodapé com dois botões em coluna, o principal em cima); não tem X. Fecha pelo botão secundário, por Esc ou por deslizar para baixo (reforço, nunca o único caminho): arrasto só pelo grabber e pelo título, fecha além de 30% da altura ou por velocidade, `pointercancel` volta ao repouso. O clique no scrim não fecha. Em confirmação destrutiva, `data-bottom-sheet-initial-focus` no Cancelar. Em tela larga use o Modal. Lacunas: `bottom-sheet-non-dismissible`, `bottom-sheet-detents`, `bottom-sheet-action-list`.
- **Popover:** `popover.css` (`.popover-anchor`, `.popover`, `__title`, `__body`) e `js/popover.js`. Painel de 280, `--shadow-md`, `--z-popover`, abre abaixo do gatilho a 8px, sem seta; vira para cima e se alinha ao fim ou se desloca pelo `js/position.js` (ver Posicionamento).
- **Posicionamento (Menu, Popover, painel do Breadcrumb e Tooltip):** um módulo só, `js/position.js`, com a API por atributo `data-placement="top|bottom|left|right"` e `data-align="start|center|end"` (os nomes das posições do Tooltip no Figma). Padrão de Popover, Menu e painel do Breadcrumb: `bottom` mais `start`; o Tooltip fica em `top` centralizado. A distância entre gatilho e painel é `--space-2` (8px) e a margem da borda da viewport é `--space-4`, lidas dos tokens. Colisão: se o lado preferido não cabe e o oposto cabe, inverte; se nenhum cabe, fica no lado com mais espaço; no eixo cruzado inverte o alinhamento (start para end) quando isso resolve e, senão, desloca o painel para dentro. O cálculo roda ao abrir, no resize e na rolagem de qualquer ancestral enquanto aberto, e os listeners saem ao fechar. O foco nunca se move e nenhuma animação é adicionada. O Menu posicionado tem a largura do conteúdo, sem mínimo ligado ao gatilho; o painel do Breadcrumb mantém os 238px e a sua posição em CSS. Sem o script, o CSS dá a posição padrão (abaixo, alinhado ao início). A escala de camadas não muda (Popover e Menu 300, Tooltip 400, Toast 500) e não se usa a camada superior, então um painel nunca cobre um Toast. Não se usa ancoragem nativa em CSS nem a Popover API (suporte não resolvido, e a camada superior ignora `z-index`). Seta do Tooltip: quando o balão é deslocado, a seta continua apontando para o centro do gatilho nas quatro posições. Regra dos diálogos (opção C3, decidida pelo Renan em 25/11/2026): Popover e Menu não são suportados dentro de Modal ou Bottom Sheet, porque estes têm `overflow: hidden` e o painel é cortado (lacuna `position-clipped-in-dialog`, aceita como limitação). Sem portal e sem estratégia `fixed` por enquanto. O gatilho para reabrir a questão é o primeiro caso real de Menu, Popover, combobox ou date picker dentro de um diálogo, e a estratégia `fixed` no `js/position.js` é a opção conhecida. Regra do Tooltip (decisão do Renan em 26/11/2026): o Tooltip não segue o limite dos diálogos, porque inverte e desloca contra o ancestral mais próximo que corta (`overflow`, `overflow-x` ou `overflow-y` diferente de `visible`) cruzado com a viewport, com a mesma margem de `--space-4`, então o balão fica dentro do contêiner e preso ao gatilho. Menu, Popover e o painel do Breadcrumb medem só contra a viewport.
- **Lightbox:** alinhado ao Figma: imagem até 960 com `--shadow-lg`, legenda de 520, blur de fundo `blur(6px)` (o raio do Figma, 12, equivale ao dobro do CSS), botão de fechar de 36 no canto da imagem com os estados do componente `Lightbox close` (Default, Hover, Focus em `--color-border-accent-default`), foco preso e página inerte pelo `js/overlay.js`.
- **Avatar:** `avatar.css` (`.avatar`, `--small`, `--medium`, `--large`, `__image`), 32, 40 e 56.
- **Tag:** `tag.css` (`.tag`, `__label`, `__dismiss`) e `js/tag.js`. Botão de 28 com borda incluída no layout; Delete ou Backspace remove. A borda é `--color-border-input` (como os campos) em Default, Hover e Focus desde a v2.15.0. Sem versão não interativa: use o Badge.
- **Accordion:** `accordion.css` (`.accordion`, `__item`, `__trigger`, `__chevron`, `__panel`) e `js/accordion.js`. Item com só a borda inferior, anel de foco em volta do item inteiro por `:has()`.

### Nomenclatura dos componentes no Figma

`State=Active` virou `State=Focus` (Input, Textarea, Select); propriedade `Text` virou `Label` (Link, Header Link); `Description` virou `Helper text` (Input, Textarea, Select); `Input Field` virou `Input`; Banner `Type=Warning` virou `Type=Notice`. Regras completas na seção 12 do `GOVERNANCE.md`.

### Divergências conhecidas entre Figma, este arquivo e o código

- **Case Callout e Lightbox:** os dois foram recriados no Figma em 13 de novembro de 2026 (GOVERNANCE v1.4.1). O Lightbox foi alinhado ao Figma na v2.13.0 (`css/components/lightbox.css` e `js/lightbox.js`); o Case Callout continua em `css/site/case-callout.css`.
- **Resolvidas na v2.4:** Highlight Card passou a usar `--fs-h1` (32px) como no Figma; Space Mono foi removida (o `.brand-list li::before` usa `--font-body`); YAML com nomes em inglês (`anchor`, `success`, `border-base`...); entradas de botão refletem o CSS (preto como ação primária, Solar só na marca); badges senshi removidas (duplicavam `badge-success`/`warning`/`error`/`info`).
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

*Hope Design System · v2.20.1 · novembro de 2026 · Renan Moura*

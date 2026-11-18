# CHANGELOG.md
# Hope Design System: histórico de mudanças

Formato definido em `GOVERNANCE.md` (seção 3). Este arquivo é o changelog separado previsto lá, para não inflar o `DESIGN.md`. Fica em `portfolio/design-organization`, junto com os demais `.md` do Hope.

---

## v2.6.3 · 18 de novembro de 2026 · Escala tipográfica alinhada ao Figma (docs e código, PATCH)

Decisão de 18/11/2026: a escala tipográfica segue os estilos de texto do Figma Foundation em todo lugar. Display 52px/110%/-2%, H1 32px/120%/-1%, H2 22px/130%/-1%, H3 16px/140%/0 Bold, Body 16px/175%, Body lg (`size/lead`) 19px/170%, Body sm 13px/160%, Body xs 11px/160%, Label caps 11px/140%/12% uppercase Regular, Metric 22px Bold 140% no tamanho `size/h2`.

**Conferido no código, sem mudança**
- Máximos dos tokens: `--fs-display` 52px, `--fs-h1` 32px, `--fs-h2` 22px, `--fs-h3` 16px, `--fs-body` 16px, `--fs-body-sm` 13px, `--fs-body-xl` 19px, `--fs-label` 11px. Display com line height 1,1 e tracking -0,02em, como no Figma.
- Metric: `.metric__value` já usava `--fs-h2`, peso 700 e line height 1,4. Não existe `--fs-metric` e não foi criado.
- `.text-label` (`reset.css`) já era 11px, peso 400, line height 1,4 e 0,12em. É a classe compartilhada de label caps; não foi criada outra.

**Docs**
- `DESIGN.md` v2.6.3: display 3,5rem para 3,25rem (52px), H2 1,5rem para 1,375rem (22px), H3 em Bold, label-caps 500/0,08em para 400/0,12em, metric 1,625rem/line height 1,0 para 1,375rem/1,4 no tamanho do H2, Body xs adicionado, `body-lg` com line height 1,7 (como no CSS), tabela com os estilos de texto do Figma.
- `DESIGN-IMPLEMENTATION.md` v2.6.3: tabela e bloco `clamp` iguais ao `tokens.css` (display 36 a 52px, H2 18 a 22px), `--fs-metric` removido, `.text-label` e `.text-metric` corrigidos, CSS de exemplo das labels uppercase em 0,12em.
- `hope-demo.html` e `design-system.html` mostram os valores corrigidos. A demo usa as classes reais `.text-label` e `.metric__value`.

**Código (só tracking, para 0,12em)**
- 0,1em para 0,12em: `.case-card__eyebrow`, `.persona__meta dt`, `.case-hero__meta dt`, `.case-callout__attribution`, `.about-split__attribution`.
- 0,14em para 0,12em: `.case-phase-break__label` (fica mais apertado).
- 0,08em para 0,12em: `.badge--draft`.
- 0,05em para 0,12em: `.header__status-badge`, em commit separado. No `components.css` ele tem `display: none`, então não aparece nas páginas; só muda o trecho de CSS mostrado em `design-system.html`.
- Já estavam em 0,12em e não mudaram: `.text-label`, `.section__overline`, `.hero__overline`, `.case-hero__overline`, `.about-block__label`, `.case-toc__label`, `.team-section__title`, `.logo-strip__label`, `.case-section__number`, `.persona__section-title`, `.persona__quotes-label`, `.cs-figure--slot`.

**Débitos abertos (diferenças de código contra o Figma, aguardam decisão)**
- `.text-h3` (`reset.css`) usa peso 600. O Figma é Bold. Os docs já dizem 700.
- `--fs-body-lg` (15 a 17px, usado em `.hero__body` e `.case-hero__subtitle`) não existe no Figma. O Body lg do Figma (19px) é o `--fs-body-xl` do código. Decidir: manter, renomear ou migrar os dois usos.
- Body xs (11px, 160%) não tem token `--fs-*`. `--fs-label` vai de 10 a 11px, e o Figma é fixo em 11px.
- Tracking de títulos: `.footer__heading`, `.case-hero__title` e `.case-callout__text` (tamanho H1) e `.case-card--glass .case-card__title` (tamanho H2) usam -0,02em. O Figma é -1% (-0,01em).
- Line height de títulos: `.footer__heading` 1,15 e `.case-callout__text` 1,25 (H1 do Figma é 1,2); `.case-card__title` 1,2, `.case-section__title` 1,25 e `.skill-card--metric .metric-value` 1,1 (H2 do Figma é 1,3; Metric é 1,4).
- Peso das labels uppercase: `.case-card__eyebrow` 500, `.case-phase-break__label` 700 e `.header__status-badge` 600 em 10px. O Label caps do Figma é Regular.
- Fora do padrão label caps por não serem uppercase, mantidos: `.experience-item__dates` (0,08em), `.footer__copy` (0,06em) e `.experience-item__logo-mono` (0,05em).

---

## v2.6.2 · 18 de novembro de 2026 · Badge Warning como alias do Solar (docs, PATCH)

- Decisão de 18/11/2026: o `.badge--warning` segue o badge Solar exatamente, com os mesmos tokens (`Accent/Secondary`: `--color-bg-accent-secondary` e `--color-text-accent-secondary`, sem borda). Não há token novo.
- `DESIGN.md` v2.6.2: `badge-warning` no YAML aponta para Aurora e Crepúsculo, como o `badge-solar`; texto sobre os badges escurecidos sem o #6B3F0A; seção Badges explica o alias.
- `DESIGN-IMPLEMENTATION.md` v2.6.2: `.badge--warning` agrupado com `.badge--solar` (alias, só na documentação), no lugar dos tons de laranja (#FAEDD8, #6B3F0A, #E8B775). O bloco de `.badge--solar` passou a espelhar o `components.css` (tokens, sem borda).
- Sem mudança em `css/`: nenhuma página do site usa `.badge--warning`, então a classe não foi criada no CSS.
- `hope-demo.html` regenerado em 18/11/2026 como demo derivada do v2.6.2: liga os `css/tokens.css`, `css/reset.css` e `css/components.css` reais, usa só Plus Jakarta Sans (fonte local de `fonts/`) e lê os valores dos tokens ao carregar. Mostra primitivos, status, o conjunto Warning na família Solar, Scrim e Scrim Strong, a escala tipográfica e só os componentes que existem no CSS (Button, Badge com o alias Warning, Banner, ícones, cards, Lightbox). O que não tem CSS (Alert, Input, Badge error, info e lua e outros) está listado em "Figma only". Só tema claro, sem alternador de tema.

---

## v2.6.1 · novembro de 2026 · Correção de texto sobre Case Callout e Lightbox (docs, PATCH)

- `GOVERNANCE.md` v1.4.1 (seção 12.6) e `PATTERNS.md` v1.1.1: a frase que dizia que Case Callout e Lightbox foram removidos do Figma foi corrigida. Decisão de 13 de novembro de 2026: os dois foram recriados porque o site os usa. Case Callout em Hope DS | Portfolio Components; Lightbox em Hope DS | Core Components, página `└ Lightbox`, com o token Scrim Strong. O Highlight Card legacy segue removido.
- Sem mudança em código nem em tokens.

---

## v2.6 · 13 de novembro de 2026 · Warning na família Solar e Scrim Strong (Figma, código e docs)

Espelhamento no código e nos docs das mudanças do Figma Foundation de 13/11/2026 (MINOR).

**Figma (Hope DS | Foundation)**
- Warning passa para a família Solar. Light: `Background/Warning/Default` Solar #F5C842, `Background/Warning/Soft` Aurora #FEF8E0, `Text/Warning/Secondary` Dusk #8B6914, `Border/Warning/Default` Amber #C49A1F, `Text/Warning/On Warning` Ink. Dark: Default Solar, Soft `Night/aurora-soft` #2A2618, texto Solar, borda Amber.
- O laranja #C47A1F fica só como primitivo `Functional/warning` (cor de status da marca), não é mais a cor do componente Warning.
- Trade-off aceito: a borda Amber dá cerca de 2,5:1 sobre Aurora, abaixo de 3:1. A borda é decorativa.
- Novo token `Background/Utilities/Scrim Strong`: #0D0D0F a 88%, igual em light e dark. O Scrim existente segue em 50% (light) e 65% (dark).
- Choque do Trovão (senshi de atenção) passa de #E89A3D para Solar #F5C842. Os nomes poéticos são narrativa de marca, não nomes de token.
- Estilos `Label/label-caps` e `Metric/metric` migram de Geist para Plus Jakarta Sans (Display, H1, H2, H3 e body-sm já tinham migrado).

**Código (`css/`)**
- `tokens.css`: `--color-bg-warning` Solar, `--color-bg-warning-soft` Aurora, `--color-text-warning` Dusk, `--color-border-warning` Amber; no dark, `--color-bg-warning-soft` passa a `--color-night-aurora-soft` e `--color-text-warning` a Solar. `--color-warning` e `--color-warning-deep` ficam como primitivos.
- `tokens.css`: novo `--color-bg-scrim-strong` (rgba(13, 13, 15, 0.88)).
- `components.css`: `.lightbox__backdrop` usa `--color-bg-scrim-strong` no lugar de `rgba(13, 13, 15, 0.88)` escrito à mão. Era o único uso desse valor.
- Sem mudança visual no site: nenhum componente consome os tokens de Warning (só `.icon--warning`, sem uso nas páginas), e o `.banner--wip` já usava Aurora, Dusk e Amber. O Lightbox fica visualmente igual.
- Conferido, sem mudança: nenhum Geist, Space Mono ou `--font-mono` nos CSS escritos à mão; Rampa Night (800 a 300) e Functional/derivadas já batiam com o Figma.

**Documentação**
- `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` v2.6: YAML e CSS de Warning e scrim, rampa Night completa no YAML, seção "Figma sync v2.6", Choque do Trovão igual ao Solar.
- Regra de uso do Solar reescrita (decidida em 13/11/2026): acento da marca e do logo, e também permitido em elementos Warning, no Banner e no Solar Badge. Substitui "Solar só na marca/logo".
- Contraste na família Solar documentado: Tinta sobre Solar 12,2:1 (o texto anterior dizia 11,5:1), Crepúsculo sobre Aurora 4,78:1, Crepúsculo sobre Solar 3,2:1 (não usar como texto).

**Débitos que seguem abertos**
- ~~Lightbox usa Neutral/ink a 88% e não o token Scrim.~~ Resolvido nesta versão com `Scrim Strong`.
- ~~O `badge-warning` do `DESIGN.md` e o `.badge--warning` do `DESIGN-IMPLEMENTATION.md` seguem em tons de laranja (#FAEDD8, #6B3F0A, #E8B775). Não há CSS equivalente no site. Decidir se o Badge Warning também vai para a família Solar.~~ Resolvido em 18 de novembro de 2026 (v2.6.2): alias do Badge Solar.
- Scrim escuro: o `tokens.css` usa rgba(0, 0, 0, 0.65) (como o CHANGELOG v2.2). Confirmar no Figma se o valor é esse ou #0D0D0F a 65%.
- `.banner--wip` no dark usa `--color-daybreak` como texto; o novo `--color-text-warning` no dark é Solar. Migrar o Banner para os tokens de Warning muda essa cor no dark.
- `--fs-metric` está documentado no `DESIGN-IMPLEMENTATION.md` mas não existe em `tokens.css` (nenhum CSS o usa).
- `css/output.css` (gerado pelo Tailwind) traz a pilha monoespaçada padrão do Tailwind no preflight de `code, kbd, samp, pre`. Nenhuma página a usa (as classes do site definem `--font-body`), e o arquivo está defasado em relação a `tailwind.css`, então não foi regenerado.
- ~~`design-organization/hope-demo.html` segue com Instrument Serif, Space Mono e o laranja como Choque do Trovão (demo da v1, fora do escopo).~~ Resolvido em 18 de novembro de 2026 (v2.6.2): demo regenerada.

---

## v2.5 (Figma) · novembro de 2026 · Separação da biblioteca de portfólio

Escopo desta entrada: **Figma**. Sem mudança em código.

- Novo arquivo **Hope DS | Portfolio Components**, com os 19 componentes do portfólio mais Greeting Badge (22 componentes locais, contando Header Link e Side Navigation Item). Consome Foundation, Core Components, Phosphor Icons e Helper Components.
- Decisão de escopo revista: a entrada v2.2 abaixo mantinha os padrões do portfólio no Core. Passam a morar no arquivo próprio, para não poluir o Core ao trabalhar em outros produtos. Banner e Icon Button ficam no Core.
- Conferido na migração: tamanhos iguais aos originais, instâncias aninhadas religadas aos componentes locais, 270 de 278 preenchimentos sólidos ligados a variáveis do Foundation (as outras 8 são invisíveis ou vetores do logo), imagens preservadas.
- Páginas renomeadas nos dois arquivos: seção com prefixo `📁 ` (nomes em inglês) e componentes com prefixo `└ ` (regra em `GOVERNANCE.md`, seção 12.7). Os emojis de status (✅) saíram do nome das páginas.
- Arquivo de design **Portfolio** religado em 13 de novembro de 2026: 168 instâncias de nível superior (Desktop V1 e Archive V2) trocadas dos componentes do Core pelos da biblioteca nova. Teste prévio em clones (tamanho, textos e valores de propriedade iguais) e nenhuma instância antiga restante. Os componentes aninhados vieram junto, porque cada componente novo já usa os irmãos locais.
- Removidos do **Core**: a página temporária `_EXPORT-PORTFOLIO`, a seção Portfolio patterns com as 19 páginas de componente e o Greeting Badge da página Badge. Antes, conferido que nenhum outro componente do Core usava esses componentes.
- Nomes de seção do Core traduzidos para inglês (Primitives, Forms, Feedback, Navigation, Overlays and data).
- Decisão de 13 de novembro de 2026: **Case Callout** e **Lightbox** voltam ao Figma, porque os dois estão em uso no site (Lightbox em toda imagem de `.case-section`, nos 4 cases; Case Callout em Dotz e Cloud Cost Intelligence). Case Callout entra no Portfolio Components (página `└ Case Callout`, propriedades Quote, Attribution e Show attribution). Lightbox entra no Core (página `└ Lightbox`, em Overlays and data; propriedades Caption e Show caption). O marca-texto Solar do Case Callout segue só no código (`.text-highlight`). O fundo do Lightbox usa Neutral/ink a 88% com blur de 12px, como o CSS, e não o token Scrim (50% no Light), porque a imagem é o foco; se isso virar regra, vale criar um token de scrim forte no Foundation.
- Pendente, a cargo de Renan: publicar o Portfolio Components e o Core de novo para os dois componentes ficarem disponíveis nas bibliotecas.
- Confirmado por Renan em 13 de novembro de 2026: Core republicado, biblioteca atualizada no arquivo Portfolio, sem atualização pendente nem instância desligada.
- Documento `claude/REVISAO-GERAL-2026-11.md` arquivado e removido do projeto em 13 de novembro de 2026. O histórico da revisão está nas entradas v2.2 e v2.5; os débitos abertos estão na entrada v2.4 e em "Débitos conhecidos do Figma".

---

## v2.4 · novembro de 2026 · Nomes em inglês, tipografia única e ícones (código e docs)

Espelhamento do Figma v2.2/v2.3 no código e na documentação, mais as decisões de limpeza de 12/11/2026.

**Código (`css/`, `index.html`, `design-system.html`)**
- `tokens.css`: novos primitivos (`--color-night-500`, `--color-night-warning-soft`, `--color-night-info-soft`, `--color-success-deep`, `--color-warning-deep`, `--color-error-light`, `--color-info-light`); semânticos de disabled, scrim, Warning, Info, `--color-text-success`, `--color-text-error`, `--color-border-success`, `--color-border-error` (com overrides no dark); `--color-border-strong` no dark passou a `--color-night-500`.
- `tokens.css`: tokens `--icon-color-*` (equivalente do `Icon/Color` do Figma) e classes `.icon--<papel>` em `components.css`.
- Disabled sem `opacity` (`.btn:disabled`, `.case-card__action--disabled`); pendência nº 20 concluída.
- `.highlight-card h3` usa `--fs-h1` (32px), como no Figma.
- Space Mono removida (o `@import` e o `.brand-list li::before`, que agora usa `--font-body`).
- Classes em inglês: `.badge--ancora` virou `.badge--anchor`; `.text-ancora` virou `.text-anchor`.

**Documentação**
- `DESIGN.md` v2.4: YAML com nomes em inglês (`anchor`, `daybreak`, `border-base`, `success`, `error`...), botões descritos como no CSS (preto é a ação primária; Solar só na marca), badges senshi removidas (duplicavam `badge-success`, `warning`, `error`, `info`).
- `DESIGN-IMPLEMENTATION.md` v2.4: seção de tipografia reescrita para uma única família (Plus Jakarta Sans), tokens e classes em inglês, seção 3b com os tokens de ícone.
- `GOVERNANCE.md` v1.3 (seção 12, convenções do Figma) e `PATTERNS.md` v1.1.
- Não existe mais `--font-mono`. Nenhum documento cita outra família além da Plus Jakarta Sans.

**Débitos que seguem abertos**
- ~~Case Callout e Lightbox: removidos do Figma, ativos no código.~~ Resolvido em 13 de novembro de 2026 (v2.5): recriados no Figma.
- Brandbook (PDF): incluir `Night/500`, famílias de status, scrim, `error-light`, `success-deep` e os nomes em inglês. Será refeito no Figma, em arquivo próprio (a fazer depois).
- Componentes novos do Figma (Alert, Toast, Modal, Tabs etc.) ainda sem CSS; entram quando houver uso.
- Verificar visualmente `.btn:disabled` e o dark mode (oculto no site) depois de subir o código.

---

## v2.2 (Figma) · novembro de 2026 · Expansão do sistema (MINOR)

Escopo desta entrada: **Figma** (Hope DS | Foundation, Hope DS | Core Components, Hope DS | Helper Components e a biblioteca de ícones Phosphor).

### Decisão de escopo

- Renan decidiu ampliar o Hope além do portfólio, para servir a novos sistemas, aplicações futuras e cases práticos de entrevista. Ponto de partida: análise de 9 design systems de referência (Untitled UI, Animalia, Material 3, Carbon, Ant Design, Primer, Pajamas, Flowbite, shadcn). O Ant Design foi lido pela documentação pública, porque o arquivo do Figma não estava acessível.
- Efeito sobre o teste 4 de `GOVERNANCE.md` (seção 9, "projeto real hoje"): os primitivos genéricos de UI desta versão entram considerando esses usos como o projeto. Os demais testes (cobertura do existente, diferença visual vs comportamental, reuso real) continuam valendo. Revisar o texto do `GOVERNANCE.md` na revisão anual.
- Table e Card genérico ficam de fora por decisão de Renan: o Hope já tem vários cards definidos.

### Foundation (Figma)

**Estados disabled**
- Adicionado: primitivo `Night/500` (#69697E, texto, ícone e traço desabilitados no tema escuro).
- Adicionado: `Background/Disabled/Default`, `Text/Disabled/Default`, `Text/Disabled/On Disabled` e `Border/Disabled/Default`, nos modos Light, Dark e SigmaMD. SigmaMD replica os valores de Light por enquanto; a remoção do modo fica para decisão futura de Renan.
- Regra: o estado disabled vem destes tokens, não de `opacity`. Ícones usam `Text/Disabled` (modo Disabled da coleção `Hope · Icon`).
- Code syntax WEB: `--color-bg-disabled`, `--color-text-disabled`, `--color-text-on-disabled`, `--color-border-disabled`, `--color-night-500`.

**Tokens de status**
- Adicionado: família Warning (`Background/Warning/Default`, `Background/Warning/Soft`, `Text/Warning/Secondary`, `Text/Warning/On Warning`, `Border/Warning/Default`).
- Adicionado: família Info, com os mesmos cinco papéis.
- Adicionado: `Border/Positive/Default` e `Border/Danger/Default`, que completam a família de borda de status.
- Adicionado: primitivos `Functional/warning-deep`, `Functional/info-light`, `Night/warning-soft`, `Night/info-soft`.
- Contraste (WCAG 1.4.3, calculado): `Functional/warning` sozinho dá 3,4:1 sobre branco, então o texto de warning no Light usa `warning-deep` (5,9:1). `Functional/info` no Dark dá 2,3:1 sobre `Anchor/abyss`, então usa `info-light` (7,3:1). O texto sobre warning sólido é `Neutral/ink` (5,7:1), porque o branco dá só 3,4:1.
- Decisão: fundos sólidos de Warning e Info mantêm a mesma cor nos dois temas, porque o texto "On" é fixo.
- Code syntax WEB: `--color-bg-warning`, `--color-bg-warning-soft`, `--color-text-warning`, `--color-text-on-warning`, `--color-border-warning` (idem para info), `--color-border-success`, `--color-border-error`.

**Token de scrim**
- Adicionado: `Background/Utilities/Scrim` (Light rgba(13,13,15,0.5), Dark rgba(0,0,0,0.65), SigmaMD igual ao Light), code syntax `--color-bg-scrim`. Fundo escuro atrás de modais e drawers.
- Correção de decisão anterior: `Background/Utilities/Overlay` não basta como scrim. No Light ele é branco a 45% (véu de vidro) e não escurece nada. Overlay continua existindo, para o efeito de vidro.

**Correções de contraste no tema Dark**
- Adicionado: primitivo `Functional/error-light`.
- Alterado (Dark): `Text/Danger/Secondary` e `Border/Danger/Default` apontam para `Functional/error-light`. Contraste do texto de erro subiu de 2,91:1 para 6,88:1.
- Alterado (Dark): `Border/Default/Strong` aponta para `Night/500`. Contorno de controle subiu de 1,98:1 para 3,19:1 sobre `Background/Default/Default` (mínimo de 3:1 da WCAG 1.4.11). Sobre `Background/Default/Secondary` o valor é 2,83:1, abaixo do mínimo.

**Contraste do texto de sucesso (Light)**
- Adicionado: primitivo `Functional/success-deep` (#2A7347), code syntax `--color-success-deep`.
- Alterado (Light): `Text/Positive/Secondary` aponta para `Functional/success-deep` (antes `Functional/success`, 3,25:1 sobre branco). Novo contraste: 5,77:1 sobre branco e 4,79:1 sobre o fundo do Badge Success. O Dark continua com `Functional/success` (5,25:1). O modo SigmaMD não foi alterado (#3F9142).
- Efeito: o modo Positive de `Icon/Color` aponta para este token, então os ícones de sucesso também escurecem no Light. O texto do Badge Success passou a usar o token semântico.

**Coleção `Hope · Icon` (resolve a cor dos ícones ao trocar)**
- Problema: ao trocar o ícone de uma instância, as cores sobrescritas por vetor não seguiam o componente.
- Adicionado: coleção `Hope · Icon` com a variável `Icon/Color` (code syntax `--icon-color`) e 10 modos (Default, Secondary, Tertiary, On Neutral, Brand Hover, Disabled, Danger, Positive, Warning, Info), cada um com alias para um token semântico de texto.
- Limite do plano: 10 modos por coleção (Professional). Um modo novo exige consolidar um existente.
- Regra de uso: o modo explícito é definido no contêiner do ícone (raiz da variante ou frame `icon-slot`), nunca na instância do ícone, porque o modo definido na instância se perde na troca.

### Phosphor (biblioteca de ícones)

- Alterado: todos os vetores dos ícones (1.512 conjuntos, 12 variantes cada) passam a usar `Icon/Color`. Amostra de 1.824 componentes sem resíduo.
- Para inserir ou trocar um ícone em um componente novo, basta o contêiner ter o modo de `Icon/Color` certo.

### Core Components (Figma)

**Formulários:** Checkbox (Unchecked, Checked, Indeterminate), Radio, Switch (sem Error), Textarea (derivado do Input) e Select (só o gatilho; o painel usa o Menu). Tamanho único. Contorno em repouso usa `Border/Default/Strong` (WCAG 1.4.11). Não foi criado o componente Field: o Input já traz label, campo e texto de ajuda.

**Feedback:** Alert (Info, Success, Warning, Error), Toast (separado do Alert, z-index 500), Tooltip (4 placements, z-index 400), Progress, Spinner, Skeleton e Empty state (ícone Phosphor, sem ilustração).

**Navegação:** Tabs (item Tab), Breadcrumb, Pagination e Menu (item Default/Danger e painel).

**Overlays e dados:** Modal (480px, scrim, z-index 100/200), Popover (z-index 300), Avatar (3 tamanhos), Tag (interativa, diferente do Badge), Accordion. Valores de z-index seguem `DESIGN-IMPLEMENTATION.md`.

**Componentes alterados**
- Input, Textarea e Select: foco usa o focus ring e nasce o estado Hover. Input em erro usa `Border/Danger/Default`.
- **BREAKING:** `State=Active` virou `State=Focus` em Input, Textarea e Select (ordem: Default, Hover, Focus, Error, Disabled).
- Ícones: overrides de cor por vetor removidos; o modo de `Icon/Color` fica na raiz de cada variante (80) ou num frame `icon-slot` (16).
- Banner: usa o estilo do Badge Solar (`Background/Accent/Secondary`, `Text/Accent/Secondary`, sem borda). O eixo `Type` passou de `Warning` para `Notice`.

**Limpeza da revisão geral (12 de novembro de 2026)**
- **BREAKING (propriedades):** `Text` virou `Label` em Link e Header Link; `Description` virou `Helper text` em Input, Textarea e Select. O conjunto `Input Field` passou a se chamar `Input`. Regra completa na seção 12 do `GOVERNANCE.md` (v1.3).
- **BREAKING (variante):** Banner `Type=Warning` virou `Type=Notice`.
- Highlight Card (value) passou a usar `Heading/H1` (Plus Jakarta Sans, line-height 120%); Metric usa `Heading/H2`.
- Icon Button: variantes 44x44 exatos, padding em `space-none`. Button: padding vertical 12px ligado a `space-3`.
- Gaps de 10px (27 nós) ligados a `space-2`; Header, Footer e Logo Strip com gaps ligados a tokens. Exceção mantida: gap de 2px entre linhas de metadado (Work Experience Item e Case Hero).
- Estilos de texto ligados em Footer, About Bridge e Persona.
- Button Destructive: ícones ligados às propriedades `Icon L` e `Icon R`.
- 16 ícones desatualizados no arquivo foram trocados pelas versões atuais (136 instâncias); 42 overrides residuais realinhados.
- Descrições de componente preenchidas ou corrigidas (Icon Button, Link, Greeting Badge, Separator, Checkbox, Radio, Switch, Banner, Header Link, Footer, Side Navigation Item, Button, Input, Badge, Modal).
- **Removido:** a seção "Em revisão" (Highlight Card legacy, Case Callout, Lightbox). Se algum voltar, passa pelos quatro testes da seção 9 do `GOVERNANCE.md`.

**Organização:** páginas-divisória (Primitives, Forms, Feedback, Navigation, Overlays and data, Portfolio patterns; nomes traduzidos para inglês em 13 de novembro de 2026). Padrão de documentação (painel Info + specimen) aplicado a todas as páginas ✅ do Core; o Info é um componente no arquivo Hope DS | Helper Components.

### Débitos conhecidos do Figma

- Contorno de controle no Dark sobre fundo secundário: `Border/Default/Strong` dá 2,83:1 sobre `Background/Default/Secondary`.
- Modo SigmaMD de `Text/Positive/Secondary` mantém valor próprio (#3F9142). Decidir junto com a remoção do modo SigmaMD.
- `Hope · Icon` está no limite de 10 modos.
- Banner com eixo de valor único (`Notice`): remover o eixo se não surgir um segundo tipo (regra 12.2 do `GOVERNANCE.md`).
- Select sem variante aberta e Menu item sem ícone à esquerda: só entram quando houver uso.
- Table e Card genérico: adiados por decisão de Renan.
- ~~Lightbox usa Neutral/ink a 88% e não o token Scrim: decidir se vale criar um token de scrim forte no Foundation.~~ Resolvido em 13 de novembro de 2026 (v2.6): token `Scrim Strong`.
- Confirmar que o Foundation com `Functional/success-deep` foi publicado (a revisão geral deixou isso como passo de publicação).

---

*Hope Design System · CHANGELOG.md · v2.6.3 · novembro de 2026 · Renan Moura*

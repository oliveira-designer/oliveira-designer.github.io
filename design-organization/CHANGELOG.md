# CHANGELOG.md
# Hope Design System: histórico de mudanças

Formato definido em `GOVERNANCE.md` (seção 3). Este arquivo é o changelog separado previsto lá, para não inflar o `DESIGN.md`. Fica em `portfolio/design-organization`, junto com os demais `.md` do Hope.

---

## v2.15.0 · 24 de novembro de 2026 · Breadcrumb com Ellipsis, borda do Tag no token do campo e demos dos docs em inglês (MINOR)

**Versão escolhida: MINOR (2.14.0 para 2.15.0).** Regra aplicada: seção 3 do `GOVERNANCE.md` (v1.7), MINOR cobre "Expansão de escala (mais tamanhos, mais variantes)". O set `Breadcrumb item` do Figma Core passou de 4 para 7 variantes (`Type=Ellipsis`, `Ellipsis Hover` e `Ellipsis Focus`) e o inventário passa de 202 para 205 variantes com CSS (a contagem de 205 foi conferida no Figma Core). O ajuste da borda do Tag é "Ajuste de valor" (PATCH) e entra no mesmo release; vale a classificação mais alta. Não entra componente novo e não entra token novo. A 2.14.0 segue como MINOR em `main`.

**Alterado**
- `css/components/tag.css`: a borda do Tag passa de `--color-border` (`Border/Default/Default`) para `--color-border-input` (`Border/Utilities/Input`) em Default, Hover e Focus (D-45), porque o Tag é interativo. O Disabled mantém `--color-border-disabled-default`. A fonte é o Figma Core, set `Tag` (`2413:839`): os traços de Default, Hover e Focus estão ligados a `Border/Utilities/Input` e o de Disabled a `Border/Disabled/Default`, todos com `strokesIncludedInLayout` verdadeiro. Contraste medido no navegador: 3,12 (Light) e 3,19 (Dark) contra a página, que é também a superfície da demo; contra o preenchimento do Tag 2,91 e 2,83; contra o preenchimento do Hover 2,41 e 2,48. Antes eram 1,29 e 1,28 contra a página. A lacuna `tag-border-contrast` virou "resolved". As bordas do Alert e do Toast seguem como lacunas documentadas.
- `css/components/breadcrumb.css`: o Ellipsis. `.breadcrumb__ellipsis` é um botão de 16 por 16 com `DotsThree` de 16px: Default com `--icon-color-secondary`, Hover e Focus com `--icon-color-default`; o foco é um anel quadrado (raio 0) de 24 por 24 em volta do ícone (`--focus-ring-width`, `--focus-ring-gap`, `--color-border-focus-ring`). `.breadcrumb__collapse` posiciona o painel do Menu abaixo do botão, alinhado ao início, a 8px (`--space-2`), com a camada de `.menu` (`--z-popover`) e a largura de 238 do especímen do Menu. O separador depois do Ellipsis segue o dos outros itens. Nenhum token novo.
- Marcação do caminho recolhido: `nav aria-label="Breadcrumb"` com `ol`; o `li` do Ellipsis tem o botão com `aria-label="Show path"` (o nome proposto no pedido; não achei nome documentado que o substitua), `aria-haspopup="menu"`, `aria-expanded` e `aria-controls`; o ícone é `aria-hidden`. O painel é o Menu existente, com os níveis escondidos como `a.menu__item` com `role="menuitem"`. A página atual mantém `aria-current="page"`. O recolhimento é decidido pelo autor no HTML; não há recolhimento automático por largura (lacuna `breadcrumb-auto-collapse`, com a descrição de como seria feito).
- `js/menu.js` sem mudança: o Menu abre pelo `aria-haspopup="menu"` e `aria-controls`, Esc devolve o foco ao botão, e as setas, Home e End funcionam. Verificado no navegador: Enter abre e foca o primeiro nível, ArrowDown, Home e End movem, Esc fecha e volta ao botão, o painel fica a 8px abaixo do botão, alinhado ao início, com `z-index` 300.
- `css/components/menu.css`: uma regra nova para o item que é link (`a.menu__item:hover`), porque o `reset.css` pinta `a:hover` com a cor de hover da marca e o item mantém a sua cor. Danger e Disabled ficam de fora.
- Contraste do Ellipsis, medido no navegador, Light e Dark: Default 10,76 e 8,37; Hover e Focus 19,42 e 17,06; anel de foco 6,46 e 10,74. A página do Breadcrumb mostra o caminho expandido, o recolhido (abre ao clique) e o recolhido com o Menu aberto (exemplo estático), e ganhou as seções Estados e Teclado e ARIA.
- Inventário: `Breadcrumb item` com 7 variantes; 205 de 205 variantes com CSS (eram 202 de 202).
- Docs em inglês (D-15): as demos de Menu, Pagination, Tabs e Breadcrumb deixaram o português (rótulos, `aria-label` e ids de âncora). Os nomes dos idiomas do Menu de idioma (Português, English, Español) ficam como estão, por serem nomes de idioma no próprio idioma.

**Corrigido**
- Nota sobre a v2.13.0: a lacuna `breadcrumb-narrow-collapse` (o Figma não desenhava o controle de reticências) deixou de valer com o tipo Ellipsis. A nota sobre o Tag aceita em 24/11/2026 foi resolvida pelo D-45. As entradas anteriores não foram reescritas.

---

## v2.14.0 · 24 de novembro de 2026 · Menu item com os três estados Danger, páginas do Lote 4 sem "Code notes" e com demos em inglês (MINOR)

**Versão escolhida: MINOR (2.13.1 para 2.14.0).** Regra aplicada: seção 3 do `GOVERNANCE.md` (v1.7), MINOR cobre "Expansão de escala (mais tamanhos, mais variantes)". O set `Menu item` do Figma Core passou de 7 para 10 variantes (`Tone=Danger` com `State=Focus`, `Selected` e `Disabled`) e o inventário passa de 199 para 202 variantes com CSS. Não entra componente novo e não entra token novo. Ressalva para o Renan: na v2.13.1 o `Lightbox close` (um set novo, 3 variantes) foi tratado como PATCH; pela mesma leitura literal da cláusula ele também seria MINOR. A v2.13.1 não foi reescrita. Se a leitura certa for PATCH, a versão vira 2.13.2 e o texto desta entrada muda só na primeira linha.

**Alterado**
- `css/components/menu.css`: os estados Danger do `Menu item`. Focus: o mesmo anel do Default (`--color-border-focus-ring`, 2px, 2px de espaço) e o texto continua em `--color-text-danger-default`. Selected: `--color-bg-alt`, SemiBold, texto `--color-text-danger-default` e check em `--icon-color-danger` (o modo Danger do `Icon/Color`). Disabled: igual ao Default Disabled (`--color-text-disabled-default`, sem opacidade), e o check de um item desabilitado usa `--icon-color-disabled`. Cada estado tem seletor próprio, então a cor do texto não depende da ordem das regras. Nenhum token novo.
- Contraste medido no navegador, Light e Dark: texto Danger no painel 5,87 e 6,88; texto Danger e check no Selected (sobre `--color-bg-alt`) 5,48 e 6,12; anel de foco contra o painel 6,46 e 10,74 (valores da v2.12.0). Disabled é igual ao Default Disabled e segue isento.
- Inventário: `Menu item` com 10 variantes, 202 de 202 com CSS. A lacuna `menu-danger-states` virou "resolved".
- Docs do Modal: o hover do X é um círculo de 28px em `--color-bg-alt` e o ícone vai para `--icon-color-default`. O Figma (descrição do componente e Info) diz o mesmo desde D-44; depende de a biblioteca Core ser republicada para chegar a quem consome por ela, mas nada nos docs depende do estado não publicado.
- Os textos das demos das seis páginas do Lote 4 (Modal, Popover, Lightbox, Avatar, Tag, Accordion) passam de português para inglês (D-15): rótulos, `aria-label` e `alt`. Nomes de pessoas ficam como estão.

**Corrigido**
- `build-components-doc.mjs`: a seção "Code notes" não é mais renderizada nas páginas (D-44; as páginas antigas nunca a mostraram, D-35). O código que a gera e os dados (`knownGaps`, `accepted-divergences.json`) ficam; basta tirar `notes` do conjunto `HIDDEN_SECTIONS` para mostrá-la de novo.
- Nota sobre a v2.12.0: a lacuna que dizia que o Menu não tinha Danger Focus, Selected e Disabled no Figma deixou de valer com o set de 10 variantes. A entrada da v2.12.0 não foi reescrita.

---

## v2.13.1 · 24 de novembro de 2026 · Lote 4 alinhado às decisões do Figma, `js/overlay.js` compartilhado e lacunas de contraste registradas (PATCH)

**Versão escolhida: PATCH (2.13.0 para 2.13.1).** Regra aplicada: seção 3 do `GOVERNANCE.md` (v1.7), PATCH cobre "Ajuste de valor" (o blur do Lightbox de 12px para 6px, a margem do Modal em tela estreita de 24px para 16px, os estados do botão de fechar) e "Correção de bug" (um Toast fora dos filhos diretos do `<body>`, por exemplo dentro de `<main>`, ficava inerte com um Modal aberto; o filtro agora entra nos filhos que o contêm), mais "Melhoria de documentação sem mudança técnica". Não entra componente novo no DESIGN.md (o `Lightbox close` do Figma é o botão de fechar que já existia no Lightbox, sem classe nova) e não entra token novo (o anel usa `--color-border-accent-default`, que já existia), então não se aplica MINOR. O refactor para `js/overlay.js` não muda comportamento. Nenhuma regra do GOVERNANCE mudou.

**Alterado**
- Lightbox: o blur do fundo passa de `blur(12px)` para `blur(6px)`. O raio do blur de fundo do Figma é o dobro do raio do CSS: Figma 12 equivale a `blur(6px)`, e o código exportado pelo próprio Figma dá `blur(6px)`. A fonte dessa equivalência são respostas no fórum do Figma sobre blur no Dev Mode, não a documentação oficial. Não existe token de blur que combine (`--blur-glass` é 24px com saturação), então o valor é literal (item em aberto). Divergência aceita registrada em `docs/data/accepted-divergences.json` (Figma 12, CSS 6px, decidido pelo Renan em 2026-11-24); o gerador de tokens passou a aceitar entradas de efeito (`scope: "effect"`).
- Lightbox, botão de fechar: alinhado ao componente `Lightbox close` do Figma (Default, Hover, Focus; sem Disabled). Vidro branco a 12% com borda de 1px a 18%; hover com 22% e 32% e X a 100%; foco com anel de 2px e 2px de espaço em `Border/Accent/Default` (`--color-border-accent-default`, Solar), 44 por 44, raio 22, contraste 9,02:1 no Light e 12,08:1 no Dark contra o scrim. O X é branco nos dois temas de propósito (o scrim é escuro nos dois) e isso é item da era do dark mode. A regra de tela estreita continua: a altura da imagem deixa 40px acima e abaixo e espaço para uma legenda de três linhas, e o botão fica dentro da janela. A lacuna "estados do botão não existem no Figma" saiu dos dados.
- Inventário do Figma ganha o `Lightbox close` (3 variantes). Totais: 199 de 199 variantes com CSS (eram 196 de 196).
- Popover: texto da página e do DESIGN-IMPLEMENTATION igual ao Info do Figma: sem seta (só o Tooltip tem), abaixo do gatilho, alinhado ao início, 8px, inverte para cima quando não cabe. O código já fazia isso; nada mudou no CSS ou no JavaScript do Popover.
- Modal: o X segue o comportamento do Icon Button Ghost (hover com `--color-bg-alt`, ícone `--icon-color-secondary`, foco de 2px com 2px; o círculo do hover tem 28 por 28, escolha do código). Em tela estreita a largura é `min(480px, 100% - 32px)` (margem de 16px, antes 24px), a altura é limitada a `100dvh` menos a margem, o corpo rola e o cabeçalho e o rodapé ficam fixos; o corpo rolável ganha `tabindex="0"` para o teclado.
- `js/overlay.js` (novo, plain script): a página inerte, a rolagem travada, o foco preso, o Esc e o retorno do foco, antes duplicados em `modal.js` e `lightbox.js`. Carregado antes dos dois (as três páginas de estudo de caso e as páginas de docs do Modal e do Lightbox foram atualizadas). O que fica inerte: cada filho do `<body>`, exceto o overlay, `.toast`, `[data-overlay-keep]`, `[data-modal-keep]` e qualquer filho que contenha um deles (o percurso entra nele): um Toast aberto com o Modal fica acima e alcançável, mesmo dentro de `<main>`. O padrão (atributo `hidden`) continua; não muda para `<dialog>` nativo.

**Corrigido (notas da v2.13.0)**
- A lacuna "o botão de fechar do Lightbox não tem Hover nem Foco no Figma" deixou de valer: o Figma tem o componente `Lightbox close`. A margem de 24px do Modal em tela estreita foi trocada pela regra aprovada. A diferença "Cancel 96" do relatório do Lote 4 era o texto: a demo usava "Cancelar" e o Figma "Cancel" (Cancel 85, Confirm 91). A entrada da v2.13.0 não foi reescrita.

**Registrado (só nos dados)**
- Lacuna `accordion-no-js`: sem JavaScript os itens ficam fechados e o conteúdo não é legível; aceito pelo Renan em 24/11/2026 (mostrar o conteúdo por padrão empurraria outros elementos para fora da vista).
- Lacunas de contraste medidas, aceitas pelo Renan em 24/11/2026, sem mudar cor, para reavaliar quando o dark mode entrar ou com uso real: painel do Modal no Dark (1,16:1 contra o scrim, borda 1,49:1; no Light 3,64 e 2,82) e as bordas do Tag, do Accordion item, do Popover e do painel do Menu a 1,29:1 no Light. O Tag é o primeiro a reavaliar (troca possível: `Border/Utilities/Input`).

---

## v2.13.0 · 24 de novembro de 2026 · Lote 4 (Sobreposições e dados): Modal, Popover, Avatar, Tag e Accordion, Lightbox alinhado ao Figma, mais correções do Lote 3 (MINOR)

**Versão escolhida: MINOR (2.12.0 para 2.13.0).** Regra aplicada: seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entram Modal, Popover, Avatar, Tag e Accordion. O `--z-overlay` volta como alias deprecado, o que mantém a mudança em MINOR (a remoção de um token é a quebra de compatibilidade da regra MAJOR; o alias dá o caminho de deprecação). O GOVERNANCE passa a v1.7 (uma regra nova na seção 3). Decisão do Renan.

**Adicionado**
- `css/components/modal.css` e `js/modal.js`: painel de 480 com borda incluída no layout (430 de conteúdo), padding 24, gap 16, raio 16, `--shadow-lg`; scrim em `--z-modal-scrim` e painel em `--z-modal`, abaixo do Toast (`--z-notification`). `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`; o foco entra, fica preso, Esc fecha e devolve o foco ao gatilho; a página atrás fica inerte e a rolagem travada. O clique no scrim não fecha. Sem animação (o Figma não define). Em telas estreitas o painel mantém 24px de margem (`--space-6`).
- `css/components/popover.css` e `js/popover.js`: painel de 280 com borda incluída, `--shadow-md`, `--z-popover`, abaixo do gatilho a 8px, alinhado ao início; vira para cima e para o fim só quando sairia da janela. Sem seta. Esc devolve o foco, o clique fora fecha sem mover o foco, não prende o foco. Sem papel para texto; `role="dialog"` sem `aria-modal` quando há conteúdo interativo.
- `css/components/avatar.css`: círculo de 32, 40 e 56 (`.avatar--small|medium|large`), iniciais como conteúdo, foto com `object-fit: cover`. Decorativo com o nome ao lado; sem o nome, `role="img"` com `aria-label`.
- `css/components/tag.css` e `js/tag.js`: botão de 28 com borda incluída (67 de largura com o rótulo "Tag" no Figma), X de 14 como pista visual, Delete ou Backspace remove e dispara `hope:tag-remove`. Sem versão não interativa: use o Badge.
- `css/components/accordion.css` e `js/accordion.js`: item com só a borda inferior (54 fechado), anel de foco de 4px em volta do item inteiro por `:has()` com o anel do botão como alternativa, chevron girado 180 graus aberto, `role="region"` e `aria-labelledby` no painel só com 6 itens ou menos, painel fechado com `hidden`. Sem animação.
- Seis páginas de docs pelo gerador genérico (Modal, Popover, Lightbox, Avatar, Tag, Accordion), com as seções novas Quando não usar, Anatomia, Estados, Teclado e ARIA e Notas de código, e o grupo "Overlays and data" no menu lateral (a Table passa para ele). Cobertura: 196 de 196 variantes com CSS (eram 180 de 196).

**Alterado**
- Tab selecionado usa o mesmo estilo de texto dos outros, `Body/Medium/body-sm medium` (as quatro variantes Selected mudaram no Figma). Sai o SemiBold de `.tab[aria-selected="true"]`; a seleção fica marcada pela linha inferior de 1,5px e pela cor do texto. A largura do rótulo é a mesma selecionado e não selecionado (medido no navegador). A comparação "Tabs, Pagination e Menu marcam o atual de jeitos diferentes" continua; o Tabs agora é "linha inferior e cor do texto".
- GOVERNANCE v1.7 (MINOR): a seção 3 ganha a cláusula das mudanças no próprio GOVERNANCE.md (regra adicionada ou removida é MINOR; alinhamento do texto a uma regra já decidida, sem mudar a regra, é PATCH). A v1.6.1 continua PATCH. Nada mais mudou no arquivo.
- Lightbox alinhado ao Figma: imagem até 960 com `--shadow-lg` (era uma sombra preta de 24 por 80 a 60%), legenda de 520, X do Phosphor de 20 a 80% no lugar do traço de 2,5px, botão de 36 com traço incluído, a imagem limitada para o botão ficar sempre dentro da janela, foco no botão de fechar ao abrir (antes o foco ficava na imagem, porque o botão estava com `visibility: hidden`), foco preso, página inerte, `<img data-lightbox>` além de `.case-section img`. Alteração visível nas três páginas de estudo de caso ao abrir uma imagem.
- Escala de z-index: a tabela da seção 8 ganha Modal, Popover e Lightbox.

**Descontinuado**
- `--z-overlay`: alias de `--z-sticky` (`--z-overlay: var(--z-sticky)`), deprecado. Nada no repositório o usa. O próximo MAJOR pode removê-lo.

**Corrigido**
- Correção da nota da v2.12.0: ela diz que `--z-overlay` foi removido. Ele **não** foi removido em definitivo: volta como alias deprecado (acima), e a observação da v2.12.0 sobre MAJOR fica resolvida por essa decisão. A entrada da v2.12.0 não foi reescrita.
- Caminhos dos ícones do Phosphor (CaretLeft, CaretRight, CaretDown, DotsThree, X, Check) conferidos contra `@phosphor-icons/core` 2.1.1 (peso Regular) e contra a geometria da biblioteca Phosphor do Figma (`u1vCsV29DxickSmAYiLquZ`): iguais, com diferença de no máximo 0,001 na caixa delimitadora em grade de 32. Nenhum caminho foi trocado por diferença visual; o DotsThree foi trocado pelo texto oficial (mesmos três círculos, renderização idêntica pixel a pixel).
- Lacunas de contraste: entram a borda do Tag (1,29 e 1,28), a borda do Accordion, o painel do Modal no Dark (1,16) e o botão de fechar do Lightbox, medidas e documentadas; a decisão segue pendente. Nenhuma cor foi alterada.

---

## v2.12.0 · 24 de novembro de 2026 · Lote 3 (Navegação): Tabs, Breadcrumb, Pagination e Menu, mais correções do Lote 2B (MINOR)

**Versão escolhida: MINOR (2.11.0 para 2.12.0).** Regra aplicada: seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entram Tabs, Breadcrumb, Pagination e Menu. Decisão do Renan. Ponto de atenção: a remoção de `--z-overlay` encaixa literalmente em "quebra compatibilidade reversa de tokens" (MAJOR); ela tinha um único uso, migrado na mesma versão, e fica registrada como pergunta em aberto. Nenhuma regra do GOVERNANCE mudou.

**Adicionado**
- `css/components/tabs.css` e `js/tabs.js`: item de 40px com a linha de 1,5px incluída na altura (sem desconto), linha-base de 1px sob a lista, SemiBold quando selecionado, foco quadrado 88 por 48. `role=tablist|tab|tabpanel`, tabindex móvel, setas com ativação automática, Home e End, abas desabilitadas puladas. Sem JavaScript, o primeiro painel fica visível e os outros ficam `hidden`.
- `css/components/breadcrumb.css`: `nav` com `ol`, anel de foco só em volta do rótulo, último item sem separador, página atual com `aria-current="page"`.
- `css/components/pagination.css`: itens 36 por 36 com raio 12, atual com preenchimento escuro, Prev e Next desabilitados com `aria-disabled` e sem `href`, reticências decorativas.
- `css/components/menu.css` e `js/menu.js`: painel com borda incluída no layout (238 = 220 + 16 + 2), `--z-popover`, itens de 36px, tom Danger, divisor, opção escolhida com `menuitemradio` e check. Setas, Home, End, Esc devolve o foco ao gatilho, Tab fecha.
- Quatro páginas de docs pelo gerador genérico, grupo "Navigation" no menu lateral, suporte a `scripts` e `navGroup` nos dados (`scripts/docs-layout.mjs`, `scripts/build-components-doc.mjs`). Cobertura: 180 de 196 variantes com CSS.

**Alterado**
- Header do site usa `--z-sticky` (10), antes `--z-overlay` (100). Escala final: base 0, raised 1, sticky 10, modal-scrim 100, modal 200, popover 300, tooltip 400, notification 500.
- Rotação do Spinner passa a ser linear (decisão do Figma Core); o pulso de redução de movimento e o do Skeleton continuam em ease-in-out.
- Trilho do Progress usa `--color-border-input` (Figma `Border/Utilities/Input`): trilho contra a página 3,12:1 no Light e 3,19:1 no Dark; preenchimento contra o trilho 6,23:1 e 5,35:1.
- Regra da borda (seção 5): Input, Textarea, Select, Checkbox, Radio e Switch confirmados com `strokesIncludedInLayout` verdadeiro.

**Removido**
- Token `--z-overlay` e a menção a `--z-max` (9999) no texto, que nunca existiu em `tokens.css`.

**Corrigido**
- Deslocamento interno dos campos: o texto e o ícone ficam a 13px da borda (12 mais 1), como no Figma; antes ficavam a 12px. Textarea também no topo. O tamanho externo não muda.
- Polegar do Switch a 5,5px da borda (4 mais 1,5), antes a 4px.
- Foco do Icon Button: o `button:focus-visible` do `reset.css` trocava o raio para 4px e quadrava o botão; o raio agora é repetido na regra de foco (e o mesmo em Tabs, Breadcrumb, Pagination e Menu).
- Lacunas de contraste: o trilho do Progress sai da lista; trilho do Spinner e Skeleton ficam como lacunas documentadas, com o motivo.

---

## v2.11.0 · 24 de novembro de 2026 · Lote 2B (Indicadores e dicas): Tooltip, Progress, Spinner, Skeleton e Icon Button, escala de z-index e correções do Lote 2A (MINOR)

**Versão escolhida: MINOR (2.10.0 para 2.11.0).** Regra aplicada: seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entram Tooltip, Progress, Spinner, Skeleton e Icon Button. Nenhuma regra do GOVERNANCE mudou.

**1. Componentes**
- `css/components/tooltip.css` (`.tooltip--top|bottom|left|right`), `progress.css`, `spinner.css`, `skeleton.css` (`.skeleton--text|title|avatar|block`) e `icon-button.css` (`.icon-btn--primary|ghost`). Elementos nativos, sem JavaScript, sem `opacity` no disabled, `forced-colors` tratado, foco do Hope (2px, offset 2px).
- Progress é um `div` com `role="progressbar"` e não um `<progress>`: testado em Chromium, Firefox e WebKit, o elemento nativo bate com a geometria nos três, mas o Firefox não anima o preenchimento (`::-moz-progress-bar` ignora a transição). Os cinco valores do Figma têm classes `.progress__bar--0` a `--100`; outro percentual usa `--progress-value`.
- Spinner: anel de 24px com 2,4px de espessura e arco de cerca de 99 graus, uma volta por segundo em ease-in-out; em `prefers-reduced-motion` vira pulso de opacidade (sobrepõe a regra global com `!important`).
- Icon Button: `.icon-btn`, não um modificador de `.btn`, porque o `.btn` traz padding, gap e largura total abaixo de 768px.
- Skeleton: a duração do pulso não existe no Figma; o CSS usa dois períodos de `--duration-deliberate` (inferência, registrada como lacuna).

**2. Escala de z-index**
- Novos tokens do Figma: `--z-modal-scrim` (100), `--z-popover` (300), `--z-tooltip` (400) e `--z-notification` (500). O Toast troca o literal 500 por `var(--z-notification)`. Nenhum valor computado de `z-index` mudou no site. `--z-overlay` continua sendo o header (100) e não é alias do scrim. Divergência com o texto antigo do DESIGN registrada na seção 8 do DESIGN-IMPLEMENTATION.

**3. Correções do Lote 2A**
- Toast: variante Default removida (era idêntica a Info); o Figma tem quatro tipos e Info é o padrão.
- Papéis: Error com `role="alert"`, Warning, Info e Success com `role="status"`; a documentação explica que as regiões vivas anunciam conteúdo inserido dinamicamente (MDN).
- Dismiss do Alert e do Toast: pseudo-elemento transparente leva a área de clique a 24 por 24 (WCAG 2.5.8) sem mudar o layout e sem encostar na ação.
- Seção 5 do DESIGN-IMPLEMENTATION: a regra da borda passa a ser decidida pela propriedade `strokesIncludedInLayout` do Figma (falso: Button, Icon Button, Badge descontam; verdadeiro: Alert, Toast, Tab, Tag, Accordion item não descontam; campos e controles a verificar).
- Banner: o emoji segue o Body/Medium sm do Figma e a lacuna `banner-emoji-style` foi removida.

**4. Páginas de docs**
- Cinco páginas novas pelo gerador genérico (Tooltip, Progress, Spinner, Skeleton, Icon Button), com lacunas: `tooltip-positioning`, `tooltip-hover-focus-behavior`, `progress-indeterminate-not-designed`, `progress-native-element`, `spinner-easing-observation`, `skeleton-duration`, contrastes medidos. Páginas Alert e Toast atualizadas.
- Cobertura: 146 de 193 variantes com CSS (eram 124 de 193).

---

## v2.10.0 · 23 de novembro de 2026 · Lote 2A (Mensagens): Alert, Toast, Banner e Empty state, texto de apoio fora do label (MINOR)

**Versão escolhida: MINOR (2.9.0 para 2.10.0).** Regra aplicada: seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entram Alert, Toast e Empty state, e o Banner passa a ser o Notice do Figma. Sem token novo e sem classe removida. Versões: `DESIGN.md`, `DESIGN-IMPLEMENTATION.md` e `tokens.css` (cabeçalho) 2.10.0, `GOVERNANCE.md` 1.6.1 e `PATTERNS.md` 1.1.2 sem mudança.

**1. Alert, Toast e Empty state**
- `css/components/alert.css` (`.alert--info|success|warning|error`), `toast.css` (`.toast--default|success|warning|error|info`) e `empty-state.css`. Elementos nativos, sem JavaScript, ícones Phosphor inline pelo mecanismo `.icon` existente, cor do ícone pelos tokens `--icon-color-*` (o `--icon-color` do Figma, que tem modos, vira esse conjunto de tokens no CSS). Foco com o anel de 2px com 2px de espaço, `forced-colors` com cores do sistema.
- Alert: ícone de 20px, conteúdo (título, descrição, ação) e dismiss de 16px. Toast: sombra `--shadow-lg`, camada 500 (literal: a escala de z-index para em `--z-modal`). Empty state: ícone de 48px (`--icon-color-tertiary`), título pela classe (o nível do cabeçalho é de quem usa) e o Button Primary do Hope.
- Medido no navegador contra o Figma: Alert 104,4 (105), Toast 68,4 (69), Banner 52,8 (53), Empty state 268,8 (269). Alert e Toast não descontam a borda do padding: o Figma inclui o traço no layout (regra e exceção em `DESIGN-IMPLEMENTATION.md`, seção 5).

**2. Banner**
- `.banner` segue o Notice do Figma: fundo `--color-bg-accent-secondary`, sem borda, padding 16 e 24, texto Medium em `--color-text-accent-default`. O `.banner--wip` fica como modificador legado, com os valores antigos, para `case-studies/sb-home-redesign.html` não mudar.

**3. Texto de apoio fora do label (Checkbox, Radio, Switch)**
- O texto de apoio sai do `<label>` e é ligado por `aria-describedby`: o nome acessível passa a ser só o rótulo. Layout igual ao do Figma (medido, 0 de diferença). A área de clique passa a ser a caixa e o rótulo.

**4. Páginas de docs**
- Quatro páginas novas (Alert, Toast, Banner, Empty state) pelo gerador genérico, com lacunas medidas: contraste da borda do Alert (Info no Dark 2,26:1, Warning no Light 2,63:1) e do Toast (1,29:1), área de clique do dismiss (16 por 16), papéis ARIA por urgência, região e tempo do Toast, estilo do emoji do Banner, Default e Info do Toast quase idênticos (1,43:1 Light, 1,15:1 Dark).
- Cobertura: 125 de 194 variantes com CSS (eram 115 de 194).

---

## v2.9.0 · 23 de novembro de 2026 · Lote 1 (Forms): Input, Textarea, Select, Checkbox, Radio e Switch, regra única da borda dentro da caixa (MINOR)

**Versão escolhida: MINOR (2.8.1 para 2.9.0).** Regra aplicada: seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entram seis componentes, em `css/components/`, e dois tokens. Não é MAJOR: nenhum nome ou classe existente foi removido. Versões: `DESIGN.md`, `DESIGN-IMPLEMENTATION.md` e `tokens.css` (cabeçalho) 2.9.0, `GOVERNANCE.md` 1.6.1 (PATCH, ver item 6) e `PATTERNS.md` 1.1.2 sem mudança.

**1. Tokens novos (dois, ambos já no Figma Foundation)**
- `--border-width-medium: 1.5px` (Figma `Stroke/medium`), ao lado de `--border-width-normal` e `--border-width-accent`.
- `--color-border-input` (Figma `Border/Utilities/Input`): Light `--color-night-400` (3,12:1 sobre branco), Dark `--color-night-500` (3,19:1 sobre o fundo escuro). O `--color-border` do campo media 1,29:1 e não passava de 3:1 (WCAG 1.4.11).
- O snapshot `docs/data/figma-tokens.json` (leitura de 20/11/2026) ainda não tem `Border/Utilities/Input` e traz `Stroke/medium` sem code syntax: precisa de um novo snapshot do Figma. A página de tokens mostra os dois como "not in Figma" até lá.

**2. Regra única da borda dentro da caixa**
- Uma borda desenhada dentro da caixa no Figma é descontada do padding no CSS, com um token dentro de `calc()`; nunca `box-shadow: inset` (some no modo de alto contraste do Windows). Escrita em `DESIGN-IMPLEMENTATION.md`, seção 5. Vale para Button (D-23), Badge Neutral, Input, Textarea e Select. Nos campos, uma custom property (`--field-border-width`) guarda a borda do estado (1px, 1,5px no Error) para a caixa não mudar de tamanho.
- Badge Neutral passa de 30,8px para 28,8px de altura (os outros estilos já tinham 28,8) e fica 2px mais estreito: o traço de 0,8px deixa de somar ao box. A lacuna `badge-neutral-height` fecha.

**3. Componentes novos (Lote 1)**
- `css/components/field.css` (o que Input, Textarea e Select compartilham: `.field`, `.field__label`, `.field__control`, `.field__icon`, `.field__help` e a caixa do controle) e `input.css`, `textarea.css`, `select.css`, `checkbox.css`, `radio.css`, `switch.css`. Controles nativos com `appearance: none`, sem JavaScript. Estados: Hover, Focus (`:focus-visible`, anel de 2px com 2px de espaço), Error (`aria-invalid="true"`, borda de 1,5px, o texto do valor não muda, a mensagem vai no texto de apoio), Disabled (atributo `disabled`, sem `opacity`). Eixo Value dos campos: Empty (placeholder) e Filled. Switch sem Error. Marca do Checkbox por máscara (a cor é um token) e regras de `forced-colors`.
- Hover de Checkbox, Radio e Switch vale com o ponteiro sobre o rótulo inteiro (inferência; o Figma define só no controle). O painel de opções do Select é o do navegador (o Menu não está no código).
- Figma a CSS: 63 variantes (Input 10, Textarea 10, Select 10, Checkbox 15, Radio 10, Switch 8), todas com CSS.

**4. Páginas de docs**
- Seis páginas novas pelo gerador genérico (`example.markup` estático no conteúdo). Lacunas conhecidas registradas nos dados, com medidas: contraste do `--color-border-input` sobre a superfície Secondary (2,91:1 Light e 2,83:1 Dark), `select-options-panel`, resize do Textarea, hover no rótulo, nome acessível que inclui o texto de apoio, entre outras; e `tag-border-contrast` como nota para o lote do Tag.
- Cobertura: 115 de 194 variantes com CSS (eram 52 de 179). O inventário passa a contar o eixo Value de Input, Textarea e Select (5 para 10 variantes cada).

**5. Rótulo de documentação**
- `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` listam os Forms no código e a regra da borda.

**6. GOVERNANCE 1.6.1 (PATCH)**
- Três trechos que ainda diziam o contrário da v1.6 foram reescritos com o menor ajuste: os anti-padrões "Componente preventivo" (agora "Componente sem desenho") e "Componente para um único uso" (seção 9), e "YAGNI vence sofisticação" (agora "Simplicidade vence sofisticação", seção 10). Também o comentário sobre `.badge--warning` em `DESIGN-IMPLEMENTATION.md`. Nenhuma regra mudou. PATCH porque é refinamento de texto (seção 3).

---

## v2.8.1 · 23 de novembro de 2026 · Site de docs: um layout para todas as páginas, um gerador de componentes e a página de tokens com o componente Table (documentação, PATCH)

**Versão escolhida: PATCH (2.8.0 para 2.8.1).** Regra aplicada: seção 3 do `GOVERNANCE.md`, PATCH cobre "melhoria de documentação sem mudança técnica". Mudaram `docs/`, `scripts/` e `docs/docs.css`; nenhum token, classe ou CSS de componente mudou, e `css/hope.css` só muda no comentário de versão. Os cabeçalhos de versão foram atualizados para 2.8.1 (`tokens.css`, `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`), como na 2.8.0; a entrada 2.6.18, também só de docs, os deixou como estavam. `GOVERNANCE.md` segue em 1.6 e `PATTERNS.md` em 1.1.2.

**1. Um gerador para as páginas de componentes**
- `scripts/build-components-doc.mjs` monta cada página a partir de `docs/data/components-content.json` e do mapa, sem nome de componente no código: título e descrição, exemplo ao vivo (classes reais do `css/hope.css`), o HTML do mesmo exemplo num `<details>` nativo (fechado, funciona com teclado e sem JavaScript) e as informações essenciais. Os campos novos `example`, `essential` e `mapKeys` do conteúdo dizem o que cada página mostra.
- Button (os 7 estilos, Medium e Small Ghost, em Default e Disabled), Link e Separator passam ao layout novo. Hover e Focus não viram exemplos separados. As seis seções de dados (Figma vs code, In Figma no code yet, In code no Figma, Known gaps, Figma reference, Code reference) seguem nos JSON e não são mostradas.
- Novo `scripts/docs-kit.mjs` com o markup da Table do Hope e as seções do modelo.

**2. Página de tokens com a Table**
- Uma Table por grupo de tokens, com `role="region"`, legenda, `th scope` e `tabindex="0"`. Colunas Token, Light, Dark, Figma, CSS (computed) e Status; o swatch é decorativo (`aria-hidden`) e o valor em texto vem junto. Grupos sem cor e sem diferença no Dark usam uma coluna Value, alinhada ao fim quando é numérica. Os status continuam vindo da mesma comparação e de `accepted-divergences.json`.
- As tabelas de resumo, divergências, aceitas e da página de revisão também usam a Table. A linha de entrada "stale" da tabela de divergências aceitas, que usava `colspan`, virou células separadas (o contrato da Table não aceita `colspan`).

**3. Índice e layout antigo**
- `docs/components/index.html` é gerado dos dados e lista só páginas que existem. Removidas a seção "In Figma, no code yet" e a frase "Components that exist in Figma and have no CSS. From design-organization/DESIGN.md. They enter the docs when they are implemented, in batches by family (GOVERNANCE v1.6). No pages."
- O menu lateral lista os componentes de `components-content.json`. Removidos o template clássico (container, `case-layout`, "On this page"), `.docs-table*`, `.docs-content`, `.docs-cols`, `.docs-demo-grid`, `.docs-swatches` e o código morto dos geradores.
- `docs:check` falha se uma página de `docs/` não tiver os marcadores do layout.

---

## v2.8.0 · 23 de novembro de 2026 · Componente Table, geometria do Badge, GOVERNANCE v1.6 e layout das páginas de docs (MINOR)

**Versão aprovada pelo dono: MINOR (2.7.0 para 2.8.0).** Pela seção 3 do `GOVERNANCE.md`, MINOR cobre "novo componente entra no DESIGN.md": entra o componente Table (`css/components/table.css`). A mesma versão fecha o trabalho do Prompt 17 (geometria do Badge, `.badge--success` no token, GOVERNANCE v1.6) e do Prompt 19 (layout das páginas de docs, guarda de fonte mono). Sem token novo e sem quebra: nenhum nome ou classe existente foi removido. Versões: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.8.0, `tokens.css` (cabeçalho) 2.8.0, `GOVERNANCE.md` 1.6 e `PATTERNS.md` 1.1.2 (só "quatro testes" vira "três testes").

**1. Badge: geometria do Figma e token no Success**
- `.badge` passa a padding 4px 12px (`--space-1`, `--space-3`) e line-height 1.6 (literal, o projeto não tem token de line-height), como no Figma. Os badges do site crescem cerca de 3,3px: 25,5 para 28,8 nos Ancora e 27,5 para 30,8 nos Neutral (o Figma tem 29 em todos). O Neutral fica 1,8px acima do Figma porque a borda do CSS soma à caixa; fica como débito, no mesmo padrão do Button (D-23). Em 390px a lista de tags do `sb-home-redesign` passa a quebrar em duas linhas.
- `.badge--success` usa o token `--color-bg-positive-secondary` (12% no Light, igual ao literal anterior; sólido no Dark, o que muda só o `design-system.html` no tema escuro). A borda do Badge Neutral continua em `--border-thin` (0,8px); o Figma passou a ligá-la a `Stroke/hairline`, sem mudança no CSS (a publicação do Core é do dono).

**2. DESIGN-IMPLEMENTATION seção 15**
- Removido o rascunho antigo de link editorial em prosa (`.prose a` e `a.link`), que nunca foi implementado. `.link` é o componente Link do Figma.

**3. GOVERNANCE v1.6 (MINOR)**
- Abolida a regra "o componente só entra no CSS quando houver uso" (seção 8, "O teste do projeto real" e "Quando expandir"). Os componentes do Figma entram em lotes por família (Lotes 0 a 4), a partir do Figma, com ou sem uso no site. Decisão do dono (D-16, D-33).
- Os quatro testes da seção 9 viram três: removido o teste 4 ("projeto real"). Atualizadas as menções em `GOVERNANCE.md`, `PATTERNS.md`, `DESIGN.md` e no texto do site de docs. Nenhuma outra regra mudou; a seção 7 não foi tocada.

**4. Diário de decisões v0.10**
- `docs/case/decisoes-hope.md` atualizado (D-01 a D-33), substituindo a versão anterior sem mesclar.

**5. Componente Table (CSS) e página de docs**
- `css/components/table.css`: `.data-table` (wrapper com borda, raio, fundo, rolagem horizontal e anel de foco), `.data-table__grid`, `.data-table__caption` (e `--hidden`), `.data-table__head-cell`, `.data-table__row-header`, `.data-table__cell` e os modificadores `--end` para colunas numéricas (`text-align: end` e números tabulares). O bloco se chama `data-table` porque o Tailwind já traz um utilitário `.table`. Só tokens existentes; sem zebra, hover de linha, cabeçalho fixo, ordenação ou seleção. Contrato de marcação: wrapper `role="region"` com `aria-labelledby` e `tabindex="0"`, legenda, `th scope`, sem `rowspan` nem `colspan`.
- Figma a CSS: 3 unidades e 8 variantes (Table 2, Table Header Cell 2, Table Cell 4), todas com CSS. Cobertura total: 52 de 179 variantes com CSS (eram 44 de 171). Nova página `docs/components/table.html` e a tabela de variantes da página Badge passa a usar o Table do Hope.

**6. Docs: layout modelo, fonte e verificação**
- Página Badge com o layout `ds` (menu lateral no padrão da `design-system.html`, cartão de exemplo, HTML revelado por `<details>`). Menu lateral com largura fixa de 184px, sem token.
- Nenhuma pilha de fonte mono existia em `docs.css`, nos geradores ou nas páginas; `code`, `pre`, `kbd` e `samp` das docs agora declaram `var(--font-body)`, e o `docs:check` falha se aparecer uma pilha mono nesses arquivos.

**7. Diário de decisões v0.11**
- `docs/case/decisoes-hope.md` atualizado (D-01 a D-36), substituindo a versão anterior sem mesclar.

---

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

**14. Prosa com os arquivos CSS reais**
- `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `design-system.html`, comentários de `tokens.css`, a nota do inventário do Figma e o comentário do `check-docs.mjs` passaram a citar `css/components/<nome>.css`, `css/site/*.css` e `css/hope.css` em vez de `components.css` e `layout.css`. Nenhuma regra mudou.

**15. Arquivo solto `css/Untitled` removido**
- Arquivo de 22 bytes ("hero__body reveal-item"), colado sem querer no commit 359a1b9 (30/05/2026). Nenhuma página, script, configuração ou documento o referenciava.

**16. Lote 0: Badge Danger, Link e Separator no CSS**
- `.badge--danger` (fundo `--color-bg-danger-secondary` a 10%, texto `--color-text-danger-default`). `.badge--success` mantém o literal `rgba(74,159,107,0.12)` (o token `--color-bg-positive-secondary` dá o mesmo valor no Light, mas no Dark é uma cor sólida e mudaria o `design-system.html`); Danger usa o token. Success a 12% e Danger a 10% é decisão do dono (D-32).
- `css/components/link.css`: `.link` e `.link--small` (Default, Hover, Focus, Disabled). Sublinhado, sem ícone, Hover e Focus em negrito (alarga o texto cerca de 1px), anel de foco quadrado de 2px com 2px de espaço em `:focus-visible`, Disabled regular via `aria-disabled="true"`. Só classes novas: a regra global `a` não mudou e o site não usa `.link`.
- `css/components/separator.css`: `.separator`, linha de 1px em `--color-border`, largura total, `<hr class="separator" aria-hidden="true">`. Sem variante vertical (o Figma não tem).
- Não alterado, a decidir: a base `.badge` (padding 3px 10px, line-height 1.5, borda Neutral 0.8px) difere do Figma (4 e 12, 160%, 0.5; altura 25,5 contra 29). É usada nas páginas publicadas.

**17. Páginas de docs do Lote 0**
- Nova página `docs/components/separator.html`; as páginas de Badge e Link passam a ter exemplos ao vivo de todos os estilos e tamanhos (Hover e Focus interativos). `components-map.json`, `components-content.json`, `components-code-notes.json` e o inventário atualizados: Badge 5 de 5, Link 8 de 8, Separator 1 de 1. Cobertura total: 44 de 171 variantes com CSS (eram 34).
- Lacunas conhecidas revistas: saem o ícone na descrição do Link e a dúvida sobre o texto do Hover; entram o deslocamento do Hover e a borda de 0.5 do Badge Neutral sem variável.
- `docs/docs.css`: `.docs-content a:where(:not(.link))`, para o link de demonstração manter a cor do componente.

**18. Diário de decisões v0.9**
- `docs/case/decisoes-hope.md` atualizado (D-01 a D-32), substituindo a versão anterior sem mesclar.

**Débitos**
- Comparador de tokens: 150 iguais e 2 diferentes (`--color-bg-scrim-strong` e `--color-bg-icon-chip` no Dark, já conhecidos); nenhum token do Figma sem token no CSS.
- `--color-text-neutral-secondary` (Night/300) tem contraste baixo sobre fundo claro; hoje sem uso.
- Altura do Button Medium: 44,8px no código contra 45px no Figma (diferença de 0,2px do line-height 1.6).
- Pesquisa das superfícies escuras (decisão D-24): ver `docs/case/drafts/dark-surface-survey.md` (feita antes do alinhamento do rodapé). Sobre Ink, o anel de foco Anchor tem 3,01:1. O modo "Neutral surface" e o `data-surface` seguem adiados.
- `GOVERNANCE.md` seção 7 ainda lista `hope-demo.html`.

---

## v2.6.18 · 20 de novembro de 2026 · Site de docs: página de tokens com comparação ao Figma, páginas de Button, Badge e Link, página temporária de revisão dos 30 componentes com seletor de tema (documentação, PATCH)

**Versão escolhida: PATCH (2.6.17 para 2.6.18).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre "melhoria de documentação sem mudança técnica", e toda mudança gera entrada no changelog. Sem mudança de token, CSS ou componente. Nenhum arquivo do sistema Hope mudou, então os cabeçalhos de versão de `DESIGN.md`, `DESIGN-IMPLEMENTATION.md` e `tokens.css` seguem em 2.6.17; `GOVERNANCE.md` segue em 1.5 e `PATTERNS.md` em 1.1.2.

**1. Site de docs, fase 1 (`b2b43dc`)**
- `docs/` e `scripts/`: layout compartilhado, geradores e `docs/docs.css` (só tokens do Hope), com seletor de tema Light, Dark e System (mesmo mecanismo `data-theme` do CSS) e `noindex` em toda página.
- Página de tokens gerada de `css/tokens.css`: 163 tokens com valores Light e Dark calculados no navegador, comparados ao snapshot do Figma de 19/11/2026: 128 iguais, 2 diferentes (as duas de dark mode já adiadas), 1 divergência aceita (`--icon-color`) e 31 sem código no Figma. Divergências aceitas ficam em `docs/data/accepted-divergences.json`.
- `scripts/check-docs.mjs` (`npm run docs:check`) confere classes das demos contra o CSS real, `noindex`, cabeçalho e dados.

**2. Páginas de componentes (`1e412b7`)**
- Button (com Icon Button), Badge e Link, geradas de `docs/data/components-content.json`, `components-code-notes.json` e `components-map.json`. Demos ao vivo só para variantes que existem no CSS; o resto fica em "In Figma, no code yet". As diferenças entre Figma e código aparecem com classe (Atencao ou Informativo), sem decisão tomada.

**3. Página temporária de revisão (`0d1da6f`)**
- `docs/components/review.html`: as 30 unidades do inventário do Figma (172 variantes), 19 variantes com classe de CSS (Complete 2, Partial 2, Not created 26) e a tabela "Still to create" gerada dos dados. Lê as folhas de estilo de `docs/data/css-sources.json`, para continuar funcionando depois da reestruturação do CSS.
- `docs/data/css-structure-report.md`: investigação só de leitura da estrutura do CSS e proposta de divisão. Nada em `css/` foi alterado.

**4. `design-organization/hope-demo.html` removido (`796281b`)**
- Cópia derivada apagada de propósito pelo dono (decisão D-07). A conferência de componentes passa a ser o site de docs.

**Débitos**
- `GOVERNANCE.md`, seção 7, ainda lista `hope-demo.html` entre as cópias derivadas. Sem edição nesta versão.
- Sem mudança nos demais débitos e decisões pendentes desde a v2.6.17.

---

## v2.6.17 · 19 de novembro de 2026 · Diário de decisões do Hope (documentação, PATCH)

**Versão escolhida: PATCH (2.6.16 para 2.6.17).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre "melhoria de documentação sem mudança técnica", e toda mudança gera entrada no changelog. Nenhum token, regra de CSS ou componente mudou. Versões: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.6.17, `tokens.css` (só o comentário do cabeçalho) 2.6.17, `GOVERNANCE.md` 1.5 e `PATTERNS.md` 1.1.2 sem mudança.

**1. Novo arquivo: `docs/case/decisoes-hope.md`**
- Diário de decisões do Hope (material de case), em português. Esta cópia no repositório é a canônica; a cópia no Claude Project é derivada (mesma regra da seção 7 do `GOVERNANCE.md`). O arquivo veio da raiz como `CASE-decisoes-hope.md`.
- Verificação de NDA: o único trecho com nome de cliente era um item da seção "Como ler este documento", que citava dois produtos de clientes sob NDA. Foi reescrito para "remover referências a clientes sob NDA". Nenhum outro nome de cliente ou produto sob NDA no arquivo. Nenhuma outra edição de conteúdo.

**2. `vercel.json`: cabeçalho `X-Robots-Tag: noindex`**
- Novos cabeçalhos para `/docs/(.*)` e `/design-organization/(.*)`. Os dois redirecionamentos 301 não mudaram.
- **Isto não torna esses arquivos privados.** O Vercel serve a raiz do repositório inteira, então qualquer pessoa com a URL continua lendo os arquivos. O cabeçalho só pede aos buscadores que não indexem.

**Débitos**
- Os comentários do `components.css` (linhas 637, 683 e 713) e o `about.html` citam nomes de clientes; fora do escopo deste diário, sem decisão.
- `hope-demo.html` aparece como apagado na árvore de trabalho e ficou fora deste commit, por decisão do dono. Ao restaurar, as referências de versão dele estarão em 2.6.16.
- Demais débitos e decisões pendentes: sem mudança desde a v2.6.16.

---

## v2.6.16 · 19 de novembro de 2026 · Layout revertido: largura anterior mantida por decisão do dono (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.15 para 2.6.16).** Reverte um ajuste de valor, sem token novo nem renomeado. Versões: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.6.16, `tokens.css` (cabeçalho) 2.6.16, `GOVERNANCE.md` 1.5, `PATTERNS.md` 1.1.2.

**1. Reversão (commit `f88b60f`, `git revert` de `cb3404c`)**
- O dono não aprovou a nova largura de conteúdo. Voltam: `--content-max-width: 1280px` como teto (sem `--layout-*` nem alias), `max-width: 1200px` literal e a conta de 768px em diante do `.nav`, `240px 1fr` literal, `max-width: 68ch` na prosa e a conta antiga do `.cs-figure--full-bleed` (`34ch` e `128px`). Revert limpo, sem conflito. `css/layout.css`, `css/components.css` e `design-system.html` ficam idênticos ao estado de `ef7fea7`; `tokens.css` só difere pelo cabeçalho de versão. **As bordas (`ef7fea7`) ficam.**
- Verificado com larguras computadas (offsetWidth), 1024 / 1200 / 1366 / 1440 / 1920px, iguais às de antes da v2.6.15: `.container` e `.nav` 864 / 1040 / 1206 / 1280 / 1280; `.case-card__inner` igual; `.case-card` (faixa de ponta a ponta) 1024 / 1200 / 1366 / 1440 / 1920; `.case-content` 576 / 752 / 796 / 796 / 796. 75 valores comparados com a medição anterior, 2 diferenças, ambas só na posição (`left`) do `.case-card` e do `.case-card__inner` do `index` em 1024px, por causa da transformação de escala da animação de entrada no instante da captura; a largura é a mesma.
- **Problema que já existia no `.cs-figure--full-bleed` (não corrigido).** Em `dotz backup.html`, com movimento reduzido, a figura deveria encostar na borda esquerda do viewport (x = 0). Com a conta antiga ela fica em x = 0 só em 390px; em 768px fica em +94,2px, em 900px em +28,2px, em 1024px em -16px, em 1199px / 1200px em -103,5 / -104px e de 1366px em diante em -126,2px. Ou seja, nas telas largas a figura sai pela esquerda e sobra um vazio à direita. A classe só é usada no `dotz backup.html` e no `design-system.html`; nenhuma página ativa usa. A causa é a constante de `128px`, que não bate com o layout atual. Reportado, sem correção.

**2. Docs**
- `DESIGN.md` (seção Layout) e `DESIGN-IMPLEMENTATION.md` (seção 18) voltam à redação anterior à `cb3404c`, com uma nota nova de **divergência conhecida**: o Figma tem Layout/container 1040 e Layout/header 1200; o site renderiza o container em `min(1280px, 100% - 160px)` e o `.nav` na mesma largura. Decisão do dono, a corrigir no Figma; não reabrir como erro no próximo relatório de divergência.
- A escala de stroke do `DESIGN.md` e o trabalho de bordas não foram tocados.

**Débitos**
- Layout/* do Figma (container 1040, header 1200, reading 752): **decisão do dono: mantida a largura anterior (cap 1280, gutter mínimo de 80px, leitura 68ch); Figma Layout/* a alinhar.**
- Conta antiga do `.cs-figure--full-bleed` fora de alinhamento (acima).
- Nomenclatura dos tokens CSS contra o code syntax do Figma: pendente.
- Dark mode, adiado de propósito: `--color-bg-icon-chip` (CSS 14%, Figma 15%), `--color-bg-scrim-strong` dark e o anel extra do hover do vidro no dark.
- Literais de borda e de blur fora dos tokens: sem decisão.
- `.ds-sub` (títulos de subseção do `design-system.html`) é chrome da página, não um componente do Hope.
- Manutenção recorrente: ressincronizar `css/preflight-nomono.css` a cada upgrade do Tailwind.

---

## v2.6.15 · 19 de novembro de 2026 · Bordas e layout alinhados ao Figma (docs e código, PATCH)

**Atualização (v2.6.16): o item 2 (layout, `cb3404c`) foi revertido em `f88b60f` por decisão do dono. Valem só as bordas (item 1, `ef7fea7`).**

**Versão escolhida: PATCH (2.6.14 para 2.6.15).** Pela seção 3 do `GOVERNANCE.md`, é ajuste de valor para alinhar ao Figma, a fonte dos valores (seção 7). Os tokens de layout são novos, mas só espelham variáveis que o Figma já tinha e substituem o teto antigo (`--content-max-width`), sem família nova nem componente novo. Nenhuma variável CSS foi renomeada. Versões: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.6.15, `tokens.css` (cabeçalho) 2.6.15, `GOVERNANCE.md` 1.5, `PATTERNS.md` 1.1.2.

**1. Bordas (commit `ef7fea7`)**
- `--border-thin` 0,5px para **0,8px** (Figma Stroke/hairline, por papel). `--border-normal` e `--border-strong` seguem 1px (Stroke/thin; a força do strong vem da cor). Sem `--border-hairline`. Deslocamento de nome proposital (o "thin" do CSS é o "hairline" do Figma): mantém válidas as 33 referências a `--border-thin`.
- `DESIGN.md`: tabela "Escala de stroke" (Figma para CSS; medium 1,5, thick 2,4 e accent 3 sem token ainda).
- Verificado com estilo computado de todos os elementos, 7 páginas, 390 / 1024 / 1280px, antes e depois: **0 diferenças de borda**. No Chromium 0,5px, 0,8px e 1px renderizam todos como 1px (DPR 1 a 3).
- Larguras de borda escritas como literal, sem usar token (não alteradas): 21 declarações. 18 são `1px` (`components.css` 62, 74, 86, 98, 327, 917, 1257, 1616, 1625, 1686, 1840, 1921; `layout.css` 60, 258, 960; `auth.css` 82, 94, 238; cores sólidas ou translúcidas), 2 são `1.5px` (`components.css:1324`, `layout.css:1065`) e 1 é `3px` (`layout.css:909`, borda de acento). Nenhum literal de 0,5px no CSS. Nos exemplos do `DESIGN-IMPLEMENTATION.md` há dois `0.5px solid transparent` (botão e badge) que não batem com o CSS real (1px).

**2. Layout (commit `cb3404c`, revertido em `f88b60f`; descrição histórica)**
- Novos em `tokens.css`: `--layout-header: 1200px`, `--layout-container: 1040px`, `--layout-reading: 752px`, `--layout-sidebar: 240px`. `--content-max-width` ficou como **alias** de `--layout-container` (8 ocorrências no repositório; 4 usos de `var()` no CSS e na demo), então nenhuma referência antiga quebra. Os 3 usos de `var(--content-max-width)` no CSS passaram a `var(--layout-container)` ou `var(--layout-header)`.
- `.container`, `.case-card__inner` (e portanto hero, seções e rodapé): `min(var(--layout-container), 100% - 160px)`. **A partir de 1200px de viewport o conteúdo mede 1040px** (antes até 1280px). O gutter mínimo de 80px continua.
- `.nav`: o `max-width: 1200px` literal virou `var(--layout-header)` e a conta de 768px em diante usa `min(var(--layout-header), 100% - 160px)`. A linha do header fica em no máximo 1200px (em 1366px mede 1200, antes 1206; em 1440px, 1200, antes 1280). A partir de 1360px o header (1200) é 160px mais largo que o conteúdo das seções (1040), como no Figma.
- `.case-content`: `max-width: 68ch` (772 a 796px, conforme a fonte carregada) virou `var(--layout-reading)` (752px). `.case-layout`: `240px 1fr` virou `var(--layout-sidebar) 1fr`. 1040 - 240 - 48 = 752, então a prosa preenche exatamente a coluna.
- `.cs-figure--full-bleed`: a conta do breakout dependia de `68ch` e de uma constante de 128px que já não batia. Foi refeita com os tokens. Medido com movimento reduzido em `dotz backup.html`, de 390 a 1920px (9 larguras): a figura fica em x = 0 com largura igual à do viewport em todas.
- Larguras renderizadas (offsetWidth), 1024 / 1200 / 1366 / 1440 / 1920: `.container` 864 / 1040 / 1040 / 1040 / 1040 (antes 864 / 1040 / 1206 / 1280 / 1280); `.nav` 864 / 1040 / 1200 / 1200 / 1200 (antes 864 / 1040 / 1206 / 1280 / 1280); `.case-card__inner` igual ao `.container`; `.case-card` (faixa de ponta a ponta) 1024 / 1200 / 1366 / 1440 / 1920 (inalterada); `.case-content` 576 / 752 / 752 / 752 / 752 (antes 576 / 752 / 796 / 796 / 796).
- Efeitos visíveis em 1366 / 1440 / 1920px, sem overflow novo e sem barra horizontal: `index` sem mudança de altura; `about` +179 / +207 / +207px (hero e parágrafos quebram em mais linhas); `dotz` -161 / -209 / -209px (figuras 773 para 729px de largura, texto em mais linhas); `sb-home-redesign` -18 / -78 / -78px; `cloud-cost-intelligence` -209 / -250 / -250px. Mais linhas em: `.hero__body` no `about`, `.skill-card__body`, `.metric-desc`, `.persona__goal-card`, `.brand-list li`, `.case-lead__text`, parágrafos de `.case-section__body`, `h3` dos `highlight-card`, `.metric__label` e `dt` do `.case-hero__meta` no `cloud-cost-intelligence`.
- Docs: seção Layout do `DESIGN.md` (tabela dos quatro tokens e regra do gutter) e seção 18 do `DESIGN-IMPLEMENTATION.md`; texto do `design-system.html` sobre o `.nav`.
- Não alterado: `max-width: min(92vw, 1280px)` do lightbox (`components.css`, é a imagem ampliada, não o conteúdo).

**3. `--blur-glass` (só leitura, nada alterado)**
- Valor atual `blur(24px) saturate(1.5)`: o blur é o Blur/lg (24) do Figma; o saturate não é variável do Figma. O `.site-header` usa literais (`blur(30px) saturate(1.6)`, igual ao Blur/xl, e a versão `-webkit-` com `blur(20px)`, igual ao Blur/md) que não usam o token.

**Débitos**
- Largura do contêiner (Figma 1040 contra 1280 do CSS; leitura 752 contra 68ch): decisão do dono: mantida a largura anterior (cap 1280, gutter mínimo de 80px, leitura 68ch); Figma Layout/* a alinhar. O `cb3404c` foi revertido.
- ~~Bordas (mapeamento contra a escala de stroke)~~: resolvido em `ef7fea7`.
- Nomenclatura dos tokens CSS contra o code syntax do Figma: pendente.
- Dark mode, adiado de propósito: `--color-bg-icon-chip` (CSS 14%, Figma 15%), `--color-bg-scrim-strong` dark e o anel extra do hover do vidro no dark.
- Literais de borda e de blur fora dos tokens (lista acima): sem decisão.
- `.ds-sub` (títulos de subseção do `design-system.html`) é chrome da página, não um componente do Hope.
- Manutenção recorrente: ressincronizar `css/preflight-nomono.css` a cada upgrade do Tailwind.

---

## v2.6.14 · 19 de novembro de 2026 · Correções do relatório de divergência contra o Figma (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.13 para 2.6.14).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre correção de valor, de débito e de documentação. Nenhum token foi renomeado ou removido do CSS, nenhum valor renderizado mudou, e `--space-none` é um token novo sem consumidor (adição de um token, mas só de um zero que o Figma já tinha; não abre família nem componente, então segue PATCH). Versões dos arquivos: `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` 2.6.14, `tokens.css` 2.6.14 (cabeçalho), `GOVERNANCE.md` 1.5, `PATTERNS.md` 1.1.2.

Origem: relatório de divergência entre o snapshot do Figma de 19/11/2026 e o commit `76bdca6`. O Figma é canônico para valores; este repositório para prosa, regras e changelog (`GOVERNANCE.md`, seção 7, v1.5).

**1. `tokens.css`**
- Novo `--space-none: 0` na escala de espaçamento (Figma `Spacing/space-none`; o code syntax do Figma ainda aponta para `--space-1`, a corrigir no Figma).
- Cabeçalho "v1.4 · May 2026" virou v2.6.14 e passa a dizer que o Figma é a fonte dos valores.
- Comentário "Fluid type scale" corrigido: só display, h1, h2 e `--fs-body-xl` são fluidos.
- Comentário do `--fs-body-xl`: é o Body xl do Figma (tracking -1%), usado só no `.case-lead__text`. O Body lg (sem tracking) existe só no Figma, mantido de propósito sem token CSS.

**2. Bordas: não feito, aguarda decisão** (ver Débitos)

**3. `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` (valores do Figma vencem)**
- `text-tertiary-dark` #8888A0 para #9090A8; `link-hover-dark` de Daybreak para #FFD96B; `borda-dark` (#E0E0E8) virou `bg-neutral-hover-dark` (#E2E2E8). Primitivos `night-accent-hover`, `night-success-soft` e `night-error-soft` adicionados ao YAML.
- `bg-scrim-strong`: o dark no Figma é #000000 a 88% (`bg-scrim-strong-dark` adicionado ao YAML). Registrado como **divergência conhecida, pendente no CSS** (o CSS usa #0D0D0F a 88% nos dois temas).
- Dark `border-strong` #4A4A60 para #69697E e dark `text-3` #8888A0 para #9090A8 nos blocos de CSS. Aliases que se referiam a si mesmos (`--color-success: var(--color-success)` e os outros quatro) removidos.
- `--color-link`, `--color-link-hover` e `--color-focus-ring` marcados como nomes do code syntax do Figma, com o nome real do CSS ao lado (`--color-text-brand-primary`, `--color-text-brand-primary-hover`, `--color-border-focus-ring`). A decisão de nomenclatura segue pendente.
- Removidos por não estarem definidos em `tokens.css` nem usados em nenhum CSS, HTML ou JS: `--icon-xs` a `--icon-2xl` e `--icon-stroke` (e as classes `.icon--xs` a `.icon--2xl`), `--shadow-focus-error` e `--fs-code`. Os exemplos de código passaram a usar valor literal, com comentário.
- Nota nova: Body lg e Link existem no Figma sem token CSS, por decisão.

**4. `GOVERNANCE.md` v1.5 e `PATTERNS.md` v1.1.2**
- Seção 7 reescrita (fontes da verdade e ciclo de divergência); regra "Realidade vence documentação" removida das seções 6, 7 e 10; changelog retroativo da subseção do Tailwind (seção 11). `PATTERNS.md` tinha uma referência velha à precedência da seção 7, atualizada.

**Medições (bloco 0, só leitura)**
- Referências às variáveis em discussão para renomeação (focus-ring, brand-primary, accent-soft, positive-soft, danger-soft, material-*, night-*): o `output.css` não referencia nenhuma delas (0 em todas), então renomear no CSS não obriga a reconstruir o `output.css`.
- Largura do conteúdo, janelas de 1366 e 1440px: o 1280 de `--content-max-width` **é um teto do conteúdo, não do contêiner com gutters**. A largura é `min(1280px, 100% - 160px)`, com 80px de gutter de cada lado. Em 1366px o conteúdo mede 1206px; em 1440px, 1280px. Vale para `.container`, `.nav`, `.case-card__inner` (herói, seções, rodapé, cards). A coluna de prosa dos cases mede 772,5px (`.case-content`, `max-width: 68ch`, centralizada ao lado da barra lateral de 240px).

**Débitos e decisões pendentes**
- ~~**Bordas** (bloco 2 não feito).~~ Resolvido na v2.6.15 (`ef7fea7`). Texto original: `--border-thin` (0,5px, 33 usos), `--border-normal` (1px) e `--border-strong` (1px, cor forte) contra a escala de stroke do Figma (hairline 0,8, thin 1, medium 1,5, thick 2,4, accent 3). O nome `--border-thin` colide com o `thin` (1px) do Figma, então o mapeamento é ambíguo. No Chromium, 0,5px, 0,8px e 1px renderizam todos como 1px (testado em DPR 1, 1,25, 1,5, 2 e 3).
- **Nomenclatura** dos tokens CSS contra o code syntax do Figma (link, focus-ring, três soft, glass vs material, rampa Night): pendente.
- **Largura do contêiner:** decisão do dono na v2.6.16: mantida a largura anterior; Figma Layout/* a alinhar. Texto original: Figma `layout-container` 1040 (em um quadro de 1200 com gutters de 80) contra o teto de 1280 do CSS; e `layout-reading` 752 contra 772,5px (68ch). Pendente de decisão.
- **Dark mode, adiado de propósito:** `--color-bg-icon-chip` (CSS 14%, Figma 15%), `--color-bg-scrim-strong` dark e o anel extra do hover do vidro no dark.
- `.ds-sub` (títulos de subseção do `design-system.html`) é chrome da página, não um componente do Hope.
- Manutenção recorrente: ressincronizar `css/preflight-nomono.css` a cada upgrade do Tailwind.

---

## v2.6.13 · 19 de novembro de 2026 · Pilha monoespaçada do Tailwind removida do `output.css` e docs alinhadas às variáveis `size/*` do Figma (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.12 para 2.6.13).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre correção de débito técnico e melhoria de documentação sem mudança de token ou componente. Nenhum token, classe ou componente foi criado, removido ou renomeado, e o resultado renderizado não muda (0 diferenças medidas). O arquivo novo, `css/preflight-nomono.css`, é infraestrutura de build, não parte do sistema visual; por isso não é MINOR.

**1. Pilha monoespaçada do Tailwind (opção c)**
- Novo `css/preflight-nomono.css`: cópia de `node_modules/tailwindcss/preflight.css` (Tailwind v4.3.0) sem o `font-family` da regra `code, kbd, samp, pre`. Cabeçalho explica a mudança e que precisa ser ressincronizado a cada upgrade do Tailwind.
- `css/tailwind.css`: `@import "tailwindcss";` virou `@layer theme, base, components, utilities;` mais os imports de `tailwindcss/theme.css` (camada `theme`), `./preflight-nomono.css` (camada `base`) e `tailwindcss/utilities.css` (camada `utilities`). `--font-mono: initial;` no `@theme`.
- `css/output.css` reconstruído com `npm run build:css` (sem avisos). Tamanho 14.323 para 14.035 bytes. Linhas com `ui-monospace` no arquivo: 2 para 0, e nenhuma ocorrência de `Courier` nem `font-mono`. Efeito colateral: o arquivo versionado estava um pouco defasado em relação a um build novo (4 utilitários sem uso saíram, `.grow` passou a `.flex-grow`), sem efeito em nenhuma página.
- Verificado no repositório, antes e depois da reconstrução, nas 6 páginas que carregam o `output.css` mais o `design-system.html` (`index`, `about`, os 3 cases, `dotz backup`, `design-system`), 390 / 1024 / 1280px, todos os elementos, propriedades `font-family`, `font-size`, `line-height`, margin, padding, border, `box-sizing`, `display` e cor: **0 diferenças** (21 combinações, de 220 a 706 elementos cada). Nenhuma página carrega `output.css` e tem elemento `code`, `pre`, `kbd` ou `samp`, então a regra nunca se aplicava.
- Opções descartadas na análise: tirar o preflight inteiro (a) deu 7.959 diferenças de propriedade em 6.921 elementos; remover as linhas depois do build (b) funciona mas exige um passo pós-build a cada build.
- Passo de upgrade documentado em `GOVERNANCE.md`, seção 11.

**2. Docs alinhadas às variáveis `size/*` do Figma**
- Mobile igual a Desktop em H3 (16), Body (16), Body sm (13), Label (11) e Body xs (11). Lead: Desktop 19 e Mobile 16, code syntax `var(--fs-body-xl)`. Display, H1 e H2 seguem responsivos.
- Registrado em `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `hope-demo.html` e `design-system.html`. Busca por H3, Body, Body sm, Body xs e Label descritos como fluidos ou divergentes: nada encontrado fora dos registros históricos de versões anteriores.
- Versão 2.6.13 em todos os arquivos.

**Débitos**
- ~~Pilha monoespaçada padrão do Tailwind no `css/output.css`~~: resolvido nesta versão.
- `.ds-sub` (títulos de subseção do `design-system.html`, uppercase, peso 600) é chrome da página, não um componente do Hope.
- Manutenção recorrente (não é débito): ressincronizar `css/preflight-nomono.css` a cada upgrade do Tailwind.

---

## v2.6.12 · 19 de novembro de 2026 · `--fs-h3` fixo em 16px e `--fs-body-xl` documentado como token fluido (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.11 para 2.6.12).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre ajuste de valor sem mudar a estrutura. Nenhum token foi criado, removido ou renomeado e nenhuma classe mudou. O valor de `--fs-h3` é alinhado ao Figma (mesmo critério da v2.6.8 com `--fs-body` e da v2.6.11 com `--fs-body-sm`), a troca de token no `.case-section__subtitle` não muda nenhum estilo computado, e o resto é documentação.

**1. `--fs-h3` fixo em 16px (Figma Heading/H3)**
- `tokens.css`: `clamp(14px, 1.5vw, 16px)` virou `16px`. O nome do token não mudou.
- `.case-section__subtitle` (`components.css`): `font-size` de `var(--fs-body)` para `var(--fs-h3)`. Verificado com estilo computado de todos os elementos (font-family, font-size, line-height, margin, padding, border, box-sizing, display, cor), 3 páginas de case, 390 / 1024 / 1280px, antes e depois da troca: **0 diferenças**. São 34 subtítulos (7 no `dotz`, 10 no `sb-home-redesign`, 17 no `cloud-cost-intelligence`), 16px em todos.
- Efeito do valor fixo, medido em 7 páginas (`index`, `about`, os 3 cases, `dotz backup` e `design-system`), 390 / 1024 / 1280px, mesmas propriedades: 20 elementos e 40 diferenças de propriedade, todas em `font-size` e `line-height`, nenhuma outra. Em 1280px nada muda.

| Seletor | 390px | 1024px | Line height |
|---------|-------|--------|-------------|
| `.result-card__title` (`cloud-cost-intelligence` 1, `design-system` 2) | 14 para 16px | 15,36 para 16px | 19,6 / 21,5 para 22,4px |
| `.persona__name` (`dotz` 1, `dotz backup` 1) | 14 para 16px | 15,36 para 16px | 19,6 / 21,5 para 22,4px |
| `.persona__avatar` (`dotz`, `dotz backup`) e 1 `.is-zoomable` no mesmo bloco | 14 para 16px | 15,36 para 16px | 24,5 / 26,9 para 28px (herdado) |
| `.ds-topbar__title` e o texto de amostra do `h3` (`design-system`) | 14 para 16px | 15,36 para 16px | 24,5 / 19,6 e 26,9 / 21,5 para 28 / 22,4px |

- Verificado em 390 / 1024 / 1280px: `.persona__name`, `.result-card__title` e `.ds-topbar__title` renderizam 16px. `.ds-component__title` está definido no CSS do `design-system.html`, mas nenhum elemento da página usa a classe, então não há o que medir.
- Sem regressão: o `.result-card__title` deixa de ficar menor que o corpo de 16px ao redor em celular.

**2. `--fs-body-xl` documentado como token fluido (sem mudança de CSS)**
- `clamp(16px, 1.7vw, 19px)` mantido. Passa de "divergência aceita" a **token fluido documentado, extremos iguais ao Figma**: Desktop 19px e Mobile 16px. É o único token de texto de corpo fluido (Display, H1 e H2 também são fluidos, mas são títulos).
- O CSS interpola entre cerca de 941px (1,7vw igual a 16px) e cerca de 1118px (1,7vw igual a 19px); abaixo disso é 16px e acima é 19px. Valores intermediários, como 17,408px em 1024px, são esperados e não são divergência. Atenção: o texto da decisão dizia 768px como início da interpolação. Medido: 16px em 768px e em 941px; a interpolação só começa em cerca de 941px.
- Único consumidor: `.case-lead__text` (peso 500, line height 1,7, tracking -0,01em), 8 instâncias nas 3 páginas de case (5 no `dotz`, 1 no `sb-home-redesign`, 2 no `cloud-cost-intelligence`), mais 1 no `dotz backup.html`.
- Lista de divergências fluidas da v2.6.11: `--fs-h3` removido (alinhado), `--fs-body-xl` reescrito como token documentado. A lista deixa de existir.

**3. Docs atualizados**
- `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `hope-demo.html` e `design-system.html` (valor do `--fs-h3`, tabelas, texto de tipografia, nota do `--fs-body-xl`). Versão 2.6.12 em todos. `PATTERNS.md` e `GOVERNANCE.md` não citam esses tokens e não foram alterados.

**Débitos**
- ~~`--fs-h3` fluido~~ e ~~`--fs-body-xl` como divergência~~: fechados nesta versão.
- Pilha monoespaçada padrão do Tailwind no `css/output.css` (preflight de `code, kbd, samp, pre`), sem efeito visual. Aceito como débito.
- `.ds-sub` (títulos de subseção do `design-system.html`, uppercase, peso 600) é chrome da página, não um componente do Hope.

---

## v2.6.11 · 19 de novembro de 2026 · `--fs-body-sm` fixo em 13px e divergências fluidas documentadas (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.10 para 2.6.11).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre ajuste de valor sem mudar a estrutura. Nenhum token foi criado, removido ou renomeado e nenhuma classe mudou; só o valor de `--fs-body-sm`, para alinhar ao Figma, como foi feito com `--fs-body` na v2.6.8.

**1. Decisão do item 2 (v2.6.10): opção B**
- `tokens.css`: `--fs-body-sm: clamp(12px, 1vw, 13px)` virou `13px` fixo (Figma Body/Regular/body-sm). Line height do `.skill-card__body` mantido (1,7).
- `.skill-card__body` e `.persona__role` renderizam 13px em 390, 1024 e 1280px (conferido no estilo computado).

**2. O que muda (selector, antes e depois)**
Antes: 12px (390 e 1024px) e 12,8px (1280px). Depois: 13px nas três larguras. Seletores que usam o token, vistos nas 5 páginas:
- `index`: `.skip-link`, `.nav__link`, `.btn`, `.badge`, `.metric__label`, `.testimonial-card__profile-link`, `.testimonial-card__role`, `.footer__motto`.
- `about`: `.skill-card__body` (line height 20,4 / 20,4 / 21,76px para 22,1px), `.experience-item__company`, `.experience-item__role`, `.experience-item__highlight`, mais os comuns (`.skip-link`, `.nav__link`, `.btn`, `.footer__motto`).
- Cases: `.case-hero__meta` (`dd` e `a`), `.case-toc__link`, `.team-card__name`, `.cs-figure figcaption` e link, `.skill-card__body`, `.persona__role` (21 / 21 / 22,4px para 22,75px de line height), `.persona__meta dd`, `.persona__goal-card` (19,8 / 19,8 / 21,12px para 21,45px), `.brand-list li`, `.persona__quote` (`p` e `strong`), `.metric-desc` (com `strong` e `a`), `.case-section__results-legend`, `.small-note`, mais os comuns.
- Os `visually-hidden` dos cards clonados do ticker também mudam de tamanho, sem efeito visual.

**3. Medições (5 páginas, 390 / 1024 / 1280px)**
- Altura das páginas: `index` +82 / +8 / +1px, `about` +158 / +50 / +10px, `dotz` +300 / +375 / +64px, `sb-home-redesign` +278 / +173 / +39px, `cloud-cost-intelligence` +218 / +98 / +14px. Os valores de 390px batem com a previsão da v2.6.10.
- Elementos que ganham linha (390 / 1024 / 1280px): `index` 0 / 0 / 0; `about` 3 / 1 / 0; `dotz` 4 / 11 / 3; `sb-home-redesign` 4 / 6 / 1; `cloud-cost-intelligence` 4 / 2 / 3. São `.skill-card__body`, `figcaption`, `.metric-desc`, `.persona__goal-card`, `.brand-list li`, `.persona__quote p`, `.experience-item__highlight` e `.case-section__results-legend`. Nenhum elemento perde linha, exceto 1 link dentro do `.metric-desc` no `cloud-cost-intelligence` em 1024px, que só recompõe.
- Cards: `.skill-card` mais altos, por página e largura (soma, maior card): `about` +77 (26) / +29 (5) / +5 (1)px; `dotz` +78 (25) / +128 (32) / +6 (2)px; `sb-home-redesign` +189 (29) / +212 (30) / +59 (22)px; `cloud-cost-intelligence` +155 (26) / +108 (24) / +14 (1)px. `.testimonial-card` (index, 10 cards): +39 (5) / +39 (5) / +10 (1)px. `.persona__goal-card` (3): +11 / +29 / +3px.
- Corte, truncamento e overflow: nenhum elemento novo cortado nem com reticências, nenhuma barra horizontal (largura do documento igual à da janela em todas as 15 combinações).

**4. Divergências fluidas aceitas (item 2, fechado)**
- `--fs-body-xl` (`clamp(16px, 1.7vw, 19px)`, Figma 19px) e `--fs-h3` (`clamp(14px, 1.5vw, 16px)`, Figma 16px) **não foram alterados**. Documentados em `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` como divergências aceitas, com o motivo: `--fs-body-xl` fixo em 19px traria de volta o lead grande demais no celular, rejeitado para os heróis (v2.6.6); `--fs-h3` segue fluido por enquanto. Marcados como **revisáveis depois**, não como defeitos.

**5. Docs atualizados**
- `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `hope-demo.html` e `design-system.html` (valor do token, tabelas, texto de tipografia). Versão 2.6.11 em todos.

**Débitos**
- ~~Decisão pendente (item 2)~~ e ~~tokens fluidos~~: fechados nesta versão como divergências documentadas.
- Pilha monoespaçada padrão do Tailwind no `css/output.css` (preflight de `code, kbd, samp, pre`), sem efeito visual. Aceito como débito.
- `.ds-sub` (títulos de subseção do `design-system.html`, uppercase, peso 600) é chrome da página, não um componente do Hope.

---

## v2.6.10 · 18 de novembro de 2026 · Escopo dos parágrafos dos cases, regras órfãs e ticker com movimento reduzido (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.9 para 2.6.10).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre correção e ajuste de valor sem mudar a estrutura. Nenhum token foi criado, removido ou renomeado, nenhuma classe usada por página foi removida, e a mudança de seletor do item 1 só deixa os componentes usarem o valor que a própria regra já declarava. O item 2 (`.skill-card__body` em 13px) **não foi feito**: aguarda decisão, ver abaixo.

**1. `:where(.case-section__body) p` (especificidade 0)**
- `components.css`: o seletor `.case-section__body p` virou `:where(.case-section__body) p`. Os parágrafos de texto sem classe seguem com `font-family`, `font-size` 16px, `--color-text-2` e `max-width: 100%`.
- Verificado com o estilo computado de todo `<p>`, antes e depois (5 páginas, 390 / 1024 / 1280px, 747 medições): **114 mudaram e nenhuma é parágrafo sem classe**. Lista exata:
  - `.skill-card__body` (13 no `sb-home-redesign` e 17 no `cloud-cost-intelligence`, 90 medições): 16px para 12px em 390 e 1024px e 12,8px em 1280px; line height 27,2px para 20,4px / 20,4px / 21,76px. Os cards ficam mais baixos.
  - `.persona__role` (dotz, 1): 16px para 12px / 12px / 12,8px; cor `--color-text-2` para `--color-text-3`; line height 28px para 21px / 21px / 22,4px.
  - `.case-lead__text` (6 por largura: 3 no dotz, 1 no sb-home-redesign, 2 no cloud-cost-intelligence): cor `--color-text-2` (61,61,69) para `--color-text-1` (13,13,15). Tamanho igual.
  - `.result-card__title` (cloud-cost-intelligence, 1): cor `--color-text-2` para `--color-text-1`; tamanho 16px para 14px / 15,36px / 16px (em 1280px não muda).
- Altura das páginas, 390 / 1024 / 1280px: `sb-home-redesign` -734 / -625 / -342px, `cloud-cost-intelligence` -434 / -327 / -190px, `dotz` -14px em 390px e -5px em 1280px, `about` sem mudança.

**2. `.skill-card__body` em 13px: pendente de decisão**
- O Figma é Body sm, 13px. O token existe, `--fs-body-sm`, mas é fluido: `clamp(12px, 1vw, 13px)`, então só chega a 13px acima de cerca de 1300px. Hoje o card renderiza 12px (390 e 1024px) e 12,8px (1280px). Para ter 13px em todo breakpoint há duas saídas, e a escolha muda mais que este seletor: (A) fixar 13px só no `.skill-card__body` (valor escrito na regra, sem token); (B) fixar `--fs-body-sm` em 13px, como foi feito com `--fs-body`, o que afeta todos os usos do token.
- Medido (card do `.skill-card__body`, 390 / 1024 / 1280px). A: 13px, line height 22,1px (1,7); `about` +80 / +15 / +3px de página; `sb-home-redesign` +132 / +90 / +31px; `cloud-cost-intelligence` +133 / +63 / +7px. B: o mesmo nos cards, mais todos os outros usos do `--fs-body-sm`: em 390px `index` +82px, `about` +158px, `dotz` +300px, `sb-home-redesign` +278px, `cloud-cost-intelligence` +218px (de 0 a 4 elementos ganham linha por página); em 1280px de +1 a +64px.

**3. Outros valores liberados pelo item 1 (relatório, sem alteração)**

| Elemento | Antes | Depois (390 / 1024 / 1280px) | Na escala do Figma? |
|----------|-------|------------------------------|---------------------|
| `.persona__role` | 16px, `--color-text-2` | 12 / 12 / 12,8px, `--color-text-3` | Não. Body sm é 13px: 1px, 1px e 0,2px abaixo. Vem do `--fs-body-sm` fluido |
| `.case-lead__text` cor | `--color-text-2` | `--color-text-1` | Cor, não tamanho. O tamanho segue 16 / 17,4 / 19px (`--fs-body-xl` fluido); só 19px (1280px) e 16px (390px, igual ao Body) caem na escala, 17,4px não |
| `.result-card__title` cor e tamanho | 16px, `--color-text-2` | 14 / 15,36 / 16px, `--color-text-1` | 16px sim (H3). 14px e 15,36px não: H3 é 16px. Vem do `--fs-h3` fluido |
| `.skill-card__body` (também liberado) | 16px | 12 / 12 / 12,8px | Não. Body sm é 13px |

**4. Regras `.about-split` removidas**
- Busca em HTML, JS, CSS e docs: nenhuma referência. Removidos de `layout.css`: `.about-split`, a variante de 768px, `.about-split__blocks` e `.about-split__block`, com o cabeçalho da seção. Sem efeito visual. O `.about-split` não existe mais em nenhum CSS.

**5. Ticker de depoimentos com `prefers-reduced-motion`**
- **A causa não era o `.logo-strip__track`**, como as versões 2.6.8 e 2.6.9 registraram. Com a faixa de logos escondida a largura do documento continuava 3725px. A causa é o `.testimonials-ticker`: com movimento reduzido a trilha não anima e fica sem `transform`. Os `<span class="visually-hidden">` dos cards clonados são `position: absolute`, e sem um ancestral posicionado ou transformado escapam do `overflow: hidden` do ticker. Com movimento normal o `transform` da trilha animada já os contém.
- Efeito real, medido em emulação de celular (390px): antes da correção o `header` ficava com 1560px de largura e o botão do menu (hambúrguer) em x=1148, fora da tela. Rolar com roda, teclado e toque não movia a página (a raiz usa `overflow-x: clip`), então o problema aparecia como layout largo demais, não como barra de rolagem.
- Correção: `position: relative` em `.testimonials-ticker` (`layout.css`, 1 linha).
- Verificado em `index` e `design-system.html`, 390 / 1024 / 1280px, com e sem movimento reduzido: largura do documento igual à da janela em todos os casos (antes 3725px em `index` com movimento reduzido); em 390px com movimento reduzido o `header` volta a 390px e o botão a x=338. Com movimento normal, 0 elementos com posição ou tamanho diferente, desconsiderando só o deslocamento horizontal das trilhas animadas.

**Débitos**
- ~~Escopo de `.case-section__body p`~~, ~~regras `.about-split`~~ e ~~ticker com movimento reduzido~~: resolvidos nesta versão.
- **Decisão pendente (item 2):** como chegar a 13px no `.skill-card__body`, opção A ou B acima. Relacionado: `--fs-body-sm` (12 a 13px), `--fs-h3` (14 a 16px) e `--fs-body-xl` (16 a 19px) são fluidos e o Figma usa o tamanho fixo (13, 16 e 19px). Fora da escala fora do desktop largo.
- Pilha monoespaçada padrão do Tailwind no `css/output.css` (preflight de `code, kbd, samp, pre`), sem efeito visual. Aceito como débito.
- `.ds-sub` (títulos de subseção do `design-system.html`, uppercase, peso 600) é chrome da página, não um componente do Hope.

---

## v2.6.9 · 18 de novembro de 2026 · Labels em Regular, título do time como Label caps e regras órfãs removidas (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.8 para 2.6.9).** Pela seção 3 do `GOVERNANCE.md`, PATCH cobre correção e ajuste de valor sem mudar a estrutura. Nenhum token, componente ou classe usada por alguma página foi criado, removido ou renomeado. As regras removidas no item 1 não eram usadas em nenhum HTML nem JS, então não quebram compatibilidade. O peso das labels (item 3) e o título do time (item 2) são ajustes de valor para alinhar ao Figma.

**1. Regras órfãs do `.about-split` removidas**
- Busca em todo HTML, JS, CSS e docs: nenhuma página nem script referencia qualquer classe `about-split`. Removidos de `layout.css`: `.about-split__quote-text` (itálico, contradizia "Itálico nunca"), `.about-split__quote::before` (aspa decorativa, com a variante dark) e `.about-split__attribution` (a atribuição da citação). O comentário da seção foi ajustado.
- Sem efeito visual (nenhum elemento usava as regras).
- Também sem uso, mantidas por não existirem só para a citação: `.about-split` (grid), `.about-split__blocks` e `.about-split__block`. Ver débitos.

**2. `.team-section__title` como Label caps**
- Seletor de `.team-section__title` para `.case-section__body .team-section__title` (0,2,0 contra 0,1,1 do `.case-section__body p`, sem `!important`) e `line-height: 1.4`. Usado só dentro de `.case-section__body`, nos 3 cases.
- Medido nos 3 cases, em 390, 1024 e 1280px (6 títulos por largura, resultado igual em todos): tamanho 16 para 11px, peso 400, line height 1,75 para 1,4, cor `--color-text-2` (rgb 61,61,69) para `--color-text-3` (rgb 95,95,110), contraste 10,76:1 para 6,27:1 (passa 4,5:1), altura 28 para 15,4px, 1 linha. Altura de cada página de case: -25px nas três larguras.

**3. Todas as labels uppercase em Regular (400)**
- `.case-phase-break__label` (era 700), `.case-card__eyebrow` (500) e `.header__status-badge` (600): declaração de peso removida, herdam 400. `.badge--draft` (500): `font-weight: 400` explícito, porque herdaria 500 do `.badge`. Tamanho, tracking e cor não mudaram. Conferido no navegador: todo elemento uppercase renderiza em 400, exceto `.ds-sub` (ver débitos).
- `.case-phase-break__label` nos 3 cases (8 rótulos: 3 no dotz, 3 no sb-home-redesign, 2 no cloud-cost-intelligence; mais 1 no `design-system.html`), 390 / 1024 / 1280px: largura do rótulo 137,8 para 134,6px no primeiro e 138,8 para 136,0 no mais largo; a régua ao lado ganha 3,2px (184,2 para 187,4 / 418,2 para 421,4 / 638,6 para 641,8px); altura 19,3px e 1 linha, sem mudança; linha inteira 91,3px, sem mudança; sem quebra; altura das páginas sem mudança; contraste 6,27:1, igual.
- Leitura como divisor: continua rótulo uppercase à esquerda, régua de 1px preenchendo a linha e 64px de respiro acima. O rótulo fica um pouco mais leve e quieto, na mesma cor, tamanho e posição. A hierarquia depende da posição, da régua e do espaço, não do peso, então não há perda de função. Nada nas páginas depende do negrito para contraste (a cor não mudou).
- `.case-card__eyebrow` e `.badge--draft` só aparecem no `design-system.html`. `.header__status-badge` está com `display: none` nas páginas, sem mudança visível.
- **Labels são Regular no Hope e não existe variante bold de label.** Registrado em `DESIGN.md` e `DESIGN-IMPLEMENTATION.md`, e na descrição de tipografia do `design-system.html` e da demo.

**Verificação:** 5 páginas, 390 / 1024 / 1280px. Sem erro de console, sem clipping nem truncamento novos, nenhum elemento ganha ou perde linha. As únicas mudanças de altura são as -25px por título do item 2.

**Débitos que seguem abertos**
- ~~**Escopo de `.case-section__body p` (achado, sem alteração).** A regra (0,1,1) força `font-size`, `color`, `font-family` e `max-width: 100%` em todo `<p>` dentro de `.case-section__body`. Os parágrafos de texto sem classe dependem disso e é intencional. Mas ela também vence componentes com regra própria de uma classe (0,1,0). Hoje contra o valor da regra própria, em 1280px: `.skill-card__body` (sb-home-redesign 13, cloud-cost-intelligence 17) 16px contra 12,8px (12px em 390px); `.persona__role` (dotz) 16px e `--color-text-2` contra 12,8px e `--color-text-3`; `.case-lead__text` (6 no total) cor `--color-text-2` contra `--color-text-1`; `.result-card__title` (cloud) cor `--color-text-2` contra `--color-text-1` (e 16px contra 14px em 390px). Não são vencidos, porque a regra própria é mais específica ou usa `!important`: `.metric-desc`, `.case-section__results-legend`, `.small-note`, `.persona .persona__section p` e `.team-section__title` (corrigido no item 2). Trocar por `.case-section__body > p` **não** serve: os parágrafos aninhados (a maior parte do texto) perderiam `--color-text-2` (viram `--color-text-1`) e `max-width: 100%` (viram 70ch). Recomendado: `:where(.case-section__body) p`, que mantém o escopo com especificidade 0 e deixa cada componente usar o próprio valor. Simulado, só mudam os componentes citados, e os parágrafos comuns ficam iguais: altura das páginas 1280 / 390px, dotz -5 / -14px, sb-home-redesign -342 / -734px, cloud-cost-intelligence -190 / -434px, `about` sem mudança.~~ Resolvido em 18 de novembro de 2026 (v2.6.10): `:where(.case-section__body) p`.
- ~~`.about-split`, `.about-split__blocks` e `.about-split__block` seguem em `layout.css` sem nenhum uso nas páginas. Decidir se saem.~~ Resolvido em 18 de novembro de 2026 (v2.6.10): regras removidas.
- `.ds-sub` (títulos de subseção do próprio `design-system.html`, uppercase, peso 600) é chrome da página, não um componente do Hope, e não foi alterado.
- Pilha monoespaçada padrão do Tailwind no `css/output.css` (preflight de `code, kbd, samp, pre`), sem efeito visual.
- ~~Com `prefers-reduced-motion`, o `.logo-strip__track` do `index` vaza para o lado e cria rolagem horizontal. Já acontecia antes e não depende destas mudanças. Sem movimento reduzido não há overflow.~~ Resolvido em 18 de novembro de 2026 (v2.6.10): a causa era o `.testimonials-ticker`; `position: relative`.

---

## v2.6.8 · 18 de novembro de 2026 · Body fixo em 16px, headline do about no H1 e line height dos parágrafos (docs e código, PATCH)

**Versão escolhida: PATCH (2.6.7 para 2.6.8).** A convenção do `GOVERNANCE.md` (seção 3) define PATCH como ajuste de valor sem mudar a estrutura. Nenhum token foi criado, removido ou renomeado, e o papel de cada um segue igual. MINOR é para componente, família de tokens ou cor nova, e MAJOR para quebra de compatibilidade. O item 2 muda o tamanho do texto de todas as páginas em celular e tablet (14 para 16px), o que é visível, mas continua sendo um ajuste de valor do `--fs-body`, como as mudanças de tamanho das versões 2.6.4 e 2.6.6. Quem preferir contar o impacto visual como mudança funcional pode tratar como 2.7.0.

**1. `.about-bridge__headline` no H1**
- `font-size` de `clamp(24px, 3.5vw, 36px)` para `var(--fs-h1)`, tracking de -0,02em para -0,01em, line height 1,2 (já era). Só no `index`.
- Medido: 390px 24 para 26px, altura 55,9 para 60,5px (4,6px mais alto); 1024px 35,84 para 32px, 83,4 para 74,5px; 1280px 36 para 32px, 83,8 para 74,5px. Sempre 2 linhas, sem overflow. Altura da página `index`: +4px, -9px e -10px.

**2. `--fs-body` fixo em 16px**
- `tokens.css`: de `clamp(14px, 1.2vw, 16px)` para `16px`. Nenhum outro token mudou. O texto de corpo sobe 2px em 390 e 1024px (14 para 16) e 0,64px em 1280px (15,36 para 16).

| Página | 390px | 1024px | 1280px |
|--------|-------|--------|--------|
| `index` | +301px (5,0%), 21 elementos ganham linha | +150px (2,2%), 22 | +52px (0,8%), 10 |
| `about` | +369px (6,3%), 7 | +82px (1,9%), 0 | +72px (1,7%), 3 |
| `dotz` | +1158px (6,3%), 24 | +566px (3,4%), 10 | +182px (1,0%), 1 |
| `sb-home-redesign` | +1721px (10,8%), 33 | +1118px (8,3%), 27 | +239px (1,7%), 0 |
| `cloud-cost-intelligence` | +1686px (8,8%), 35 | +943px (5,7%), 21 | +265px (1,5%), 2 |

- Elementos que ganham linha em 390px: parágrafos sem classe (64), `strong` (15), `.skill-card__body` (12), `.testimonial-card__quote` (10), `.text-highlight` (7), `.case-section__subtitle` (4), `.skill-card__title` (4), `.case-card__lead` (2), `.about-bridge__body` (1) e `.hero__body` (1). Elementos aninhados (`strong`, `.text-highlight`) contam à parte do parágrafo. Alguns elementos também perdem linha (por exemplo 4 em 390px no `index` e 8 em 1280px no `dotz`), por causa de quebras diferentes.
- Conferido sem quebra: nenhum elemento passou a cortar conteúdo, truncar texto ou vazar uma linha `nowrap`. A altura do header não mudou. O menu mobile (390px) fica com links de 16px e 52px de altura (eram 14px e 48,5px) e o painel cresce 17,5px no `index` e no `about` e 14px nos cases, sem cortar. Cards (`.case-card`, `.skill-card`, `.testimonial-card`, `.persona`) conferidos nas capturas. Nenhuma regra precisou de ajuste.
- Overflow horizontal: nenhum, com ou sem a mudança, com movimento normal.

**3. Line height de `.case-section__body p`**
- A regra definia `line-height: 1.75`, o que sobrescrevia o valor próprio dos componentes dentro das seções dos cases. A declaração foi removida. Os parágrafos comuns continuam em 1,75 (herdado do `body`; o Body do Figma é 175%) e os componentes voltam ao seu: `.case-lead__text` 1,75 para 1,7 (Body xl), `.skill-card__body` e `.small-note` 1,75 para 1,7, `.result-card__title` 1,75 para 1,4. Ficou 1,75 nos parágrafos, e não 1,7, porque o Body do Figma é 1,75; o 1,7 é do Body xl.
- Altura das páginas dos cases: 390px dotz -11px, sb-home-redesign -58px, cloud-cost-intelligence -59px; 1024px -7, -46 e -39px; 1280px -8, -32 e -31px. `index` e `about` sem mudança. Nenhum elemento mudou de número de linhas.

**Débitos que seguem abertos**
- ~~**A discutir:** peso das labels uppercase (500, 600 e 700 em alguns rótulos). Ver a entrada v2.6.7.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): todas as labels uppercase em Regular (400).
- ~~`.about-split__quote-text`: regra órfã (sem uso nas páginas), itálico. Decisão pendente, provavelmente remover.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): regras órfãs removidas.
- ~~`.team-section__title` renderiza em 16px (era 15,36px antes da v2.6.8), e não nos 11px de Label caps, porque `.case-section__body p` (especificidade 0,1,1) vence `.team-section__title` (0,1,0) em tamanho e cor (vira `--color-text-2`, e não `--color-text-3`). Usado nos 3 cases ("Impact", "Involved teams", "Team Composition"). Sem o override seria 11px, `--color-text-3` (contraste 6,27:1 contra 10,76:1 hoje) e 8,5px mais baixo por título, com line height 1,75 (o Label caps do Figma é 1,4). A mesma regra força o tamanho de outros componentes dentro das seções dos cases: o `.skill-card__body` renderiza em 16px lá e em 12,8px no `about`.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): Label caps de 11px.
- Pilha monoespaçada padrão do Tailwind no `css/output.css` (preflight de `code, kbd, samp, pre`), sem efeito visual.
- ~~Com `prefers-reduced-motion`, o `.logo-strip__track` do `index` vaza para o lado e cria rolagem horizontal (3725px de largura de rolagem). Já acontecia antes desta versão e não depende dela. Sem movimento reduzido não há overflow.~~ Resolvido em 18 de novembro de 2026 (v2.6.10): a causa era o `.testimonials-ticker`; `position: relative`.

---

## v2.6.7 · 18 de novembro de 2026 · Mapeamento do lead dos cases e rebuild do output.css (docs e código, PATCH)

**`.case-lead__text` é o Body xl do Figma**
- O Figma define o Body xl (`size/lead`, 19px) com tracking -1%. O `.case-lead__text` já tinha `letter-spacing: -0.01em`, então não houve mudança de CSS nem visual. `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` v2.6.7 registram o mapeamento e que o peso 500 é válido (o Body do Figma tem Regular, Medium, SemiBold e Bold). O `--fs-body-xl` passa a ter tracking -0,01em na tabela, e `hope-demo.html` e `design-system.html` mostram isso. Nas notas anteriores o mesmo estilo aparecia como Body lg.
- Medido: tamanho 16 / 17,4 / 19px em 390 / 1024 / 1280px, peso 500, tracking -0,01em. O line height renderiza 1,75 na maioria dos parágrafos (a regra `.case-section__body p` é mais específica que o 1,7 do `.case-lead__text`), contra 1,7 do Figma. Não foi alterado (ver débitos).

**`css/output.css` reconstruído (`npm run build:css`)**
- Diferença: 26 linhas a mais, todas novas. Um token de tema (`--shadow-md`) e 8 utilitários: `.flex-1`, `.rounded`, `.text-center`, `.text-left`, `.text-right`, `.italic`, `.overline`, `.ease-linear`.
- De onde vêm: o Tailwind v4 também varre os outros arquivos do projeto (por exemplo os exemplos de CSS do `DESIGN-IMPLEMENTATION.md`), não só `index.html` e `about.html`. Nenhuma página nem script usa essas classes, e o CSS do site não as define.
- Verificado em 7 páginas, 390px e 1280px, com e sem o rebuild: estilo computado e caixa de todos os elementos idênticos (0 diferenças). Para confirmar que o teste enxerga a mudança, uma classe de teste recebe `border-radius`, `text-align`, `font-style` e `flex-grow` só com o arquivo novo.
- A pilha monoespaçada padrão do Tailwind **continua** no arquivo (3 linhas, no tema e no preflight de `code, kbd, samp, pre`). O rebuild não a remove, e mesmo com `--font-mono` e `--default-mono-font-family` redefinidos em `@theme` o preflight mantém o valor de reserva escrito (fica sem efeito, porque a variável existe). Nenhuma página renderiza fonte mono. Fica registrado como débito.

**Débitos (só relatório, sem alteração)**
- ~~**A discutir:** peso das labels uppercase. Em uso: 400 na maioria (overlines, `dt`, números de seção, rótulos do `persona`), 500 no `.case-card__eyebrow` (só no `design-system.html`) e no `.badge--draft` (12,8px), 600 no `.header__status-badge` (10px, oculto) e 700 no `.case-phase-break__label` (nos 3 cases, 9 rótulos), o único em negrito em páginas de produção. `.team-section__title` renderiza em 15,36px (uppercase com 0,12em), não 11px, por causa de uma regra mais específica.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): todas as labels uppercase em Regular (400).
- ~~**`--fs-body` fluido contra o Body fixo de 16px do Figma.** Hoje `clamp(14px, 1.2vw, 16px)`: 14px até cerca de 1167px e 16px só a partir de cerca de 1333px. Fixar em 16px aumenta a página em 5 a 11% de altura em 390px e faz até 35 elementos por página ganharem linha. Sem overflow horizontal. Medições completas no relatório desta entrega.~~ Resolvido em 18 de novembro de 2026 (v2.6.8): `--fs-body` fixo em 16px.
- ~~`.about-bridge__headline` (só no `index`): 36 / 24px, tracking -0,02em. Como `--fs-h1` (32 / 26px, 1,2, -0,01em) ficaria com as mesmas 2 linhas em 390, 1024 e 1280px, sem overflow. A altura muda de 55,9 para 60,5px em 390px (4,6px mais alto, porque 24 vira 26px) e de 83,5 / 83,8 para 74,5px em 1024 / 1280px (cerca de 9px mais baixo).~~ Resolvido em 18 de novembro de 2026 (v2.6.8): mapeado para `--fs-h1`.
- ~~`.about-split__quote-text` (sem uso nas páginas): 18 a 26px, peso 400, **itálico**, line height 1,55, tracking -0,01em. O itálico contradiz a regra "Itálico nunca" dos docs.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): regras órfãs removidas.
- ~~`.case-lead__text`: line height renderizado 1,75 contra 1,7 do Figma (ver acima).~~ Resolvido em 18 de novembro de 2026 (v2.6.8): `.case-section__body p` não define mais line height.

---

## v2.6.6 · 18 de novembro de 2026 · Hero e subtítulo dos cases em Body, não em Body lg (docs e código, PATCH)

Decisão de 18/11/2026: o lead de 19px (`--fs-body-xl`) ficou grande demais no hero. `.hero__body` e `.case-hero__subtitle` passam de `--fs-body-xl` para `--fs-body`, com line height 1,75 (era 1,7). **Essas duas regras usam Body, não Body lg, de propósito.** O `--fs-body` não foi alterado: `clamp(14px, 1.2vw, 16px)`, fluido, mínimo 14px (até cerca de 1167px de largura) e máximo 16px (a partir de cerca de 1333px). Em 1280px renderiza 15,36px. O `--fs-body-xl` continua existindo e vale para o lead dos cases (`.case-lead__text`). Isso substitui a migração da v2.6.5 para essas duas regras.

**Antes (v2.6.5, `--fs-body-xl`) e depois (`--fs-body`): tamanho e número de linhas**

| Página | 390px | 1024px | 1280px |
|--------|-------|--------|--------|
| `index` (2 parágrafos do hero) | 16 para 14px, 2L e 2L, igual | 17,4 para 14px, 1L e 1L, igual | 19 para 15,4px: **1º parágrafo 2L para 1L**, 2º igual (1L) |
| `about` (3 parágrafos) | 16 para 14px: 5L e 5L iguais, **3º 3L para 2L** | 17,4 para 14px: **1º e 2º 3L para 2L**, 3º igual (1L) | 19 para 15,4px: 3L e 3L iguais, **3º 2L para 1L** |
| `dotz` (subtítulo) | 16 para 14px, 4L, igual | 17,4 para 14px, 2L, igual | 19 para 15,4px, 2L, igual |
| `sb-home-redesign` (subtítulo) | 16 para 14px, 4L, igual | 17,4 para 14px, 2L, igual | 19 para 15,4px, 2L, igual |
| `cloud-cost-intelligence` (subtítulo) | 16 para 14px, 3L, igual | 17,4 para 14px, 2L, igual | 19 para 15,4px, 2L, igual |

- Tamanho renderizado agora: 14px em 390px e em 1024px, 15,36px em 1280px, com line height 1,75. Em relação ao original (antes da v2.6.5, `--fs-body-lg`) fica 1px menor em 390px e 1024px (15 para 14px) e 1,64px menor em 1280px (17 para 15,36px).
- Linhas: 5 parágrafos perdem uma linha (index e `about`) e nenhum ganha. Sem overflow horizontal, sem erros de console, sem mudança de cor.

**Docs:** `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `hope-demo.html` e `design-system.html` v2.6.6: `body-xl` volta a ser só o lead dos cases; `body` registra que o hero e o subtítulo dos cases usam Body de propósito. No `design-system.html`, a amostra do `--fs-body` passou de line height 1,65 para 1,75 (Figma Body).

**Débitos:** sem mudança. Segue aberto, "a discutir", o peso das labels uppercase.

---

## v2.6.5 · 18 de novembro de 2026 · Lead de 19px no hero e nos cases, `--fs-body-lg` removido (docs e código, PATCH)

Decisão de 18/11/2026 (opção A): `.hero__body` e `.case-hero__subtitle` passam de `--fs-body-lg` para `--fs-body-xl`, o lead de 19px do Figma (Body lg, `size/lead`), com o mesmo line height 1,7 e o mesmo comportamento fluido do token (`clamp(16px, 1.7vw, 19px)`). O `--fs-body-lg` (17px no desktop) foi removido de `tokens.css`, porque o Figma não tem esse tamanho. Era usado só por essas duas regras.

**Antes e depois (tamanho e número de linhas)**

| Página | 390px | 1024px | 1280px |
|--------|-------|--------|--------|
| `index` (2 parágrafos do hero) | 15 para 16px, 2L e 2L, igual | 15 para 17,4px, 1L e 1L, igual | 17 para 19px: **1º parágrafo 1L para 2L**, 2º igual (1L) |
| `about` (3 parágrafos) | 15 para 16px, 5L, 5L e 3L, igual | 15 para 17,4px: **1º 2L para 3L, 2º 2L para 3L**, 3º igual (1L) | 17 para 19px, 3L, 3L e 2L, igual |
| `dotz` (subtítulo) | 15 para 16px, 4L, igual | 15 para 17,4px, 2L, igual | 17 para 19px, 2L, igual |
| `sb-home-redesign` (subtítulo) | 15 para 16px, 4L, igual | 15 para 17,4px, 2L, igual | 17 para 19px, 2L, igual |
| `cloud-cost-intelligence` (subtítulo) | 15 para 16px, 3L, igual | 15 para 17,4px, 2L, igual | 17 para 19px, 2L, igual |

- Linhas novas: 3 parágrafos no total (índice a 1280px e `about` a 1024px). Sem overflow horizontal, sem erros de console, sem mudança de cor nem de line height.
- Em 390px o aumento é de 1px (15 para 16px) e nenhuma página muda de número de linhas.

**Docs**
- `DESIGN.md`, `DESIGN-IMPLEMENTATION.md` e `hope-demo.html` v2.6.5: `body-lg` removido do YAML, das tabelas e do bloco `clamp`; `body-xl` descrito como o lead (Body lg do Figma) usado no hero, no subtítulo dos cases e no lead dos cases. A demo não tinha mais o token e não resolvia `--fs-body-lg`, então a linha foi removida. `design-system.html` ganhou a linha do `--fs-body-xl`.

**Débitos:** o item "em decisão" (`--fs-body-lg`) está fechado. Segue aberto, "a discutir", o peso das labels uppercase.

---

## v2.6.4 · 18 de novembro de 2026 · H3 Bold, Body xs, label fixo e títulos no estilo do Figma (docs e código, PATCH)

Decisões de 18/11/2026: seguir o Figma Foundation nos quatro itens abaixo. O peso das labels uppercase (eyebrow 500, phase break 700, status badge 600) ficou fora do escopo e segue em aberto, "a discutir". O item 2 (`--fs-body-lg`) estava em decisão e foi resolvido na v2.6.5.

**1. H3 em Bold**
- `.text-h3` (`reset.css`) e `.case-section__subtitle` (o `<h3>` de 16px usado nos cases) de 600 para 700. `.persona__name`, `.result-card__title` e `.skill-card__title` já eram 700.
- Visual: `.text-h3` não é usado em nenhuma página. `.case-section__subtitle` (34 elementos nos 3 cases) fica mais pesado. Em 390px, um título quebra em 2 linhas em vez de 1: "Restricted access to the people I was designing for" (cloud-cost-intelligence).

**3. `--fs-body-xs` e `--fs-label` fixos em 11px**
- `tokens.css`: novo `--fs-body-xs: 11px`. `--fs-label` passou de `clamp(10px, 1vw, 11px)` para `11px`.
- Visual: em 390px, todo texto que usava `--fs-label` vai de 10px para 11px (entre 1000 e 1100px de largura também sobe, de forma gradual). Afeta os overlines, `dt` dos metadados, `.case-phase-break__label`, `.case-section__number`, `.footer__copy`, `.persona__*` e as páginas do próprio design system. Em 1280px não muda nada. Nenhum texto ganhou linha em 390px nem 1280px.
- `.header__status-badge` mantém 10px fixo (não usa o token, e não aparece nas páginas).

**4. Tracking e line height dos títulos pelo estilo do Figma**

| Regra | Tamanho 1280 / 390 | Estilo do Figma | Antes (lh, tracking) | Depois (lh, tracking) |
|-------|--------------------|-----------------|----------------------|-----------------------|
| `.footer__heading` | 32 / 26px | H1 | 1,15 e -0,02em | 1,2 e -0,01em |
| `.case-hero__title` | 32 / 26px | H1 | 1,2 e -0,02em | 1,2 e -0,01em |
| `.case-callout__text` | 32 / 26px | H1 | 1,25 e -0,02em | 1,2 e -0,01em |
| `.case-card__title` | 22 / 18px | H2 | 1,2 e -0,01em | 1,3 e -0,01em |
| `.case-card--glass .case-card__title` | 22 / 18px | H2 | 1,2 e -0,02em | 1,3 e -0,01em |
| `.case-section__title` | 22 / 18px | H2 | 1,25 e -0,01em | 1,3 e -0,01em |
| `.case-section__subtitle` | 15,4 / 14px | H3 | 1,5 e 0 | 1,4 e 0 |
| `.persona__name` | 16 / 14px | H3 | 1,3 e 0 | 1,4 e 0 |
| `.result-card__title` | 16 / 14px | H3 | 1,3 e 0 | 1,4 e 0 |
| `.skill-card--metric .metric-value` | 22 / 18px | Metric | 1,1 | 1,4 |

- Altura por linha (1280px): `.footer__heading` +1,6px, `.case-section__title` +1,1px, `.case-card__title` +2,2px, `.case-callout__text` -1,6px, `.case-section__subtitle` -1,5px. Tracking de -0,02em para -0,01em deixa cada letra 0,32px (H1) ou 0,22px (H2) mais larga.
- Sem mapeamento claro, mantidos: `.about-bridge__headline` (36px no desktop, entre H1 e Display), `.about-split__quote-text` (citação em itálico) e `.case-lead__text` (Body lg com -0,01em; o Figma não define tracking para Body lg).

**Verificação (Chrome, 7 páginas, 390px e 1280px)**
- Sem erros de console, sem overflow horizontal. Nenhuma cor nem fundo mudou (contraste igual).
- Única linha nova: o título de cloud-cost-intelligence citado no item 1, em 390px.

**Docs**
- `DESIGN.md` e `DESIGN-IMPLEMENTATION.md` v2.6.4: H3 Bold já refletia o Figma; tokens `--fs-body-xs` e `--fs-label` fixos, regra de títulos por estilo, exemplos de CSS com os novos line height e tracking. `hope-demo.html` e `design-system.html` mostram `--fs-body-xs` e o label fixo.

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
- ~~`.text-h3` (`reset.css`) usa peso 600. O Figma é Bold. Os docs já dizem 700.~~ Resolvido em 18 de novembro de 2026 (v2.6.4): peso 700.
- ~~`--fs-body-lg` (15 a 17px, usado em `.hero__body` e `.case-hero__subtitle`) não existe no Figma. O Body lg do Figma (19px) é o `--fs-body-xl` do código. Decidir: manter, renomear ou migrar os dois usos.~~ Resolvido em 18 de novembro de 2026 (v2.6.5): migrado para `--fs-body-xl` e removido.
- ~~Body xs (11px, 160%) não tem token `--fs-*`. `--fs-label` vai de 10 a 11px, e o Figma é fixo em 11px.~~ Resolvido em 18 de novembro de 2026 (v2.6.4): `--fs-body-xs` e `--fs-label` em 11px fixo.
- ~~Tracking de títulos: `.footer__heading`, `.case-hero__title` e `.case-callout__text` (tamanho H1) e `.case-card--glass .case-card__title` (tamanho H2) usam -0,02em. O Figma é -1% (-0,01em).~~ Resolvido em 18 de novembro de 2026 (v2.6.4), com 3 regras fora do mapeamento (ver v2.6.4).
- ~~Line height de títulos: `.footer__heading` 1,15 e `.case-callout__text` 1,25 (H1 do Figma é 1,2); `.case-card__title` 1,2, `.case-section__title` 1,25 e `.skill-card--metric .metric-value` 1,1 (H2 do Figma é 1,3; Metric é 1,4).~~ Resolvido em 18 de novembro de 2026 (v2.6.4).
- ~~**A discutir (fora do escopo da v2.6.4):** peso das labels uppercase: `.case-card__eyebrow` 500, `.case-phase-break__label` 700 e `.header__status-badge` 600 em 10px. O Label caps do Figma é Regular.~~ Resolvido em 18 de novembro de 2026 (v2.6.9): todas as labels uppercase em Regular (400).
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

*Hope Design System · CHANGELOG.md · v2.6.10 · novembro de 2026 · Renan Moura*

# Hope DS: diário de decisões (material de case)

Versão 0.9 · 2026-11-21 · Rascunho vivo, uso interno (Renan e agentes)

## Como ler este documento

- Cada entrada tem: contexto, opções consideradas, decisão, motivo e consequência.
- **[Registrado]** vem do que Renan disse ou de documentos do Project (CHANGELOG, GOVERNANCE, hope-context). **[Inferência]** é leitura minha e precisa da confirmação dele antes de virar narrativa pública.
- Erros e reversões ficam aqui de propósito. Um case sem eles não convence.
- Antes de qualquer publicação: remover referências a clientes sob NDA e traduzir para o inglês do portfólio.
- Local canônico: repositório `design-organization`, em `docs/case/decisoes-hope.md` (commit `8384308`, v2.6.17). Esta cópia no Project é derivada e pode estar um passo à frente do repositório; mudanças aqui precisam voltar para o repositório via Code.

## Ciclo 2026-11 (divergência Figma x código)

### D-01 Fonte da verdade: Figma para valores, repositório para prosa e regras
- **Contexto:** os nomes de tokens no Figma estavam mais organizados que os do CSS, e os dois lados tinham divergido.
- **Opções:** (1) renomear o Figma para o CSS; (2) renomear o CSS para o Figma; (3) manter os nomes diferentes e mapear via code syntax.
- **Decisão:** Figma é a fonte da verdade dos valores de token e componente. O repositório manda em prosa, regras e changelog. Project e Drive são cópias derivadas. O Brandbook segue acima de tudo em decisões de identidade. [Registrado: GOVERNANCE v1.5, seção 7]
- **Motivo:** Renan quis o Figma sempre como fonte, mas pediu investigação antes de mudar qualquer coisa "às cegas", porque muito do CSS já construído precisava ser considerado. [Registrado]
- **Consequência:** nasceu o relatório de divergência (roda após publicar o Foundation, antes de fechar versão e na revisão anual). Itens classificados em Bloqueia, Atenção e Informativo. Claude gera, Renan decide, Code corrige o espelho. [Registrado]

### D-02 Nomes de token: code syntax no Figma aponta para o nome do CSS
- **Decisão:** em vez de renomear dos dois lados, cada variável do Figma recebeu code syntax com o nome CSS (famílias night, link e focus, soft backgrounds, material, entre outras). [Registrado]
- **Pendente conhecido:** Layout/*, Stroke/medium, thick e accent, Blur/* sem mapeamento. Tokens sem code syntax significam "ainda sem código". [Registrado]
- **Atualização (D-20):** em 2026-11-20 a renomeação semântica mudou o sentido: os nomes CSS das famílias de papel passaram a seguir a gramática nova, e o CSS acompanha com aliases. [Registrado]

### D-03 Bordas: hairline de 0.8px
- **Decisão:** `--border-thin` = 0.8px (hairline do Figma); `--border-normal` e `--border-strong` = 1px. [Registrado: v2.6.16]
- **Em aberto:** testar renderização em Safari e Firefox. [Registrado]

### D-04 Largura de layout: tentativa de 1040 e reversão (erro aprendido)
- **Contexto:** o Figma usava 1040 para o container e o site renderizava `min(1280px, 100% - 160px)`.
- **Primeira hipótese (errada):** achei que 1040 e 1280 eram papéis diferentes. Em 1366 de viewport o CSS rendia 1206 contra 1040 no Figma, então era divergência real. [Registrado, correção minha]
- **Tentativa:** Code criou tokens `--layout-*` com 1040 (`cb3404c`). Renan reprovou: o conteúdo perdeu respiro lateral. [Registrado]
- **Reversão:** commit `f88b60f` e docs `4484a5b` (v2.6.16). O site ficou como era. [Registrado]
- **Ajuste inverso:** em vez de mexer no código, o Figma foi alinhado ao site. Layout/container = 1206 (valor no frame de referência 1366), Header 1206, Reading 796, Sidebar 240. Portfolio Desktop V1 recebeu o vínculo ao token. Renan preferiu "Figma e código alinhados". [Registrado]
- **Também errado de início:** propor Layout/container = 1280 teria redimensionado 22 nós vinculados e quebrado frames. Corrigi para 1206 antes de aplicar. [Registrado]
- **Divergência aceita:** a coluna de leitura (68ch, cerca de 796px) e o container variam com o viewport; registrada no DESIGN.md. [Registrado]
- **Lição:** conferir o valor renderizado em um viewport de referência antes de tratar dois números como equivalentes ou diferentes. [Inferência]

### D-05 Divergências de dark mode adiadas
- **Itens:** `--color-bg-icon-chip` (Figma `#f5c84226`, CSS `#f5c84224`) e `--color-bg-scrim-strong` (Figma `#000000e0`, CSS `#0d0d0fe0`), mais o anel de hover do glass. [Registrado; valores confirmados pela comparação automática do site de docs em 2026-11-19]
- **Decisão:** adiar. O toggle de dark está oculto no site, então o custo de esperar é baixo. [Registrado quanto ao adiamento; motivo é Inferência]
- **Atualização 2026-11-20:** Renan registrou o dark mode inteiro como débito para depois de terminar o DS, incluindo os valores Dark da família Neutral. [Registrado]

### D-06 Ordem de publicação e escopo das mudanças
- **Decisão:** versionamento PATCH conforme GOVERNANCE seção 3. Renan publica as bibliotecas; agentes nunca. Ordem: Foundation, depois Core, depois Portfolio. [Registrado]
- **Observação:** Code ampliou o escopo ao reescrever as seções 6 e 10 do GOVERNANCE e o PATTERNS. Foi justificado pela nova seção 7, mas fica sinalizado para Renan revisar o diff antes de empurrar. [Registrado]

### D-07 Conferência de componentes: remoção do hope-demo.html
- **Contexto:** a cópia no Project era um artefato derivado e Renan perguntou onde conferiria os componentes sem ela. [Registrado]
- **Decisão:** apagar a cópia do Project. A conferência de componentes passa a ser a documentação em construção (D-08 e D-10). [Registrado]
- **Erro meu:** sugeri antes que a cópia do repositório também deveria sair. Era a do Project. Corrigido. [Registrado]
- **Fechado (2026-11-20):** Renan apagou também o `hope-demo.html` do repositório, de propósito, e a remoção ficou (commit `796281b`). [Registrado]

## Ciclo 2026-11 (documentação do DS)

### D-08 Documentação inspirada na Animalia DS
- **Contexto:** o Figma tem a biblioteca pronta, mas faltava guia de uso e documentação do código. Renan apontou a Animalia como referência (doc.animaliads.io). [Registrado]
- **O que a Animalia faz (observado em 2026-11):** menu com Componentes, Comportamentos, Estilos, Sobre, Guia e Tokens; página de botão com Anatomia, Tipos, Tamanhos, Boas práticas em pares Fazer/Não fazer, Desenvolvimento com demo ao vivo e propriedades customizáveis. Sem seção de estados. Tokens em duas camadas. [Registrado: pesquisa]
- **Opções:** A) página "Como usar" no Figma mais painel Info padronizado; B) site de docs no repositório, com página de tokens gerada do snapshot do Figma; C) Zeroheight ou Notion. [Registrado]
- **Decisão inicial:** A agora, B em fases; C descartada por criar uma segunda fonte da verdade. A recomendação foi minha; Renan aprovou começar. [Registrado]
- **Mudança de rota:** depois de ver a proposta, Renan disse que o "Como usar" no Figma não seria suficiente e quis o site de docs no repositório (D-10). A página do Figma segue como rascunho, para ficar enxuta (ordem das bibliotecas, modos, regras). [Registrado]
- **Público:** por enquanto só Renan e agentes. A intenção é virar produto vivo, para venda ou como case de visibilidade. [Registrado]

### D-09 Documentar o processo como case
- **Decisão:** manter este diário e atualizá-lo a cada ciclo de decisões. [Registrado: pedido de Renan]
- **Limite:** decisões anteriores a esta conversa só entram se estiverem registradas (CHANGELOG, GOVERNANCE, hope-context). Sem registro, o motivo não é reconstruído por mim.
- **Consequência:** o diário entrou no repositório seguindo o GOVERNANCE: entrada no CHANGELOG e v2.6.17 (`8384308`). Renan escolheu seguir a regra em vez de abrir exceção para docs de case. [Registrado]

### D-10 Site de docs no repositório: opção A, sem framework
- **Contexto:** o site atual é HTML e CSS escritos à mão, sem bundler, hospedado na Vercel; o `design-system.html` existente copia prosa e marcação à mão. [Registrado: investigação do Code, não verificada por mim no painel da Vercel]
- **Opções (estimativas do Code):** A) páginas estáticas e script Node, sem dependências (1 a 2 dias); B) Eleventy (2 a 4 dias); C) Storybook (4 a 7 dias). [Registrado]
- **Decisão:** A. O Code recomendou e Renan seguiu. [Registrado]
- **Motivo:** não acrescenta dependência nem etapa de build ao deploy. As demos linkam o CSS real, então não há cópia de marcação para divergir. [Registrado: argumento do Code; concordei como opinião]
- **Parti pris que adicionei:** a página de tokens mostra o valor do Figma ao lado do valor computado do CSS, para o site de docs funcionar também como detector de divergência. [Registrado: proposta minha, aprovada por Renan ao seguir o prompt]

### D-11 Visibilidade: público com noindex (divergi da minha recomendação)
- **Contexto:** o Code reportou que a Vercel serve a raiz inteira do repositório, então `design-organization/*.md`, `drafts/`, `.claude/` e `.agents/` já seriam alcançáveis em renanmoura.dev. [Registrado: relatório do Code]
- **Opções:** privado primeiro (deploy separado ou protegido), público com noindex, público de propósito.
- **Recomendação minha:** privado primeiro. **Decisão de Renan:** público com noindex. [Registrado]
- **Consequência:** headers `X-Robots-Tag: noindex` para `/docs/*` e `/design-organization/*` no `vercel.json`. Noindex afasta buscadores, não torna nada privado. [Registrado]
- **Atualização 2026-11-20:** Renan disse que o repositório é público de propósito e que a exposição não é preocupação agora: nada é publicado antes de fechar a revisão dos componentes. Item adiado até o fim da revisão. [Registrado]

### D-12 design-system.html antigo: substituir depois
- **Decisão:** manter até o novo site cobrir o mesmo conteúdo; então remover e redirecionar. [Registrado]

### D-13 Divergências aceitas como status próprio
- **Contexto:** a comparação automática Figma x CSS deu 128 tokens iguais, 2 diferentes, 1 estrutural e 31 sem mapeamento de código, em 162 tokens do Figma. [Registrado: relatório do Code, 2026-11-19]
- **Decisão:** criar `docs/data/accepted-divergences.json` e um status "accepted", com motivo, decisor e data. O primeiro item é `--icon-color`: no Figma é uma variável com 10 modos, no CSS são 10 tokens, e os 10 valores foram verificados como iguais. As duas divergências de dark (D-05) ficam fora da lista até Renan decidir. [Registrado]
- **Motivo:** sem esse status, divergência estrutural e aceita seria indistinguível de erro. [Inferência]

### D-14 Erro meu: SigmaMD
- **O que aconteceu:** escrevi na página "Como usar" que o SigmaMD "replica o Light por enquanto". O snapshot dos tokens mostrou valores próprios (marca em magenta, fundos em tons de areia). [Registrado]
- **Correção:** a frase foi reescrita: paleta alternativa que existe só no Figma, sem tema correspondente no CSS (o Code reportou só os blocos `:root` e dark). [Registrado]
- **Lição:** afirmação sobre dados vem dos dados, não do resumo de memória. [Inferência]

### D-15 Fase 2: documentar Button, Badge e Link como estão
- **Contexto:** a leitura do Figma encontrou lacunas nos três componentes (7 em Button, 2 em Badge, 2 em Link, incluindo foco ausente no Icon Button e citação de WCAG 2.4.12 para o focus ring). [Registrado: arquivo `components-content.json`]
- **Decisão de Renan:** "documentamos o que temos agora" e as lacunas serão tratadas depois. O conteúdo fica em inglês. [Registrado]
- **Consequência:** as lacunas entram nas páginas numa seção "known gaps" com um rótulo de status (documented, measured, inference). O arquivo é regenerado quando o Figma for corrigido. [Registrado]

## Ciclo 2026-11 (construção de todos os componentes)

### D-16 Regra "componente entra no CSS quando houver uso" abolida
- **Contexto:** a regra valia desde antes deste diário e aparece também na página "Como usar" do Figma (rascunho meu). Renan quer codar todos os componentes que já existem no Figma, porque sente que há muitos detalhes a lapidar e quer um lugar para conferir cada componente. [Registrado]
- **Decisão de Renan:** "Vamos abolir essa decisão. Acho que já não cabe mais pra gente." [Registrado]
- **Motivo:** em 2026-11-21 Renan explicitou: ter o código dos componentes que ainda não existem no DS, a partir do Figma, já pronto para o caso de vir um case que precise de um projeto com esses componentes. [Registrado] A leitura anterior (um produto de DS tem componentes antes de ter uso, ligada ao D-08) continua como contexto. [Inferência]
- **Onde a regra está escrita (levantamento do Code, 2026-11-19):** GOVERNANCE linhas 315-325, 347-355, 387 e 408; DESIGN.md linhas 1024-1028; CHANGELOG linhas 561, 573 e 654 (histórico, não se reescreve); texto do próprio site de docs (`docs/components/index.html:91` e `scripts/build-components-doc.mjs:525`). Nenhum arquivo usa a frase exata. [Registrado: relatório do Code]
- **Consequência (proposta do Code, ainda não aprovada):** GOVERNANCE v1.6 (MINOR, como a v1.5) e atualização da seção 23 do DESIGN-IMPLEMENTATION. Preciso corrigir a página "Como usar" no Figma. [Registrado como proposta]

### D-17 Página temporária de revisão e construção por lotes
- **Pedido de Renan:** uma página temporária que liste cada componente do Figma, um abaixo do outro, com título e o componente codado, mais uma tabela final dos que ainda faltam. [Registrado]
- **Minha proposta, que Renan aceitou:** a página de revisão vem antes de codar o resto, e depois os componentes entram em lotes por família: Lote 0 fecha Button, Badge e Link; Lote 1 Forms; Lote 2 Feedback; Lote 3 Navigation; Lote 4 Overlays e dados. Antes de cada lote eu extraio do Figma as specs por estado. [Registrado: respostas 4 e 5 de Renan]
- **Inventário do Figma (lido em 2026-11-19):** 30 unidades em 28 páginas, 172 variantes (171 depois da remoção do Badge Draft). [Registrado: leitura via Figma MCP]
- **Resultado da página (Code, 2026-11-19):** 19 das 172 variantes tinham classe CSS. Banner foi mapeado para `.banner--wip` por inferência do Code, e a variante do Figma se chama "Notice". O Lightbox tem CSS mas não é renderizado na página, porque é um modal em tela cheia controlado por JS. [Registrado: relatório do Code]
- **Revisão do Button pela página (Renan, 2026-11-20):** hover e focus saem dos exemplos (são testados no Default), fica o Disabled. [Registrado]

### D-18 Estrutura do CSS: referências de mercado e divisão por componente
- **Contexto:** eu tinha proposto um único `components-next.css` para o CSS novo. Renan notou que isso conflitava com o pedido anterior dele, de usar como referência a forma como outros DS segmentam componentes. [Registrado]
- **Erro meu:** a proposta ignorava o que ele tinha pedido. As referências pesquisadas (GOV.UK Frontend, Carbon, USWDS e Primer CSS) separam o CSS por componente e oferecem uma entrada agregada; nenhuma usa um arquivo único de "componentes novos". [Registrado: pesquisa de 2026-11-19]
- **Decisão de Renan:** seguir a estrutura de referência: camada de tokens própria, um arquivo por componente e um agregado. Plano do Code aprovado em 2026-11-20 (`css/components/<nome>.css`, `css/site/*.css`, agregado gerado `css/hope.css`), execução depois dos commits pendentes. [Registrado]
- **Riscos de ordem que uma divisão pode quebrar:** `.btn:disabled` empatava em especificidade com os hovers (resolvido no Prompt 10); `layout.css` sobrescreve `.btn`, `.logo-strip`, `.testimonial-card`, `.icon` e `.case-section__body` e precisa carregar depois; regras de dark mode e pares de `!important` precisam acompanhar o componente. [Registrado]
- **Opinião minha:** a divisão deve vir antes dos componentes novos, para eles nascerem na estrutura final. [Inferência]

## Ciclo 2026-11 (revisão do Button e tokens)

### D-19 Badge Draft removido
- **Contexto:** Draft e Neutral eram quase iguais e competiam pelo mesmo papel. [Registrado: anotação de Renan na revisão]
- **Decisão de Renan:** remover o Draft do Figma e do código; onde o portfólio usava, passa a Neutral. [Registrado]
- **Execução:** 3 instâncias no Portfolio e 3 no Portfolio Components trocadas para Neutral; `.badge--draft` removido do CSS sem alias (o site publicado nunca usou). [Registrado]

### D-20 Gramática dos tokens semânticos
- **Contexto:** Renan sentia falta de variações de Neutral e de padronização entre categorias. Os nomes misturavam três coisas na mesma posição: hierarquia (Default, Secondary, Soft, Strong), estado (Hover) e pareamento (On Brand, On Danger). [Registrado; diagnóstico é Inferência minha]
- **Pesquisa (2026-11-20):** Atlassian (propriedade, papel, ênfase e estado; tokens inverse sobre fundos bold; texto default, subtle e subtlest), Primer (default, muted, emphasis), Polaris (elemento, papel, variante, estado; default, secondary e tertiary) e Carbon (camadas numeradas). [Registrado]
- **Decisão de Renan:** gramática Propriedade/Papel/Nível, com níveis Default, Secondary, Tertiary e Strong; Inverse no lugar de "On X" (padrão Atlassian), porque "On X" amarra o token a uma cor e escala mal; "Hover" sozinho é o hover do Default. 53 tokens renomeados no Foundation; os nomes CSS das famílias de papel passaram a `--color-{bg|text|border}-{papel}-{nível}`, com os nomes antigos como alias. Modos da coleção Icon seguem o padrão ("On Neutral" virou "Neutral"). [Registrado]
- **Exceção deliberada:** a família Neutral. O Text/Neutral/Default fica sobre o fundo escuro da própria família, enquanto nas famílias coloridas o Default é o texto colorido sobre a página. Renan quer a Neutral como família de suporte (níveis de fundo, cards), com espaço para crescer. [Registrado]
- **Erro meu:** chamei de provisórios os nomes Elevated 1 e 2 e só depois propus a gramática. Renan apontou que a estrutura não era igual entre categorias. [Registrado]
- **Consequência:** versão 2.7.0 (MINOR), porque todos os nomes antigos seguem como alias; a remoção de `.badge--draft` é a única quebra e fica registrada. O MAJOR fica para quando os aliases forem apagados. [Registrado]

### D-21 Família Neutral ampliada a partir da rampa Night
- **Decisão de Renan:** criar superfície Secondary (Night/800) e Tertiary (Night/700), borda Neutral Default (Night/700) e Strong (Night/500) e texto Tertiary (Night/400), sem cores novas. Text/Neutral/Secondary foi de #5f5f6e para Night/300, depois de auditoria (sem uso no Figma; no CSS o único uso era o Badge Draft). [Registrado]
- **Contraste medido:** texto terciário sobre Tertiary dá 4,26:1, abaixo de 4,5 para texto pequeno; borda forte sobre as superfícies elevadas fica abaixo de 3:1. [Registrado: cálculo meu]

### D-22 Anel de foco: 2px com 2px de espaço, em todos os componentes
- **Contexto:** o Button não mostrava foco no Figma; a sombra usada não renderizava nas variantes (causa não identificada). [Registrado]
- **Decisão de Renan:** anel de 2px (era 3px) com 2px de espaço transparente, aplicado a todo componente com estado Focus. Tokens `Stroke/focus` e `Stroke/focus-gap`. [Registrado]
- **Base:** WCAG 2.2, critério 2.4.13 (AAA), pede indicador de pelo menos 2px de perímetro e 3:1 entre foco e não foco. O espaço resolve o anel da mesma cor do preenchimento (Accent, Destructive). [Registrado; o motivo do espaço é Inferência]
- **Execução:** no Figma, 28 anéis como camada própria; em componentes sem raio (Tab, Accordion, Link) o anel é reto, como o `outline` no navegador. No código, `outline` com `outline-offset`. [Registrado]

### D-23 Hover do Destructive e altura do botão
- **Hover do Destructive:** escurecer, porque clarear derrubaria o contraste do texto branco. Primitivo `Functional/error-deep` (#7a2020, 10,22:1 com branco) e semântico `Background/Danger/Hover`. [Registrado]
- **Altura do botão:** o stroke interno do Figma não soma ao tamanho e a borda do CSS soma. Opções pesquisadas: descontar a borda do padding, desenhar a borda com box-shadow interno, altura fixa por token. Decisão de Renan: descontar a borda do padding com tokens no `calc`, para Figma e código ficarem iguais (44,8px). O box-shadow foi descartado por sumir no modo de alto contraste do Windows. [Registrado]

### D-24 Componentes sobre superfícies escuras: contexto de superfície
- **Contexto:** o footer do site sobrescreve o botão Secondary porque ele fica sobre fundo escuro. É uma lacuna do DS no Figma, esperada para o estágio atual. [Registrado: palavras de Renan]
- **Opções:**
  1. Manter overrides no CSS do site. Barato, mas cada seção escura nova pede o seu, e o DS não documenta.
  2. Variantes Inverse por componente (Secondary Inverse, Ghost Inverse...). Explícito, mas multiplica variantes de todo componente que aparecer no escuro, no Figma e no CSS; quem monta a tela precisa trocar cada instância e cada texto à mão.
  3. Contexto de superfície: um modo "Neutral surface" na coleção Semantic do Figma e um wrapper `data-surface="neutral"` no CSS que troca os tokens Default pelos Neutral. Tudo dentro se adapta, inclusive texto solto.
- **Decisão de Renan:** opção 3, porque a 2 escala mal e prejudica a manutenção. Ele tinha preferido a 2 antes de ver a comparação. [Registrado]
- **Vantagens da 3:** recurso nativo do Figma (modo por frame); nenhuma variante nova; mesma mecânica do dark mode, então o trabalho serve depois. [Registrado]
- **Desvantagens da 3:** custo inicial alto (o modo novo precisa de valor para todos os tokens semânticos, 74 hoje); menos explícito (a cor depende da superfície onde o componente está); o limite do plano do Figma é 10 modos por coleção (a Semantic usa 3). [Registrado]
- **Exceções a definir:** componentes com cor própria (Accent, Destructive, Badges de status) talvez não devam mudar dentro da superfície; o anel de foco precisa de contraste sobre o escuro; o modo Dark no futuro precisa decidir o que a superfície Neutral vira no tema escuro. [Registrado como pendência]
- **Levantamento do Code (Prompt 11, 2026-11-20):** o footer é a única superfície escura nos dois temas. No código ele usa `--color-bg-brand-strong` (Abyss, #1a1a2e), botão Secondary com contorno de branco translúcido e vários literais. Contra o Abyss, falham 3:1: anel de foco Anchor (2,64), Destructive (2,91), Destructive hover (1,67), Info (2,26), borda Secondary (2,72) e Primary (1,14, invisível). [Registrado: relatório do Code]
- **Leitura do Figma (2026-11-20):** o Footer tem Style=Dark e Style=Light. A Dark usa `Background/Neutral/Default` (Ink, #0d0d0f) e botões Button `Style=Inverse`; os textos usavam `Text/Brand/Strong Inverse` como atalho para branco. A premissa de um Secondary sobre o escuro veio do código, não do Figma. [Registrado: leitura direta]
- **Decisão de Renan:** o footer segue o Figma (Ink e botões Inverse, sem o override `.site-footer .btn--footer`). Os textos do Footer Dark foram religados para `Text/Neutral/Default` (mesma cor renderizada no Light). [Registrado]
- **Efeito sobre os contrastes (cálculo meu, sobre Ink):** anel Anchor 3,01, Destructive 3,31 e borda Secondary 3,10 passam por pouco; Info 2,57, Destructive hover 1,90 e Primary seguem falhando. [Inferência de cálculo; fórmula WCAG]
- **Regra para superfícies escuras:** os papéis de status usam os valores Dark que já existem no Semantic (já desenhados para fundo escuro). Anel de foco em Solar (12,23 sobre Ink); Primary vira fundo branco com texto Ink (o Inverse que já existe); Secondary com borda Night/500 (3,63) e texto branco; Destructive com fundo tingido (#261616), texto e borda #f28585 (7,83) e hover que clareia; Info com texto #b89edb (8,28); Accent, Positive e Warning já passam; Badges de status com os valores `*-soft` do Dark. Observação sobre fills de Info: pela leitura de WCAG 1.4.11 feita por mim, o contorno de um botão com texto não precisa de 3:1; não conferi na norma. [Registrado como proposta aprovada por Renan, a validar na implementação]
- **Ordem de execução (decisão de Renan):** o footer segue o Figma agora, com o Inverse existente. O modo de superfície completo (modo novo na coleção Semantic, valores para os 74 tokens, copiados do Dark nos papéis de status) espera o segundo caso de uso escuro ou o início do dark mode. O Button Inverse fica até o modo existir e depois sai. [Registrado]
- **Próximo passo:** Prompt 12 (footer segue o Figma no código, commit do diário, conferência de arquivos apagados). Wrapper `data-surface` e modo "Neutral surface" ficam adiados. [Registrado]

### D-25 Token `--border-width-normal`
- **Contexto:** `--border-normal` é um atalho (`1px solid ...`) e não funciona dentro de `calc()`. O Code criou `--border-width-normal: 1px` para descontar a borda do padding do Button (D-23). [Registrado: relatório do Code]
- **Descoberta:** no Foundation, `Stroke/thin` (1px) tinha code syntax `var(--border-normal)`, que já divergia do CSS antes deste ciclo. [Registrado: leitura direta]
- **Decisão de Renan:** criar o token e alinhar o Figma. O code syntax de `Stroke/thin` passou a `var(--border-width-normal)`; falta publicar o Foundation. `--border-normal` fica só como atalho no CSS. [Registrado]

### D-26 Borda superior do footer: Solar 3px (o Figma seguiu o código)
- **Contexto:** o Prompt 12 alinhou o footer ao Figma (Ink e botões Inverse). O Code manteve a borda superior de 3px em Solar, que o Figma não descrevia. Lendo o Figma, o Footer Dark tinha borda superior de 2,4px (`Stroke/thick`) em `Border/Default/Default`, um cinza claro. [Registrado: relatório do Code e leitura direta]
- **Opções:** o código segue o Figma (linha cinza) ou o Figma segue o código (Solar). [Registrado]
- **Decisão de Renan:** manter o Solar e atualizar o Figma. [Registrado]
- **Execução:** no Footer Dark do Portfolio Components, a borda superior agora usa `Border/Accent/Default` (Solar) com peso ligado a `Stroke/accent` (3px). `Stroke/accent` ganhou code syntax `var(--border-width-accent)`, e o CSS passa a ter `--border-width-accent: 3px`, no mesmo padrão do `--border-width-normal` (D-25). O footer Light não foi alterado (borda de 1px; o código não o usa). [Registrado]
- **Observação sobre a regra do Solar:** a regra original reservava o Solar para a logo; foi revista em 13/11/2026 para permitir Solar em Warning. O uso do Solar numa linha decorativa do footer é decisão de marca de Renan. [Registrado]

### D-27 Remoção de `dotz backup.html`
- **Contexto:** arquivo órfão, não linkado, com uma violação do Solar em botão; já havia sido recomendado apagá-lo. O footer foi alterado nele junto com as outras 6 páginas no Prompt 12. [Registrado]
- **Decisão de Renan:** apagar. A execução é do Prompt 13, que confere antes se algo ainda o referencia. [Registrado]

### D-28 Checagem de arquivos de dados dos componentes
- **Contexto:** dois JSONs apareceram apagados na árvore de trabalho no início do Prompt 11, sem causa conhecida. O Code testou: sem qualquer um deles, `docs:components` falha mas `docs:check` passa. [Registrado: relatório do Code]
- **Decisão de Renan:** aplicar a checagem proposta: `docs:check` passa a falhar se algum dos dois arquivos faltar enquanto houver páginas de componente, e compara cada slug com o HTML gerado. [Registrado]

### D-29 Token `--color-bg-brand-tertiary` e seção vazia nas páginas de componente
- **Contexto:** o Figma tem `Background/Brand/Tertiary` (Light Sky a 40%, #e8f0f966; Dark Anchor a 15%, #1c5fa826). O CSS não tinha token equivalente e o Code o pulou no Prompt 10 por não haver token existente. O relatório do Prompt 11 o listou como o único token do Figma sem CSS. [Registrado]
- **Erro meu:** Renan respondeu "vale criar o token" a esse ponto; eu entendi como outro ponto e não o incluí nos Prompts 12 e 13. Corrigido no Prompt 14. [Registrado]
- **Decisão de Renan:** criar o token no CSS. Sem componente que o use por enquanto, como já era a regra do `Background/Brand/Tertiary` reservado. [Registrado]
- **Página de componente:** a lista "unverified" do Badge ficou vazia depois do Prompt 13 e a página mostrava uma seção "Not yet verified" sem itens. Decisão de Renan: o gerador esconde a seção quando a lista está vazia. [Registrado]

### D-30 Estado Focus no Breadcrumb
- **Contexto:** o "Breadcrumb item" do Core tinha `Type=Link`, `Link Hover` e `Current`, sem estado Focus. Sem indicador de foco, quem navega por teclado não vê onde está (WCAG 2.4.7 Focus Visible, nível AA). [Registrado: leitura do Figma; critério WCAG]
- **Opções:** (1) variante nova `Link Focus` com anel só em volta do rótulo; (2) reaproveitar o componente Link; (3) não ter estado Focus. A 2 foi descartada porque o Link tem sublinhado e estilo diferente; a 3 deixa o item de teclado sem indicador. [Inferência: análise minha]
- **Decisão de Renan:** opção 1, com o rótulo em `Text/Default/Default` (o mesmo do Hover). [Registrado]
- **Execução (Figma, Core, página `└ Breadcrumb`):** variante `Type=Link Focus` (2510:258) entre Hover e Current, com um retângulo "Focus ring" absoluto: anel quadrado (raio 0), 2px ligado a `Stroke/focus`, cor `Border/Utilities/Focus Ring`, alinhamento interno, deslocado 4px (2px de intervalo mais 2px de traço) em volta do rótulo; o separador fica fora do anel. `Current` não ganha foco (não é link, `aria-current="page"`). Descrição do componente e painel Info atualizados. [Registrado]
- **Publicação:** Renan publicou o Core em 2026-11-20. [Registrado]
- **CSS:** ainda não há prompt próprio. Se o Breadcrumb não tem classe no CSS (o Prompt 15 manda o Code conferir), o foco entra quando o componente for codificado no Lote 3 (Navigation), com `:focus-visible`, `--focus-ring-width` e `--focus-ring-gap`, só no link e não no item atual. [Inferência: depende da conferência do Code]

### D-31 Divisão do CSS executada (D-18) e entrada na `main`
- **Execução (Prompt 15, 2026-11-20):** `css/components/` com 17 arquivos (uma família de componente por arquivo) e `css/site/` com 19 (os banners do antigo `layout.css` mais `animations.css`). Agregado gerado `css/hope.css` por `scripts/build-css.mjs` (`npm run css:build`), carregado por uma única ordem: tokens, reset, componentes, site, animações. O `docs:check` falha se o `hope.css` estiver desatualizado. [Registrado: relatório do Code]
- **Desvios do plano:** `css/reset.css` ficou fora das pastas; `auth.css` fica fora do agregado porque `js/auth.js` só o carrega em páginas protegidas; a camada do site manteve a ordem original do `layout.css` (só a de componentes é alfabética). [Registrado]
- **Verificação:** hash dos estilos computados de cada elemento (com `::before` e `::after`), posição, hover nos 14 primeiros interativos e foco em 14 paradas de tab, em 13 páginas, 3 larguras e 2 temas (78 snapshots). Páginas do site: 0 diferenças de CSS; os 4 pontos de ruído do baseline foram testados de novo, um a um, com 0. Páginas do `docs/`: diferenças só de texto que cita os arquivos novos. [Registrado: relatório do Code; a explicação do desvio de quebra de linha na página de revisão a 390px (663 elementos) é dele, e Renan conferiu a página e achou o resultado bom]
- **Tamanho:** os cinco arquivos antigos somavam cerca de 140 KB e o `hope.css` tem cerca de 148 KB. Renan não vê problema. [Registrado]
- **Breadcrumb:** não há classe no CSS; o foco definido no D-30 entra quando o componente for codificado (Lote 3). [Registrado]
- **Entrada na `main`:** por causa do risco de perder o trabalho (problema de hardware no notebook de Renan), ele fez o merge e o push da `hope-review-buttons-tokens` na `main` em 2026-11-21 (`5ccb834`, `main` igual à `origin/main`) e conferiu o site no ar. A 2.7.0 está na `main`; as branches locais antigas foram apagadas. [Registrado]

### D-32 Lote 0 (Badge, Link, Separator) e correções de Figma
- **Contexto:** o Core está organizado em pastas que coincidem com as famílias do D-17 (Primitives, Forms, Feedback, Navigation, Overlays and data; 28 páginas de componente). O Separator está em Primitives. [Registrado: leitura do Figma em 2026-11-21]
- **Decisões de Renan:** incluir o Separator no Lote 0; cada lote vira um prompt separado, para ter menos confusão. [Registrado]
- **Link:** o Small Disabled estava em negrito (`link-xs bold`) e o Medium Disabled em regular; Renan decidiu regular e já corrigiu no Figma (conferido por mim em 2026-11-21). [Registrado] A descrição do Link dizia "com ícone" e nenhuma variante tem ícone: descrição corrigida por mim no Figma, sem ícone no código. [Registrado]
- **Fundo branco cru:** as 8 variantes do Link e o componente Separator tinham fundo `#ffffff` sem variável. Renan: não deveria ter fundo. Removido no Figma por mim; o CSS não tem fundo. [Registrado]
- **Hover e Focus do Link:** só passam a negrito, sem mudança de cor; o negrito alarga o texto cerca de 1px e causa um pequeno deslocamento. Renan aceitou. O Focus também é negrito, com anel de 2px a 2px de distância, quadrado. [Registrado]
- **Badge:** Success usa 12% de opacidade no fundo e Danger 10%. Renan: seguir o Figma, são cores diferentes e merecem tratamento diferente. [Registrado]
- **Descrições dos estilos de texto (Foundation):** 23 estilos tinham descrição defasada. Os estilos do Link e de Body sm repetiam `clamp(12px, 1vw, 13px)`; H3, Body, Body xs e Label ainda diziam `clamp(...)` embora os tamanhos sejam fixos desde a v2.6.12 e v2.6.13; Body lg citava `--fs-body-lg` (17px), removido; Metric citava Geist. Corrigi para "tamanho · token" (por exemplo `13px · --fs-body-sm`). Display, H1, H2 e Body xl ficaram como estavam, porque seguem fluidos. Renan autorizou corrigir as descrições do Link; a correção dos demais estilos foi minha extensão, feita por serem da mesma classe de erro, e precisa da publicação do Foundation por Renan. [Registrado para o Link; Inferência de escopo para os demais]

## Pendências para o case

- Confirmar com Renan o motivo das decisões marcadas como Inferência.
- Levantar decisões anteriores ao ciclo 2026-11 a partir do CHANGELOG e da seção 8 do hope-context.
- Definir o que o case mostra além do diário: antes e depois do DS, métricas (cobertura de tokens, itens do relatório de divergência por ciclo, variantes com CSS sobre variantes no Figma).
- Sincronizar esta cópia com `docs/case/decisoes-hope.md` no repositório (mesclagem, não substituição).
- Aprovação da GOVERNANCE v1.6 (D-16) e execução da divisão do CSS (D-18).
- Modo "Neutral surface" completo e `data-surface` (D-24), adiados até o segundo caso de uso escuro ou o dark mode.

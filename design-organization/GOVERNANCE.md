# GOVERNANCE.md
# Hope Design System — Regras de Evolução
# Versão 1.7 · novembro de 2026

**Changelog v1.7 (MINOR, 24/11/2026)**: a seção 3 ganha uma cláusula para mudanças no próprio GOVERNANCE.md: regra adicionada ou removida é MINOR; alinhamento do texto a uma regra já decidida, sem mudar a regra, é PATCH. Entra uma regra, por isso MINOR. A v1.6.1 continua classificada como PATCH. Decisão de Renan.

**Changelog v1.6.1 (PATCH, 23/11/2026)**: três trechos que ainda diziam o contrário da v1.6 foram reescritos com o menor ajuste possível: os anti-padrões "Componente preventivo" e "Componente para um único uso" (seção 9) e a frase "YAGNI vence sofisticação" (seção 10). Nenhuma regra mudou: os três testes e os lotes da seção 8 seguem como estavam. PATCH porque é refinamento de texto (seção 3).

**Changelog v1.6 (MINOR, 23/11/2026)**: abolida a regra "o componente só entra no CSS quando houver uso" (o "teste do projeto real" da seção 8). Os componentes que existem no Figma passam a ser codificados em lotes por família (Lotes 0 a 4: Primitives, Forms, Feedback, Navigation, Overlays e dados), a partir do Figma, com ou sem uso no site. Os quatro testes da seção 9 viram três: o teste 4 ("projeto real") foi removido. Decisão de Renan, diário de decisões D-16 e D-33. Nenhuma outra regra mudou.

**Changelog v1.5 (MINOR, 19/11/2026)**: seção 7 reescrita como "Fontes da verdade e ciclo de divergência". O Figma passa a ser canônico para os VALORES de token e de componente; este repositório é canônico para prosa, regras e changelog; cópias derivadas (documentos de projeto, o arquivo `hope-context.md` do Drive, demos) nunca são editadas como fonte. Entra o ciclo de relatório de divergência (Bloqueia, Atenção, Informativo). Removida a regra "Realidade vence documentação" (seção 6, seção 7 e seção 10), que contradizia a nova ordem. Registro retroativo: a subseção "CSS gerado pelo Tailwind: passo obrigatório em upgrade" da seção 11 foi adicionada em 19/11/2026 (commit 76bdca6, DESIGN.md v2.6.13) sem versão nem changelog neste arquivo.

**Changelog v1.4.1 (PATCH)**: corrigida a frase da seção 12.6 que dizia que Case Callout e Lightbox foram removidos do Figma. Os dois foram recriados em 13 de novembro de 2026; só o Highlight Card legacy segue removido.

**Changelog v1.4**: seção 12.7 adicionada (separação das bibliotecas do Figma: Core fica só com componentes genéricos e os componentes do portfólio vão para Hope DS | Portfolio Components) e convenção de nome de páginas. Aprovada por Renan em 13 de novembro de 2026.

**Changelog v1.3**: seção 12 adicionada (convenções dos componentes no Figma): nome de propriedades, State e seleção, nada cru dentro de componente, cor de ícone, documentação mínima e componentes em revisão. Aprovada por Renan em 12 de novembro de 2026, a partir da revisão geral do Core.

**Changelog v1.2**: PATTERNS.md adicionado à ordem de precedência (seção 7) e ao mapa de arquivos (seção 11). Documenta padrões de página separados de componentes.

**Changelog v1.1**: Adicionada seção 9 (Quando criar componente novo) — quatro testes de validação, sinais para extensão via variante vs componente novo, anti-padrões e custo declarado. Renumerada seções 10 (Princípios) e 11 (Mapa).

Este documento define **como o Hope evolui**. Não é sobre o que ele é hoje — para isso, leia `DESIGN.md` e `DESIGN-IMPLEMENTATION.md`. Este documento é sobre como ele continua sendo coerente ao longo do tempo, conforme novos componentes, temas, produtos e colaboradores aparecem.

A regra central é simples: **toda mudança no Hope deve ser uma decisão consciente, não um acidente**. Governance é o que garante isso.

---

## 1. Hierarquia de autoridade

O Hope é uma marca pessoal. **Renan Moura é o único decisor final** sobre fundação e direção.

Mas o sistema tem três camadas, e cada uma tem regras diferentes sobre quem pode propor mudanças:

### Camada 1 — Fundação (imutável sem decisão deliberada)
- Tese da marca (Brandbook V2.2, cap. 01)
- Posicionamento operacional
- Princípios operacionais
- Arquétipos (Creator + Sage)
- Anti-princípios
- Nome do sistema (Hope)
- Acentos primários (Solar #F5C842, Âncora #1C5FA8)

**Regra:** mudanças aqui exigem revisão completa do brandbook. Não devem acontecer por impulso, prompt de IA ou sugestão de terceiros. Mínimo de uma semana entre "ideia" e "implementação".

### Camada 2 — Sistema (evolução cuidadosa)
- Paleta de cores estendida (famílias Solar/Âncora/Senshi/Neutras)
- Escala tipográfica
- Tokens de tema (light/dark)
- Tokens de motion
- Componentes canônicos (button, card, badge, input)
- Estrutura de pastas e naming

**Regra:** mudanças aqui exigem (a) justificativa documentada, (b) verificação de compatibilidade reversa, (c) atualização do changelog. Podem ser propostas por agentes de IA, mas precisam de aprovação humana.

### Camada 3 — Aplicação (livre dentro do sistema)
- Variantes de componentes existentes
- Novos componentes que seguem padrões estabelecidos
- Novos casos de uso de tokens existentes
- Backgrounds atmosféricos específicos
- Conteúdo de cases, artigos, talks

**Regra:** evoluem livremente desde que respeitem as Camadas 1 e 2. Aqui é onde a maior parte da iteração acontece.

---

## 2. Quando mudar — e quando não mudar

### Sinais legítimos de mudança

**→ Descompasso percebido.** Quando o trabalho real começa a divergir do que está documentado, é hora de atualizar o documento — não forçar o trabalho a voltar para o documento.

**→ Gap funcional.** Quando você precisa de algo (componente, token, regra) que não existe e não pode ser composto do existente. Exemplo: a Fase 3 adicionou motion porque qualquer agente lendo o YAML inventava durações.

**→ Falha em uso real.** Quando a aplicação prática expõe um problema que não era visível em teoria. Exemplo: badges com contraste WCAG abaixo de AA na Fase 1 — só apareceu quando o linter rodou.

**→ Marco profissional.** Mudança significativa de cargo, novo capítulo de carreira, lançamento de produto principal — disparam revisão de coerência.

### Sinais falsos de mudança (não mude)

**× Novidade pela novidade.** Trocar Plus Jakarta Sans por outra fonte porque viu algo legal no Twitter. O sistema atual funciona; mudar gera dívida sem benefício.

**× Sugestão de IA sem contexto.** Um agente propõe "futuristic minimalism + cinematic atmosphere" — mas isso contradiz decisões já tomadas. Avalie contra a fundação antes de aceitar.

**× Solução em busca de problema.** "Vamos adicionar suporte a 8 temas" quando você só usa light + dark. Adiar até precisar de verdade.

**× Pressão de prazo.** "Não tenho tempo de revisar isso direito, vamos só commitar." Decisões sob pressão geram débito técnico que custa caro depois.

---

## 3. Versionamento

O Hope usa **SemVer adaptado** (Major.Minor.Patch):

### MAJOR (vX.0.0) — mudança estrutural

Muda quando:
- Fundação muda (tese, posicionamento, arquétipos)
- Paleta primária muda (Solar ou Âncora trocam de hex)
- Estrutura do DESIGN.md muda significativamente
- Quebra compatibilidade reversa de tokens

Cadência: rara. Esperado a cada 2-3 anos com revisão formal completa.

### MINOR (v1.X.0) — adição funcional

Muda quando:
- Novo componente entra no DESIGN.md
- Nova família de tokens (motion, theme, etc.)
- Nova cor entra na paleta (sem remover existentes)
- Expansão de escala (mais tamanhos, mais variantes)

Cadência: conforme necessário. Pode acontecer mensalmente em fase ativa de desenvolvimento.

### PATCH (v1.1.X) — refinamento

Muda quando:
- Correção de bug (contraste WCAG, token órfão, typo)
- Ajuste de valor (border-radius de 12px para 10px após teste)
- Melhoria de documentação sem mudança técnica
- Adição de exemplo ou regra ao prosa do DESIGN.md

Cadência: contínua. Quando algo melhora, atualize.

### Mudanças no próprio GOVERNANCE.md

A mesma escala vale para este documento:
- **MINOR:** uma regra é adicionada ou removida (a v1.6 removeu o "teste do projeto real"; esta cláusula entrou na v1.7).
- **PATCH:** o texto é alinhado a uma regra já decidida, sem mudar a regra (a v1.6.1 reescreveu três trechos que ainda diziam o contrário da v1.6).

### Changelog

Toda mudança gera entrada no changelog do `DESIGN.md` (ou em arquivo separado `CHANGELOG.md`). Formato:

```
v1.3 · maio de 2026 · Motion architecture
- Adicionado: bloco motion no YAML com 17 tokens
- Adicionado: seção ## Motion na prosa entre Shapes e Components
- Adicionado: 5 transições canônicas (hover, press, enter, exit, atmospheric)
- Documentado: regra de prefers-reduced-motion

v1.2 · maio de 2026 · Theme architecture
- Adicionado: tokens semânticos com sufixo -dark
- Adicionado: seção Theme architecture na prosa
- Decisão: link em dark mode usa Solar (não Âncora) por contraste

v1.1 · maio de 2026 · Correções do linter
- Adicionado: 14 componentes (badges semânticos completos, senshi, callout)
- Corrigido: 5 warnings de contraste WCAG AA
- Documentado: cores narrativas vs cores de componente
```

---

## 4. Como propor uma mudança

Independente da camada, toda proposta de mudança passa por **quatro perguntas obrigatórias**:

### A. Qual problema isso resolve?

Mudanças sem problema definido são modificação por modificação. Se a resposta é "fica mais moderno" ou "vi alguém fazendo assim", **rejeite**.

Resposta válida: "agentes lendo o YAML estavam inventando durações de animação porque não havia tokens de motion" (problema concreto).

### B. Isso é compatível com o que já existe?

Mudança que quebra contratos existentes (componentes, tokens, naming) tem custo de migração. Pergunte:
- Componentes existentes continuam funcionando?
- O CSS já escrito ainda é válido?
- Agentes anteriores que leram o sistema ainda fazem sentido?

Se sim → ok. Se não → entra na trilha de MAJOR version e exige plano de migração documentado.

### C. Honra a fundação?

Sempre cheque contra os anti-princípios do Brandbook V2.2:
- Design como decoração — viola o quê?
- Confiança performada — está afirmando algo sem evidência?
- Complexidade ostentatória — está adicionando framework que uma frase resolveria?
- Atalho disfarçado de eficiência — está pulando etapa?

Se a mudança ativa um anti-princípio, **rejeite ou refaça**.

### D. Como medir se deu certo?

Toda mudança precisa de critério de sucesso. Exemplos:
- "Linter passa com 0 erros e warnings só intencionais"
- "Card de case study fica visualmente igual antes/depois da refatoração"
- "Tempo de implementar uma nova landing page cai de X para Y"

Sem critério, você nunca saberá se a mudança valeu a pena.

---

## 5. Colaboração com agentes de IA

O Hope foi construído **em parceria com Claude**. Outros agentes (ChatGPT, Cursor, Manus) participam de tarefas específicas. Esta seção define como essa colaboração funciona sem perder coerência.

### Princípios da colaboração

**O agente propõe, o humano decide.** Mesmo agentes muito capazes têm vieses (excesso de "soluções completas", linguagem genérica, complexidade desnecessária). Trate sugestões como propostas, não como decisões.

**Contexto antes de execução.** Antes de pedir mudança no Hope, dê ao agente os arquivos relevantes: `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `GOVERNANCE.md`. Sem isso, o agente vai gerar algo plausível mas desconectado.

**Critique antes de aceitar.** Quando um agente entrega algo, peça que ele mesmo critique o próprio trabalho. Foi exatamente o que disparou as evoluções da v1.1 — Claude identificou os próprios gaps quando provocado.

### Divisão de trabalho típica

**Claude (este projeto):** estruturação, validação, decisões técnicas, manutenção do DESIGN.md e DESIGN-IMPLEMENTATION.md, análise crítica.

**ChatGPT (consultoria):** prompts de geração, redação editorial, estruturas conceituais, segunda opinião.

**Cursor / GitHub Copilot:** implementação no código real (Framer, React, projetos paralelos). Consome o DESIGN.md como contexto.

**Manus:** geração de backgrounds atmosféricos e imagens conceituais. Não toca em componentes funcionais.

### Anti-padrões na colaboração

**× Aceitar tudo que o agente entregar.** Pediu sumário de 3 linhas, recebeu 30 — corte.

**× Mudar de agente no meio da decisão.** Se está discutindo Tipografia com Claude, terminar com ele. Trocar para ChatGPT no meio fragmenta o raciocínio.

**× Confiar em "agente disse que tal padrão é melhor".** Padrão da indústria não é validação. Cheque contra a fundação Hope.

**× Não documentar a decisão.** Conversa com agente que não vira changelog vira conhecimento perdido.

### Prompt template para mudanças no Hope

Quando pedir a um agente para modificar o Hope, use este template como base:

```
Contexto:
Estou trabalhando no Hope Design System (marca pessoal Renan Moura).
Arquivos relevantes em anexo: DESIGN.md, DESIGN-IMPLEMENTATION.md, GOVERNANCE.md.

Problema:
[Descreva o problema concreto, não a solução desejada]

Restrições:
- Honrar a fundação (Brandbook V2.2)
- Manter compatibilidade reversa
- Não violar anti-princípios (design como decoração, complexidade ostentatória, etc.)
- Validar contra o linter @google/design.md ao final

Pergunta:
[Sua pergunta específica]

Antes de propor solução:
1. Identifique gaps na proposta atual
2. Liste compromissos da mudança proposta
3. Sugira critério de validação
```

---

## 6. Processo de revisão

### Revisão por marco

Disparam revisão de coerência:
- Mudança significativa de cargo ou capítulo de carreira
- Lançamento de produto principal (SaaS, livro, curso)
- Conclusão de fase importante (portfólio v2 no ar, primeiro cliente externo, etc.)

### Revisão por descompasso

Quando o trabalho real diverge do documentado, o critério depende do que diverge. Se for **valor de token ou de componente**, vale o Figma (seção 7): o repositório é corrigido, ou o Figma é corrigido pelo dono, conforme a decisão dele. Se for **prosa ou regra** que ficou velha, atualize o documento: ele é mapa, não trilho.

### Revisão anual leve

Uma vez por ano, leitura completa do brandbook + DESIGN.md + GOVERNANCE.md. Pergunte:
- Que trechos envelheceram?
- Que decisões não fazem mais sentido?
- Que padrões emergiram na prática que não estão documentados?

Não confunda revisão com mudança. Revisão é olhar. Mudança é decidir.

---

## 7. Fontes da verdade e ciclo de divergência

Conforme o sistema cresce, as fontes podem divergir: o Figma diz uma coisa, o CSS outra, o `DESIGN.md` uma terceira. Esta seção diz quem é canônico para quê e como a divergência é encontrada e fechada.

### Quem é canônico para quê

- **Figma** (Hope DS | Foundation e as bibliotecas de componentes publicadas) é canônico para **valores** de token e de componente: cores, tamanhos, espaçamento, raio, line height, tracking, pesos e os valores dos estilos de texto.
- **Este repositório** é canônico para **prosa, regras e changelog**: `DESIGN.md`, `DESIGN-IMPLEMENTATION.md`, `PATTERNS.md`, `GOVERNANCE.md` e `CHANGELOG.md`.
- **Cópias derivadas, nunca editadas como fonte:** os documentos dos projetos, o arquivo `hope-context.md` do Drive, `hope-demo.html`, `design-system.html` e o CSS do site no que toca a valores (o CSS espelha o Figma). Valor errado numa cópia se corrige na fonte ou pelo ciclo abaixo, nunca só na cópia.
- **O Brandbook V2.2** segue acima de tudo nas decisões de identidade (tese, posicionamento, arquétipos, acentos primários). Se o Figma contradisser o Brandbook numa decisão de identidade, o Brandbook vence e o Figma é corrigido.

### Precedência entre os documentos de prosa e regras

1. **Brandbook V2.2**: fundação da marca, raramente muda
2. **DESIGN.md**: tokens, componentes e regras em prosa, validável por linter
3. **DESIGN-IMPLEMENTATION.md**: implementação detalhada, deriva do DESIGN.md
4. **PATTERNS.md**: anatomias de página, consome componentes do DESIGN.md

O item mais alto prevalece. O mais baixo é atualizado, ou o mais alto é atualizado de forma explícita, com changelog. Esta lista resolve prosa e regra, **nunca valor**: valor vai ao Figma.

### Ciclo de divergência

O relatório de divergência compara um snapshot do Figma com o repositório (CSS e documentos). Roda:
- (a) depois de publicar a Foundation no Figma;
- (b) antes de fechar um ciclo de versão;
- (c) na revisão anual.

Cada item é classificado como:
- **Bloqueia**: valor errado renderizado no site.
- **Atenção**: nome, token faltando ou documento desatualizado.
- **Informativo**: diferença sem efeito, para registro.

Quem faz o quê: o Claude gera o relatório; o dono decide qual lado está errado em cada item; este repositório corrige o espelho (o dono corrige o Figma quando é o Figma que está errado). O relatório **não é guardado como arquivo permanente**: o que fica é o changelog do que foi corrigido. Nome de token no código (code syntax) é uma decisão à parte e conta como Atenção, nunca como valor.

---

## 8. Scope creep — o inimigo

O maior risco para o Hope **não é falta de features**. É excesso. Cada token novo, cada componente novo, cada regra nova é dívida cognitiva permanente.

### Sinais de scope creep

- Adicionar tema "high-contrast" antes de ter um único usuário que precisa dele
- Criar 47 variantes de botão "para flexibilidade"
- Suportar 8 frameworks frontend antes de ter um projeto rodando
- Documentar 30 padrões de naming antes de escrever a primeira linha de código

### Como os componentes entram no CSS

Os componentes que existem no Figma são codificados em lotes por família, a partir do Figma, tenha o site uso para eles ou não: Lote 0 Primitives (Button, Badge, Link, Separator), Lote 1 Forms, Lote 2 Feedback, Lote 3 Navigation e Lote 4 Overlays e dados. Cada lote é um prompt separado.

---

## 9. Quando criar componente novo

A régua existe porque sugestões de IA tendem a propor componentes para todos os cenários possíveis. Esta seção te dá os critérios para responder "não" rapidamente — ou "sim" com confiança.

### Os três testes

Antes de criar um componente novo, ele precisa passar nos três testes abaixo. **Falhou em um? Não cria.**

**Teste 1 — Cobertura do existente.**
Algum componente existente cobre 80% ou mais do uso pretendido?
- Sim → estenda com variante. Não crie novo.
- Não → passa para o teste 2.

**Teste 2 — Diferença visual vs comportamental.**
A diferença para o existente é apenas visual (cor, padding, radius)?
- Sim → é variante, não componente. Use o sistema de modifiers (`--variant`).
- Não (anatomia diferente, estados diferentes, papel diferente) → passa para o teste 3.

**Teste 3 — Reuso real.**
O componente novo será usado em mais de um lugar?
- Não → é padrão local da página, não componente do sistema. Implemente no contexto.
- Sim → ok. Cria o componente.

### Quando estender com variante

Variantes são a forma preferida de evolução. Sinais de que algo é variante (e não componente novo):

- Anatomia idêntica ao existente (mesma estrutura HTML/JSX)
- Mesmos estados (hover, focus, active, disabled, error)
- Diferença visual semântica (Solar = celebração, Âncora = estrutura)
- Mesmo contrato de props/atributos

Exemplo legítimo: `btn--solar` é variante de `btn--primary`. Anatomia idêntica, papel diferente.

### Quando criar componente novo

Sinais legítimos de componente novo:

- Anatomia diferente — estrutura interna distinta
- Estados próprios que não existem em nenhum componente existente
- Papel funcional novo no sistema (não cabe em `button`, `card`, `input`, `badge`)
- Será usado em múltiplos projetos / contextos

Exemplo legítimo: `breadcrumb` não é variante de nada. Anatomia própria (lista de links com separadores), papel próprio (navegação hierárquica), estados próprios (item ativo, item disabled).

### Anti-padrões

**× Componente novo para evitar editar o existente.** "Esse card é diferente o suficiente para virar `card-v2`." Não. Refatore o card existente.

**× Variante explosiva.** Mais de 8 variantes em um único componente é sinal de que pelo menos uma virou outra coisa. Quebre.

**× Componente sem desenho.** "Vou criar `dashboard-widget` para quando precisar." Sem desenho no Figma, a forma sai do palpite e costuma errar. Componente que já existe no Figma não entra aqui: é codificado em lote, com ou sem uso (seção 8).

**× Componente para um único uso.** Se uma necessidade nova aparece em uma página só e não existe no Figma, é padrão local, não componente do sistema.

### O custo de um componente novo

Cada componente do sistema custa:
- Documentação no DESIGN.md (entrada YAML + parágrafo na prosa)
- Implementação no DESIGN-IMPLEMENTATION.md (CSS completo, estados, responsivo)
- Manutenção em todas as fases futuras (mudou paleta? mudou tipografia? precisa atualizar)
- Carga cognitiva permanente (mais uma coisa para lembrar)

Vale o preço? Aplique os três testes. Se passou, vale.

### Registro dos testes aplicados

**Tooltip contra o contêiner que corta (v2.20.1).** Não é componente novo, então os três testes não se aplicam; o registro é de teste. Testes no navegador (Chromium, Light, 390 e 1280 de largura): a tabela do Prompt 36 repetida (X do Modal, Icon Button no corpo do Modal e no do Bottom Sheet, quatro posições pedidas cada), com 100% do balão visível nos 24 casos (eram 40%, 18% e 9% em três deles) e a seta a 0,0 px do centro do gatilho; gatilho no meio e a 20 px da borda de baixo do corpo do Modal que rola, rolagem de 30 px com o tooltip aberto (ele segue a 8 px), gatilho meio fora do corpo; o especime em um quadro com `overflow: hidden`. Regressão: os 56 casos de posição, com os valores numéricos de Menu, Popover e Breadcrumb idênticos aos da `main` (2.20.0), os 38 testes do Tooltip da v2.20.0, o Esc dentro de Modal e Bottom Sheet e o teclado do Menu e do Breadcrumb. Não testado: Firefox, WebKit, toque real, leitor de tela, Dark. Números no `CHANGELOG.md`.

**Tooltip com gatilho e seta que acompanha o gatilho (v2.20.0).** Não é componente novo (o Tooltip já existia), então os três testes não se aplicam; o registro é de teste. Testes no navegador (Chromium, Light, 390 e 1280 de largura): tempo de abertura medido (306 ms com o mouse, 314 ms com o teclado), fechamento medido (0,3 ms), hoverable (o ponteiro cruza os 8px e o balão fica), persistente (2 s), passagem rápida de 150 ms sem abrir, teclado (Tab abre, Tab fecha, Esc fecha e o foco fica), Esc dentro do Modal e do Bottom Sheet (o primeiro Esc fecha só o tooltip, o segundo fecha o diálogo), toque (um toque não abre) e a seta nas quatro posições com distância ao centro do gatilho de 0,00 px quando não há limite. Os 56 casos de posição da v2.19.0 e o teclado do Menu e do Breadcrumb repetidos. Não testado: Firefox, WebKit, toque real, leitor de tela, Dark. Números no `CHANGELOG.md`.

**Posicionador compartilhado (v2.19.0).** Não é componente novo, então os três testes não se aplicam ao módulo; o registro é de reuso e de teste. Reuso: um `js/position.js` serve Menu, Popover, painel do Breadcrumb e Tooltip, em vez de quatro lógicas. Testes no navegador (Chromium, 390 e 1280 de largura, Light): posição padrão, inversão vertical por rolagem com o painel aberto, borda direita e esquerda, os quatro lados e a inversão do Tooltip, resize e rolagem com o painel aberto, e o teclado do Menu e da reticência do Breadcrumb (Enter, setas, Home, End, Esc, Tab, retorno do foco) idêntico ao da `main`. Painéis dentro do Modal e do Bottom Sheet: cortados, registrado como lacuna. Números no `CHANGELOG.md`.

**Bottom Sheet (v2.18.0, D-55).** Teste 1: o Modal cobre o conteúdo, mas não a forma (ancorada na borda inferior, sem X, gesto de deslizar); estender o Modal com uma variante mudaria anatomia e comportamento, então o Modal não cobre 80% do uso em tela estreita e de toque. Teste 2: a diferença não é só visual (anatomia sem X, rodapé em coluna, gesto de fechar, foco inicial próprio). Teste 3: reuso real em tela estreita e de toque, em qualquer confirmação que hoje usaria o Modal; o Figma Core já tem o componente (`2602:134`). Passou nos três. Escopo mínimo: o mesmo conteúdo do Modal; modo sem dispensa, alturas intermediárias e lista de ações ficam como lacunas documentadas.

---

## 10. Princípios de governança em uma frase

- **Documente decisões, não desejos.**
- **Fundação raramente muda. Aplicação evolui sempre.**
- **Compatibilidade reversa é dívida que se honra, não obstáculo.**
- **Agente propõe, humano decide.**
- **Sem critério de sucesso, não há mudança válida.**
- **Simplicidade vence sofisticação.**
- **O Figma vence em valores, o repositório vence em prosa e regras, e a documentação acompanha as duas.**
- **Revisão é olhar. Mudança é decidir. Não confunda.**

---

## 11. Mapa de arquivos do Hope

```
/hope/
├── brandbook-v2.2.pdf          ← Fundação (raramente muda)
├── DESIGN.md                    ← Fonte da verdade técnica (Google Labs spec)
├── DESIGN-IMPLEMENTATION.md     ← Implementação CSS detalhada
├── PATTERNS.md                  ← Anatomias de página
├── GOVERNANCE.md                ← Este arquivo
├── CHANGELOG.md                 ← (opcional — pode viver no DESIGN.md)
├── /logos/
│   ├── logo-light-mode.svg
│   ├── logo-dark-mode.svg
│   └── logo-icon.svg
└── /fonts/
    └── PlusJakartaSans-*.ttf
```

Quando esses arquivos forem usados em projetos diferentes (portfólio, plugin, SaaS), eles são **copiados, não referenciados**. Cada projeto carrega sua versão do Hope. Mudanças no Hope central não propagam automaticamente — propagam quando o projeto decide atualizar.

Isso é proposital. Compatibilidade reversa por design.

### CSS gerado pelo Tailwind: passo obrigatório em upgrade

O `css/output.css` é gerado por `npm run build:css` a partir de `css/tailwind.css`. Desde a v2.6.13 o preflight do Tailwind não vem do pacote: `css/tailwind.css` importa `css/preflight-nomono.css`, uma cópia local do `tailwindcss/preflight.css` sem o `font-family` da regra `code, kbd, samp, pre` (o site não tem fonte monoespaçada). **Em todo upgrade do Tailwind:**
1. Copiar de novo `node_modules/tailwindcss/preflight.css` para `css/preflight-nomono.css`.
2. Remover de novo só o `font-family` da regra `code, kbd, samp, pre` e atualizar a versão no comentário do topo.
3. Rodar `npm run build:css` e conferir que `css/output.css` não tem `ui-monospace` nem `--font-mono`.
4. Comparar o estilo computado das páginas que carregam o `output.css` antes e depois (zero diferenças é o critério).

---

## 12. Convenções dos componentes no Figma

Vale para os arquivos Hope DS | Core Components e Hope DS | Portfolio Components, e para quem os consome. Origem: revisão geral de novembro de 2026.

### 12.1 Nome das propriedades

| Papel | Nome | Observação |
|---|---|---|
| Texto que nomeia um controle ou item (botão, link, tab, badge, tag, item de menu) | `Label` | Link e Header Link passaram de `Text` para `Label` na revisão. |
| Texto corrido, que é o conteúdo do componente (Tooltip, Banner) | `Text` | Não é rótulo de nada, é o próprio conteúdo. |
| Texto de ajuda de campo (Input, Textarea, Select, Checkbox, Radio, Switch) | `Helper text` | Input, Textarea e Select passaram de `Description` para `Helper text`. O booleano correspondente é `Show helper text`. |
| Descrição de conteúdo (Alert, Toast, Empty state) | `Description` | Aqui é conteúdo, não ajuda de campo. |
| Ícone único opcional | `Show icon` + `Icon` | Toast, Empty state. |
| Ícone com posição | `Show icon L` / `Show icon R` + `Icon L` / `Icon R` | Button (dois ícones), Input e Select (só direita). O sufixo diz a posição. |
| Troca de instância | tipo INSTANCE_SWAP, nome do papel (`Icon`) | Nunca `Swap`. |
| Visibilidade | `Show <coisa>` | Sempre booleano. |

Renomear uma propriedade é mudança que quebra quem usa as instâncias. Fazer em lote, registrar no CHANGELOG como BREAKING e avisar.

### 12.2 State e seleção

- **`State`** descreve só interação e validação: Default, Hover, Focus, Error, Disabled. Ordem fixa dos valores: Default, Hover, Focus, Error (quando existir), Disabled.
- O estado de foco se chama **`Focus`** (nunca `Active`).
- **Seleção é um eixo próprio, não um valor de State.** Booleano quando é liga/desliga (`Selected` em Tabs, `Open` em Accordion); eixo nomeado quando tem mais de dois valores (`Checked` com Unchecked, Checked e Indeterminate).
- Exceções registradas, por terem comportamento próprio e não só aparência: Pagination usa `State=Current` e Menu item usa `State=Selected`. Se um deles precisar de hover e foco quando selecionado, migrar para eixo próprio.
- Eixo com um único valor não é eixo. O Banner tem só `Type=Notice` (renomeado de `Warning` em novembro de 2026 para não ser confundido com status). Manter o eixo apenas enquanto houver chance de um segundo tipo; se não houver, remover.

### 12.3 Nada cru dentro de componente

Dentro de um componente, estes valores vêm de variável ou estilo, nunca de número solto:

- cor (fill e stroke): variável semântica. Texto de status usa o token semântico (por exemplo `Text/Positive/Secondary`), não o primitivo;
- raio: variável;
- padding e gap: variável `space-N`. Valores fora da escala (por exemplo 10) não existem; arredondar para o degrau mais próximo e documentar;
- texto: estilo de texto da biblioteca;
- ícone: variável `Icon/Color` pelo modo do contêiner (ver 12.4).

Exceção aceita e registrada: gap de 2px entre linhas de metadados (Work Experience Item, Case Hero).

### 12.4 Cor de ícone

- Os vetores dos ícones usam a variável `Icon/Color` (coleção `Hope · Icon`). Nunca recolorir vetor por override.
- O modo da coleção é definido no **contêiner do ícone** (raiz da variante ou frame `icon-slot`), nunca na instância do ícone, porque a troca de ícone cria um nó novo e perde o modo.
- A coleção tem 10 modos, o limite do plano Professional. Modo novo exige consolidar um existente.
- Todo ícone trocável precisa estar ligado a uma propriedade INSTANCE_SWAP (referência `mainComponent`), em todas as variantes. Conferir quando uma variante for criada por cópia.
- Depois de alterar ícones no Phosphor: publicar o Phosphor, aceitar a atualização no Core e rodar o inventário de ícones com cor antiga. O Figma não atualiza as cópias remotas já presentes no arquivo sem essa aceitação, e cópias antigas podem sobrar.

### 12.5 Documentação mínima de um componente

Um componente só é considerado pronto, no Core ou no Portfolio, com:

1. painel **Info** como instância do componente Info (Helper Components), com título, descrição, tags e link;
2. **descrição do componente** (o campo do Figma), citando estilos, estados, regras de uso e a diferença para o componente mais parecido;
3. **specimen** com os estados;
4. tokens de contraste verificados (texto 4,5:1, contorno de controle e ícone 3:1).

Descrições citam tokens e valores que existem hoje. Texto de contexto de outro projeto (por exemplo, exemplos de domínios de clientes) não entra em descrição de componente do Hope.

### 12.6 Componentes em revisão

Componente sem decisão fica numa seção "Em revisão", com o nome sufixado `(legacy)` se houver um sucessor com o mesmo nome, e com descrição que diga o que decidir (manter, mesclar ou remover). Dois componentes com o mesmo nome na mesma biblioteca não são permitidos. Se a decisão demorar, aplicar o teste da seção 8: sem uso real, remover. (Em novembro de 2026 a seção foi esvaziada: o Highlight Card legacy foi removido. Case Callout e Lightbox voltaram ao Figma em 13 de novembro de 2026, porque o site os usa: o Case Callout mora em Hope DS | Portfolio Components e o Lightbox em Hope DS | Core Components, página `└ Lightbox`, com o token Scrim Strong.)

### 12.7 Bibliotecas e páginas

**Quem mora onde**
- **Hope DS | Core Components**: só componentes genéricos, que servem a qualquer produto (Button, Icon Button, Link, Badge, Input, Modal, Tabs e afins). Banner e Icon Button ficam aqui.
- **Hope DS | Portfolio Components**: componentes específicos do site renanmoura.dev (Header, Footer, Hero, Case Card, Persona e os demais). Consome Foundation, Core Components, Phosphor Icons e Helper Components como bibliotecas.
- Regra de dependência: o Core nunca usa componente do Portfolio. O Portfolio pode usar o Core.
- Critério para um componente novo: se faria sentido em outro produto sem mudança, é Core. Se carrega conteúdo ou layout do portfólio, é Portfolio.
- Mudança de escopo em relação à decisão anterior de manter tudo no Core: motivo é evitar confusão ao trabalhar em outro produto, onde os padrões do portfólio apareciam na biblioteca.

**Nome das páginas** (nos dois arquivos)
- Página de seção: prefixo `📁 ` e o nome, sem traços nem outros adornos (ex.: `📁 Primitives`), em inglês nos dois arquivos. O emoji é só para diferenciar a seção dos itens.
- Página de componente: prefixo `└ ` e o nome do componente (ex.: `└ Button`), sem emoji, logo abaixo da seção a que pertence.
- `Cover` fica sozinha no topo.

---

*Hope Design System · GOVERNANCE.md · v1.7 · novembro de 2026 · Renan Moura*

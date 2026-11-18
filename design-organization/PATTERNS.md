# PATTERNS.md
# Hope Design System — Padrões de Página
# Versão 1.1.1 · novembro de 2026

**Changelog v1.1.1 (PATCH)**: corrigida a frase do v1.1 que dizia que Case Callout e Lightbox foram removidos do Figma. Os dois foram recriados em 13 de novembro de 2026: o Case Callout em Hope DS | Portfolio Components e o Lightbox em Hope DS | Core Components (página `└ Lightbox`, com o token Scrim Strong). Nenhum padrão daqui passa a depender deles.

**Changelog v1.1**: métricas do Case Study passam a citar Plus Jakarta Sans. Nenhum padrão depende dos componentes Case Callout e Lightbox; o `callout-anchor` citado no padrão Article é outro componente e continua válido.

Este arquivo documenta **estruturas de página reutilizáveis** para o portfólio de Renan Moura. Não são componentes (esses estão em `DESIGN.md` e `DESIGN-IMPLEMENTATION.md`) — são **anatomias completas de página** que combinam componentes em ordens específicas para servir um propósito narrativo.

## Como ler este arquivo

Cada padrão tem cinco partes:

1. **Propósito** — para que serve, quando usar
2. **Anatomia** — ordem canônica das seções
3. **Densidade** — qual densidade aplicar em cada seção
4. **Backgrounds atmosféricos** — onde entram (e onde não entram)
5. **Anti-padrões** — o que evitar

Padrões aqui são **descritivos, não prescritivos absolutos**. Servem como ponto de partida — variações pequenas são esperadas. Variações grandes viram padrão novo (e passam pelos quatro testes do `GOVERNANCE.md` seção 9).

---

## 1. Page — Case Study

### Propósito

Apresentar um trabalho profissional como **narrativa de decisão**, não como portfolio de telas. O Brandbook V2.2 é claro: a marca defende design como infraestrutura de decisão, não como produção visual. O case precisa refletir isso — explicar o porquê, não só mostrar o quê.

Use para qualquer trabalho real (Shell Box, New Relic, Dotz). Critério de "case publicável" no Brandbook V2.2 cap. 10: o trabalho precisa ter aprendizado generalizável, não só resultado bonito.

### Anatomia

```
┌─────────────────────────────────────────┐
│  1. HERO ATMOSFÉRICO                    │
│     Overline · Empresa · Ano            │
│     Display · Título do case            │
│     Body · Lead (uma frase)             │
│     Badges · 2-3 disciplinas            │
├─────────────────────────────────────────┤
│  2. MÉTRICAS-CHAVE                      │
│     Cards/blocos com +21%, +12%, etc.   │
│     Plus Jakarta Sans bold em Âncora    │
├─────────────────────────────────────────┤
│  3. CONTEXTO                            │
│     H2 · "Contexto e problema"          │
│     Body · 2-4 parágrafos               │
│     [Opcional: imagem do estado inicial]│
├─────────────────────────────────────────┤
│  4. DIAGNÓSTICO                         │
│     H2 · "O que descobrimos"            │
│     Body · raciocínio do diagnóstico    │
│     [Opcional: dados, evidências]       │
├─────────────────────────────────────────┤
│  5. DECISÕES DE DESIGN                  │
│     H2 · "Decisões que tomamos"         │
│     Lista de decisões com porquê        │
│     Imagens das telas (image-frame)     │
├─────────────────────────────────────────┤
│  6. PROCESSO (opcional)                 │
│     H2 · "Como chegamos lá"             │
│     Frameworks usados, iterações        │
├─────────────────────────────────────────┤
│  7. RESULTADO                           │
│     H2 · "O que aconteceu depois"       │
│     Métricas detalhadas, aprendizado    │
├─────────────────────────────────────────┤
│  8. APRENDIZADO GENERALIZÁVEL           │
│     H2 · "O que isso ensina"            │
│     Body · 1-2 parágrafos               │
│     Blockquote opcional com a tese      │
├─────────────────────────────────────────┤
│  9. CTA + PRÓXIMO CASE                  │
│     "Ver próximo case →"                │
│     Link para case relacionado          │
└─────────────────────────────────────────┘
```

### Densidade

- Hero: **Spacious** (espaçamento 2xl, body maior)
- Métricas: **Comfortable**
- Conteúdo narrativo (3-8): **Comfortable** com prose container (max-width 65ch)
- CTA + próximo case: **Comfortable**

Imagens entre seções usam `image-frame` com aspect-ratio apropriado (16:9 para screenshots desktop, 3:4 para mobile, 1:1 para detalhes).

### Backgrounds atmosféricos

**Onde entram:**
- Hero (seção 1) — background atmosférico da Manus alinhado ao tom do case
- Transição entre seção 7 (Resultado) e 8 (Aprendizado) — uma quebra conceitual sutil

**Onde NÃO entram:**
- Conteúdo narrativo (seções 3-7) — texto e imagens sobre fundo Nuvem/Superfície
- Métricas — sempre sobre fundo claro para legibilidade máxima

### Anti-padrões

✗ **Mostrar telas sem explicar a decisão.** Se a seção 5 (Decisões) vira só galeria, o case virou portfólio visual — viola a tese da marca.

✗ **Pular o diagnóstico.** O Brandbook V2.2 cap. 03: "diagnóstico é metade do trabalho, frequentemente a mais negligenciada". Sem seção 4, o case fica frágil.

✗ **Esconder números ruins.** Se algo deu errado, conta. Aprendizado generalizável (seção 8) ganha peso quando há honestidade sobre o que não funcionou.

✗ **Aprendizado vago.** "Aprendemos muito" não é aprendizado. Tem que ser uma tese específica que outras pessoas podem usar no próprio trabalho.

✗ **Background atmosférico no conteúdo.** Compete com texto, reduz legibilidade. Atmosfera é para transição, não para leitura.

---

## 2. Page — Home / Landing

### Propósito

A página de entrada do `renanmoura.framer.website`. Precisa **comunicar posicionamento em 5 segundos** e levar para os cases. Não é portfólio — é tese ilustrada por trabalho.

Brandbook V2.2 cap. 02: "Traduzo contextos complexos em decisões que ficam de pé." Essa frase ou variação precisa estar visível no hero.

### Anatomia

```
┌─────────────────────────────────────────┐
│  1. HEADER STICKY                       │
│     Logo · Nav · CTA (Contato)          │
├─────────────────────────────────────────┤
│  2. HERO                                │
│     Display · Frase de posicionamento   │
│     Body · 1-2 parágrafos contextuais   │
│     Badges · áreas de atuação           │
│     CTA · "Ver trabalhos" ou similar    │
├─────────────────────────────────────────┤
│  3. CASES EM DESTAQUE                   │
│     Grid de 3-6 cards                   │
│     Card--case com métricas             │
├─────────────────────────────────────────┤
│  4. SOBRE (resumo)                      │
│     H2 · Quem é Renan, em 1 parágrafo   │
│     Link · "Saiba mais sobre mim →"     │
├─────────────────────────────────────────┤
│  5. PUBLICAÇÕES / ARTIGOS (opcional)    │
│     Lista de artigos recentes           │
├─────────────────────────────────────────┤
│  6. FOOTER                              │
│     Contato · Redes · Crédito           │
└─────────────────────────────────────────┘
```

### Densidade

- Hero: **Spacious** — frase de posicionamento precisa respirar
- Cases em destaque: **Comfortable** — densidade padrão de cards
- Sobre: **Comfortable**
- Publicações: **Comfortable** ou **Compact** se houver muitos itens
- Footer: **Comfortable**

### Backgrounds atmosféricos

**Onde entram:**
- Hero (seção 2) — background atmosférico discreto, geralmente em tom Âncora/Abismo com Solar como acento luminoso
- Footer (seção 6) — fundo Abismo (sem atmosfera, só cor sólida)

**Onde NÃO entram:**
- Cases em destaque — cards precisam contrastar com fundo limpo para hierarquia funcionar
- Sobre — leitura

### Anti-padrões

✗ **Hero sem posicionamento.** Se a primeira coisa que se lê é "Bem-vindo ao meu portfólio", a marca perde 5 segundos do visitante. A frase de posicionamento é o hero — não é decoração.

✗ **Listar tudo.** Mostrar 15 cases na home é ruído. Selecione 3-6 que melhor representam a tese — os outros vivem em página de arquivo.

✗ **CTA fraco.** "Saiba mais" é genérico. Prefira ação específica: "Ver case Shell Box", "Falar comigo", "Baixar CV".

✗ **Background atmosférico em tudo.** Vira tema, não quebra. Use só no hero e footer.

---

## 3. Page — Article (Editorial)

### Propósito

Para artigos longos, ensaios e textos da produção intelectual da marca (Brandbook V2.2 cap. 09 — "Outputs da marca / Intelectual"). Esses textos sustentam a tese e diferenciam Renan dos "designers que só fazem telas".

O foco é **leitura**. Não é UI, não é catálogo — é texto bem composto.

### Anatomia

```
┌─────────────────────────────────────────┐
│  1. HEADER STICKY                       │
│     Logo · Nav · CTA                    │
├─────────────────────────────────────────┤
│  2. METADATA                            │
│     Overline · Categoria · Data leitura │
│     Display · Título do artigo          │
│     Body · Subtítulo opcional           │
│     Author + data publicação            │
├─────────────────────────────────────────┤
│  3. IMAGEM DE ABERTURA (opcional)       │
│     image-frame 16:9 ou 21:9            │
│     Caption em Plus Jakarta Sans        │
├─────────────────────────────────────────┤
│  4. CORPO DO ARTIGO                     │
│     Prose container (max-width 65ch)    │
│     H2/H3 seções, body, listas,         │
│     blockquotes, code, imagens          │
├─────────────────────────────────────────┤
│  5. CALLOUT DE TESE (opcional)          │
│     callout-anchor com a ideia central  │
├─────────────────────────────────────────┤
│  6. CORPO CONTINUA                      │
│     Mais seções do artigo               │
├─────────────────────────────────────────┤
│  7. CONCLUSÃO                           │
│     H2 · "Em resumo" ou similar         │
│     1-2 parágrafos de fechamento        │
├─────────────────────────────────────────┤
│  8. ARTIGOS RELACIONADOS                │
│     2-3 cards de outros artigos         │
├─────────────────────────────────────────┤
│  9. FOOTER                              │
└─────────────────────────────────────────┘
```

### Densidade

- Metadata e título: **Spacious** — título precisa de espaço
- Corpo do artigo: **Comfortable** com prose container (65ch max)
- Callouts: **Comfortable**
- Artigos relacionados: **Compact** se forem mais de 3

### Backgrounds atmosféricos

**Onde entram:**
- Imagem de abertura (seção 3) — se for atmosférica, ocupa só o image-frame, não a página inteira

**Onde NÃO entram:**
- Corpo do artigo (seção 4 e 6) — leitura longa exige fundo Nuvem/Superfície limpo
- Callouts — usam Aurora/Céu como acento, não atmosfera

### Anti-padrões

✗ **Largura de leitura grande.** Linhas com mais de 75 caracteres cansam. Use container `prose` (max-width 65ch) sempre.

✗ **H1 dentro do corpo.** O título é H1 do hero (seção 2). No corpo, máximo H2.

✗ **Imagens sem caption.** Caption em Plus Jakarta Sans (label-caps) dá identidade editorial e ajuda contexto. Sempre tenha.

✗ **Blockquotes decorativos.** Blockquote é citação real (alguém disse algo) ou destaque de tese. Não é "frase legal centralizada".

✗ **Animação de scroll.** Texto longo + parallax = leitura ruim. O artigo é leitura, não experiência cinemática.

---

## Quando criar padrão novo

Quando aparecer uma necessidade real que não cabe em nenhum dos três acima:

1. Aplique os quatro testes do `GOVERNANCE.md` seção 9
2. Se passar, adicione aqui com a mesma estrutura (Propósito → Anatomia → Densidade → Backgrounds → Anti-padrões)
3. Documente no changelog deste arquivo

Padrões que **não devem** entrar aqui sem demanda real:

- Dashboard layouts (não tem dashboard)
- Settings systems (portfólio não tem)
- Multi-step workflows (idem)
- Authentication flows (idem)
- Plugin patterns (não tem plugin)
- Search interfaces (não tem busca complexa)

Esses talvez nunca apareçam. E se aparecerem, será quando você construir o produto que precisa deles — e aí o uso real define a forma.

---

## Mapa de relação com outros arquivos

- **DESIGN.md** define **tokens e componentes** — os átomos que esses padrões usam
- **DESIGN-IMPLEMENTATION.md** define **CSS dos componentes** — como cada átomo é construído
- **GOVERNANCE.md** define **regras de evolução** — quando criar padrão novo, quando recusar
- **PATTERNS.md** (este arquivo) define **anatomias de página** — como combinar átomos em páginas inteiras

Hierarquia de precedência (do GOVERNANCE.md seção 7): Brandbook V2.2 → DESIGN.md → DESIGN-IMPLEMENTATION.md → PATTERNS.md → Código real.

Se um padrão aqui conflitar com algo no DESIGN.md, o DESIGN.md vence. Padrões aqui usam componentes, não os redefinem.

---

*Hope Design System · PATTERNS.md · v1.1.1 · novembro de 2026 · Renan Moura*

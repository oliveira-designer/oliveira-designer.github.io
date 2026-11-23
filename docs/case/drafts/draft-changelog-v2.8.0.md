# Applied to design-organization/CHANGELOG.md on 2026-11-23 (version 2.8.0, MINOR, approved by the owner). Kept here as the source draft.

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

# Hope DS: diário de decisões (material de case)

Esta cópia no repositório é a canônica; a cópia no Claude Project é derivada.

Versão 0.1 · 2026-11-19 · Rascunho vivo, uso interno (Renan e agentes)

## Como ler este documento

- Cada entrada tem: contexto, opções consideradas, decisão, motivo e consequência.
- **[Registrado]** vem do que Renan disse ou de documentos do Project (CHANGELOG, GOVERNANCE, hope-context). **[Inferência]** é leitura minha e precisa da confirmação dele antes de virar narrativa pública.
- Erros e reversões ficam aqui de propósito. Um case sem eles não convence.
- Antes de qualquer publicação: remover referências a clientes sob NDA e traduzir para o inglês do portfólio.
- Local canônico futuro: repositório `design-organization`. Esta cópia no Project é derivada.

## Ciclo 2026-11 (divergência Figma x código)

### D-01 Fonte da verdade: Figma para valores, repositório para prosa e regras
- **Contexto:** os nomes de tokens no Figma estavam mais organizados que os do CSS, e os dois lados tinham divergido.
- **Opções:** (1) renomear o Figma para o CSS; (2) renomear o CSS para o Figma; (3) manter os nomes diferentes e mapear via code syntax.
- **Decisão:** Figma é a fonte da verdade dos valores de token e componente. O repositório manda em prosa, regras e changelog. Project e Drive são cópias derivadas. O Brandbook segue acima de tudo em decisões de identidade. [Registrado: GOVERNANCE v1.5, seção 7]
- **Motivo:** Renan quis o Figma sempre como fonte, mas pediu investigação antes de mudar qualquer coisa "às cegas", porque muito do CSS já construído precisava ser considerado. [Registrado]
- **Consequência:** nasceu o relatório de divergência (roda após publicar o Foundation, antes de fechar versão e na revisão anual). Itens classificados em Bloqueia, Atenção e Informativo. Claude gera, Renan decide, Code corrige o espelho. [Registrado]

### D-02 Nomes de token: code syntax no Figma aponta para o nome do CSS
- **Decisão:** em vez de renomear dos dois lados, cada variável do Figma recebeu code syntax com o nome CSS (famílias night, link e focus, soft backgrounds, material, entre outras). [Registrado]
- **Pendente conhecido:** Layout/*, Stroke/medium, thick e accent, Blur/lg sem mapeamento. Tokens sem code syntax significam "ainda sem código". [Registrado]

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
- **Itens:** `--color-bg-icon-chip` (14% no CSS, 15% no Figma), `--color-bg-scrim-strong` (`#0D0D0F` no CSS, `#000000` no Figma, ambos 88%) e o anel de hover do glass. [Registrado]
- **Decisão:** adiar. O toggle de dark está oculto no site, então o custo de esperar é baixo. [Registrado quanto ao adiamento; motivo é Inferência]

### D-06 Ordem de publicação e escopo das mudanças
- **Decisão:** versionamento PATCH conforme GOVERNANCE seção 3. Renan publica as bibliotecas; agentes nunca. Ordem: Foundation, depois Core, depois Portfolio. [Registrado]
- **Observação:** Code ampliou o escopo ao reescrever as seções 6 e 10 do GOVERNANCE e o PATTERNS. Foi justificado pela nova seção 7, mas fica sinalizado para Renan revisar o diff antes de empurrar. [Registrado]

### D-07 Conferência de componentes: remoção do hope-demo.html
- **Contexto:** a cópia no Project era um artefato derivado e Renan perguntou onde conferiria os componentes sem ela. [Registrado]
- **Decisão:** apagar só a cópia do Project (a do repositório fica). A conferência de componentes passa a ser a documentação em construção (D-08). [Registrado]
- **Erro meu:** sugeri antes que a cópia do repositório também deveria sair. Era a do Project. Corrigido. [Registrado]

## Ciclo 2026-11 (documentação do DS)

### D-08 Documentação inspirada na Animalia DS
- **Contexto:** o Figma tem a biblioteca pronta, mas faltava guia de uso e documentação do código. Renan apontou a Animalia como referência (doc.animaliads.io). [Registrado]
- **O que a Animalia faz (observado em 2026-11):** menu com Componentes, Comportamentos, Estilos, Sobre, Guia e Tokens; página de botão com Anatomia, Tipos, Tamanhos, Boas práticas em pares Fazer/Não fazer, Desenvolvimento com demo ao vivo e propriedades customizáveis. Sem seção de estados. Tokens em duas camadas. [Registrado: pesquisa]
- **Opções:** A) página "Como usar" no Figma mais painel Info padronizado; B) site de docs no repositório, com página de tokens gerada do snapshot do Figma; C) Zeroheight ou Notion. [Registrado]
- **Decisão:** A agora, B em fases. C descartada por criar uma segunda fonte da verdade. A recomendação é minha; Renan aprovou começar ("Pode começar"). [Registrado]
- **Público:** por enquanto só Renan e agentes. A intenção é virar produto vivo, para venda ou como case de visibilidade. [Registrado]
- **Status:** rascunho da página "Como usar" criado no Core Components (não publicado). Fase B sem aprovação para iniciar.

### D-09 Documentar o processo como case
- **Decisão:** manter este diário e atualizá-lo a cada ciclo de decisões. [Registrado: pedido de Renan]
- **Limite:** decisões anteriores a esta conversa só entram se estiverem registradas (CHANGELOG, GOVERNANCE, hope-context). Sem registro, o motivo não é reconstruído por mim.

## Pendências para o case

- Confirmar com Renan o motivo das decisões marcadas como Inferência.
- Levantar decisões anteriores ao ciclo 2026-11 a partir do CHANGELOG e da seção 8 do hope-context.
- Definir o que o case mostra além do diário: antes e depois do DS, métricas (cobertura de tokens, itens do relatório de divergência por ciclo).
- Decidir o local canônico (repositório) e commitar via Code.

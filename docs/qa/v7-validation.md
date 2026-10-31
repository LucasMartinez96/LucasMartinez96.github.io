# V7 WOW — implementação e validação

## Escopo

Experiência **Lucas Martinez — Beyond the Interface**, implementada sobre a V6 estática em HTML, CSS e JavaScript. A entrega é uma branch e uma prévia; a promoção para produção depende da aprovação de Lucas.

## O que mudou

- Entrada de até 1,55 s com opção de pular, nome monumental e composição espacial original LM. O conteúdo e os links ficam disponíveis desde o início.
- Malha tridimensional de seis peças chanfradas, projetada em Canvas 2D, com iluminação e resposta sutil ao cursor. Convergência finita de fragmentos; nenhuma nova dependência de execução.
- Galeria editorial: Control Tower, Gás & Condomínio e Forno & Estoque em composições amplas, seguidos pelos outros quatro projetos. Filtros, detalhes e ampliação continuam disponíveis.
- Terminal original integrado a uma seção narrativa; transições de leitura, deslocamentos discretos no scroll nativo e controles de movimento.
- Estudos de caso com atmosferas próprias, hierarquia editorial, navegação entre capítulos, progresso de leitura e galerias originais.
- Crachá original integrado ao novo ambiente, sem modificar seu código, fotografia, QR ou física.

## Preservação verificável

Base V6: `5ea41bf0a757c51c0b44d6905e3c36643d0bbb12`.

Backup remoto: `backup/v6-before-v7-wow-20261031`. Foi criado antes das alterações. Um bundle local de todo o histórico também passou por `git bundle verify`; SHA-256: `49864319dae9ebebba17926dfde646e3a09283c4fbb620b7fff3379e2365f321`.

O manifesto `v6-preserved-sha256.json` confirma os mesmos bytes de 17 arquivos originais: imagens protegidas e implementação do crachá. Os textos normalizados dos três estudos foram comparados com a base V6 e são idênticos, desconsiderando os antigos glifos decorativos de setas, agora ícones SVG. Não foram acrescentados resultados, indicadores, tecnologias de projetos ou experiências profissionais.

Os sete projetos continuam presentes: Control Tower, Gás & Condomínio, Forno & Estoque, Inventário Cíclico, Pátio 3D, Ocupação 3D e Jornal IA. Permanecem também currículo, resumo profissional PT/EN, certificações, mapa tecnológico, terminal e contatos.

## Validação executada

| Verificação | Resultado |
| --- | --- |
| `python -m unittest discover -s tests -v` | 4 testes aprovados: integridade dos originais, sete projetos/três destinos, recursos locais e entrada sem bloqueio |
| `node --check` nos três novos scripts | Sem erros de sintaxe |
| Conteúdo dos três estudos versus V6 | Texto normalizado idêntico; setas decorativas convertidas em SVG |
| Chrome desktop | Hero, galeria, crachá e estudo de caso inspecionados visualmente |
| Viewports responsivos de 320, 360 e 390 px | Sem rolagem horizontal da página, imagens carregadas e conteúdo legível; navegação de capítulos pode rolar horizontalmente |
| Filtros de projetos | “Sistemas web” mostra Gás e Forno; “Todos” restaura os sete |
| Detalhes dos projetos | Expansão e estado `aria-expanded` funcionando |
| Galerias da home e Control Tower | Abertura, próxima imagem por seta, fechamento por Escape e retorno do foco verificados |
| Resumo PT/EN | Alternância de idioma mantém textos, destinos e os dois ícones SVG |
| Menu mobile | Abre por controle acessível em 320 px |
| Crachá original | Arrasto com resposta física, giro por Enter e verso com QR do GitHub verificados |
| Movimento reduzido | Preferência simulada antes dos scripts; composição estática, conteúdo acessível, sem abertura obrigatória |
| Canvas indisponível | Fallback CSS LM e todo o conteúdo visíveis; sem erro de JavaScript |
| Erros de página no navegador | Nenhum erro do site nos cenários observados |

### Desempenho e limites da validação

A composição nova dorme quando está em repouso, fora da tela ou em aba oculta. A densidade de pixels e a frequência de atualização são limitadas em telas pequenas ou dispositivos com menos memória; a convergência termina e não deixa um ciclo permanente de partículas. O crachá mantém seu comportamento original.

As verificações mobile usam viewports reais de iframe no Chrome, não um aparelho Android físico. A simulação de `prefers-reduced-motion` e indisponibilidade de Canvas ocorre em um harness local que não é publicado. Não se apresenta pontuação Lighthouse, medição em rede móvel, certificação entre navegadores ou teste de toque físico como resultado executado. Os valores de paint do harness não são usados como benchmark de produção.

## Revisão visual

Revisão independente realizada sobre capturas desktop e mobile. Os três ajustes solicitados foram aplicados e reavaliados: fallback LM plano, metadados abaixo dos títulos e ícones SVG consistentes. O parecer final foi `ship` para esses três ajustes, todos marcados como resolvidos; não representa certificação de outros navegadores ou Android físico. A captura adicional de Gás & Condomínio confirmou a imagem original completamente carregada.

## Arquivos

| Grupo | Arquivos |
| --- | --- |
| Home e integração | `index.html`, `v5-ultimate.js` |
| Experiência V7 | `wow-v7.css`, `wow-v7.js`, `wow-monogram.js` |
| Estudos de caso | `control-tower.html`, `gas-condominio.html`, `forno-estoque.html`, `wow-case.css`, `wow-case.js` |
| Tipografia | `assets/fonts/space-grotesk-bold.ttf`, `assets/fonts/OFL.txt` |
| Preservação e QA | `tests/test_integrity.py`, `docs/qa/`, `scripts/build-preview.py`, `.gitignore` |
| Direção e documentação | `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `docs/superpowers/plans/2026-10-31-v7-wow.md` |

## Publicação

Branch de trabalho: `v7-wow-cinematic-20261031`. A URL da prévia e a validação do deploy são registradas no Pull Request. A branch principal e a V6 em produção devem permanecer no commit base até aprovação explícita.

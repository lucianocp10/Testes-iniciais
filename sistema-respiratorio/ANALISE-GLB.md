# Inspeção dos modelos GLB e integração

Arquivos conferidos em 25/10/2026 no repositório `lucianocp10/Variados-`.

## Resultado

**Os órgãos estão separados.** Os dois arquivos contêm nós com nomes e identificadores anatômicos (`extras.anatomical_id`) associados a malhas independentes. O pulmão direito está dividido em três lobos e o esquerdo em dois. Assim, é possível ocultar, selecionar, colorir e movimentar cada peça separadamente.

| Arquivo | Tamanho | Nós | Malhas | Triângulos originais | Animações | Esqueletos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `lungs-with-trachea-respiratory-system.glb` | 4.695.920 bytes | 30 | 29 | 14.562 | 0 | 0 |
| `torso-with-removable-organs.glb` | 21.139.716 bytes | 57 | 56 | 87.822 | 0 | 0 |

São GLB 2.0 com um buffer binário incorporado por arquivo. Contêm imagens/texturas incorporadas: três no modelo respiratório e treze no tronco. A extensão obrigatória observada é `KHR_texture_transform`; não há compressão Draco/Meshopt nos arquivos inspecionados. A aplicação utiliza geometria e cores próprias para a aula, dispensando a decodificação das texturas.

## Peças respiratórias

| Estrutura | Identificadores | Quantidade |
| --- | --- | ---: |
| Lobos do pulmão direito | `R_lung_superior`, `R_lung_middle`, `R_lung_inferior` | 3 |
| Lobos do pulmão esquerdo | `L_lung_superior`, `L_lung_inferior` | 2 |
| Brônquios principais | `R_main_bronchus`, `L_main_bronchus` | 2 |
| Brônquios lobares | `R_superior_bronchus`, `R_middle_bronchus`, `R_inferior_bronchus`, `L_superior_bronchus`, `L_inferior_bronchus` | 5 |
| Parede da traqueia | `trachea` | 1 |
| Anéis de cartilagem | `tracheal_ring_01` a `tracheal_ring_16` | 16 |

O arquivo do tronco contém essas mesmas peças respiratórias em outra posição vertical, além do invólucro `torso_shell`, coração, vasos, fígado, estômago, intestinos, rins e ureteres. A integração usa uma única cópia do sistema respiratório, proveniente do arquivo menor. Do arquivo maior são usados o tronco e parte das estruturas cardiovasculares para contexto; os órgãos digestórios e urinários não participam desta aula.

## O que foi integrado

- Carregamento dos dois GLBs originais a partir do próprio GitHub Pages, com mensagens de progresso, esquema durante a espera e recuperação de falhas por arquivo.
- Cinco lobos, sete segmentos brônquicos e traqueia independentes na cena. Cores distinguem lobos superiores, médio e inferiores.
- **No corpo**, com tronco GLB e cabeça esquemática; opacidade ajustável e opção de ocultar o corpo.
- **Só órgãos** e seletor para isolar cada pulmão, cada lobo, traqueia ou brônquios, com enquadramento automático.
- **Inspiração/expiração**, pausa, barra de fase e velocidade compartilhadas entre o GLB e os complementos. Os lobos expandem juntos; o diafragma desce na inspiração. Não há animação preexistente nos arquivos.
- Zoom, rotação, seleção, percurso do ar, costelas opcionais, pleura, coração/vasos e ampliação alveolar preservados.
- Alternância entre **GLB · órgãos separados** e **Esquema didático**.

Os modelos foram ajustados ao sistema de coordenadas da cena. Os identificadores do GLB situam as peças `R_` em X positivo; a integração reflete X e inverte a ordem dos vértices de cada triângulo para manter a orientação das faces. Assim, na vista anterior, o pulmão direito da pessoa aparece à esquerda da tela. A posição vertical do sistema respiratório no tronco é compensada antes da transformação. Normais são ajustadas para iluminação.

Os triângulos originais das peças utilizadas são preservados. A ordenação de faces transparentes é aproximada, como no renderizador Canvas já utilizado no projeto.

## Limites para a aula

A separação e os nomes das peças foram verificados tecnicamente. Isso não equivale a uma validação anatômica clínica: os arquivos são representações estilizadas e apresentam contornos e divisões simplificados.

Cabeça, cavidade nasal, faringe, laringe, vias aéreas finas, pleura, diafragma, costelas e alvéolos são complementos esquemáticos. As vias finas não foram reconstruídas a partir de exames nem de uma árvore brônquica completa. A ampliação alveolar está fora da escala do tronco. A respiração aplica deformações ilustrativas sincronizadas, sem calcular pressões, volumes reais ou comportamento dos tecidos.

## Integridade e crédito

As cópias analisadas foram verificadas contra os identificadores de blob do GitHub:

- Pulmões: `7e5abd93bcbece10d7a7b63a39169ac2eff78b48`.
- Tronco: `ed86872859b8424af1f1bd871202db01eafc8058`.

Os nós raiz registram licença `CC0-1.0`. O crédito registrado é **Innerscene original CC0 geometry** no arquivo respiratório e **Innerscene, adapted from MakeHuman CC0 assets** no tronco. Os links de origem estão no README.

## Verificação

Os testes executam o código da página com um DOM simulado e um Canvas real. Verificam leitura dos arquivos, coordenadas e índices, rejeição de GLB truncado, cinco lobos independentes, lateralidade, ocultação e isolamento das peças, opacidade, vistas, câmera, seleção, animação e direção do diafragma. Também verificam carregamento assíncrono, falha de um arquivo, alternativa esquemática e novas tentativas sem baixar novamente os modelos já carregados.

Execução: `npm install` e `npm test`. Os mesmos controles podem ser exercitados com `WIDTH=390 HEIGHT=560 npm test`. O navegador complementa esses testes para conferir o carregamento e a interface da publicação.

# Variados — Atlas interativo de Ciências

## Sistema respiratório 3D

**Abrir a aplicação:** https://lucianocp10.github.io/Variados-/

Modelo didático para os anos finais do Ensino Fundamental, com texto e controles em português.

### O que explorar

- **No corpo:** cabeça, pescoço e tronco transparentes para localizar as estruturas respiratórias.
- **Só órgãos:** ocultar o corpo e as costelas, mantendo as estruturas respiratórias.
- **GLB · órgãos separados:** geometrias dos arquivos adicionados ao repositório; cinco lobos independentes e isolamento de cada pulmão, lobo, traqueia ou brônquios.
- **Esquema didático:** alternativa leve, disponível durante o carregamento ou se um arquivo falhar.
- **Alvéolos:** ampliação dos sacos alveolares, capilares e sentidos de difusão de O₂ e CO₂.
- Cavidade nasal, faringe, laringe e epiglote, traqueia com anéis de cartilagem, brônquios, bronquíolos, pulmões com fissuras e lobos, pleura, diafragma, costelas e intercostais.
- Coração e vasos pulmonares opcionais, para dar contexto à posição dos órgãos.
- Inspiração e expiração animadas: expansão pulmonar e torácica e deslocamento do diafragma.
- Percurso guiado do ar, seleção dos órgãos, explicações e aproximação de cada estrutura.

### Controles

- Arrastar com mouse ou um dedo para girar.
- Roda do mouse, gesto de pinça ou botões **+ / −** para ajustar o zoom.
- Botões **Frente**, **Perfil**, **Costas** e **Girar 360°**.
- Marcar ou desmarcar as camadas e ajustar a opacidade do corpo.
- Pausar a respiração, arrastar a barra do ciclo ou comparar **Inspirar / Expirar**.
- No teclado, com o modelo em foco: setas giram, **+ / −** aproximam ou afastam, **Espaço** pausa e **Home** restaura a câmera.

### Uso e implementação

A página continua em `index.html`, sem compilação ou dependência de WebGL/CDN. Um leitor de geometria GLB 2.0 carrega os dois arquivos deste repositório via `fetch`. As malhas são projetadas em perspectiva e desenhadas em Canvas 2D. As texturas originais são substituídas por cores didáticas.

- `lungs-with-trachea-respiratory-system.glb`: pulmões em cinco lobos, sete peças brônquicas, parede traqueal e 16 anéis de cartilagem. As peças respiratórias mantêm os triângulos originais.
- `torso-with-removable-organs.glb`: invólucro do tronco e estruturas cardiovasculares de contexto. A superfície do tronco é simplificada em memória para reduzir o trabalho de desenho; os órgãos respiratórios duplicados deste arquivo não são desenhados novamente.
- Cabeça, vias aéreas superiores e finas, pleura, diafragma, costelas e ampliação alveolar continuam como complementos esquemáticos. As geometrias são registradas na mesma cena e compartilham câmera, seleção e ciclo respiratório.

Nenhum GLB tem clipes de animação ou esqueleto. A expansão dos pulmões/lobos, o movimento do diafragma e do tórax e o fluxo de ar são animações didáticas calculadas pela aplicação. A expansão não é uma simulação biomecânica.

Abra pelo GitHub Pages. Para uso local dos GLBs, baixe o repositório e sirva a pasta por HTTP, por exemplo `python -m http.server 8000`; então abra `http://localhost:8000`. Abrir `index.html` diretamente como arquivo pode bloquear o carregamento dos GLBs. O esquema continua disponível sem esses arquivos. A transferência inicial dos dois modelos soma aproximadamente 24,6 MiB; há mensagens de carregamento, alternativa esquemática e botão de nova tentativa em caso de falha.

A opção **Isolar uma estrutura do GLB** oculta o contexto e enquadra somente a estrutura escolhida. **Sistema respiratório completo**, **No corpo** e **Restaurar** permitem reuni-las novamente. O controle de opacidade ajusta o tronco e a cabeça; **Pulmões transparentes** permite observar as vias internas. 
Interface adaptada a telas estreitas, controles identificados e respeito à preferência de redução de movimento do navegador.

### Limites do modelo

É uma representação escolar esquemática, com cores, proporções, ramificações, movimentos e camadas simplificados. Os alvéolos são ampliados em uma vista separada e não têm a mesma escala dos órgãos. Os pontos terminais da árvore brônquica simbolizam regiões alveolares. O azul dos vasos é uma convenção para indicar sangue com menos oxigênio; sangue humano não é azul. As partículas do trajeto indicam o sentido do fluxo de ar, não moléculas individuais ou ar formado por um único gás.

### Referências de conteúdo

- [NHLBI/NIH — The Respiratory System](https://www.nhlbi.nih.gov/health/lungs/respiratory-system)
- [NHLBI/NIH — What Breathing Does for the Body](https://www.nhlbi.nih.gov/health/lungs/breathing-benefits)
- [OpenStax — Organs and Structures of the Respiratory System](https://openstax.org/books/anatomy-and-physiology/pages/22-1-organs-and-structures-of-the-respiratory-system)
- [OpenStax — The Lungs](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs)

Geometrias GLB da **Innerscene**, com licença **CC0-1.0** registrada nos nós raiz dos dois arquivos:

- [Lungs with trachea, respiratory system](https://www.innerscene.com/tools/library/3d-parts/lungs-with-trachea-respiratory-system-1d019b26) — metadados: “Innerscene original CC0 geometry”.
- [Torso with removable organs](https://www.innerscene.com/tools/library/3d-parts/torso-with-removable-organs-1fe1b70a) — metadados: “Innerscene, adapted from MakeHuman CC0 assets”.

Os arquivos originais são preservados. Complementos esquemáticos e interface foram produzidos em código. Leia [ANALISE-GLB.md](ANALISE-GLB.md) para a inspeção dos arquivos e os limites da integração.

### Verificação

Verificados: sintaxe JavaScript, geração finita das malhas, projeção dos pontos, alternância corpo/órgãos/alvéolos, sentido do movimento do diafragma, expansão pulmonar, pausa e animação, percurso guiado de sete etapas, restauração de estado, seleção e aproximação das estruturas, predefinições de câmera e zoom.


Os testes reproduzíveis estão em `tests/`, usando Node.js e Canvas para desenhar as malhas reais. Após `npm install`, execute `npm test`. Para conferir o desenho em uma área menor: `WIDTH=390 HEIGHT=560 npm test`. Opcionalmente, `SNAPSHOT_DIR=snapshots npm test` grava imagens das vistas verificadas. O teste de carregamento usa respostas simuladas para verificar sucesso, falha parcial e nova tentativa; a publicação deve também ser conferida no navegador.

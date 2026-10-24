# Variados — Atlas interativo de Ciências

## Sistema respiratório 3D

**Abrir a aplicação:** https://lucianocp10.github.io/Variados-/

Modelo didático para os anos finais do Ensino Fundamental, com texto e controles em português.

### O que explorar

- **No corpo:** cabeça, pescoço e tronco transparentes para localizar as estruturas respiratórias.
- **Só órgãos:** ocultar o corpo e as costelas, mantendo as estruturas respiratórias.
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

A aplicação está inteiramente em `index.html`. Não há compilação, bibliotecas externas, imagens remotas ou dependência de WebGL. As malhas 3D são projetadas em perspectiva e renderizadas com Canvas 2D, com iluminação e ordenação de profundidade. Isso permite abrir a página pelo GitHub Pages ou baixar o HTML e utilizá-lo sem conexão. Os links das referências requerem internet.

Interface adaptada a telas estreitas, controles identificados e respeito à preferência de redução de movimento do navegador.

### Limites do modelo

É uma representação escolar esquemática, com cores, proporções, ramificações, movimentos e camadas simplificados. Os alvéolos são ampliados em uma vista separada e não têm a mesma escala dos órgãos. Os pontos terminais da árvore brônquica simbolizam regiões alveolares. O azul dos vasos é uma convenção para indicar sangue com menos oxigênio; sangue humano não é azul. As partículas do trajeto indicam o sentido do fluxo de ar, não moléculas individuais ou ar formado por um único gás.

### Referências de conteúdo

- [NHLBI/NIH — The Respiratory System](https://www.nhlbi.nih.gov/health/lungs/respiratory-system)
- [NHLBI/NIH — What Breathing Does for the Body](https://www.nhlbi.nih.gov/health/lungs/breathing-benefits)
- [OpenStax — Organs and Structures of the Respiratory System](https://openstax.org/books/anatomy-and-physiology/pages/22-1-organs-and-structures-of-the-respiratory-system)
- [OpenStax — The Lungs](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-2-the-lungs)

Geometrias e ilustrações produzidas em código para este projeto; nenhuma imagem anatômica de terceiros foi incorporada.

### Verificação

Verificados: sintaxe JavaScript, geração finita das malhas, projeção dos pontos, alternância corpo/órgãos/alvéolos, sentido do movimento do diafragma, expansão pulmonar, pausa e animação, percurso guiado de sete etapas, restauração de estado, seleção e aproximação das estruturas, predefinições de câmera e zoom.

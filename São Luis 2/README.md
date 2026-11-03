# São Luís 2 — Patrimônio em 3D

Apresentação interativa em página única sobre o patrimônio arquitetônico de São Luís do Maranhão. Em dez capítulos, o projeto combina textos curatoriais com cenas tridimensionais construídas em tempo real no navegador.

[**Abrir a apresentação**](https://lucianocp10.github.io/Testes-iniciais/S%C3%A3o%20Luis%202/)

## Sobre o projeto

São Luís preserva um dos conjuntos coloniais mais expressivos do Brasil. Sobrados azulejados, igrejas barrocas, palácios, mercados e fontes contam uma história de encontros entre Portugal, África e a Amazônia — e de uma arquitetura que aprendeu a responder ao calor e à umidade do trópico.

Esta apresentação propõe uma leitura visual desse patrimônio em **dez cenas 3D procedurais**. Não há banco de imagens: os edifícios, as ruas, os azulejos, a água e a iluminação são gerados por código com Three.js, em uma direção de arte inspirada em maquetes de museu e no azul do fim de tarde.

## Capítulos

| # | Capítulo | Foco |
| --- | --- | --- |
| 01 | Abertura | A ilha, o conjunto e a ideia de patrimônio |
| 02 | Centro Histórico | Traçado urbano, sobrados e adaptação climática |
| 03 | Palácio dos Leões | O poder diante da Baía de São Marcos |
| 04 | Igreja da Sé | Herança jesuíta, barroco e camadas de tempo |
| 05 | Teatro Arthur Azevedo | Um dos teatros mais antigos do Brasil em atividade |
| 06 | Casa das Tulhas | Arquitetura, mercado e vida cotidiana |
| 07 | Fonte do Ribeirão | Água, pedra, Netuno e as lendas subterrâneas |
| 08 | Convento das Mercês | Claustro, memória e novos usos |
| 09 | Azulejaria | A cidade vestida de azul |
| 10 | Legado | Preservação como conversa entre passado e futuro |

## Recursos

- Dez cenas 3D originais, com iluminação, sombras e materiais procedurais.
- Fachadas com azulejos, janelas, varandas, telhados e detalhes arquitetônicos gerados em código.
- Navegação por teclado, botões, roda do mouse, gestos no celular e marcadores laterais.
- Interação direta: arraste a cena para girar a maquete.
- Layout responsivo para desktop e dispositivos móveis.
- Painel **Sobre e fontes**, com créditos, atalhos e referências históricas.
- Tipografia editorial com Cormorant Garamond e Manrope.
- Tudo em um único arquivo HTML, sem imagens externas ou etapa de build.

## Tecnologias

- **HTML5, CSS3 e JavaScript**
- **Three.js 0.169** carregado por CDN (jsDelivr)
- **WebGL** para renderização em tempo real
- **Google Fonts** para a tipografia
- Texturas, geometrias e animações geradas proceduralmente com Canvas API e Three.js

## Como navegar

- **← / →** ou **Page Up / Page Down**: capítulo anterior ou seguinte.
- **Espaço**: avançar.
- **Home / End**: primeiro ou último capítulo.
- **Arraste a cena**: girar a maquete 3D.
- **Roda do mouse**: navegar entre capítulos.
- **Celular**: deslize horizontalmente ou use os botões inferiores.

Para uma experiência mais imersiva, abra em tela cheia (`F11` na maioria dos navegadores).

## Estrutura da pasta

```text
São Luis 2/
├── index.html   # apresentação completa em um único arquivo
└── README.md    # este documento
```

## Executar localmente

A apresentação precisa de conexão com a internet para carregar o Three.js e as fontes pela CDN.

1. Baixe a pasta ou clone o repositório.
2. Abra `index.html` diretamente no navegador.

Alternativamente, na raiz do repositório:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/S%C3%A3o%20Luis%202/`.

## Observações

- As ilustrações são **interpretações artísticas procedurais**, não reconstruções documentais ou fotografias. Volumes, cores e detalhes foram simplificados para favorecer a leitura visual.
- Datas e informações históricas foram conferidas nas fontes indicadas abaixo e no painel **Sobre e fontes** da própria apresentação.
- O link do GitHub Pages depende da publicação do repositório. No GitHub, a página do arquivo HTML mostra o código; para abrir a versão interativa, use o link no início deste README.

## Fontes

- [UNESCO — Centro Histórico de São Luís](https://whc.unesco.org/en/list/821/)
- [IPHAN — Patrimônio Mundial no Maranhão](https://www.gov.br/iphan/pt-br)
- [Palácio dos Leões — acervo e história](https://acervo.palaciodosleoes.ma.gov.br/)
- [Fundação da Memória Republicana Brasileira — Convento das Mercês](https://www.fmrb.ma.gov.br/)
- [Secretaria de Cultura do Maranhão — Teatro Arthur Azevedo](https://casas.cultura.ma.gov.br/taa/)

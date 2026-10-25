# Testes iniciais

Experimentos e aplicações em desenvolvimento do Professor Luciano Costa.

[**Abrir catálogo de aplicações**](https://lucianocp10.github.io/Testes-iniciais/)

## Aplicações

| Projeto | Abrir aplicação | Documentação |
| --- | --- | --- |
| Sistema respiratório 3D | [Explorar](https://lucianocp10.github.io/Testes-iniciais/sistema-respiratorio/) | [Orientações](./sistema-respiratorio/README.md) |
| Cristal de NaCl 3D | [Explorar](https://lucianocp10.github.io/Testes-iniciais/cristal-nacl/) | [Orientações](./cristal-nacl/README.md) |

## Organização

- `sistema-respiratorio/`: aplicação, modelos GLB, documentação, análise dos modelos e testes automatizados.
- `cristal-nacl/`: aplicação e documentação do cristal.
- `index.html`: catálogo das aplicações.
- `repositorios/cristal-nacl/index.html`: redirecionamento para preservar o endereço antigo do cristal.
- `reproducao_assexuada-1.html`: redirecionamento para a apresentação em Aulas de Ciências.

Para adicionar outro experimento, crie uma pasta com nome descritivo e hífens, coloque a aplicação em seu `index.html`, seus arquivos e um `README.md` nessa pasta. Depois, acrescente seu link ao catálogo e à tabela acima.

## Executar localmente

Na raiz do repositório, execute `python -m http.server 8000` e abra `http://localhost:8000`. O sistema respiratório precisa de HTTP para carregar seus modelos GLB.

Para executar os testes da respiração, entre em `sistema-respiratorio`, execute `npm install` e depois `npm test`.

Materiais de Matemática ficam em [Matematica](https://github.com/lucianocp10/Matematica); apresentações de Ciências, em [Aulas-ciencias](https://github.com/lucianocp10/Aulas-ciencias).

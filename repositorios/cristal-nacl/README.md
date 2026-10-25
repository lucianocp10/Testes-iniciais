# Cristal de NaCl em 3D

Aplicação educacional em um único arquivo `index.html`, com Three.js 0.160.1 carregado pela CDN jsDelivr. Interface e legenda em português. Não exige instalação nem compilação. Requer internet e navegador com WebGL.

## Como abrir pelo GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Escolha a branch **main** e a pasta **/ (root)**. Clique em **Save**.
4. Aguarde a publicação. A aplicação ficará em:

https://lucianocp10.github.io/Testes-iniciais/repositorios/cristal-nacl/

O endereço só funcionará após a ativação e conclusão da publicação. Se Pages já estiver configurado, confira a origem antes de alterar. A página de um arquivo HTML em github.com mostra o código; a visualização interativa é servida pelo GitHub Pages.

Alternativa: baixe `index.html` e abra no navegador com acesso à internet.

## Controles

- Iniciar/pausar rotação automática e girar em passos.
- Aproximar/afastar e restaurar a visualização.
- Exibir ou ocultar sódio (Na⁺), cloreto (Cl⁻) e traços entre vizinhos.
- Arrastar com mouse ou dedo para girar; roda do mouse ou gesto de pinça para zoom.

## Modelo científico

Recorte de 4 × 4 × 4 sítios da estrutura sal-gema, com 32 íons Na⁺ e 32 Cl⁻ alternados nas três direções. Cada íon no interior tem seis vizinhos mais próximos de carga oposta. Cores e raios são ilustrativos. Os traços mostram vizinhança, não ligações covalentes. O recorte deixa de fora vizinhos dos íons da superfície.

## Validação

Sintaxe JavaScript verificada com `node --check`. A renderização WebGL e a publicação do Pages ainda precisam ser verificadas em um navegador; o ambiente de criação não dispõe de um navegador instalado.

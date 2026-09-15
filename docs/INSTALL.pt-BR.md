# Guia de instalação (português)

Este guia explica como configurar o projeto **edsgames-webapp** para
desenvolvimento local e como gerar a versão para implantação em produção.

O site é uma **exportação estática** — não há servidor Node.js em produção. O
build grava HTML, CSS, JavaScript e assets na pasta `out/`, que qualquer
hospedeiro estático pode servir.

Veja também: [Install guide in English](./INSTALL.en.md) ·
[Implantação](../DEPLOYMENT.md) · [README](../README.md)

---

## Índice

- [Requisitos](#requisitos)
- [Clonar o repositório](#clonar-o-repositório)
- [Desenvolvimento](#desenvolvimento)
  - [Instalar dependências](#instalar-dependências)
  - [Iniciar o servidor de desenvolvimento](#iniciar-o-servidor-de-desenvolvimento)
  - [Comandos úteis no desenvolvimento](#comandos-úteis-no-desenvolvimento)
  - [O que esperar no desenvolvimento](#o-que-esperar-no-desenvolvimento)
- [Build de produção](#build-de-produção)
  - [Gerar o site estático](#gerar-o-site-estático)
  - [Visualizar a saída de produção localmente](#visualizar-a-saída-de-produção-localmente)
  - [Implantar em produção](#implantar-em-produção)
  - [Antes da primeira implantação pública](#antes-da-primeira-implantação-pública)
- [Solução de problemas](#solução-de-problemas)

---

## Requisitos

| Ferramenta | Versão |
|---|---|
| **Node.js** | 22 LTS (`>=22.0.0 <23`) — o CI usa **22.23.2** |
| **pnpm** | **10.32.1** (fixado em `package.json`) |

Instale o Node.js 22 em [nodejs.org](https://nodejs.org/) ou pelo gerenciador de
pacotes do sistema. Ative o Corepack e prepare a versão fixada do pnpm:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
pnpm --version   # deve exibir 10.32.1
```

Não são necessárias variáveis de ambiente, banco de dados nem serviços externos
para desenvolver ou fazer o build deste projeto.

---

## Clonar o repositório

```bash
git clone https://github.com/emersonfelipesp/edsgames-webapp.git
cd edsgames-webapp
```

Se você usa o espelho no Gitea:

```bash
git clone git@git.nmulti.cloud:emersonfelipesp/edsgames-webapp.git
cd edsgames-webapp
```

---

## Desenvolvimento

### Instalar dependências

Na raiz do repositório:

```bash
pnpm install
```

Em CI ou quando precisar reproduzir exatamente o lockfile commitado, use:

```bash
pnpm install --frozen-lockfile
```

### Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

| Rota | Idioma |
|---|---|
| `/` | Português brasileiro (padrão) |
| `/en/` | Inglês |
| `/download/`, `/loja/`, `/contribua/` | Páginas em português |
| `/en/download/`, `/en/store/`, `/en/contribute/` | Páginas em inglês |

O servidor de desenvolvimento recarrega automaticamente ao salvar arquivos.

### Comandos úteis no desenvolvimento

Execute estes comandos antes de abrir um pull request ou após alterações
relevantes:

```bash
pnpm lint                  # ESLint
pnpm exec tsc --noEmit     # TypeScript (detecta traduções faltando)
pnpm audit --audit-level=low
pnpm build                 # confirma que a exportação estática ainda funciona
```

A verificação TypeScript exige que cada chave em `lib/i18n/pt-BR.ts` exista em
`lib/i18n/en.ts`. Uma tradução em inglês faltando faz o build falhar de
propósito.

### O que esperar no desenvolvimento

- **Não é necessário arquivo `.env`.** A aplicação não usa segredos nem
  configuração em tempo de execução no servidor.
- **`pnpm start` não é usado neste projeto.** `next start` sobe uma aplicação
  Node.js; este site é exportado como arquivos estáticos. Use `pnpm dev` no
  desenvolvimento e `pnpm build` para a saída de produção.
- **Duas árvores de rotas.** O português fica em `app/(pt)/` na raiz do site; o
  inglês em `app/(en)/en/`. Não existe `app/layout.tsx` compartilhado.

---

## Build de produção

### Gerar o site estático

```bash
pnpm install --frozen-lockfile
pnpm build
```

Se tudo correr bem, o site completo fica em **`out/`**. Essa pasta é
autossuficiente: HTML, JavaScript e CSS com hash em `_next/static/`, fontes,
imagens e `public/_headers` para hospedeiros que o leem.

O `next.config.ts` define `output: "export"` e `trailingSlash: true`, então cada
rota vira uma pasta com `index.html` (por exemplo `out/loja/index.html`). Esse
formato funciona em nginx, Netlify, Cloudflare Pages e similares sem reescrita
de URL.

### Visualizar a saída de produção localmente

Para ver exatamente o que será implantado — não o servidor de dev — sirva
`out/`:

```bash
pnpm build
npx serve out
```

Abra a URL exibida pelo `serve` (geralmente porta 3000 ou 5000). Teste os dois
temas, os dois idiomas e fluxos importantes (navegação, botão PIX, vídeo).
`http://localhost` basta para layout; HTTPS na origem real é necessário para a
API de Clipboard usada pelo botão PIX.

### Implantar em produção

1. Execute `pnpm build` no pipeline de CI ou na máquina de build.
2. Envie ou publique **somente o conteúdo de `out/`** no hospedeiro estático.
3. Configure os cabeçalhos de segurança no hospedeiro. Veja
   [DEPLOYMENT.md](../DEPLOYMENT.md) para exemplos prontos (Netlify, Cloudflare
   Pages, Vercel, nginx).

**Não há processo Node em produção.** Não implante a raiz do repositório nem
execute `pnpm start` em um servidor, a menos que você queira hospedar
deliberadamente a toolchain de build do Next.js.

Exemplo de etapas de CI (alinhado ao workflow deste repositório):

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
pnpm install --frozen-lockfile
pnpm audit --audit-level=low
pnpm lint
pnpm exec tsc --noEmit
pnpm build
# artefato: ./out
```

### Antes da primeira implantação pública

- Defina a URL real do site em `SITE_URL` em `lib/metadata.ts`. Esse valor entra
  nas URLs canônicas, alternates `hreflang`, tags Open Graph e `sitemap.xml`.
- Confirme que `/` serve português e `/en/` serve inglês, com o atributo `lang`
  correto.
- Publique os checksums SHA-256 dos arquivos de download em
  `lib/i18n/pt-BR.ts` e `lib/i18n/en.ts` quando os artefatos de release
  estiverem disponíveis (veja o README).

Checklist completo pós-implantação:
[DEPLOYMENT.md § After deploying](../DEPLOYMENT.md#after-deploying).

---

## Solução de problemas

**Versão incorreta do Node.js**

```text
error edsgames-webapp@0.1.0: The engine "node" is incompatible with this module.
```

Instale o Node.js 22 LTS. O projeto rejeita Node 23 e versões principais mais
antigas.

**pnpm ausente ou versão errada**

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

**Build falha com erro TypeScript em `lib/i18n/en.ts`**

Adicione a chave de tradução faltante para corresponder a `lib/i18n/pt-BR.ts`.
O português é a fonte da verdade; o inglês deve espelhar todas as chaves.

**Página em branco ou 404 no hospedeiro estático**

Garanta que o hospedeiro sirva índices de pasta (`index.html` em cada rota) ou
use as regras de reescrita em [DEPLOYMENT.md](../DEPLOYMENT.md). As rotas usam
barra final (por exemplo `/loja/` e não `/loja`).

**Problemas de CSP ou cabeçalhos de segurança após implantar**

A política está em `lib/csp.ts` e `public/_headers`. Mantenha as cópias nos
cabeçalhos HTTP alinhadas à meta tag. Detalhes em
[DEPLOYMENT.md](../DEPLOYMENT.md).

# Plano: Portfólio Norton Commander / 386 — Luiz Bueno

Site completo de 4 páginas inspirado em **bootstrap.386** + interface Norton Commander (que já existe no luizbueno.com), preenchido com dados reais do CV anexado.

---

## 1. Design System (src/styles.css)

Substituir o tema atual por uma paleta DOS autêntica usando OKLCH:

| Token | Hex equivalente | Uso |
|---|---|---|
| `--background` | `#0000AA` | Fundo azul DOS clássico |
| `--foreground` | `#FFFFFF` | Texto principal |
| `--primary` | `#00AAAA` | Painéis NC (ciano) |
| `--primary-foreground` | `#000000` | Texto sobre ciano (hover) |
| `--secondary` | `#AAAAAA` | Header/status bar (cinza) |
| `--accent` | `#FFFF55` | Destaques amarelos (atalhos F-keys, links) |
| `--destructive` | `#AA0000` | Erros / "REC" |
| `--border` | `#FFFFFF` | Bordas brancas duplas |
| `--muted` | `#5555FF` | Azul claro secundário |

**Fontes** (via Google Fonts no `__root.tsx`):
- `VT323` → texto corrido (alta legibilidade pixel)
- `Press Start 2P` → títulos curtos / logo

**Utilities CSS customizadas** em `@layer components`:
- `.nc-window` → border duplo branco + título centralizado em barra ciano
- `.nc-panel` → painel ciano com cantos ─ │ ┌ ┐ └ ┘
- `.dos-cursor` → bloco branco piscando (`@keyframes blink`)
- `.scanlines` → overlay sutil de linhas horizontais (opcional, baixa opacidade)
- `.fkey` → quadrinho amarelo "F1" + label branco (estilo barra de status NC)

---

## 2. Estrutura de rotas

```
src/routes/
  __root.tsx       → header DOS + footer status bar (persistentes) + Outlet
  index.tsx        → Home
  portfolio.tsx    → Portfolio
  about.tsx        → About
  contact.tsx      → Contact
```

Cada rota com seu próprio `head()` (title, description, og:title, og:description) — sem og:image no root.

---

## 3. Layout global (`__root.tsx`)

**Header (cinza `#AAAAAA`, sticky top):**
```
┌─ LB ─┐  Luiz Bueno — Senior Software Engineer       [#Portfolio] [@Contact]
```
- Logo: monograma "LB" em quadrado preto+branco (CSS, sem imagem)
- Nav usando `<Link>` com `activeProps={{ className: "bg-primary text-primary-foreground" }}`

**Status bar (rodapé fixo, ciano):**
```
 1Help  2Menu  3View  4Edit         10Quit          12:34:56  640K OK
```
- F-keys clicáveis: F1→/about, F2→/portfolio, F3→/, F4→/contact, F10→scroll top
- Relógio ao vivo (atualiza a cada 1s via `setInterval` em `useEffect`)
- Listener global de teclado (F1–F4, ESC) que dispara `navigate()`

**Body**: `bg-background` + Outlet centralizado em container max-w-5xl com padding.

---

## 4. Home (`index.tsx`)

Janela principal **`C:\> WELCOME.EXE`**:
- ASCII art do nome "LUIZ BUENO" (gerado com figlet style block)
- Subtítulo: *Senior Software Engineer · 17+ years · Belo Horizonte, Brazil*
- Texto de boas-vindas com efeito de digitação (typewriter, ~30ms/char, só na primeira renderização) — usando hook custom `useTypewriter`
- Cursor piscando ao final

Janela secundária **`CAREER.LOG`** (timeline em duas colunas estilo NC):
- 2024–now · **Cactus Gaming** — Senior Frontend Engineer
- 2022–2024 · **Hotmart** — Senior Software Engineer
- 2021–2022 · **Globoplay** — Senior Frontend
- 2018–2021 · **Outras experiências** (resumido)
- (preencher com datas exatas extraídas do PDF)

CTAs no final: `[F2] BROWSE PORTFOLIO` e `[F4] SEND MESSAGE` (botões estilo NC).

---

## 5. Portfolio (`portfolio.tsx`)

Layout dual-pane Norton Commander:

```
┌─ LEFT.PAN ──────────┐  ┌─ RIGHT.PAN ─────────┐
│ > cactus_gaming     │  │ Project: CACTUS     │
│   globoplay         │  │ Role: Senior FE     │
│   hotmart           │  │ Stack: Vue, TS, ... │
│   ...               │  │ Period: 2024-now    │
│                     │  │ Description: ...    │
└─────────────────────┘  └─────────────────────┘
```

- **Painel esquerdo**: lista navegável dos ~12 projetos extraídos do CV. Item ativo destacado em fundo ciano + texto preto. Navegação por teclado (↑↓ Enter) e clique.
- **Painel direito**: detalhes do projeto selecionado (role, stack, período, descrição, achievements).
- Em mobile (<768px): vira coluna única — clicar num item abre os detalhes abaixo.
- Dados em `src/data/projects.ts` (array tipado com `Project` interface) — fácil de editar depois.

Projetos a incluir (do CV): Cactus Gaming, Hotmart, Globoplay, e demais experiências relevantes que aparecerem no PDF parseado.

---

## 6. About (`about.tsx`)

Janela única **`ABOUT.TXT`** com seções em "fieldsets" estilo DOS:

**`[ BIO ]`** — parágrafo bio do CV (resumo profissional)

**`[ EDUCATION ]`**
- PUC-Minas — (curso e período do CV)

**`[ CERTIFICATIONS ]`**
- IFTL certifications
- PSM I (Professional Scrum Master)
- (outras que aparecerem no PDF)

**`[ SKILLS ]`** — checklist ASCII em grid de 2 colunas:
```
[X] Vue.js          [X] TypeScript
[X] React           [X] Node.js
[X] Nuxt            [X] Next.js
[X] CSS / Tailwind  [X] Git
...
```

**`[ LANGUAGES ]`** — Português (nativo), Inglês (avançado), etc.

---

## 7. Contact (`contact.tsx`)

Janela **`C:\> CONTACT.COM`** estilo terminal:

```
C:\contact> WHOAMI
> Luiz Bueno

C:\contact> EMAIL
> contact [at] luizbueno.com   [COPY]

C:\contact> LINKS
> github.com/luizbueno
> linkedin.com/in/luizbueno
> luizbueno.com
```

- **Email NUNCA usa `mailto:`** (regra do mem://). Renderizado como texto puro `contact [at] luizbueno.com`.
- Botão `[COPY]` que monta a string real em runtime via JS (`['contact', 'luizbueno.com'].join('@')`) e copia pro clipboard com toast "Copied to clipboard".
- Links sociais como `<a target="_blank" rel="noopener noreferrer">` reais.

**Formulário opcional estilo DOS** (abaixo do terminal):
```
NAME....: [_____________]
EMAIL...: [_____________]
MESSAGE.: [_____________]
                  [F10 SEND]
```
- Submit apenas mostra toast "Message queued — I'll get back to you" (sem backend nesta fase). Se quiser persistir mensagens depois, dá pra ligar Lovable Cloud numa segunda iteração.

---

## 8. Componentes reutilizáveis

```
src/components/dos/
  NCWindow.tsx       → wrapper janela com título + bordas duplas
  NCPanel.tsx        → painel interno (filho de NCWindow)
  DOSHeader.tsx      → header cinza global
  StatusBar.tsx      → barra F-keys + relógio (rodapé)
  BlinkingCursor.tsx → █ piscando
  Typewriter.tsx     → renderiza texto com efeito de digitação
  FKey.tsx           → quadrinho "F1 Help" amarelo+branco
```

---

## 9. Dados (`src/data/`)

```
src/data/
  projects.ts   → array de projetos para /portfolio
  career.ts     → timeline para Home
  skills.ts     → lista de skills para /about
  profile.ts    → bio, educação, certs, links
```

Todos preenchidos com dados extraídos do PDF do CV anexado.

---

## 10. Acessibilidade & responsivo

- Todos atalhos de teclado têm equivalente clicável
- `aria-label` nos F-keys e botões icônicos
- Contraste WCAG AA preservado (branco sobre azul `#0000AA` = 8.6:1 ✓)
- Mobile (<768px): dual-pane vira stack, status bar simplifica para 4 F-keys principais
- Scanlines/efeitos pixel respeitam `prefers-reduced-motion`

---

## 11. Memory updates

A regra do email já está salva em `mem://index.md`. Sem alterações necessárias.

---

## 12. Fora de escopo (não vai entrar agora)

- ❌ Boot screen com POST/BIOS animado (escolha "meio termo")
- ❌ Som de teclas/beep
- ❌ Backend para formulário de contato (pode ser adicionado depois com Lovable Cloud)
- ❌ Blog / posts dinâmicos
- ❌ i18n PT/EN (CV está em inglês — site sai em inglês para alinhar)

---

**Próximo passo**: aprove este plano e eu mudo para modo de implementação para criar todos os arquivos de uma vez.
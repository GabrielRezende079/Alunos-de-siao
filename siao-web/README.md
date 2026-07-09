# Design System — "Crianças de Sião" (Cadastro de Alunos)

Documento extraído a partir de 3 telas de um app mobile CRUD de alunos, feito em React. Cobre estilo visual, paleta de cores, tipografia, componentes de UI e organização estrutural.

---

## 1. Visão Geral

App mobile-first (viewport ~390–440px), com fundo em **gradiente mesh pastel** (verde → laranja/pêssego → roxo), cantos arredondados no container principal e uma estética "alegre/infantil" com cores suaves, ícones circulares e botões em formato pílula.

Telas mapeadas:
1. **Empty State** — lista sem alunos cadastrados
2. **Modal / Form** — cadastro de novo aluno ("Novo aluno")
3. **Lista preenchida** — cards de alunos cadastrados

---

## 2. Paleta de Cores

### Cores de marca / ação
| Uso | Cor (aprox.) | Hex |
|---|---|---|
| Roxo primário (títulos, botão principal, ícone header) | Violeta | `#7C3AED` → `#A78BFA` (gradiente) |
| Verde (dot, avatar, card de aluno) | Verde | `#22C55E` / `#4ADE80` |
| Laranja (dot, botão "Adicionar o primeiro") | Laranja | `#F97316` / `#FB923C` |

### Fundos pastel (cards e inputs)
| Uso | Hex aprox. |
|---|---|
| Fundo lavanda (input nome, contato) | `#EDE7FB` |
| Fundo pêssego (input data, observações, empty-state card) | `#FCE0C2` |
| Fundo verde claro (input responsável, card de aluno na lista) | `#DDF3DE` |
| Fundo branco (modal, avatar/ícone circle, botão cancelar) | `#FFFFFF` |

### Texto
| Uso | Hex aprox. |
|---|---|
| Texto principal (títulos, nomes) | `#1F2933` (quase preto) |
| Texto secundário (subtítulos, labels) | `#6B7280` |
| Labels de input (uppercase, pequeno) | `#8A8FA3` |
| Texto sobre botão colorido | `#FFFFFF` |
| ID/hash do aluno (`#78ad6c`) | `#9CA3AF` |

### Gradiente de fundo da tela
Radial/linear mesh combinando:
`#D9F5DC` (verde) → `#FBE3C8` (pêssego) → `#E4DBF7` (lilás), com transições suaves tipo "aurora"/mesh gradient.

### Gradiente do botão principal
`linear-gradient(135deg, #8B5CF6, #7C3AED)` — roxo vibrante, usado em "Novo aluno" e "Salvar".

---

## 3. Tipografia

- **Família:** sans-serif arredondada e amigável (estilo *Poppins*, *Baloo 2* ou *Quicksand* para títulos; *Inter*/*Poppins* para corpo).
- **Título principal** ("Crianças de **Sião**"): bold/extrabold, ~24–28px, com a segunda palavra em cor roxa de destaque (bicolor no mesmo heading).
- **Subtítulo** ("Cadastro alegre e simples..."): regular, ~14px, cinza.
- **Labels de formulário** (ex: "NOME DO ALUNO"): uppercase, letter-spacing leve, ~11px, bold/semibold, cinza-azulado.
- **Placeholders de input**: regular, ~15px, tom mais claro que o texto digitado.
- **Nome do aluno no card**: bold, ~16px, preto.
- **Labels dentro do card (ANIVERSÁRIO, RESPONSÁVEL, CONTATO)**: uppercase, pequeno, cinza, com ícone à esquerda.
- **Botões**: semibold/bold, ~15px, branco.

---

## 4. Componentes de UI

### 4.1 Header (comum às 3 telas)
```
[Ícone circular]         <- avatar redondo, bg lavanda claro, ícone de "pessoas" roxo
Crianças de [Sião]       <- título bicolor (preto + roxo)
Cadastro alegre e...     <- subtítulo cinza
● ● ●  N alunos          <- 3 dots coloridos (verde, laranja, roxo) + contador
```
- Ícone: círculo `~90px`, fundo lavanda translúcido, ícone outline roxo.
- Dots: pequenos círculos (~8px) verde/laranja/roxo, sempre nessa ordem, ao lado do contador de alunos.

### 4.2 Empty State Card
- Container: card grande, cantos bem arredondados (~24px radius), fundo pêssego/laranja pastel.
- Ícone: círculo branco central com emoji/ícone de coração (❤️).
- Título: "Nenhum aluno ainda" (bold, preto).
- Subtítulo: "Toque em **Novo aluno** para começar a cadastrar." (palavra "Novo aluno" em destaque bold).
- Botão: pílula laranja sólida, ícone "+" + "Adicionar o primeiro", texto branco bold.

### 4.3 Botão flutuante inferior ("Novo aluno")
- Fixo na parte inferior da tela.
- Formato pílula, fundo gradiente roxo, ícone "+" à esquerda, texto branco bold.
- Presente tanto no empty state quanto na lista preenchida.

### 4.4 Modal / Formulário ("Novo aluno")
- Estrutura: bottom sheet / modal centralizado, fundo branco, cantos superiores arredondados, sobreposto a um overlay escuro semi-transparente sobre a tela anterior.
- Header do modal: título "Novo aluno" (bold) + subtítulo "Preencha os dados abaixo" (cinza) + botão fechar (X) circular no canto superior direito.
- **Campos do formulário** — cada campo é um bloco colorido pastel arredondado (~16px radius), contendo:
  - Label uppercase pequeno no topo do bloco.
  - Input/textarea transparente dentro do bloco colorido, sem borda visível própria.
  - Cores alternadas por campo:
    1. Nome do aluno → lavanda
    2. Data de aniversário → pêssego (com ícone de calendário à direita, input tipo date `mm/dd/yyyy`)
    3. Nome do responsável → verde claro
    4. Contato → lavanda
    5. Observações (textarea) → pêssego
- **Ações do modal:**
  - Botão "Cancelar": pílula com contorno (outline), fundo branco, texto preto/cinza.
  - Botão "Salvar": pílula preenchida com gradiente roxo, texto branco bold.
  - Botões lado a lado, mesma largura (grid 2 colunas).

### 4.5 Card de Aluno (lista preenchida)
- Container: card verde-claro pastel, cantos arredondados grandes (~24px).
- **Cabeçalho do card:**
  - Avatar circular verde sólido com inicial do nome em branco (ex: "A", "D").
  - Nome do aluno (bold, preto) + ID/hash abaixo em cinza pequeno (ex: `#78ad6c`).
  - Botão de excluir: círculo branco no canto superior direito, ícone de lixeira vermelho.
- **Linhas de informação** (dentro do card, cada uma em um "pill"/bloco branco ou branco-esverdeado arredondado):
  - Ícone de bolo + label "ANIVERSÁRIO" + valor (data).
  - Ícone de pessoa + label "RESPONSÁVEL" + valor (nome).
  - Ícone de telefone + label "CONTATO" + valor (telefone).
- Cards empilhados verticalmente com espaçamento entre eles.

---

## 5. Organização de Componentes (estrutura sugerida em React)

```
src/
├── App.jsx
├── components/
│   ├── layout/
│   │   ├── PageHeader.jsx        // ícone + título bicolor + subtítulo + dots/contador
│   │   └── BottomActionButton.jsx // botão fixo "+ Novo aluno"
│   │
│   ├── students/
│   │   ├── StudentList.jsx        // renderiza EmptyState ou lista de StudentCard
│   │   ├── StudentCard.jsx        // avatar + nome + hash + infoRows + delete button
│   │   ├── StudentInfoRow.jsx     // ícone + label + valor (reutilizado 3x por card)
│   │   └── EmptyState.jsx         // card pêssego + cake icon + CTA
│   │
│   ├── form/
│   │   ├── StudentFormModal.jsx   // modal wrapper (overlay + sheet + header + footer)
│   │   ├── FormField.jsx          // bloco colorido + label + input (variante de cor via prop)
│   │   └── FormActions.jsx        // botões Cancelar / Salvar
│   │
│   └── ui/
│       ├── PillButton.jsx         // variantes: solid-purple, solid-orange, outline
│       ├── CircleIconButton.jsx   // usado no close (X) e no delete (lixeira)
│       └── Avatar.jsx             // círculo colorido com inicial
│
├── styles/
│   └── tokens.css / theme.js      // cores, radius, gradientes, tipografia (design tokens)
└── hooks/
    └── useStudents.js             // estado da lista de alunos (CRUD local)
```

### Padrões de reutilização
- **`FormField`** e **`StudentInfoRow`** compartilham a mesma lógica visual (bloco colorido + label + conteúdo), variando apenas cor de fundo e se é editável ou somente leitura.
- **`PillButton`** centraliza todos os botões (pílula), com props para variante de cor (`purple`, `orange`, `outline-white`) e ícone opcional.
- **`Avatar`** reutilizado tanto no header (ícone genérico) quanto nos cards de aluno (inicial + cor).

---

## 6. Tokens de Design (resumo rápido)

```js
const tokens = {
  colors: {
    purple: { base: '#7C3AED', light: '#A78BFA', pastelBg: '#EDE7FB' },
    green:  { base: '#22C55E', light: '#4ADE80', pastelBg: '#DDF3DE' },
    orange: { base: '#F97316', light: '#FB923C', pastelBg: '#FCE0C2' },
    text:   { primary: '#1F2933', secondary: '#6B7280', label: '#8A8FA3' },
    white:  '#FFFFFF',
    danger: '#EF4444', // ícone lixeira
  },
  radius: {
    card: '24px',
    field: '16px',
    pill: '999px', // botões
    circle: '50%',
  },
  gradients: {
    background: 'mesh gradient verde → pêssego → lilás',
    primaryButton: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
  },
  typography: {
    fontFamily: "'Poppins', 'Quicksand', sans-serif",
    titleWeight: 700,
    labelTransform: 'uppercase',
    labelLetterSpacing: '0.05em',
  },
};
```

---

## 7. Observações de UX
- Tom visual "acolhedor/infantil", adequado a contexto de creche/escola.
- Uso consistente de **cores pastel por categoria de campo** (mesma cor sempre representa o mesmo tipo de dado: lavanda = identificação, pêssego = data/observações, verde = responsável).
- Feedback visual reforçado por ícones ilustrativos (bolo, pessoas, telefone) ao invés de apenas texto.
- CTA principal ("Novo aluno") sempre fixo/acessível, tanto no estado vazio quanto na lista populada.

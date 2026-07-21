# 🗺️ Mapa de imagens — o que trocar e onde

Todas as fotos ficam em **`public/images/`**. Para trocar, salve sua foto real
**com exatamente o mesmo nome do arquivo** e jogue por cima do placeholder.
Nada de código precisa mudar.

> **Regra de ouro:** mantenha a **mesma proporção** (formato) da tabela para a
> foto não distorcer. Pode (e deve) exportar em resolução maior que o placeholder
> — os valores em "Dimensão ideal" já são um bom alvo de qualidade.

Os placeholders atuais são retângulos verdes com a dimensão escrita — por isso
não dá pra saber qual é qual só de olhar. Este arquivo é o guia.

---

## 🏠 Home (`/`)

| Arquivo | Dimensão ideal | Proporção | O que colocar |
|---|---|---|---|
| `hero-bg-image.png` | 1920 × 1280 | 3:2 (paisagem) | **Fundo do topo.** Luiz atendendo / ambiente amplo e calmo. Fica escurecido por baixo do texto — evite detalhe importante no centro. | OK
| `about-us-image-1.jpg` | 600 × 720 | 5:6 (retrato) | **Retrato do Luiz olhando pra câmera** (a foto principal dele). | OK
| `about-us-image-2.jpg` | 600 × 840 | 5:7 (retrato) | Luiz atendendo / ambiente do consultório. | OK 
| `about-us-image-3.jpg` | 520 × 610 | 6:7 (quase quadrado) | Detalhe do atendimento (mãos, óleos, toque). | OK 
| `service-image-1.jpg` | 1200 × 800 | 3:2 (paisagem) | Consulta Ayurveda. | OK 
| `service-image-2.jpg` | 1200 × 800 | 3:2 (paisagem) | Abhyanga *(também usada na página Massagens)*. | OK
| `service-image-3.jpg` | 1200 × 800 | 3:2 (paisagem) | Método Suddhi. | OK
| `service-image-4.jpg` | 1200 × 800 | 3:2 (paisagem) | Curso Toque Inteligente. | OK
| `service-image-5.jpg` | 1200 × 800 | 3:2 (paisagem) | Cursos e Imersões. | OK
| `service-image-6.jpg` | 1200 × 800 | 3:2 (paisagem) | Retiro Despertar Shamana. | OK
| `why-choose-image-1.jpg` | 600 × 705 | 6:7 (retrato) | Toque terapêutico / cuidado. | OK
| `why-choose-image-2.jpg` | 600 × 745 | 4:5 (retrato) | Ambiente / detalhe das mãos. | OK
| `appointment-image.jpg` | 900 × 660 | 4:3 (paisagem) | **Mockup do guia gratuito** (capa do PDF "7 sinais de que seu corpo está pedindo ajuda"). |

## 👤 Sobre (`/sobre/`)

| Arquivo | Onde aparece |
|---|---|
| `about-us-image-1.jpg` | Mesma foto do retrato do Luiz da Home |
| `about-us-image-2.jpg` | Mesma da Home |
| `about-us-image-3.jpg` | Mesma da Home |

> A página Sobre reutiliza as três fotos `about-us-image-*` da Home — troque uma vez, aparece nos dois lugares.

## 🧘 Atendimentos (`/atendimentos/`)

| Arquivo | O que colocar |
|---|---|
| `service-image-1.jpg` a `service-image-6.jpg` | As 6 fotos dos serviços (mesmas da Home, listadas acima) |

## 💆 Massagens Terapêuticas (`/massagens-terapeuticas/`)

| Arquivo | Dimensão ideal | Proporção | O que colocar |
|---|---|---|---|
| `service-image-2.jpg` | 1200 × 800 | 3:2 | Foto principal da massagem Abhyanga (mesma da Home/Atendimentos) |

## 🎓 Cursos e Formações (`/cursos-e-formacoes/`)

| Arquivo | Dimensão ideal | Proporção | O que colocar |
|---|---|---|---|
| `cursos-e-formacoes.webp` | 1920 × 1280 | 3:2 (paisagem) | Foto de Luiz Reis com Helô Nascimento enviada para a seção principal. | OK

## 🌱 Despertar da Consciência (`/despertar-da-consciencia/`)

| Arquivo | Dimensão ideal | Proporção | O que colocar |
|---|---|---|---|
| `intro-video-image.jpg` | 1920 × 1280 | 3:2 (paisagem) | Foto do retiro / natureza / grupo / ambiente de descanso |

## ✍️ Blog (`/blog/`)

| Arquivo | Dimensão ideal | Proporção | Artigo (capa) |
|---|---|---|---|
| `post-1.jpg` | 1366 × 768 | 16:9 | "Cansaço constante: quando o corpo começa a pedir ajuda" |
| `post-2.jpg` | 1366 × 768 | 16:9 | "Ansiedade também fala pelo corpo" |
| `post-3.jpg` | 1366 × 768 | 16:9 | "Abhyanga em Belo Horizonte" |

## 📄 Cabeçalhos das páginas internas — atribuídos

As imagens estão em **`public/images/`**, com **1920 × 768 px** (proporção 5:2).
O título aparece na parte inferior esquerda e há um degradê escuro sobre a imagem;
os recortes preservam as áreas essenciais fora dessa região.

| Status | Rota/uso | Nome exato em `public/images/` | O que colocar |
|---|---|---|---|
| **OK** | Background genérico de segurança | `page-header-bg.jpg` | Sala de atendimento vazia, com maca de madeira, linho, recipiente de cobre e luz natural. |
| **OK** | `/sobre/` | `page-header-sobre.webp` | Mãos do terapeuta preparando ervas e óleo em uma bancada de madeira. |
| **OK** | `/atendimentos/` — tratamentos | `page-header-atendimentos.webp` | Consulta individual, com mãos em conversa, caderno e chá sobre a mesa. |
| **OK** | `/massagens-terapeuticas/` — tratamento | `page-header-massagens-terapeuticas.webp` | Massagem terapêutica nas mãos e no antebraço, sem rostos em destaque. |
| **OK** | `/despertar-da-consciencia/` — tratamento | `page-header-despertar-da-consciencia.webp` | Espaço simples de retiro aberto para a mata, com almofadas e névoa matinal. |
| **OK** | `/cursos-e-formacoes/` | `page-header-cursos-e-formacoes.webp` | Aula prática em grupo, com alunos aprendendo uma técnica manual. |
| **OK** | `/blog/` e artigos | `page-header-blog.webp` | Mesa de estudos com caderno, livro, chá, ervas e recipiente de cobre. |
| **OK** | `/contato/` | `page-header-contato.webp` | Canto de recepção acolhedor, com cadeira, mesa lateral, planta e porta aberta. |

> As 8 imagens foram geradas separadamente para o contexto de cada página, sem repetição,
> e exportadas em **1920 × 768 px**. Os sete banners específicos usam
> WebP; `page-header-bg.jpg` permanece em JPG porque é o fallback já referenciado no CSS.

## 🔖 Ícone do site

| Arquivo | Dimensão | O que colocar |
|---|---|---|
| `logo.png` | 118 × 161 | Logo/símbolo do Luiz usado também como ícone da aba. | OK

---

## ✅ Resumo — fotos que você precisa providenciar

1. **Retrato do Luiz** → `about-us-image-1.jpg`
2. Luiz atendendo / ambiente → `about-us-image-2.jpg`
3. Detalhe do atendimento → `about-us-image-3.jpg`
4. Fundo do topo (hero) → `hero-bg-image.png`
5. **Background genérico 1920 × 768 (OK)** → `page-header-bg.jpg`
6–12. **7 fundos dos cabeçalhos internos (TODOS OK)** → `page-header-sobre.webp`,
   `page-header-atendimentos.webp`, `page-header-massagens-terapeuticas.webp`,
   `page-header-cursos-e-formacoes.webp`, `page-header-despertar-da-consciencia.webp`,
   `page-header-blog.webp` e `page-header-contato.webp`
13. Toque / cuidado → `why-choose-image-1.jpg`
14. Ambiente / mãos → `why-choose-image-2.jpg`
15. Mockup do guia gratuito → `appointment-image.jpg`
16–21. **6 fotos dos serviços** → `service-image-1.jpg` … `service-image-6.jpg`
22. Curso / turma → `cursos-e-formacoes.webp` (OK)
23. Retiro → `intro-video-image.jpg`
24–26. **3 capas de blog** → `post-1.jpg`, `post-2.jpg`, `post-3.jpg`

---

## 🎨 Não precisa trocar (já são definitivos)

Estes são **ícones vetoriais e texturas** do tema — funcionam como estão:

- Todos os `icon-*.svg` (ícones dos serviços, benefícios, contato etc.)
- `loader.svg` (animação de carregamento)
- Fundos decorativos: `section-bg-image-*.png`, `dark-section-bg-image.png`,
  `why-choose-bg-image.png`, `sidebar-cta-box-bg.jpg`
- Arquivos terminados em `-elite`, `-royal`, `team-*`, `gallery-*`, `author-*`:
  **não são usados** neste site (são de outras versões do tema).

> Dica: se puder, comprima os JPGs finais (ex.: [squoosh.app](https://squoosh.app))
> para manter o site rápido no celular, como pede a orientação.

export const site = {
  name: 'Luiz Reis',
  phoneLabel: '(31) 98555-6001',
  whatsappNumber: '5531985556001',
  email: 'luizreis005@gmail.com',
  address: 'Atendimentos em Belo Horizonte e Nova Lima',
  instagramUrl: 'https://www.instagram.com/luizz_c_reeiss',
  telegramUrl: 'https://t.me/',
  whatsappMessage: 'Olá, Luiz. Quero agendar uma conversa pelo WhatsApp.',
};

// Produtos digitais vendidos pela Hotmart. As páginas de vendas oficiais são as
// rotas `path` deste site (configuradas em Hotmart > Página do produto > Sua página externa).
// `checkoutUrl` precisa ser o link da "Página de pagamento" (pay.hotmart.com), nunca o
// go.hotmart.com: o go redireciona para a página externa e criaria um loop.
export const products = {
  abhyanga: {
    path: '/cursos-e-formacoes/formacao-massagem-abhyanga/',
    title: 'Formação em Massoterapia Ayurvédica e Massagem Abhyanga',
    checkoutUrl: 'https://pay.hotmart.com/U56755758Y?off=xa1vu5aq',
    price: 'R$ 996,00',
    installments: 12,
    installmentPrice: 'R$ 103,01',
    guaranteeDays: 7,
  },
  culinaria: {
    path: '/cursos-e-formacoes/ebook-culinaria-ayurvedica/',
    title: 'E-book Sua Culinária Ayurvédica',
    checkoutUrl: 'https://pay.hotmart.com/T107820379T?off=grzcckjj',
    price: 'R$ 19,70',
    installments: 6,
    guaranteeDays: 7,
  },
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const services = [
  {
    title: 'Consulta Ayurveda',
    text: 'Investiga as causas dos desequilíbrios e organiza um plano personalizado para corpo, mente, rotina e alimentação.',
    image: '/images/service-image-1.jpg',
    icon: '/images/icon-service-item-1.svg',
  },
  {
    title: 'Abhyanga',
    text: 'Massagem terapêutica para relaxamento profundo, regulação do sistema nervoso e reconexão com o corpo.',
    image: '/images/service-image-2.jpg',
    icon: '/images/icon-service-item-2.svg',
  },
  {
    title: 'Método Suddhi',
    text: 'Experiência terapêutica de purificação e reorganização integral para quem sente que precisa recomeçar.',
    image: '/images/metodo-suddhi.webp',
    cardImage: '/images/metodo-suddhi-card.webp',
    icon: '/images/icon-service-item-3.svg',
  },
  {
    title: 'Curso Toque Inteligente',
    text: 'Formação para terapeutas e massoterapeutas que desejam desenvolver escuta, presença e toque terapêutico.',
    image: '/images/service-image-4.jpg',
    icon: '/images/icon-service-item-4.svg',
  },
  {
    title: 'Cursos e Imersões',
    text: 'Ayurveda, Astrologia Védica e desenvolvimento humano em encontros para estudo e transformação.',
    image: '/images/service-image-5.jpg',
    icon: '/images/icon-service-item-5.svg',
  },
  {
    title: 'Despertar Shamana',
    text: 'Retiro de tratamento para cuidado profundo, descanso, presença e restauração do equilíbrio interno.',
    image: '/images/service-image-6.jpg',
    icon: '/images/icon-service-item-6.svg',
  },
];

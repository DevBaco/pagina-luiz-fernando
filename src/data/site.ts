export const site = {
  name: 'Luiz Reis',
  phoneLabel: '(31) 98555-6001',
  whatsappNumber: '5531985556001',
  email: 'luizreis005@gmail.com',
  address: 'Atendimentos em Belo Horizonte e Nova Lima',
  instagramUrl: 'https://www.instagram.com/luizz_c_reeiss',
  telegramUrl: 'https://t.me/',
  hotmartCourseUrl:
    'https://casaayurvedabh.kpages.online/curso-de-massoterapia-ayurvedica-formacao-em-massagem-abhyanga-e2bc94cf-e735-4ada-857c-829b9c5a399a',
  whatsappMessage: 'Olá, Luiz. Quero agendar uma conversa pelo WhatsApp.',
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
    image: '/images/service-image-3.jpg',
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

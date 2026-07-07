export const site = {
  name: 'Luiz Reis',
  phoneLabel: '(31) 99999-9999',
  whatsappNumber: '5531999999999',
  email: 'contato@luizreis.com.br',
  address: 'Atendimentos em Belo Horizonte e Nova Lima',
  instagramUrl: 'https://www.instagram.com/luizz_c_reeiss',
  youtubeUrl: 'https://www.youtube.com/',
  telegramUrl: 'https://t.me/',
  hotmartCourseUrl:
    'https://casaayurvedabh.kpages.online/curso-de-massoterapia-ayurvedica-formacao-em-massagem-abhyanga-e2bc94cf-e735-4ada-857c-829b9c5a399a',
  whatsappMessage: 'Ola, Luiz. Quero agendar uma conversa pelo WhatsApp.',
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const services = [
  {
    title: 'Consulta Ayurveda',
    text: 'Investiga as causas dos desequilibrios e organiza um plano personalizado para corpo, mente, rotina e alimentacao.',
    image: '/images/service-image-1.jpg',
    icon: '/images/icon-service-item-1.svg',
  },
  {
    title: 'Abhyanga',
    text: 'Massagem terapeutica para relaxamento profundo, regulacao do sistema nervoso e reconexao com o corpo.',
    image: '/images/service-image-2.jpg',
    icon: '/images/icon-service-item-2.svg',
  },
  {
    title: 'Metodo Suddhi',
    text: 'Experiencia terapeutica de purificacao e reorganizacao integral para quem sente que precisa recomecar.',
    image: '/images/service-image-3.jpg',
    icon: '/images/icon-service-item-3.svg',
  },
  {
    title: 'Curso Toque Inteligente',
    text: 'Formacao para terapeutas e massoterapeutas que desejam desenvolver escuta, presenca e toque terapeutico.',
    image: '/images/service-image-4.jpg',
    icon: '/images/icon-service-item-4.svg',
  },
  {
    title: 'Cursos e Imersoes',
    text: 'Ayurveda, Astrologia Vedica e desenvolvimento humano em encontros para estudo e transformacao.',
    image: '/images/service-image-5.jpg',
    icon: '/images/icon-service-item-5.svg',
  },
  {
    title: 'Despertar Shamana',
    text: 'Retiro de tratamento para cuidado profundo, descanso, presenca e restauracao do equilibrio interno.',
    image: '/images/service-image-6.jpg',
    icon: '/images/icon-service-item-6.svg',
  },
];

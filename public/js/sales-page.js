(() => {
  const root = document.querySelector('.lrx');
  if (!root) return;

  // Carrega o vídeo do YouTube só quando a pessoa clica.
  const launch = root.querySelector('.lrx-video-launch');
  launch?.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${launch.dataset.video}?autoplay=1&rel=0`;
    frame.title = launch.getAttribute('aria-label') || 'Vídeo';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    launch.replaceWith(frame);
    frame.focus();
  });

  // Repassa src, sck e utm_* da URL da página para os links de checkout da Hotmart,
  // para a origem da venda aparecer no relatório.
  const params = new URLSearchParams(window.location.search);
  const keys = ['src', 'sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const forward = keys.filter((key) => params.get(key));
  if (forward.length) {
    root.querySelectorAll('a[data-hotmart-checkout]').forEach((link) => {
      const url = new URL(link.href);
      forward.forEach((key) => {
        if (!url.searchParams.has(key)) url.searchParams.set(key, params.get(key));
      });
      link.href = url.toString();
    });
  }

  // No celular, mostra o botão fixo só entre a abertura e a oferta.
  const sticky = root.querySelector('.lrx-sticky');
  const hero = root.querySelector('.lrx-hero');
  const offer = root.querySelector('.lrx-offer');
  if (sticky && hero && offer) {
    const update = () => {
      sticky.hidden = !(hero.getBoundingClientRect().bottom <= 0 && offer.getBoundingClientRect().top >= window.innerHeight);
    };
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { update(); pending = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();

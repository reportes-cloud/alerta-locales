const fuentes = [
  ['Zonaprop', 'https://www.zonaprop.com.ar/locales-comerciales-alquiler-palermo-soho-orden-publicado-descendente.html', 'data-posting-type="PROPERTY"'],
  ['Argenprop', 'https://www.argenprop.com/locales/alquiler/palermo-soho/orden-masnuevos', 'class="listing__item'],
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

(async () => {
  for (const [nombre, url, marca] of fuentes) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'es-AR,es;q=0.9' } });
      const html = await r.text();
      const avisos = html.split(marca).length - 1;
      const titulo = (/<title>([^<]*)/.exec(html) || [])[1] || '(sin título)';
      console.log(`${nombre}: HTTP ${r.status} | avisos detectados: ${avisos} | título: ${titulo}`);
    } catch (e) {
      console.log(`${nombre}: FALLÓ ${e.message}`);
    }
  }
})();

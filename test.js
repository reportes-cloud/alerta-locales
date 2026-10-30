const fuentes = [
  ['Zonaprop', 'https://www.zonaprop.com.ar/locales-comerciales-alquiler-palermo-soho-orden-publicado-descendente.html', 'data-posting-type="PROPERTY"'],
  ['Argenprop', 'https://www.argenprop.com/locales/alquiler/palermo-soho/orden-masnuevos', 'class="listing__item'],
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// además de la consola, deja el resultado en la página de resumen de la ejecución
function salida(texto) {
  console.log(texto);
  if (process.env.GITHUB_STEP_SUMMARY) require('fs').appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto + '\n\n');
}

(async () => {
  for (const [nombre, url, marca] of fuentes) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'es-AR,es;q=0.9' } });
      const html = await r.text();
      const avisos = html.split(marca).length - 1;
      const titulo = (/<title>([^<]*)/.exec(html) || [])[1] || '(sin título)';
      salida(`${nombre}: HTTP ${r.status} | avisos detectados: ${avisos} | título: ${titulo}`);
    } catch (e) {
      salida(`${nombre}: FALLÓ ${e.message}`);
    }
  }
})();

//= require blogelator/marked
//= require blogelator/prettify

marked.setOptions({
  langPrefix: 'highlight lang-',
  smartypants: true,
  highlight: function(code, lang) {
    return prettyPrintOne(code, lang);
  }
});

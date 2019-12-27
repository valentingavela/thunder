export default () => {
  const langByParam = getLangByUrlParam();

  if (langByParam) {
    return langByParam;
  }

  return 'es';
};

function getLangByUrlParam() {
  const regex = new RegExp('[\\?&]lang=(\\bes\\b|\\bpt\\b|\\ben\\b)');
  const results = regex.exec(window.location.search);
  return results ? results[1] : null;
}

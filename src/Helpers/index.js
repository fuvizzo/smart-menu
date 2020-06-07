export const sort = list => {
  const compareFn = (val1, val2) => {
    return val1[1].type - val2[1].type;
  };
  const entries = Object.entries(list);
  const sortedEntries = entries.sort(compareFn);
  return Object.fromEntries(sortedEntries);
};

export const mockUnlocalizedMenus = (list, defaultLanguage) => {
  const values = Object.values(list);
  values.forEach(value => {
    value.info.locales[defaultLanguage] =
      value.info.locales[defaultLanguage] || {};

    const itemValues = Object.values(value.items || {});
    itemValues.forEach(itemValue => {
      itemValue.locales[defaultLanguage] =
        itemValue.locales[defaultLanguage] || {};
    });
  });
  return list;
};

export const downLoadSvgImage = (htmlElementId, name) => {
  function download(dataURL) {
    var dl = document.createElement('a');
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute('href', dataURL);
    dl.setAttribute('download', `${name}.svg`);
    dl.click();
  }
  const svg = document.getElementById(htmlElementId);
  var svgAsXML = new XMLSerializer().serializeToString(svg);
  download(`data:image/svg+xml,${encodeURIComponent(svgAsXML)}`);
};

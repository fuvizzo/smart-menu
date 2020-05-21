import constants from '../Constants/index';
const { Locales } = constants;

export const sort = list => {
  const compareFn = (val1, val2) => {
    return val1[1].category - val2[1].category;
  };
  const entries = Object.entries(list);
  const sortedEntries = entries.sort(compareFn);
  return Object.fromEntries(sortedEntries);
};

export const mockUnlocalizedMenus = (list, defaultLanguage) => {
  const {
    Labels: { Warnings: WarningMessages },
  } = Locales[defaultLanguage];
  const values = Object.values(list);
  values.forEach(value => {
    value.info.locales[defaultLanguage] = value.info.locales[
      defaultLanguage
    ] || { name: WarningMessages.MISSING_NAME, warning: true };

    const itemValues = Object.values(value.items);
    itemValues.forEach(itemValue => {
      itemValue.locales[defaultLanguage] = itemValue.locales[
        defaultLanguage
      ] || { name: WarningMessages.MISSING_NAME, warning: true };
    });
  });
  return list;
};

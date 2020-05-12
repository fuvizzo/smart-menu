export const sort = list => {
  const compareFn = (val1, val2) => {
    return val1[1].category - val2[1].category;
  };
  return Object.fromEntries(Object.entries(list).sort(compareFn));
};

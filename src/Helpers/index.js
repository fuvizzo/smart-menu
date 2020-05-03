export const DishMap = new Map();
DishMap.set('en', [
  'Starters',
  'Main Courses',
  'Seconds',
  'Side Dishes',
  'Desserts',
  'Drinks',
]);

export const sortMap = map => {
  const compareFn = (val1, val2) => {
    return val1[1].category - val2[1].category;
  };
  return new Map([...map.entries()].sort(compareFn));
};

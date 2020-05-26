export function groupMenuItemsByType(items) {
  return Object.values(items).reduce((results, item) => {
    (results[item.type] = results[item.type] || []).push(item);
    return results;
  }, {});
}

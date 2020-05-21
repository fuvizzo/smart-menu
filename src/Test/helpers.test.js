import JsonMock from '../Mock/mock-data.json';
import { sort, mockUnlocalizedMenus } from '../Helpers';

const menus = JsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.menus;

describe('Mock unlocalized menus', () => {
  it('Creates a new menu list with mocked localizations if unexisting', () => {
    const language = 'it';
    const results = mockUnlocalizedMenus(menus, language);
    const values = Object.values(results);
    expect(values.find(menu => menu.info.locales[language])).not.toBe(null);

    values.forEach(menu => {
      const items = Object.values(menu.items);
      expect(items.find(item => item.locales[language])).not.toBe(null);
    });
  });

  /*  test('Test 2', () => {
    it('Returns undefined values when a localization is not provided or deleted', () => {
      const language = 'it';
      const values = Object.values(menus);
      expect(values.find(menu => menu.info.locales[language])).toBe(null);

      values.forEach(menu => {
        expect(menu.items.find(item => item.locales[language])).toBe(null);
      });
    });
  }); */
});

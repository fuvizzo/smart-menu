import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { sortMap } from '../../Helpers/index';
import constants from './../../constants';
import { v1 as uuidv1 } from 'uuid';
import { cloneDeep } from 'lodash';
import Locale from './locale';
import NewLocaleForm from './newLocale';

const { LOCALIZED_FIELDS, SUPPORTED_LANGUAGES, LOCALE } = constants;

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const getAvailableLanguage = usedLanguages => {
  return SUPPORTED_LANGUAGES.filter(
    lang => !usedLanguages.some(l => l === lang)
  );
};

const OwnerAdmin = props => {
  const { service: firebaseService, id, systemLang = 'en' } = props;
  const dishMap = LOCALE[systemLang].DISH_TYPES;
  const path = `/list/${id}/menu`;
  const [menu, setMenu] = useState(new Map());
  const defaultEditModeState = {
    enabled: false,
    selectedItem: {},
  };

  const defaultInserLocaleModeState = {
    enabled: false,
    selectedItem: {},
  };
  const [editModeState, setEditModeState] = useState(defaultEditModeState);
  const [insertLocaleModeState, setInsertLocaleModeState] = useState(
    defaultInserLocaleModeState
  );
  const onChangeValue = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue = input.value;

      if (insertLocaleModeState.enabled) {
        const lang = input.dataset.lang;
        const newLocale = insertLocaleModeState.newLocale;
        newLocale.lang = lang;
        newLocale[input.name] = currentValue;

        setInsertLocaleModeState({
          ...insertLocaleModeState,
          newLocale,
        });
      } else {
        const selectedItem = editModeState.selectedItem;

        if (LOCALIZED_FIELDS.some(field => field === input.name)) {
          const lang = input.dataset.lang;
          selectedItem.newValue.locales[lang][input.name] = currentValue;
        } else {
          selectedItem.newValue[input.name] = currentValue;
        }

        setEditModeState({
          enabled: true,
          selectedItem,
        });
      }
    },
    [editModeState.selectedItem, insertLocaleModeState]
  );

  const toggleAddLocalMode = useCallback(
    ({ menuItemId, cancel = false }) => {
      if (cancel) {
        setInsertLocaleModeState(defaultInserLocaleModeState);
      } else {
        setInsertLocaleModeState({
          enabled: true,
          menuItemId,
          newLocale: { ...emptyLocaleData },
        });
      }
    },
    [menu, insertLocaleModeState.menuItemId]
  );

  const toggleEditMode = useCallback(
    ({ menuItemId, cancel = false }) => {
      if (cancel) {
        menu.set(
          editModeState.selectedItem.id,
          editModeState.selectedItem.oldValue
        );
        setMenu(menu);
        setEditModeState(defaultEditModeState);
      } else {
        setEditModeState({
          enabled: true,
          selectedItem: {
            id: menuItemId,
            newValue: menu.get(menuItemId),
            oldValue: cloneDeep(menu.get(menuItemId)),
          },
        });
      }
    },
    [menu, editModeState.selectedItem.id]
  );

  const deleteMenuItemCallback = useCallback(
    menuItemId => {
      const menuItemPath = `${path}/${menuItemId}`;
      const deleteMenuItem = async () => {
        try {
          await firebaseService.delete(menuItemPath);
          const newMenu = new Map(menu.entries());
          newMenu.delete(menuItemId);

          setMenu(newMenu);
        } catch (error) {
          console.log(error);
        }
      };
      deleteMenuItem();
    },
    [menu]
  );

  const updateMenuItemCallback = useCallback(() => {
    const menuItemId = editModeState.selectedItem.id;

    const updateMenuItem = async () => {
      const data = {
        path: `${path}/${menuItemId}`,
        body: editModeState.selectedItem.newValue,
      };
      try {
        await firebaseService.update(data);

        setEditModeState({
          enabled: false,
          selectedItem: {},
        });
      } catch (error) {
        console.log(error);
      }
    };
    updateMenuItem();
  }, [editModeState.selectedItem.value, editModeState.selectedItem.id]);

  const createNewMenuItemCallback = useCallback(() => {
    const createMenuItem = async () => {
      const menuItemId = uuidv1();

      const data = {
        path: `${path}/${menuItemId}`,
        body: {
          category: '4',
          locales: {
            en: {
              description: 'desc',
              ingredients: 'Ingredients list',
              name: 'Lemon cake',
            },
          },
          price: '6€',
        },
      };

      try {
        await firebaseService.create(data);
        const newMenu = new Map(menu.entries());
        newMenu.set(menuItemId, data.body);

        setMenu(newMenu);
      } catch (error) {
        console.log(error);
      }
    };
    //TODO get data from UI and pass it to
    createMenuItem();
  }, [menu, path]);

  const createNewLocalInMenuItem = useCallback(() => {
    const createNewLocale = async () => {
      const { menuItemId, newLocale } = insertLocaleModeState;
      const localeData = { ...newLocale };
      delete localeData.lang;
      const data = {
        path: `${path}/${menuItemId}/locales/${newLocale.lang}`,
        body: localeData,
      };

      try {
        await firebaseService.create(data);
        const newMenu = new Map(menu.entries());
        const menuItem = newMenu.get(menuItemId);
        menuItem.locales[newLocale.lang] = localeData;

        setMenu(newMenu);
        toggleAddLocalMode({ cancel: true });
      } catch (error) {
        console.log(error);
      }
    };
    createNewLocale();
  }, [menu, insertLocaleModeState]);

  const deleteLocale = useCallback(
    (menuItemId, lang) => {
      const menuItemLocalePath = `${path}/${menuItemId}/locales/${lang}`;
      const deleteLocale = async () => {
        try {
          await firebaseService.delete(menuItemLocalePath);
          const newMenu = new Map(menu.entries());
          const menuItem = newMenu.get(menuItemId);
          delete menuItem.locales[lang];

          setMenu(newMenu);
        } catch (error) {
          console.log(error);
        }
      };
      deleteLocale();
    },
    [menu]
  );

  useEffect(() => {
    const readList = async () => {
      const currentMenu = new Map();
      try {
        const results = await firebaseService.read(path);
        const data = results.val();
        Object.keys(data).forEach(key => {
          currentMenu.set(key, data[key]);
        });
        setMenu(currentMenu);
      } catch (error) {
        console.log(error);
      }
    };
    readList();
  }, [firebaseService]);

  useEffect(() => {
    setMenu(editModeState.enabled ? menu : sortMap(menu));
    console.log('reorder!');
  }, [editModeState.enabled]);

  return (
    <div>
      <ul>
        {[...menu.keys()].map(key => {
          const data = menu.get(key);
          return (
            <li key={key}>
              {editModeState.enabled &&
              editModeState.selectedItem.id === key ? (
                <div>
                  Edit mode
                  <div>
                    <div>
                      <select
                        name="category"
                        onChange={onChangeValue}
                        type="text"
                        placeholder="Category"
                        value={data.category}
                      >
                        {dishMap.map((dishType, index) => {
                          return (
                            <option key={index} value={index}>
                              {dishType}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <input
                        name="price"
                        onChange={onChangeValue}
                        type="text"
                        placeholder="Price"
                        value={data.price}
                      />
                    </div>
                    {Object.keys(data.locales).map((lang, index) => {
                      const locale = data.locales[lang];
                      return (
                        <Locale
                          systemLang={systemLang}
                          key={index}
                          lang={lang}
                          data={locale}
                          onChangeValue={onChangeValue}
                        />
                      );
                    })}

                    <button onClick={() => updateMenuItemCallback()}>
                      Apply changes
                    </button>
                    <button onClick={() => toggleEditMode({ cancel: true })}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div> {dishMap[data.category]}</div>
                  <div> {data.price}</div>
                  {Object.keys(data.locales).map((lang, index) => {
                    const locale = data.locales[lang];
                    return (
                      <div key={index}>
                        <div>
                          Menu in <b>{LOCALE[systemLang].LANGUAGES[lang]}</b>
                        </div>
                        <div> {locale.name}</div>
                        <div> {locale.description}</div>
                        <div> {locale.ingredients}</div>

                        <div>
                          <button onClick={() => deleteLocale(key, lang)}>
                            Delete description in{' '}
                            {LOCALE[systemLang].LANGUAGES[lang]}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div>
                    <button onClick={() => deleteMenuItemCallback(key)}>
                      Delete
                    </button>
                  </div>
                  <div>
                    <button onClick={() => toggleEditMode({ menuItemId: key })}>
                      Edit
                    </button>
                  </div>

                  {insertLocaleModeState.enabled &&
                  insertLocaleModeState.menuItemId === key ? (
                    <NewLocaleForm
                      emptyLocaleData={insertLocaleModeState.newLocale}
                      toggleAddLocalMode={toggleAddLocalMode}
                      onChangeValue={onChangeValue}
                      systemLang={systemLang}
                      onCreateNewLocalInMenuItem={createNewLocalInMenuItem}
                      availableLanguages={getAvailableLanguage(
                        Object.keys(data.locales)
                      )}
                    />
                  ) : (
                    <>
                      {getAvailableLanguage(Object.keys(data.locales))
                        .length !== 0 && (
                        <button
                          onClick={() =>
                            toggleAddLocalMode({ menuItemId: key })
                          }
                        >
                          Add description, name and ingrendients in another lang
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button onClick={createNewMenuItemCallback}>Add</button>
    </div>
  );
};

export default OwnerAdmin;

import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  getMenu,
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
} from '../../Actions/menuActionsOld';
import { useEffect, useState, useCallback } from 'react';

import constants from '../../Constants/index';
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

const MenuEditor = props => {
  const dispatch = useDispatch();
  const { getMenu, sortMenu, defaultLanguage, menu } = props;
  const dishMap = LOCALE[defaultLanguage].DISH_TYPES;

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

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    if (!editModeState.enabled) sortMenu(menu);
    console.log('reorder!');
  }, [menu.size, editModeState.enabled]);

  const createNewMenuItemCallback = useCallback(data => {
    dispatch(
      createNewMenuItem({
        category: '4',
        locales: {
          en: {
            description: 'desc',
            ingredients: 'Ingredients list',
            name: 'Lemon cake',
          },
        },
        price: '6€',
      })
    );
  }, []);

  const deleteMenuItemHandler = useCallback(menuItemId => {
    dispatch(deleteMenuItem(menuItemId));
  }, []);

  const updateMenuItemHandler = useCallback(() => {
    const menuItemId = editModeState.selectedItem.id;
    const body = editModeState.selectedItem.newValue;
    dispatch(updateMenuItem(menuItemId, body));
    setEditModeState({
      enabled: false,
      selectedItem: {},
    });
  }, [editModeState.selectedItem.value, editModeState.selectedItem.id]);

  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = insertLocaleModeState;
    dispatch(createNewLocale(menuItemId, newLocale));
    toggleAddLocalMode({ cancel: true });
  }, [insertLocaleModeState]);

  const deleteLocaleHandler = useCallback((menuItemId, lang) => {
    dispatch(deleteLocale(menuItemId, lang));
  }, []);

  const onChangeValueHandler = useCallback(
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
          selectedItem: cloneDeep(selectedItem),
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

  const toggleEditModeHandler = useCallback(
    ({ menuItemId, cancel = false }) => {
      if (cancel) {
        menu.set(
          editModeState.selectedItem.id,
          editModeState.selectedItem.oldValue
        );
        getMenu(menu);
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
                        onChange={onChangeValueHandler}
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
                        onChange={onChangeValueHandler}
                        type="text"
                        placeholder="Price"
                        value={data.price}
                      />
                    </div>
                    {Object.keys(data.locales).map((lang, index) => {
                      const locale = data.locales[lang];
                      return (
                        <Locale
                          key={index}
                          lang={lang}
                          data={locale}
                          onChangeValue={onChangeValueHandler}
                        />
                      );
                    })}

                    <button onClick={() => updateMenuItemHandler()}>
                      Apply changes
                    </button>
                    <button
                      onClick={() => toggleEditModeHandler({ cancel: true })}
                    >
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
                          Menu in{' '}
                          <b>{LOCALE[defaultLanguage].LANGUAGES[lang]}</b>
                        </div>
                        <div> {locale.name}</div>
                        <div> {locale.description}</div>
                        <div> {locale.ingredients}</div>

                        <div>
                          <button
                            onClick={() => deleteLocaleHandler(key, lang)}
                          >
                            Delete description in{' '}
                            {LOCALE[defaultLanguage].LANGUAGES[lang]}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div>
                    <button onClick={() => deleteMenuItemHandler(key)}>
                      Delete
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleEditModeHandler({ menuItemId: key })}
                    >
                      Edit
                    </button>
                  </div>

                  {insertLocaleModeState.enabled &&
                  insertLocaleModeState.menuItemId === key ? (
                    <NewLocaleForm
                      emptyLocaleData={insertLocaleModeState.newLocale}
                      toggleAddLocalMode={toggleAddLocalMode}
                      onChangeValue={onChangeValueHandler}
                      onCreateNewLocalInMenuItem={createNewLocaleCallback}
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

function mapStateToProps(state) {
  return {
    menu: state.menu,
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  getMenu,
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
})(MenuEditor);

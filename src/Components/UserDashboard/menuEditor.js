import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
} from '../../Actions/menuActions';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  const { menuId } = useParams();

  const { sortMenu, defaultLanguage, menus } = props;
  const dishMap = LOCALE[defaultLanguage].DISH_TYPES;
  const menu = menus[menuId];
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

  /* useEffect(() => {
    getMenu();
  }, []);

useEffect(() => {
    if (!editModeState.enabled) sortMenu(menu);
    console.log('reorder!');
  }, [menu.size, editModeState.enabled]); */

  const createNewMenuItemCallback = useCallback(data => {
    dispatch(
      createNewMenuItem(menuId, {
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
    dispatch(deleteMenuItem(menuId, menuItemId));
  }, []);

  const updateMenuItemHandler = useCallback(() => {
    const menuItemId = editModeState.selectedItem.id;
    const body = editModeState.selectedItem.value;
    dispatch(updateMenuItem(menuId, menuItemId, body));
    setEditModeState({
      enabled: false,
      selectedItem: {},
    });
  }, [editModeState.selectedItem.value, editModeState.selectedItem.id]);

  const createNewLocaleCallback = useCallback(() => {
    const { menuItemId, newLocale } = insertLocaleModeState;
    dispatch(createNewLocale(menuId, menuItemId, newLocale));
    toggleAddLocalMode({ cancel: true });
  }, [insertLocaleModeState]);

  const deleteLocaleHandler = useCallback((menuItemId, lang) => {
    dispatch(deleteLocale(menuId, menuItemId, lang));
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
          selectedItem.value.locales[lang][input.name] = currentValue;
        } else {
          selectedItem.value[input.name] = currentValue;
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
        setEditModeState(defaultEditModeState);
      } else {
        setEditModeState({
          enabled: true,
          selectedItem: {
            id: menuItemId,
            value: cloneDeep(menu.items[menuItemId]),
          },
        });
      }
    },
    [menu, editModeState.selectedItem.id]
  );

  return (
    <div>
      <ul>
        {Object.keys(menu.items).map(key => {
          const data = menu.items[key];
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
                        value={editModeState.selectedItem.value.category}
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
                        value={editModeState.selectedItem.value.price}
                      />
                    </div>
                    {Object.keys(editModeState.selectedItem.value.locales).map(
                      (lang, index) => {
                        const locale =
                          editModeState.selectedItem.value.locales[lang];
                        return (
                          <Locale
                            key={index}
                            lang={lang}
                            data={locale}
                            onChangeValue={onChangeValueHandler}
                          />
                        );
                      }
                    )}

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
    menus: state.menus,
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  sortMenu,
  createNewMenuItem,
  deleteMenuItem,
  updateMenuItem,
  createNewLocale,
  deleteLocale,
})(MenuEditor);

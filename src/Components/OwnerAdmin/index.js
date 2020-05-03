import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { sortMap, DishMap } from '../../Helpers/index';
import { v1 as uuidv1 } from 'uuid';

function OwnerAdmin(props) {
  const dishMap = DishMap.get('en');
  const { service: firebaseService, id } = props;
  const path = `/list/${id}/menu`;
  const [menu, setMenu] = useState(new Map());

  const defaultEditModeState = {
    enabled: false,
    selectedItem: {},
  };
  const [editModeState, setEditModeState] = useState(defaultEditModeState);

  const onChangeValue = useCallback(
    event => {
      const input = event.currentTarget;
      const currentValue = input.value;
      const selectedItem = editModeState.selectedItem;
      selectedItem.value[input.name] = currentValue;
      setEditModeState({
        enabled: true,
        selectedItem,
      });
    },
    [editModeState.selectedItem]
  );

  const toggleEditMode = useCallback(
    ({ menuItemId, cancel = false }) => {
      setEditModeState(
        cancel
          ? defaultEditModeState
          : {
              enabled: true,
              selectedItem: {
                id: menuItemId,
                value: menu.get(menuItemId),
              },
            }
      );
    },
    [menu]
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
    [firebaseService, path, menu]
  );

  const updateMenuItemCallback = useCallback(() => {
    const menuItemId = editModeState.selectedItem.id;

    const updateMenuItem = async () => {
      const data = {
        path: `${path}/${menuItemId}`,
        body: editModeState.selectedItem.value,
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

  const createMenuItemCallback = useCallback(() => {
    const createMenuItem = async () => {
      const menuItemId = uuidv1();

      const data = {
        path: `${path}/${menuItemId}`,
        body: {
          category: '4',
          description: 'desc',
          ingredients: 'Ingredients list',
          name: 'Lemon cake',
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
  }, [firebaseService, menu, path]);

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
              {editModeState.selectedItem.id === key &&
              editModeState.enabled ? (
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
                        name="name"
                        onChange={onChangeValue}
                        type="text"
                        placeholder="Name"
                        value={data.name}
                      />
                    </div>
                    <div>
                      <input
                        name="description"
                        onChange={onChangeValue}
                        type="text"
                        placeholder="Description"
                        value={data.description}
                      />
                    </div>
                    <div>
                      <input
                        name="ingredients"
                        onChange={onChangeValue}
                        type="text"
                        placeholder="Ingredients"
                        value={data.ingredients}
                      />
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
                  <div> {data.name}</div>
                  <div> {data.description}</div>
                  <div> {data.ingredients}</div>
                  <div> {data.price}</div>
                  <button onClick={() => deleteMenuItemCallback(key)}>
                    Delete
                  </button>
                  <button onClick={() => toggleEditMode({ menuItemId: key })}>
                    Edit
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button onClick={createMenuItemCallback}>Add</button>
    </div>
  );
}

export default OwnerAdmin;

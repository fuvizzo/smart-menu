import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { v1 as uuidv1 } from 'uuid';

function OwnerAdmin(props) {
  const { service: firebaseService, id } = props;
  const path = `/list/${id}/menu`;
  const [menu, setMenu] = useState(new Map());

  const toggleEditMode = useCallback(menuItemId => {});

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

  const updateMenuItemCallback = useCallback(() => {});

  const createMenuItemCallback = useCallback(() => {
    const createMenuItem = async () => {
      const menuItemId = uuidv1();

      const data = {
        path: `${path}/${menuItemId}}`,
        body: {
          category: 'Dessert',
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

  return (
    <div>
      <ul>
        {[...menu.keys()].map(key => {
          const data = menu.get(key);
          return (
            <li key={key}>
              <div> {data.category}</div>
              <div> {data.name}</div>
              <div> {data.descriptions}</div>
              <div> {data.ingredients}</div>
              <div> {data.price}</div>
              <button onClick={() => deleteMenuItemCallback(key)}>
                Delete
              </button>
              <button onClick={() => toggleEditMode(key)}>Edit</button>
            </li>
          );
        })}
      </ul>
      <button onClick={createMenuItemCallback}>Add</button>
    </div>
  );
}

export default OwnerAdmin;

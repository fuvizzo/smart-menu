import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { v1 as uuidv1 } from 'uuid';

function OwnerAdmin(props) {
  const { service: firebaseService, id } = props;
  const path = `/list/${id}/menu`;
  const [menu, setMenu] = useState(new Map());

  const deleteMenuItemCallback = useCallback(() => {});

  const updateMenuItemCallback = useCallback(() => {});

  const createMenuItemCallback = useCallback(() => {
    const createMenuItem = async () => {
      const data = {
        path,
        body: {},
      };

      try {
        await firebaseService.create(data);
        menu.push(data.body);
        setMenu(menu);
      } catch (error) {
        console.log(error);
      }
    };
    //TODO get data from UI and pass it to
    createMenuItem();
  }, [firebaseService, menu]);

  useEffect(() => {
    const readList = async () => {
      const map = new Map();
      try {
        const results = await firebaseService.read(path);
        const data = results.val();
        Object.keys(data).forEach(key => {
          map.set(key, data[key]);
        });
        setMenu(map);
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OwnerAdmin;

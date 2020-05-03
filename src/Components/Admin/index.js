import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { v1 as uuidv1 } from 'uuid';

function Admin(props) {
  const firebaseService = props.service;
  const [list, setList] = useState(new Map());

  const deleteOwnerCallback = useCallback(() => {});

  const updateOwnerCallback = useCallback(() => {});

  const createOwnerCallback = useCallback(() => {
    const listItemId = uuidv1();
    const createOwner = async () => {
      const data = {
        path: `/list/${listItemId}`,
        body: {
          owner: {
            name: 'Bourmuth',
            type: 'Restaurant',
          },
        },
      };

      try {
        await firebaseService.create(data);
        const newList = new Map(list.entries());
        newList.set(listItemId, data.body);
        setList(newList);
      } catch (error) {
        console.log(error);
      }
    };
    //TODO get data from UI and pass it to
    createOwner();
  }, [firebaseService, list]);

  useEffect(() => {
    const readList = async () => {
      const path = 'list';
      const currentList = new Map();
      try {
        const results = await firebaseService.read(path);
        const data = results.val();
        Object.keys(data).forEach(key => {
          currentList.set(key, data[key]);
        });
        setList(currentList);
      } catch (error) {
        console.log(error);
      }
    };
    readList();
  }, [firebaseService]);

  return (
    <div>
      <ul>
        {[...list.keys()].map(key => {
          const data = list.get(key);
          return (
            <li key={key}>
              <div> {data.owner.type}</div>
              <div> {data.owner.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Admin;

import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { v1 as uuidv1 } from 'uuid';

function Admin(props) {
  const firebaseService = props.service;
  const [list, setList] = useState(new Map());

  const deleteOwnerCallback = useCallback(() => {});

  const updateOwnerCallback = useCallback(() => {});

  const createOwnerCallback = useCallback(() => {
    const createOwner = async () => {
      const data = {
        path: `/list/${uuidv1()}`,
        body: {
          owner: {
            name: 'Bourmuth',
            type: 'Restaurant',
          },
        },
      };

      try {
        await firebaseService.create(data);
        list.push(data.body);
        setList(list);
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
      const map = new Map();
      try {
        const results = await firebaseService.read(path);
        const data = results.val();
        Object.keys(data).forEach(key => {
          map.set(key, data[key]);
        });
        setList(map);
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

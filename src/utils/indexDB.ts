import { openDB } from 'idb';

const dbPromise = openDB('handel-network-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('configs')) {
      db.createObjectStore('configs', { keyPath: 'id' }).transaction.oncomplete = function () {
        // const configs = db.transaction('configs', 'readwrite').objectStore('configs');
        // configs.add({ id: 'is_popup_on', value: false });
      };
    }
  },
});

export interface Configs {
  id: string;
  [key: string]: any;
}

export const storeConfigDataFirebase = async (data: Configs) => {
  const db = await dbPromise;
  const tx = db.transaction('configs', 'readwrite');
  const store = tx.objectStore('configs');
  await store.put(data);
  tx.done;
};

export const fetchConfigDataFirebase = async <T>(key: string) => {
  const db = await dbPromise;
  const tx = db.transaction('configs', 'readonly');
  const store = tx.objectStore('configs');
  return store.get(key) as Promise<T>;
};

// fetchConfigDataFirebase("is_popup_on");

export const getIDBVal = async (key: string) => {
  const res = await fetchConfigDataFirebase<Configs>(key);
  return res?.value as boolean ?? false;
};

export const setIDBVal = async (key: string, data: boolean) => {
  await storeConfigDataFirebase({ id: key, value: data });
  return await getIDBVal(key);
};

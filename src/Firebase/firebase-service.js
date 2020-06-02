class FirebaseService {
  #database = null;
  #storage = null;

  constructor(firebase) {
    this.#database = firebase.database();
    this.#storage = firebase.storage();
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(user => {
      // console.log(user);
    });
  }

  auth = this.auth;

  storage = {
    getDownloadURL: async path => {
      const resource = await this.#storage.ref(path);
      return await resource.getDownloadURL();
    },

    deleteFile: async path => this.#storage.ref(path).delete(),

    uploadFile: async (path, file, onUploading, metadata = null) => {
      const resource = this.#storage.ref(path);
      const uploadTask = metadata
        ? resource.put(file, metadata)
        : resource.put(file);
      uploadTask.on('state_changed', onUploading);
      return await uploadTask;
    },
  };
  database = {
    create: async ({ path, body }) => this.#database.ref(path).set(body),

    delete: async path => this.#database.ref(path).remove(),

    update: async ({ path, body }) => this.#database.ref(path).update(body),

    read: async path => this.#database.ref(path).once('value'),

    orderByChild: (path, name, value) => {
      const orderByChild = this.#database
        .ref(path)
        .orderByChild(name)
        .equalTo(value);
      return {
        read: async () => await orderByChild.once('value'),
      };
    },

    orderByValue: async (path, value) => {
      const x = this.#database.ref(path).orderByValue();
      return x.equalTo(value).once('value');
    },
  };
}
export default FirebaseService;

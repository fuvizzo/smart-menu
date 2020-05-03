class FirebaseService {
  #database = null;
  constructor(firebase) {
    this.#database = firebase.database();

    /* const dbRefObject = this.#database.ref().child('/list');
    console.log(dbRefObject);
    dbRefObject.on('value', snap => {
      console.log(snap.val());
    }); */
  }

  create = async ({ path, body }) => this.#database.ref(path).set(body);

  delete = async path => this.#database.ref(path).remove();

  update = async ({ path, body }) => this.#database.ref(path).update(body);

  read = async path => this.#database.ref(path).once('value');
}

export default FirebaseService;

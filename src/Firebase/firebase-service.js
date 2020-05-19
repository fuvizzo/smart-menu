class FirebaseService {
  #database = null;
  #auth = null;

  constructor(firebase) {
    this.#database = firebase.database();
    this.#auth = firebase.auth();

    this.#auth.onAuthStateChanged(user => {
      console.log(user);
    });
  }

  auth = {
    createUserWithEmailAndPassword: async (email, password) =>
      await this.#auth.createUserWithEmailAndPassword(email, password),

    signInWithEmailAndPassword: async (email, password) =>
      await this.#auth.signInWithEmailAndPassword(email, password),

    signOut: async () => this.#auth.signOut(),
  };

  create = async ({ path, body }) => this.#database.ref(path).set(body);

  delete = async path => this.#database.ref(path).remove();

  update = async ({ path, body }) => this.#database.ref(path).update(body);

  read = async path => this.#database.ref(path).once('value');

  orderByChild = (path, name, value) => {
    const orderByChild = this.#database
      .ref(path)
      .orderByChild(name)
      .equalTo(value);
    return {
      read: async () => await orderByChild.once('value'),
    };
  };

  orderByValue = async (path, value) => {
    const x = this.#database.ref(path).orderByValue();
    return x.equalTo(value).once('value');
  };
}
export default FirebaseService;

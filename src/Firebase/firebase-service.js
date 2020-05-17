class FirebaseService {
  #database = null;
  #auth = null;
  #root = '/users';

  constructor(firebase) {
    this.#database = firebase.database();
    this.#auth = firebase.auth();

    this.#auth.onAuthStateChanged(user => {
      console.log(user);
    });
  }

  auth = {
    signOut: async () => this.#auth.signOut(),
    signInWithEmailAndPassword: async (email, password) => {
      try {
        const authData = await this.#auth.signInWithEmailAndPassword(
          email,
          password
        );

        const usersRootRef = this.#database.ref(
          `${this.#root}/${authData.user.uid}`
        );

        const userData = await usersRootRef.once('value');
        return { authData: authData.user, userData: userData.val() };
      } catch (error) {
        console.log(error);
      }
    },
  };

  create = async ({ path, body }) => this.#database.ref(path).set(body);

  delete = async path => this.#database.ref(path).remove();

  update = async ({ path, body }) => this.#database.ref(path).update(body);

  read = async path => this.#database.ref(path).once('value');

  orderByChild = async (path, name, value) =>
    this.#database.ref(path).orderByChild(name).equalTo(value).once('value');

  orderByValue = async (path, value) => {
    const x = this.#database.ref(path).orderByValue();
    return x.equalTo(value).once('value');
  };
}
export default FirebaseService;

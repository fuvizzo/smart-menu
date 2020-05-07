class FirebaseService {
  #database = null;
  #auth = null;
  #root = 'users';
  constructor(firebase) {
    this.#database = firebase.database();
    this.#auth = firebase.auth();
    /* const dbRefObject = this.#database.ref().child('/list');
    console.log(dbRefObject);
    dbRefObject.on('value', snap => {
      console.log(snap.val());
    }); */
  }

  auth = {
    signInWithEmailAndPassword: async (email, password) => {
      try {
        const authData = await this.#auth.signInWithEmailAndPassword(
          email,
          password
        );

        const userRootRef = this.#database.ref(
          `${this.#root}/${authData.user.uid}`
        );

        const userData = await userRootRef.once('value');
        return { user: authData.user, account: userData.val().account };
      } catch (error) {
        console.log(error);
      }
    },
  };

  create = async ({ path, body }) => this.#database.ref(path).set(body);

  delete = async path => this.#database.ref(path).remove();

  update = async ({ path, body }) => this.#database.ref(path).update(body);

  read = async path => this.#database.ref(path).once('value');
}

export default FirebaseService;

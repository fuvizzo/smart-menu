class FirebaseService {
  #database = null;
  constructor(firebase) {
    this.#database = firebase.database();
  }
}

export default FirebaseService;

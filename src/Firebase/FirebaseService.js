class FirebaseService {
  #database = null;
  constructor(firebase) {
    this.#database = firebase.database();

    const dbRefObject = this.#database.ref().child('object');
    console.log(dbRefObject);
    dbRefObject.on('value', snap => {
      console.log(snap.val());
    });
  }
}

export default FirebaseService;

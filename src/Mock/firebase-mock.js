import firebaseMock from 'firebase-mock';
import jsonMock from './mock-data.json';
const mockAuth = new firebaseMock.MockAuthentication();
const mockDatabase = new firebaseMock.MockFirebase();
const mockFirestore = new firebaseMock.MockFirestore();
const mockStorage = new firebaseMock.MockStorage();
const mockMessaging = new firebaseMock.MockMessaging();

export default new firebaseMock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => {
    if (path) {
      const child = mockDatabase.child(path);
      const data = {
        val: null,
      };
      if (path === '/users/OIRnMadgbecau6O6QL9xlyqoBkI2') {
        child.once = event => {
          if (event === 'value') {
            const val = () => {
              return jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2;
            };
            data.val = val;
            return Promise.resolve(data);
          }
        };
      }

      if (path === '/users/OIRnMadgbecau6O6QL9xlyqoBkI2/menus') {
        child.once = event => {
          if (event === 'value') {
            const val = () => {
              return jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.menus;
            };
            data.val = val;
            return Promise.resolve(data);
          }
        };

        child.remove = event => {
          return Promise.resolve();
        };
      }
      if (path.split('/').length >= 5) {
        child.set = event => {
          return Promise.resolve();
        };
        child.remove = event => {
          return Promise.resolve();
        };
        child.update = event => {
          return Promise.resolve();
        };
        child.once = event => {
          if (event === 'value') {
            const segs = path.split('/');
            const val = () => {
              console.log(
                'The mocked Firebase service shows results even if "published"=false but Firebase rules prevent to read unpublished menus'
              );
              return jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.menus[segs[4]];
            };
            data.val = val;
            return Promise.resolve(data);
          }
        };
      }
      return child;
    }
    return mockDatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    mockAuth.signInWithEmailAndPassword = (email, password) => {
      return {
        user: {
          uid: 'OIRnMadgbecau6O6QL9xlyqoBkI2',

          metadata: {
            creationTime: 'Fri, 03 Apr 2020 15:16:34 GMT',
            lastSignInTime: null,
          },
        },
      };
    };

    mockAuth.signOut = () => {
      return {
        user: null,
      };
    };
    return mockAuth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockFirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockStorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return mockMessaging;
  }
);

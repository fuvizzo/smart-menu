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
      if (path.includes('/urlToBusinessMappings')) {
        const once = event => {
          if (event === 'value') {
            const val = () => {
              return jsonMock.urlToBusinessMappings[path.split('/')[2]];
            };
            data.val = val;
            return Promise.resolve(data);
          }
        };

        child.once = once;

        child.orderByValue = event => {
          const equalTo = value => {
            /*   if (<some condition>) */
            return {
              once,
            };
          };
          return {
            equalTo,
          };
        };
      }

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

      if (path.includes('businesses')) {
        child.once = event => {
          if (event === 'value') {
            const val = () => {
              return jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.businesses[
                'd5d1bb90-7d6c-490f-8871-f4368a19416c'
              ];
            };
            data.val = val;
            return Promise.resolve(data);
          }
        };
      }

      if (path === '/users/OIRnMadgbecau6O6QL9xlyqoBkI2/menus') {
        child.orderByChild = event => {
          const equalTo = event => {
            return {
              once: event => {
                if (event === 'value') {
                  const val = () => {
                    delete jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.menus[
                      'd010d4df-0b7a-42b2-9bd9-6971498c6c53'
                    ];
                    return jsonMock.users.OIRnMadgbecau6O6QL9xlyqoBkI2.menus;
                  };
                  data.val = val;
                  return Promise.resolve(data);
                }
              },
            };
          };
          return {
            equalTo,
          };
        };

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
      if (path.split('/').length >= 5 && path.includes('menus')) {
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

      child.set = event => {
        return Promise.resolve();
      };
      child.remove = event => {
        return Promise.resolve();
      };
      child.update = event => {
        return Promise.resolve();
      };
      return child;
    }
    return mockDatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    mockAuth.signInWithEmailAndPassword = (email, password) => {
      if (password === '123456')
        return Promise.resolve({
          user: {
            uid: 'OIRnMadgbecau6O6QL9xlyqoBkI2',
            email: 'fulvio.cuismano@gmail.com',
            metadata: {
              creationTime: 'Fri, 03 Apr 2020 15:16:34 GMT',
              lastSignInTime: null,
            },
          },
        });
      return Promise.reject({
        code: 'auth/login',
        message: 'The password is wrong. ',
        a: null,
      });
    };

    mockAuth.createUserWithEmailAndPassword = (email, password) => {
      return {
        user: {
          uid: 'Oeifjiwfjw9034opkw6QL9xlyqoBkI1',
          email: 'marco.boldrini@gmail.com',
          metadata: {
            creationTime: 'Fri, 03 Apr 2020 15:16:34 GMT',
            lastSignInTime: null,
          },
        },
      };
    };

    mockAuth.signOut = () => {
      return Promise.resolve({
        user: null,
      });
    };

    mockAuth.verifyPasswordResetCode = actionCode => {
      if (actionCode === 'error')
        return Promise.reject({
          code: 'auth/expired-action-code',
          message: 'The action code has expired. ',
          a: null,
        });
      return Promise.resolve('fulvio.cusimano@gmail.com');
    };

    mockAuth.sendPasswordResetEmail = email => {};

    mockAuth.confirmPasswordReset = (actionCode, newPassword) => {
      if (actionCode === 'error1')
        return Promise.reject({
          code: 'auth/expired-action-code',
          message: 'The action code has expired. ',
          a: null,
        });
      return Promise.resolve();
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

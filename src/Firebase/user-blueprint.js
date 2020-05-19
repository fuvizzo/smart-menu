export default (firstName, lastName) => ({
  menus: {},
  business: {
    type: null,
    name: null,
    logo: null,
    colorPalette: {
      primary: null,
      secondary: null,
      accent: null,
    },
    headerBanner: null,
  },
  account: {
    user: {
      firstName,
      lastName,
    },
    subscriptionStatus: {
      type: null,
      expirationTime: null,
    },
  },
});

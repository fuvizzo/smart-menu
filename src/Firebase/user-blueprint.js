export default (firstName, lastName, businessId) => ({
  menus: {},
  businesses: {
    [businessId]: {
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

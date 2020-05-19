import constants from '../Constants/index';

export default (
  firstName,
  lastName,
  businessId,
  businessName,
  businessType
) => {
  const businessTypeName = constants.Locales.en.BUSINESS_TYPES[businessType];
  const uniqueUrlPath = `${businessTypeName}-${businessName}`.toLowerCase();
  return {
    uniqueUrlPath,
    user: {
      menus: {},
      businesses: {
        [businessId]: {
          type: businessType,
          name: businessName,
          uniqueUrlPath,
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
    },
  };
};

import constants from '../Constants/index';
import Random from 'randomstring';
export default (
  firstName,
  lastName,
  businessId,
  businessName,
  businessType
) => {
  const businessTypeName = constants.Locales.en.BUSINESS_TYPES[businessType];
  const uniqueUrlPath = `${businessTypeName}-${businessName}-${Random.generate(
    4
  )}`.toLowerCase();
  return {
    uniqueUrlPath,
    user: {
      menus: {},
      businesses: {
        [businessId]: {
          info: { type: businessType, name: businessName, uniqueUrlPath },
          media: { logo: null, headerBanner: null },
          theme: {
            colorPalette: {
              primary: null,
              secondary: null,
              accent: null,
            },
          },
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

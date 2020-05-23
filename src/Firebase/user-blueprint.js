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

import constants from '../Constants/index';
import Random from 'randomstring';
import { createUrlSafeStringValue } from '../Helpers';
export default (
  firstName,
  lastName,
  businessId,
  businessName,
  businessType,
  allowExtraEmails
) => {
  const businessTypeName = constants.Locales.en.BUSINESS_TYPES[businessType];
  const uniqueUrlPath = `${businessTypeName}-${createUrlSafeStringValue(
    businessName
  )}-${Random.generate(4)}`.toLowerCase();
  return {
    uniqueUrlPath,
    user: {
      menus: {},
      businesses: {
        [businessId]: {
          info: { type: businessType, name: businessName, uniqueUrlPath },
          media: {},
          theme: constants.DEFAULT_THEME,
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
        allowExtraEmails,
      },
    },
  };
};

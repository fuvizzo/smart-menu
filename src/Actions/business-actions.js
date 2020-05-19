import * as BusinessActions from '../Constants/business-action-types';
import firebaseService from '../Firebase/index';
import business from '../Schemas/business';

const URL_TO_BUSINESS_MAPPINGS = '/urlToBusinessMappings';

const userBusinessesPath = userId => `/users/${userId}/businesses`;
const getUserId = getState => getState().account.user.userId;

export const updateBusiness = (businessId, body) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    let path, data;
    try {
      const oldUniqueUrlPath = getState().businesses[businessId].uniqueUrlPath;
      path = `${URL_TO_BUSINESS_MAPPINGS}/${oldUniqueUrlPath}`;

      await firebaseService.delete(path);

      path = `${URL_TO_BUSINESS_MAPPINGS}/${body.uniqueUrlPath}`;
      data = {
        path,
        body: {
          userId,
          businessId,
        },
      };

      await firebaseService.update(data);

      path = `${userBusinessesPath(userId)}/${businessId}`;
      data = {
        path,
        body,
      };

      await firebaseService.update(data);
      dispatch({
        type: BusinessActions.UPDATE_BUSINESS,
        payload: { businessId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

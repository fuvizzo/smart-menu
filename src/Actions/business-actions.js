import * as BusinessActions from '../Constants/business-action-types';
import * as UI_Actions from '../Constants/ui-action-types';
import firebaseService from '../Firebase/index';
import constants from '../Constants';

const { ErrorTypes, Locales } = constants;

const URL_TO_BUSINESS_MAPPINGS = '/urlToBusinessMappings';

const userBusinessesPath = userId => `/users/${userId}/businesses`;

export const updateBusiness = (businessId, body) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.account.user.userId;
    const {
      Labels: { FormValidationErrors },
    } = Locales[state.ui.settings.defaultLanguage];
    let data;
    try {
      const oldUniqueUrlPath = getState().businesses[businessId].uniqueUrlPath;

      const newPath = `${URL_TO_BUSINESS_MAPPINGS}/${body.uniqueUrlPath}`;

      if (oldUniqueUrlPath !== body.uniqueUrlPath) {
        const results = await firebaseService.read(newPath);
        if (!results.val()) {
          const deleteOldUniqueUrlPath = async () => {
            const path = `${URL_TO_BUSINESS_MAPPINGS}/${oldUniqueUrlPath}`;
            await firebaseService.delete(path);
          };
          await deleteOldUniqueUrlPath();
          data = {
            path: newPath,
            body: {
              userId,
              businessId,
            },
          };

          await firebaseService.update(data);
        } else {
          dispatch({
            type: UI_Actions.SHOW_ERROR,
            payload: {
              type: ErrorTypes.BACK_END_DATA_VALIDATION,
              message: FormValidationErrors.UNIQUE_URL_PATH_ALREADY_IN_USE,
            },
          });
          return;
        }
      }

      const path = `${userBusinessesPath(userId)}/${businessId}`;
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

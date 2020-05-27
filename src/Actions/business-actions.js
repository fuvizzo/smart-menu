import * as BusinessActions from '../Constants/business-action-types';
import firebaseService from '../Firebase/index';
import { dispatchGenericError, getUserIdAndLanguage } from './helpers';

const URL_TO_BUSINESS_MAPPINGS = '/urlToBusinessMappings';
const INFO = 'info';
const MEDIA = 'media';
const THEME = 'theme';

const userBusinessesPath = userId => `/users/${userId}/businesses`;

export const updateBusinessTheme = (businessId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    try {
      const path = `${userBusinessesPath(userId)}/${businessId}/${THEME}`;
      const data = {
        path,
        body,
      };

      await firebaseService.update(data);
      dispatch({
        type: BusinessActions.UPDATE_BUSINESS_THEME,
        payload: { businessId, value: body },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const updateBusinessInfo = (businessId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    let data;

    try {
      const oldUniqueUrlPath = getState().businesses[businessId].info
        .uniqueUrlPath;

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
          dispatchGenericError(
            dispatch,
            language,
            'UNIQUE_URL_PATH_ALREADY_IN_USE'
          );
          return false;
        }
      }

      const path = `${userBusinessesPath(userId)}/${businessId}/${INFO}`;
      data = {
        path,
        body,
      };

      await firebaseService.update(data);
      dispatch({
        type: BusinessActions.UPDATE_BUSINESS_INFO,
        payload: { businessId, value: body },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const deleteBusinessMedia = (businessId, fileName, fileExt) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    try {
      const basePath = `${userBusinessesPath(userId)}/${businessId}`;
      await firebaseService.storage.deleteFile(
        `${basePath}/${fileName}.${fileExt}`
      );
      dispatch({
        type: BusinessActions.DELETE_BUSINESS_MEDIA,
        payload: { businessId, type: fileName },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const uploadBusinessMedia = (
  businessId,
  img,
  type,
  onUploading,
  metadata = null
) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    try {
      const basePath = `${userBusinessesPath(userId)}/${businessId}`;
      const imageType = img.type.split('/')[1];
      const newFilename = `${type}.${imageType}`;
      const uploadTask = await firebaseService.storage.uploadFile(
        `${basePath}/${newFilename}`,
        img,
        onUploading,
        metadata
      );

      const url = await uploadTask.ref.getDownloadURL();

      const data = {
        path: `${basePath}/${MEDIA}/${type}`,
        body: {
          url,
          imageType,
        },
      };
      await firebaseService.update(data);
      dispatch({
        type: BusinessActions.UPLOAD_BUSINESS_MEDIA,
        payload: { businessId, type, value: data.body },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

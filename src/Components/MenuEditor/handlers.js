import constants from '../../Constants/index';
import { cloneDeep } from 'lodash';
export const onChangeInputValueHandler = (event, ui, editData, insertData) => {
  const input = event.currentTarget;
  const currentValue = input.type !== '' ? input.value : input.dataset.value;

  if (ui.insertMode.enabled) {
    const lang = input.dataset.lang;
    const data = cloneDeep(ui.insertMode.data);

    data.value.lang = lang;
    data.value[input.name] = currentValue;
    insertData(data);
  } else {
    const data = cloneDeep(ui.editMode.data);

    if (constants.LocalizedFields.some(field => field === input.name)) {
      const lang = input.dataset.lang;
      data.value.locales[lang][input.name] = currentValue;
    } else {
      data.value[input.name] = currentValue;
    }
    editData(data);
  }
};

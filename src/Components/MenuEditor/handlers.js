import constants from '../../Constants/index';
export const onChangeInputValueHandler = (event, ui, editData, insertData) => {
  const input = event.currentTarget;
  const currentValue = input.type !== '' ? input.value : event.target.value;

  if (ui.insertMode.enabled) {
    const lang = input.dataset.lang;
    const data = ui.insertMode.data;

    data.value.lang = lang;
    data.value[input.name] = currentValue;
    insertData(data);
  } else {
    const data = ui.editMode.data;

    if (constants.LocalizedFields.some(field => field === input.name)) {
      const lang = input.dataset.lang;
      data.value.locales[lang][input.name] = currentValue;
    } else {
      data.value[input.name] = currentValue;
    }
    editData(data);
  }
};

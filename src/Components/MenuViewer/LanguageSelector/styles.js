import { withStyles } from '@material-ui/core/styles';

import { ListItem, List, Box } from '@material-ui/core';

const LanguageSelectorWrapper = withStyles({
  root: {},
})(Box);

const LanguageList = withStyles({
  root: {
    display: 'flex',
    width: 100,
    marginBottom: 20,
  },
})(List);

const LanguageListItem = withStyles({
  root: {
    color: props => props.color ? props.color : 'black',
    '&.Mui-selected': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: props => props.color ? props.color : 'black',
      backgroundColor: 'transparent',
    },
  },
})(ListItem);

export default LanguageSelectorWrapper;

export { LanguageList, LanguageListItem };

import { withStyles } from '@material-ui/core/styles';

import { ListItem, List, Box } from '@material-ui/core';

const LanguageSelectorWrapper = withStyles({
  root: {},
})(Box);

const LanguageList = withStyles({
  root: {
    display: 'flex',
    width: 100,
  },
})(List);

const LanguageListItem = withStyles({
  root: {
    color: props => props.color,
    '&.Mui-selected': {
      border: props => `1px solid ${props.color}`,
      backgroundColor: 'transparent',
    },
  },
})(ListItem);

export default LanguageSelectorWrapper;

export { LanguageList, LanguageListItem };

import { styled, withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core/';

const DisclaimerWrapper = withStyles({
  root: {
    fontSize: '0.8rem',
    height: 500,
    display: 'flex',
    color: '#828282',
    maxWidth: 400,
    alignItems: 'center',
    margin: 'auto',
    '& > *': {
      flex: 1,
    },
  },
})(Box);

export { DisclaimerWrapper };

import { makeStyles, styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

export const MediaBox = styled(Box)({
  display: 'flex',
});

export const EmptyImageMsgBox = styled(Box)({
  padding: '30px',
  border: '1px solid #e6e6e6',
});

export const Logo = styled(Box)({
  minHeight: 100,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  '& img': {
    border: '1px solid #ededed',
    maxHeight: 100,
  },
});

export default makeStyles(theme => ({
  logo: {
    maxWidth: 200,
  },
  colorPicker: {
    display: 'flex',
    alignItems: 'center',
  },
  colorBox: {
    marginTop: 0,
    height: 15,
    width: 40,
    border: '1px solid #8c8989',
    marginRight: 5,
  },
  colorPickerButton: {
    fontSize: '0.6em',
    minWidth: 30,
    height: 16,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 0.8,
  },
}));

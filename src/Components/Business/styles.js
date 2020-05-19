import { makeStyles } from '@material-ui/core/styles';
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

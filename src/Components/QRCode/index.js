import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, Box, Typography } from '@material-ui/core/';
import QRCode from 'qrcode.react';
import constants from '../../Constants';
import { DialogActions, DialogTitle, DialogContent } from '../Common';
import { DialogContentBox } from './styles';
import { Label } from '../Common/styles';
import { downLoadSvgImage } from '../../Helpers';
const { Locales } = constants;
const QRCodeDialog = props => {
  const { onCloseHandler, open, defaultLanguage, uniqueUrlPath } = props;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },
  } = Locales[defaultLanguage];

  const fullUrlPath = `${window.location.origin}/${uniqueUrlPath}`;
  return (
    <Dialog
      onClose={onCloseHandler}
      aria-labelledby="menu-qr-code-dialog-title"
      open={open}
    >
      <DialogTitle id="menu-qr-code-dialog-title" onClose={onCloseHandler}>
        <Typography color="secondary">{MenuLabels.QR_CODE}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentBox pb={0}>
          <QRCode id="qr-code" renderAs="svg" value={fullUrlPath} />
        </DialogContentBox>
        <DialogContentBox pb={0}>
          <Label color="textSecondary" variant="h1">
            {MenuLabels.WEB_LINK}
          </Label>
          <Typography component="a" target="blank" href={fullUrlPath}>
            {fullUrlPath}
          </Typography>
        </DialogContentBox>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onCloseHandler}
          color="primary"
          variant="contained"
        >
          {ActionsLabels.CANCEL}
        </Button>
        <Button
          size="small"
          onClick={() => downLoadSvgImage('qr-code', 'menu-page-qr-code')}
          autoFocus
          color="primary"
          variant="contained"
        >
          {ActionsLabels.DOWNLOAD}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    uniqueUrlPath: Object.values(state.businesses)[0].info.uniqueUrlPath,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps)(QRCodeDialog);

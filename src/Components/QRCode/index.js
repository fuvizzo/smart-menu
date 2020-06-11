import React from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, Typography } from '@material-ui/core/';
import QRCode from 'qrcode.react';

import { Link } from 'react-router-dom';
import constants from '../../Constants';
import { DialogActions, DialogTitle, DialogContent } from '../Common';
import {
  DialogContentBox,
  MenuPagePublicURL,
  StyledEm,
  DialogContentBoxWrapper,
  AdviceTypography,
  ActionLink,
} from './styles';
import { Label } from '../Common/styles';
import { downLoadSvgImage } from '../../Helpers';
const { Locales } = constants;
const QRCodeDialog = props => {
  const { onCloseHandler, open, defaultLanguage, uniqueUrlPath } = props;

  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels, Hints: HintLabels },
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
        <DialogContentBoxWrapper pb={2}>
          <DialogContentBox pb={0}>
            <QRCode id="qr-code" renderAs="svg" value={fullUrlPath} />
          </DialogContentBox>
          <DialogContentBox pb={0}>
            <Label color="textSecondary" variant="h1">
              {MenuLabels.WEB_LINK}
            </Label>
            <MenuPagePublicURL
              color="primary"
              component="a"
              target="blank"
              href={fullUrlPath}
            >
              {window.location.origin}/<StyledEm>{uniqueUrlPath}</StyledEm>
            </MenuPagePublicURL>
          </DialogContentBox>
        </DialogContentBoxWrapper>
        <AdviceTypography color="textSecondary">
          {HintLabels.CHANGE_UNIQUE_URL_PATH}{' '}
          <ActionLink
            color="secondary"
            component={Link}
            onClick={onCloseHandler}
            to="/dashboard/business"
          >
            ({ActionsLabels.CLICK_HERE})
          </ActionLink>
        </AdviceTypography>
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

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import constants from '../../Constants/index';
import { connect } from 'react-redux';
const { ConfirmationActions, Locale } = constants;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LanguageTabsPanel = props => {
  const { locales, defaultLanguage } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {
    Languages,
    Labels: { Actions: ActionsLabels },
  } = Locale[defaultLanguage];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {Object.keys(locales)
            .filter(locale => locale !== defaultLanguage)
            .map((lang, index) => {
              return <Tab label={Languages[lang]} {...a11yProps(index)} />;
            })}
          >/
        </Tabs>
      </AppBar>
      {Object.keys(locales)
        .filter(locale => locale !== defaultLanguage)
        .map((lang, index) => {
          const locale = locales[lang];
          return (
            <TabPanel value={value} index={index}>
              <Typography paragraph>{locale.name}</Typography>
              <Typography paragraph>{locale.description}</Typography>
              <Typography paragraph>{locale.ingredients}</Typography>
            </TabPanel>
          );
        })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LanguageTabsPanel);

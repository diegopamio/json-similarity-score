import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Grid, useTheme } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { CollapsiblePanel } from '~/components/CollapsiblePanel';
import { ArrayCompareOptionPanel } from '~/components/OptionsPanel/ArrayCompareOptionPanel';
import { TabPanel } from '~/components/OptionsPanel/TabPanel';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const OptionsTabs = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Tabs
        className={classes.root}
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="options tabs"
        centered
      >
        <Tab label="Array Order" />
        <Tab label="Depth Weight" />
        <Tab label="Missing Branch" />
      </Tabs>
    </Grid>
  );
};

OptionsTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TabPanels = ({ index, onChangeIndex }) => {
  const theme = useTheme();

  return (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={index}
      onChangeIndex={onChangeIndex}
    >
      <ArrayCompareOptionPanel value={index} index={0} dir={theme.direction} />
      <TabPanel value={index} index={1} dir={theme.direction}>
        Coming soon!
      </TabPanel>
      <TabPanel value={index} index={2} dir={theme.direction}>
        Coming soon!
      </TabPanel>
    </SwipeableViews>
  );
};

TabPanels.propTypes = {
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
};

export const OptionsPanel = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [toggled, setToggle] = React.useState(false);
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setCurrentTab(index);
  };

  const handleExpanded = (newValue) => {
    setToggle(newValue);
  };

  return (
    <CollapsiblePanel
      separator
      onToggle={handleExpanded}
      title={(
        <Grid container>
          <Grid item xs={4}>Options</Grid>
          {toggled && (<OptionsTabs value={currentTab} onChange={handleChange} />)}
        </Grid>
      )}
    >
      <TabPanels index={currentTab} onChangeIndex={handleChangeIndex} />
    </CollapsiblePanel>
  );
};

/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import {
  CardContent, CardHeader, Grid, useTheme,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { CollapsiblePanel } from '~/components/CollapsiblePanel';
import { OptionsAlternatives } from '~/components/OptionsPanel/OptionsAlternatives';
import { SCORING_SETTINGS_KEYS, SCORE_SETTINGS_VALUES } from '~/utils/score/constants';

const { ARRAY_POSITION_MATCH } = SCORING_SETTINGS_KEYS;
const { FORCE_SAME_POSITION, MATCH_ANY_POSITION } = SCORE_SETTINGS_VALUES[ARRAY_POSITION_MATCH];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel({
  children, value, index, ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const OptionsPanel = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [toggled, setToggle] = React.useState(false);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setCurrentTab(index);
  };
  const theme = useTheme();

  const handleExpanded = (newValue) => {
    setToggle(newValue);
  };
  return (
    <CollapsiblePanel
      separator
      onToggle={handleExpanded}
      title={(
        <Grid
          container
        >
          <Grid
            item
            xs={4}
          >
            Options
          </Grid>
          {toggled && (
            <Grid item>
              <Tabs
                className={classes.root}
                value={currentTab}
                onChange={handleChange}
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
          )}
        </Grid>
      )}
    >

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={currentTab} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Explanation" />
                <CardContent>
                  This setting determines whether arrays inside the JSON files are compared following their index,
                  or if they are all compare to each other to find the best match, considering arrays are non-sorted by
                  nature and thus, they may be considered EQUAL when their equal elements are positioned at different
                  indexes.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Card>
                <CardHeader title="Select Option" />
                <CardContent>
                  <OptionsAlternatives
                    optionKey={ARRAY_POSITION_MATCH}
                    alternatives={[
                      { label: 'Disregard Array Index', value: MATCH_ANY_POSITION },
                      { label: 'Force equal Index', value: FORCE_SAME_POSITION },
                    ]}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={currentTab} index={1} dir={theme.direction}>
          Coming soon!
        </TabPanel>
        <TabPanel value={currentTab} index={2} dir={theme.direction}>
          Coming soon!
        </TabPanel>
      </SwipeableViews>
    </CollapsiblePanel>
  );
};

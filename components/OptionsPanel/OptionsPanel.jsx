import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Grid, useTheme } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { CollapsiblePanel } from '~/components/CollapsiblePanel';
import { SCORE_SETTINGS_VALUES, SCORING_SETTINGS_KEYS } from '~/utils/score/constants';
import { OptionsTabPanel } from '~/components/OptionsPanel/OptionsTabPanel';

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
      </Tabs>
    </Grid>
  );
};

OptionsTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const { ELEMENT_WEIGHT, ARRAY_POSITION_MATCH } = SCORING_SETTINGS_KEYS;
const { SIBLINGS_PROPORTION, DESCENDANTS_COUNT } = SCORE_SETTINGS_VALUES[ELEMENT_WEIGHT];
const { FORCE_SAME_POSITION, MATCH_ANY_POSITION } = SCORE_SETTINGS_VALUES[ARRAY_POSITION_MATCH];

const options = [
  {
    key: ARRAY_POSITION_MATCH,
    explanation: 'If two JSONs has only two keys, and one of them is in both JSON a single number, let\'s say `3`,'
      + ' but in the other key, they both have a four-level nested json with thousands of arrays, sub-objects, '
      + 'sub-arrays, text and numbers, for which they are only completely different, would you say they are 50% equal'
      + ' (1 out of 2 keys) or almost completely different? This setting allows you to control exactly that.',
    alternatives: [
      { label: 'Disregard Array Index', value: MATCH_ANY_POSITION },
      { label: 'Force equal Index', value: FORCE_SAME_POSITION },
    ],
  },
  {
    key: ELEMENT_WEIGHT,
    explanation: 'This setting determines whether arrays inside the JSON files are compared following their index,'
    + ' or if they are all compare to each other to find the best match, considering arrays are non-sorted by'
    + ' nature and thus, they may be considered EQUAL when their equal elements are positioned at different'
    + ' indexes.',
    alternatives: [
      { label: 'Descendants Count', value: DESCENDANTS_COUNT },
      { label: 'Siblings Proportion', value: SIBLINGS_PROPORTION },
    ],
  },
];

const TabPanels = ({ index: panelIndex, onChangeIndex }) => {
  const theme = useTheme();

  return (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={panelIndex}
      onChangeIndex={onChangeIndex}
    >
      {options.map((option, optionIndex) => (
        <OptionsTabPanel
          value={panelIndex}
          index={optionIndex}
          explanation={option.explanation}
          alternatives={option.alternatives}
          optionKey={option.key}
        />
      ))}
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

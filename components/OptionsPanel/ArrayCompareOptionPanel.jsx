import Box from '@material-ui/core/Box';
import React from 'react';
import { CardContent, CardHeader, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { TabPanel } from '~/components/OptionsPanel/TabPanel';
import { OptionsAlternatives } from '~/components/OptionsPanel/OptionsAlternatives';
import { SCORE_SETTINGS_VALUES, SCORING_SETTINGS_KEYS } from '~/utils/score/constants';

const { ARRAY_POSITION_MATCH } = SCORING_SETTINGS_KEYS;
const { FORCE_SAME_POSITION, MATCH_ANY_POSITION } = SCORE_SETTINGS_VALUES[ARRAY_POSITION_MATCH];

const alternatives = [
  { label: 'Disregard Array Index', value: MATCH_ANY_POSITION },
  { label: 'Force equal Index', value: FORCE_SAME_POSITION },
];

const explanation = 'This setting determines whether arrays inside the JSON files are compared following their index,'
  + ' or if they are all compare to each other to find the best match, considering arrays are non-sorted by'
  + ' nature and thus, they may be considered EQUAL when their equal elements are positioned at different'
  + ' indexes.';

export const ArrayCompareOptionPanel = ({ value, index, dir }) => (
  <TabPanel value={value} index={index} dir={dir}>
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Explanation" />
            <CardContent>{explanation}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader title="Select Option" />
            <CardContent>
              <OptionsAlternatives optionKey={ARRAY_POSITION_MATCH} alternatives={alternatives} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </TabPanel>
);

ArrayCompareOptionPanel.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  dir: PropTypes.string.isRequired,
};

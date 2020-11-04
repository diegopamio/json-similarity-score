/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import {
  CardContent, CardHeader, Grid, useTheme,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { OptionsAlternatives } from '~/components/OptionsPanel/OptionsAlternatives';
import { SCORING_SETTINGS_KEYS } from '~/utils/score/constants';

export const OptionsTabPanel = ({
  children, value, index, explanation, alternatives, optionKey, ...other
}) => {
  const theme = useTheme();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      dir={theme.direction}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
                    <OptionsAlternatives optionKey={optionKey} alternatives={alternatives} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
};

OptionsTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  explanation: PropTypes.string.isRequired,
  optionKey: PropTypes.oneOf(Object.values(SCORING_SETTINGS_KEYS)).isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

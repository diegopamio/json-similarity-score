import React from 'react';
import * as PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {
  Box, Typography, CardHeader, CardContent,
} from '@material-ui/core';

/**
 * Renders a score card with its title, subtitle, and value.
 * @param score a 0..1 / undefined score, unformatted.
 * @return {JSX.Element} a Card element, with title and subtitle. If the value is not present, it gets rendered as "N/A"
 * @constructor
 */
export const ScoreCard = ({ score }) => (
  <Box mt={2} height="calc(100% - 52px)">
    <Card variant="outlined" height="100%">
      <CardHeader title="Score" subheader="From 0% to 100%" />
      <CardContent align="center" color="#f00">
        <Typography component="span" variant="h3" color="textSecondary">
          <strong>
            {typeof (score) === 'undefined' ? 'N/A' : `${(score * 100).toFixed(1)}`}
          </strong>
        </Typography>
        {typeof (score) !== 'undefined' && (
          <Typography component="span" variant="h6" color="primary">
            %
          </Typography>
        )}
      </CardContent>
    </Card>
  </Box>
);

ScoreCard.propTypes = { score: PropTypes.number };

ScoreCard.defaultProps = { score: undefined };

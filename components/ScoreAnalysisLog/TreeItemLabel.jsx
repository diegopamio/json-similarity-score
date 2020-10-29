import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import React from 'react';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  code: {
    fontWeight: theme.typography.fontWeightBold,
  },
  listItem: {
    paddingLeft: 0,
  },
  differentChip: {
    backgroundColor: red.A200,
    color: red['50'],
  },
  equalChip: {
    backgroundColor: green.A400,
    color: green['1000'],
  },
  partialDifferentChip: {
    backgroundColor: orange.A400,
    color: orange['50'],
  },
}));

const matchingIcon = (matched, count) => {
  if (matched === count) {
    return (<CheckCircleTwoToneIcon />);
  }
  if (matched === 0) {
    return (<HighlightOffTwoToneIcon />);
  }
  return (<RemoveCircleTwoToneIcon />);
};
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: theme.shape.borderRadius,
    width: '200px',
  },
  colorPrimary: {
    backgroundColor: red.A400,
  },
  bar: {
    backgroundColor: green.A400,
  },
}))(LinearProgress);

const getDescriptiveValue = (value) => {
  if (Array.isArray(value)) {
    return `an Array of ${value.length} items`;
  }
  if (typeof value === 'object') {
    return `an object with ${Object.keys(value).length} keys`;
  }
  return value;
};

const getEvaluationText = (metaData, count, matched) => {
  const {
    valueOfA,
    valueOfB,
    typeOfA,
    typeOfB,
  } = metaData;

  let evaluationText = ` values are EQUAL (+${count})`;
  if (typeOfA === 'undefined') {
    evaluationText = ` is NOT PRESENT on File A (is ${getDescriptiveValue(valueOfB)} in File B)`;
  } else if (typeOfB === 'undefined') {
    evaluationText = ` is NOT PRESENT on File B (is ${getDescriptiveValue(valueOfA)} in File A)`;
  } else if (valueOfA !== valueOfB || typeOfB !== typeOfA) {
    evaluationText = ` has DIFFERENT value ('${valueOfA}' vs '${valueOfB}')`;
  } else if (matched < count) {
    evaluationText = ` is PARTIALLY EQUAL (${matched} / ${count})`;
  }
  return evaluationText;
};
const getChipClass = (classes, matched, count) => {
  if (matched === 0) {
    return classes.differentChip;
  }
  if (matched === count) {
    return classes.equalChip;
  }
  return classes.partialDifferentChip;
};
export const TreeItemLabel = ({
  metaData, matched, count,
}) => {
  const classes = useStyles();

  const { key } = metaData;

  return (
    <ListItem dense className={classes.listItem}>
      <ListItemText>
        <Chip
          size="small"
          variant="outlined"
          color="secondary"
          className={getChipClass(classes, matched, count)}
          label={(
            <code className={classes.code}>
              {!Number.isNaN(Number.parseInt(key, 10)) ? `Item ${key}` : key}
            </code>
          )}
          icon={matchingIcon(matched, count)}
        />

        {getEvaluationText(metaData, count, matched)}
      </ListItemText>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <ListItemIcon>
          {matched > 0 && matched < count
          && <BorderLinearProgress variant="determinate" value={(matched / count) * 100} />}
        </ListItemIcon>

      </Box>

    </ListItem>
  );
};

TreeItemLabel.propTypes = {
  metaData: PropTypes.shape({
    key: PropTypes.string.isRequired,
    valueOfA: PropTypes.oneOfType(['string', 'number', 'object']).isRequired,
    valueOfB: PropTypes.oneOfType(['string', 'number', 'object']).isRequired,
    typeOfA: PropTypes.string.isRequired,
    typeOfB: PropTypes.string.isRequired,
  }).isRequired,
  matched: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

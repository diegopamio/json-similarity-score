import React from 'react';
import PropTypes from 'prop-types';
import { OptionsTabPanel } from '~/components/OptionsPanel/OptionsTabPanel';
import { SCORE_SETTINGS_VALUES, SCORING_SETTINGS_KEYS } from '~/utils/score/constants';

const { ELEMENT_WEIGHT } = SCORING_SETTINGS_KEYS;
const { SIBLINGS_PROPORTION, DESCENDANTS_COUNT } = SCORE_SETTINGS_VALUES[ELEMENT_WEIGHT];

const alternatives = [
  { label: 'Descendants Count', value: DESCENDANTS_COUNT },
  { label: 'Siblings Proportion', value: SIBLINGS_PROPORTION },
];

const explanation = 'If two JSONs has only two keys, and one of them is in both JSON a single number, let\'s say `3`,'
  + ' but in the other key, they both have a four-level nested json with thousands of arrays, sub-objects, sub-arrays'
  + ' and text and numbers, for which they are only completely different, would you say they are 50% equal'
  + ' (1 out of 2 keys) or almost completely different? This setting allows you to control exactly that.';

// const explanation = 'This setting '
export const ElementWeightOptionPanel = ({ value, index }) => (
  <OptionsTabPanel
    value={value}
    index={index}
    explanation={explanation}
    alternatives={alternatives}
    optionKey={ELEMENT_WEIGHT}
  />
);

ElementWeightOptionPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
